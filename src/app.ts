import express from "express";
import bodyParser from "body-parser";
import eventRoutes from "./routes/eventRoutes";
import swaggerUi from "swagger-ui-express";
import { initializeFirebase } from "./config/firebase";
import cors from "cors";
import swaggerSpec from "../swaggerConfig";

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Initialize Firebase
initializeFirebase();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use routes
app.use("/api", eventRoutes);

export default app;
