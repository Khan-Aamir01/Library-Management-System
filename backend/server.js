const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db.js");
const bookRoutes = require("./routes/bookRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const borrowRoutes = require("./routes/borrowRoutes.js");
const fineRoutes = require("./routes/fineRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

const app = express();
connectDb();

require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/api/books", bookRoutes);
app.use("/api", userRoutes);
app.use("/api", borrowRoutes);
app.use("/api", fineRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Home Route");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is Running on port http://localhost:${port}`);
});
