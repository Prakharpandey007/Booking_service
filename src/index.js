const express = require("express");
const app = express();
const { PORT,FLIGHT_SERVICE_PATH } = require("./config/serverconfig");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");
const db = require("./models/index");
const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);

    if (process.env.DB_SYNC) {
      db.sequelize.sync({
        alter: true,
      });
    }
    console.log(FLIGHT_SERVICE_PATH);
  });
};
setupAndStartServer();
