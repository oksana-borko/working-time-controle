import express from 'express';
import { configuration } from "./config/appConfig.js";
import { errorHandler } from "./errorHandler/errorHandler.js";
import morgan from 'morgan';
import * as fs from "fs";
import dotenv from 'dotenv';
import { accountingRouter } from "./routes/accountingRouter.js";
import { authenticate, skipRoutes } from "./middleware/authentication.js";
import { accountingServiceMongo } from "./services/AccountingServiceImplMongo.js";
import { authorize, checkAccountById, checkRequestLimit } from "./middleware/authorization.js";
import { requestLimitControlList } from "./utils/constants.js";
export const launchServer = () => {
    dotenv.config();
    const app = express();
    app.listen(configuration.port, () => console.log(`Server runs at http://localhost:${configuration.port}`));
    const logStream = fs.createWriteStream('access.log', { flags: 'a' });
    // Middleware
    app.use(express.json());
    app.use(authenticate(accountingServiceMongo));
    app.use(skipRoutes(configuration.skipRoutes));
    app.use(authorize(configuration.pathRoles));
    app.use(checkRequestLimit(requestLimitControlList));
    app.use(checkAccountById(configuration.checkIdRoutes));
    app.use(morgan('dev'));
    app.use(morgan('combined', { stream: logStream }));
    // Routes
    app.use('/accounting', accountingRouter);
    app.use((req, res) => {
        res.status(404).send("Page not found");
    });
    // Error Handler
    app.use(errorHandler);
};
//# sourceMappingURL=server.js.map