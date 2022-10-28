const express = require("express");
const app = express();
const { showColors } = require("./color.js");
app.use("/color/:r/:g/:b", (req, res) => {
  let ob = showColors([req.params.r, req.params.g, req.params.b], true);
  res.json(ob);
});
app.use("/color/:hex", (req, res) => {
  let ob = showColors(req.params.hex);
  res.json(ob);
});

app.listen(3000);
