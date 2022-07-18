import mongoose from "mongoose";
import { Server, MONGO_URL, app, API_API, API_VERSION } from "./startup/app";
import { loadControllers } from "awilix-express";
import { notFoundMiddle } from "./middlewares/not-found.middleware";
import { handleError } from "./middlewares/error.middleware";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "../config/swagger/swaggerOptions";

const dbOptions: mongoose.ConnectOptions = {
  family: 4,
};

(async () => {
  await mongoose.connect(MONGO_URL, dbOptions);
  console.log("Connect Mongo");
  await Server.start();
})();

//config de swagger
const specs = swaggerJsDoc(options);



app.use(`/${API_API}/${API_VERSION}`,loadControllers(
    "controllers/**/+(*.js|*.ts)",
    {cwd: __dirname}));


//Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//middleware para cuando las rutas no existe envia retorno de resource not found

app.use(notFoundMiddle);
app.use(handleError);
