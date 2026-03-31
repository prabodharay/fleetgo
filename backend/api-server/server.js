
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("FleetGo API running");
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});
