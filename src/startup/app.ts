import cors from "cors";
//fremeword express
import express, {Application} from 'express';
import loadContainer from './container';
import dotenv from 'dotenv';
import helmet from "helmet";
import compression from "compression";
import {extendedResponse} from "../middlewares/express-extended-response";

dotenv.config({
    path: `${__dirname}/../../.env`
});

const app: Application = express();
const IP_SERVER = process.env.IP_SERVER;
const PORT = process.env.PORT || 8080;
const API_API = process.env.API_API || "0.0.0.0";
const API_VERSION = process.env.API_VERSION;
const MONGO_URL: string = process.env.DB_MONGO_URL || 'mongodb://localhost:27017/grandest_dev';
const SCHEMA =  process.env.APP_ENV == 'development' ? 'http' : 'https';

//JSON Support
app.use(express.json()).use(cors()).use(helmet()).use(compression());

app.use(extendedResponse);

//container
loadContainer(app);


class Server {
    static async start() {
        return await new Promise<void>((resolve) => {

            app.listen(PORT, () => {
                console.log("#####");
                console.log(process.env.APPLICATION_NAME);
                console.log("#####");
                console.log("#####");
                console.log(
                    `${SCHEMA}://${IP_SERVER}:${PORT}/${API_API}/${API_VERSION}/`,
                );
                console.log("Server Running");
                resolve();
            });
        });
    }
}

export {Server, MONGO_URL, app, API_API, API_VERSION};

