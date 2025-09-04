import mongoose from "mongoose";
import { configuration } from "./config/appConfig.js";
import { launchServer } from "./server.js";

mongoose.connect(configuration.mongoUri)
    .then(() => {
        console.log("MongoDB successfully connected");
        launchServer();
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });