import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import path from "path";
const app = express();
const Route = require("router")
import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";




