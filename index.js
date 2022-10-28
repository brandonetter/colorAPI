const express = require("express");
const app = express();
const { showColors } = require("./color.js");
app.use("/color/:r/:g/:b", (req, res) => {
  let { r, g, b } = req.params;
  r = Number(r);
  g = Number(g);
  b = Number(b);
  if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
    let ob = showColors([r, g, b], true);
    res.json([ob]);
  } else {
    res.json(
      "Error: must be in format /colors/{RED VALUE 0-255}/{GREEN VALUE 0-255}/{BLUE VALUE 0-255}"
    );
  }
});
app.use("/color/:hex", (req, res) => {
  let reg = /^[0-9A-F]{6}$/i;
  if (reg.test(req.params.hex)) {
    let ob = showColors(req.params.hex);
    res.json([ob]);
  } else {
    res.json(
      "Error: must be in format /colors/{HEX VALUE WITHOUT # i.e. AAEE8E"
    );
  }
});

app.listen(10000);
