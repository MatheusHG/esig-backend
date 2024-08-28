import { S3 } from 'aws-sdk';

export class UploadFileService {
  async upload(file: Express.Multer.File, key: string) {
    const s3 = new S3();

    const { Location } = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: file.buffer,
        Key: encodeURI(key),
      })
      .promise();

    return Location;
  }

  async getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async delete(key: string) {
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
      .promise();
  }
}