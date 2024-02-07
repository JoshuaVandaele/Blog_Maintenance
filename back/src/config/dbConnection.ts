import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { rootFolder } from "../rootFolder";
config()

const getDirEntities = () => {
    const isTsNode = process.env.TS_NODE_DEV;
    const dirNameEntities = isTsNode ? rootFolder + '/entities/**.{js,ts}' : rootFolder + '/entities/**.ts';
    return dirNameEntities;
};

const getDbSettings = () => {
    const dbSettings: DataSourceOptions = {
        type: "postgres",
        host: process.env.HOST,
        port: process.env.POSTGRES_PORT as unknown as number,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        logging: false,
        entities: [getDirEntities()],
        subscribers: [],
    };

    return dbSettings;
};

export let AppDataStore: DataSource = new DataSource(getDbSettings());

export const initDbStore = async () => {
    try {
        await AppDataStore.initialize();
        console.log(`Db initialized. Host: ${getDbSettings().host}, port: ${getDbSettings().port}`);
    } catch (err) {
        console.error(`dbConnection - error initializing db. Error: ${err.message}`);
    }
};
