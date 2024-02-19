import morgan from "morgan";
import { Express } from "express";

const logger = (app: Express) => {
    //'dev' format of morgan - logs nice concise colored output for dev purposes
    app.use(morgan('dev')); 
}

export { logger };