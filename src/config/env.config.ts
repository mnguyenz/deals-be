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
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_DATABASE,
  },
};
