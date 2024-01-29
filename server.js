/**
 * Server - Author: INovomiast
 */

const express = require("express");
const fs = require("fs");
const database = require("./lib/connection");
const Assistant = require("./models/Assistant");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  if (req.headers.authorization) {
    return res.send({ Hello: "World" });
  }
  return res.send({ Authorization: "Invalid auth token!" }).status(401);
});

app.get("/download/:ticket_id", async (req, res) => {
  await database.connectDB();
  const assistant = await Assistant.find({ assistantId: req.params.ticket_id });

  if (assistant.length === 0) {
    return res.send({ Ticket: "Not found!" }).status(404);
  }

  if (assistant) {
    try {
      const file_path = `./uploads/ticket_${req.params.ticket_id}.pdf`;
      if (!fs.existsSync(file_path)) {
        res.send({ File: "Not found!" }).status(404);
        return;
      }
      const fileStream = fs.createReadStream(file_path);
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="ticket_' + req.params.ticket_id + '.pdf"'
      );
      fileStream.once("end", () => {
        setImmediate(() => {
          return res.send(window.close());
        });
      });
      fileStream.pipe(res);
    } catch (error) {}
  }

});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
