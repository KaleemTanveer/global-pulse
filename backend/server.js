const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/User");
require("./models/Favorite");

const sequelize = require("./config/db");
const axios = require("axios");
const http = require("http");
const https = require("https");

const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

axios.defaults.httpAgent = new http.Agent({ family: 4 });
axios.defaults.httpsAgent = new https.Agent({ family: 4 });



const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const countryRoutes = require("./routes/countryRoutes");
const issRoutes = require("./routes/issRoutes");
const currencyRoutes = require("./routes/currencyRoutes");
const soapRoutes = require("./routes/soapRoutes");

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/iss", issRoutes);
app.use("/api/currency", currencyRoutes);
app.use("/api/soap", soapRoutes);
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});