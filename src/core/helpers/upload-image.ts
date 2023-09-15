import { SinglePageInFlyers } from '~common/types/single-page-in-flyers.type';
import { env } from '~config/env.config';
import { S3Service } from '~s3/s3.service';

export const uploadBrandLogo = (
  file: Express.Multer.File,
  s3Service: S3Service,
): string => {
  return uploadImage(file, s3Service, 'brands');
};

export const uploadFlyer = (
  files: Express.Multer.File[] | Buffer[],
  s3Service: S3Service,
  name: string,
): SinglePageInFlyers[] => {
  let awsLink = '';
  if (!Buffer.isBuffer(files[0])) {
    awsLink = uploadImage(files[0], s3Service, `flyers/${name}`);
    return [
      {
        awsLink,
        page: 1,
      } as SinglePageInFlyers,
    ];
  } else {
    const result = [];
    for (let i = 0; i < files.length; i++) {
      result.push({
        awsLink: uploadImage(files[i], s3Service, `flyers/${name}`),
        page: i + 1,
      } as SinglePageInFlyers);
    }
    return result;
  }
};

export const uploadImage = (
  file: Express.Multer.File | Buffer,
  s3Service: S3Service,
  folder: string,
): string => {
  let awsLink = '';
  if (!Buffer.isBuffer(file)) {
    let postfix = '';
    for (let i = file.originalname.length - 1; i >= 0; i--) {
      if (file.originalname[i] === '.') {
        postfix = file.originalname.slice(i);
      }
    }
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}${postfix}`;
    awsLink = `https://${env.AWS.BUCKET_NAME}.s3.${env.AWS.REGION}.amazonaws.com/${folder}/${fileName}`;
    s3Service.uploadImageFile(file.buffer, fileName, folder);
  } else {
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.png`;
    awsLink = `https://${env.AWS.BUCKET_NAME}.s3.${env.AWS.REGION}.amazonaws.com/${folder}/${fileName}`;
    s3Service.uploadImageFile(file, fileName, folder);
  }
  return awsLink;
};
