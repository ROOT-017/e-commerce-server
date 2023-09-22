const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const { checkoutSession } = require("./controllers/checkoutController");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/create-checkout-session", checkoutSession);
const PORT = process.env.NODE_ENV === "development" ? 8000 : process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
