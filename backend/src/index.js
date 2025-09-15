const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const shopRouter = require("./routes/shop.router");
const flowerRouter = require("./routes/flower.router");
const orderRouter = require("./routes/order.router");

const app = express();
app.use(cors({
  origin: [
    "https://flower-delivery-app-shrl.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));

app.use(express.json());

app.use("/shops", shopRouter);
app.use("/flowers", flowerRouter);
app.use("/orders", orderRouter);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err));


module.exports = (req, res) => app(req, res); 