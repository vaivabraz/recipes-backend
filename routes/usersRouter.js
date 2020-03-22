const express = require("express");

function routes(User) {
  const usersRouter = express.Router();
  usersRouter.route("/user/:username").get((req, res) => {
    const query = {};
    query.username = req.params.username;
    User.findOne(query, (err, user) => {
      if (err) {
        return res.send(err);
      }
      return res.json(user);
    });
  });
  return usersRouter;
}

module.exports = routes;
