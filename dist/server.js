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
    app.listen(configuration.port, () => {
        console.log(`🚀 Server runs at http://localhost:${configuration.port}`);
        console.log(`📋 Skip routes: ${configuration.skipRoutes.join(', ')}`);
    });
    const logStream = fs.createWriteStream('access.log', { flags: 'a' });
    console.log('Setting up middleware pipeline...');
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(morgan('combined', { stream: logStream }));
    app.use(authenticate(accountingServiceMongo));
    app.use(skipRoutes(configuration.skipRoutes));
    app.use(authorize(configuration.pathRoles));
    app.use(checkRequestLimit(requestLimitControlList));
    app.use(checkAccountById(configuration.checkIdRoutes));
    app.use('/accounting', accountingRouter);
    app.use((req, res) => {
        res.status(404).json({
            error: "Endpoint not found",
            method: req.method,
            path: req.path,
            availableEndpoints: [
                "POST /accounting/hire - Register new employee",
                "POST /accounting/login - Login to system",
                "GET /accounting/:id - Get employee by ID",
                "GET /accounting - Get all employees",
                "PATCH /accounting/:id - Update employee data",
                "PATCH /accounting/:id/password - Change password",
                "PUT /accounting/:id/role - Change employee role",
                "DELETE /accounting/:id - Fire employee"
            ]
        });
    });
    app.use(errorHandler);
    console.log('✅ Server setup completed');
    console.log('📊 Middleware order:');
    console.log('  1. JSON Parser');
    console.log('  2. Morgan Logging');
    console.log('  3. Authentication');
    console.log('  4. Skip Routes Check');
    console.log('  5. Authorization');
    console.log('  6. Rate Limiting');
    console.log('  7. Account Access Check');
    console.log('  8. Routes');
    console.log('  9. Error Handler');
};
//# sourceMappingURL=server.js.map