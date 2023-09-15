import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { env } from '~config/env.config';

@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {
    AWS.config.update({
      accessKeyId: env.AWS.ACCESS_KEY,
      secretAccessKey: env.AWS.SECRET_KEY,
      region: env.AWS.REGION,
    });
  }

  async uploadImageFile(file: Buffer, name: string, folder: string) {
    const s3 = new AWS.S3({});
    s3.putObject({
      Bucket: env.AWS.BUCKET_NAME,
      Body: file,
      Key: `${folder}/${name}`,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    })
      .promise()
      .then(() => {})
      .catch((err) => console.log(err));
  }
}
