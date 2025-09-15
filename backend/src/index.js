const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const shopRouter = require("./routes/shop.router");
const flowerRouter = require("./routes/flower.router");
const orderRouter = require("./routes/order.router");

const app = express();
app.use(cors({
  origin: ["https://flower-delivery-app-shrl.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
// app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/shops", shopRouter);
app.use("/flowers", flowerRouter);
app.use("/orders", orderRouter);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
