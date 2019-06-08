const mongoose = require("mongoose");

const UserSchema = require("./User");
const VideoSchema = require("./Video");
const CommentSchema = require("./Comment");
const HistoryElementSchema = require("./HistoryElement");
const EmailRequestSchema = require("./EmailRequest");
const ListSchema = require("./List");
const ReportSchema = require("./Report");
const GlobalSchema = require("./Global");
const ActivityRecordSchema = require("./ActivityRecord");
const MessageSchema = require("./Message");

const User = mongoose.model("User", UserSchema);
const Video = mongoose.model("Video", VideoSchema);
const Comment = mongoose.model("Comment", CommentSchema);
const HistoryElement = mongoose.model("HistoryElement", HistoryElementSchema);
const EmailRequest = mongoose.model("EmailRequest", EmailRequestSchema);
const List = mongoose.model("List", ListSchema);
const Report = mongoose.model("Report", ReportSchema);
const Global = mongoose.model("Global", GlobalSchema);
const ActivityRecord = mongoose.model("ActivityRecord", ActivityRecordSchema);
const Message = mongoose.model("Message", MessageSchema);

exports.User = User;
exports.Video = Video;
exports.Comment = Comment;
exports.HistoryElement = HistoryElement;
exports.EmailRequest = EmailRequest;
exports.List = List;
exports.Report = Report;
exports.Global = Global;
exports.ActivityRecord = ActivityRecord;
exports.Message = Message;
