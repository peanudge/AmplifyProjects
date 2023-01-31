const sharp = require("sharp");
const aws = require("aws-sdk");
const s3 = new aws.S3();

exports.handler = async function (event, context) {
  if (event.Records[0].eventName === "ObjectRemoved:Delete") return;
  const BUCKET = event.Records[0].s3.bucket.name;
  const KEY = event.Records[0].s3.object.key;

  try {
    const rawImage = await s3.getObject({ Bucket: BUCKET, Key: KEY }).promise();
    const image = await sharp(rawImage.body);

    const metadata = await image.metadata();
    if (metadata.width > 1000) {
      const resizedImage = await image.resize({ width: 1000 }).toBuffer();
      await s3
        .putObject({
          Bucket: BUCKET,
          Body: resizedImage,
          Key: KEY,
        })
        .promise();
      return;
    } else {
      return;
    }
  } catch (err) {
    context.fail(`Error getting files: ${err}`);
  }
  // console.log("Received S3 event:", JSON.stringify(event, null, 2));
  // const bucket = event.Records[0].s3.bucket.name;
  // const key = event.Records[0].s3.object.key;
  // console.log(`Bucket: ${bucket}`, `Key: ${key}`);
};
