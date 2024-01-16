

const authuser=require('../Routers/authRoutes');

class RoutesLoader {
  static initRoutes(app) {

    app.use("/auth",authuser);
    app.use("/", async (req, res) => {
      res.status(404).send("No such route found in the API.");
    });
  }
}

module.exports = { RoutesLoader };
