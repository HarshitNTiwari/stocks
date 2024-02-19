import morgan from "morgan";
import { Express } from "express";

const logger = (app: Express) => {
    app.use(morgan('dev'));
}

export {logger};