import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const __dirname = path.resolve();
console.log(__dirname);

// app config
const app = express();
const port = 5000;

// middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// Serve the client-side application
app.use(express.static(path.join(__dirname, "backend/client/dist")));
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "backend/client/dist/index.html"));
});

// Serve the admin-side application
app.use(express.static(path.join(__dirname, "backend/admin/dist")));
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "backend/admin/dist/index.html"));
});

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
