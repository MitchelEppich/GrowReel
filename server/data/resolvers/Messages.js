const { Message } = require("../../models");

const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    userMessages: async (_, input) => {
      let _username = new RegExp(input.username, "i");
      return Message.find({
        $or: [
          { sender: _username },
          {
            $and: [{ recipient: "all" }, { recipient: { $not: _username } }]
          },
          {
            $and: [
              { recipient: _username },
              { recipient: { $not: new RegExp("all", "i") } }
            ]
          }
        ]
      }).sort({ sentAt: -1 });
    }
  },
  Subscription: {},
  Mutation: {
    upsertMessage: async (_, { input }) => {
      let _key = input.key;
      let _body = input.body;
      let _subject = input.subject;

      let action = (() => {
        if (_key == null) {
          if (_subject == null || _body == null) return null;
          return "CREATE";
        } else {
          if (_body == null) return "REMOVE";
          else return "UPDATE";
        }
      })();

      let _recipient = input.recipient;
      let _sender = input.sender;

      if (action == "CREATE") {
        if (_recipient == null) return "Failed to provide recipients";
        if (_sender == null) return "Failed to provide sender";
      }

      let key = _key || (await getUniqueKey());
      let message;
      switch (action) {
        case "REMOVE":
          message = await Message.findOne({ key });
          if (message == null) return "No Message Found";
          if (_recipient != null) {
            if (message.recipient[0] == "*") {
              message.recipient = [
                ...new Set([...message.recipient, ..._recipient])
              ];
            } else {
              message.recipient = message.recipient.filter(_ => {
                if (_recipient.includes(_)) return false;
                return true;
              });
            }
            if (message.recipient.length != 0) {
              message.save();
              return "Message Removed From Users";
            }
          }
          message.remove();
          return "Message Deleted";
        case "UPDATE":
          message = await Message.findOne({ key });
          if (message == null) return "No Message Found";
          if (_recipient != null) {
            if (_recipient[0] == "*") {
              message.recipient = [..._recipient];
            } else {
              message.recipient = [
                ...new Set([...message.recipient, ..._recipient])
              ];
            }
          }
          if (_body != null) message.body = _body;
          if (_subject != null) message.subject = _subject;
          message.updatedAt = new Date();
          message.save();
          return "Message Updated";
        case "CREATE":
          message = new Message({
            key,
            body: _body,
            subject: _subject,
            sender: _sender,
            recipient: _recipient
          });
          message.save();
          return `Message key is ${key}.`;
        default:
          return "No action found";
      }
    }
  }
};

let getUniqueKey = async () => {
  let message, key;
  do {
    key = `${Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 3)}`;
    message = await Message.find({ key });
  } while (message.length != 0);
  return key;
};

module.exports = resolvers;
