const express = require("express");
const db = require("./db");
const router = express.Router();

router.get("/", (_, response) => {
  db.all("SELECT * FROM Friends", (err, rows) => {
    response.send(rows);
  });
});

/*
* Treat activity and type as mutable data
* Treat name and email as immutable data
* */
router.put("/:friendId", (request, response) => {
  /** Step 3: Persist updated friend data to the database here.
   * For reference:
   * https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback
   */
  console.log("PUT");
  console.log(request.body);

  db.run("UPDATE Friends SET activity = $activity, type = $type WHERE id = $id", { $activity: request.body.activity, $type: request.body.type, $id: request.body.id});

});

module.exports = router;
