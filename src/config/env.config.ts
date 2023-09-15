import dotenv from 'dotenv';
dotenv.config();

export const env = {
  APP: {
    APP_NAME: process.env.APP_NAME || 'Deals Backend',
    APP_PORT: process.env.APP_PORT || 5000,
  },
  DATABASE: {
    TYPE: process.env.DB_TYPE as any,
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DATABASE_PORT) || 5432,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_DATABASE,
  },
  AWS: {
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    SECRET_KEY: process.env.AWS_SECRET_KEY,
    REGION: process.env.AWS_REGION,
    BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  },
  APIS: {
    PROVINCES_OPEN_API: process.env.PROVINCES_OPEN_API,
  },
};
