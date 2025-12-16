import { env } from '~/config/environment.js';
import { MongoClient, ServerApiVersion } from 'mongodb';

let DataPCD = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();
  DataPCD = mongoClientInstance.db(env.DATABASE_NAME);
};

export const GET_DB = () => {
  if (!DataPCD) throw new Error('Bạn hãy kết nối đến MongoDB đi');
  return DataPCD;
};
