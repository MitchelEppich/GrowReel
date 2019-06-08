const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3Bucket = process.env.S3_BUCKET;

const resolvers = {
  Query: {},
  Subscription: {},
  Mutation: {
    signS3: async (_, { input }) => {
      const s3 = new aws.S3({
        signatureVersion: "v4",
        region: process.env.AWS_REGION
      });

      const s3Params = {
        Bucket: input.bucket,
        Key: input.filename,
        Expires: 60,
        ContentType: input.filetype,
        ACL: "public-read"
      };

      const signedRequest = await s3.getSignedUrl("putObject", s3Params);
      const url = `https://s3.amazonaws.com/${s3Bucket}/${input.filename}`;

      return {
        signedRequest,
        url
      };
    },
    getListS3: async (_, { input }) => {
      // This needs to be fixed
      const s3 = new aws.S3({
        signatureVersion: "v4",
        region: process.env.AWS_REGION
      });

      let s3Params = { Bucket: s3Bucket, Prefix: input.filename };

      let objects = await new Promise((resolve, reject) => {
        s3.listObjects(s3Params, (err, data) => {
          // Get Data Out
          if (err) console.log(err);
          if (data.Contents.length == 0) console.log("No Files");

          resolve(
            data.Contents.map(
              obj =>
                obj.Key.split("/")
                  .pop()
                  .split(".")[0]
            ).filter(word => word != "thumbnail")
          );
        });
      }).then(objects => {
        return objects;
      });

      return { objects };
    },
    deleteS3: (_, { input }) => {
      const s3 = new aws.S3({
        signatureVersion: "v4",
        region: process.env.AWS_REGION
      });

      let s3Params = {
        Bucket: s3Bucket,
        Prefix: input.filename
      };

      s3.listObjects(s3Params, (err, data) => {
        if (err) console.log(err);
        // if (data.Contents.length == 0) console.log("No Files");

        s3Params = { Bucket: s3Bucket };
        s3Params.Delete = { Objects: [] };

        data.Contents.forEach(content => {
          s3Params.Delete.Objects.push({ Key: content.Key });
        });

        s3.deleteObjects(s3Params, (err, data) => {
          if (err) console.log(err);
          // console.log(data);
        });
      });
    }
  }
};

module.exports = resolvers;
