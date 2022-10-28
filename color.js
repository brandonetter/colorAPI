function showColors(v, rgb = null) {
  if (!rgb) {
    [h, s, l] = convertColor(v);
  } else {
    [h, s, l] = toHSL(v[0], v[1], v[2]);
  }
  let colorOb = {
    complement: null,
    analogous: [],
    triad: [],
    monochromatic: [],
    closewalk: [],
  };
  let complementH = h + 180;
  complementH %= 360;

  close2H = h + 30;
  close2H %= 360;
  close3H = h - 30;
  close3H %= 360;
  triad1 = (h + 120) % 360;
  triad2 = (h - 120) % 360;
  console.log(l, "l");
  monoL1 = Math.round(l > 50 ? l * 0.82 : l * 1.18);
  monoL2 = Math.round(l > 50 ? l * 0.64 : l * 1.36);

  closewalk1H = h + 15;
  closewalk1H %= 360;
  closewalk2H = h + 30;
  closewalk2H %= 360;
  colorOb.complement = {
    hsl: `hsl(${complementH},${s}%,${l}%)`,
    hex: hslToHex(complementH, s, l),
  };
  colorOb.analogous = [
    { hsl: `hsl(${close2H},${s}%,${l}%)`, hex: hslToHex(close2H, s, l) },
    { hsl: `hsl(${close3H},${s}%,${l}%)`, hex: hslToHex(close3H, s, l) },
  ];
  colorOb.triad = [
    { hsl: `hsl(${triad1},${s}%,${l}%)`, hex: hslToHex(triad1, s, l) },
    { hsl: `hsl(${triad2},${s}%,${l}%)`, hex: hslToHex(triad2, s, l) },
  ];
  colorOb.monochromatic = [
    { hsl: `hsl(${h},${s}%,${monoL1}%)`, hex: hslToHex(h, s, monoL1) },
    { hsl: `hsl(${h},${s}%,${monoL2}%)`, hex: hslToHex(h, s, monoL2) },
  ];
  colorOb.closewalk = [
    {
      hsl: `hsl(${closewalk1H},${s}%,${monoL1}%)`,
      hex: hslToHex(closewalk1H, s, monoL1),
    },
    {
      hsl: `hsl(${closewalk2H},${s}%,${monoL2}%)`,
      hex: hslToHex(closewalk2H, s, monoL2),
    },
  ];
  return colorOb;
}
function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
function convertColor(v) {
  let r = parseInt(v.slice(0, 2), 16);
  let g = parseInt(v.slice(2, 4), 16);
  let b = parseInt(v.slice(4, 6), 16);

  return toHSL(r, g, b);
}
function toHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta) {
    switch (cmax) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
  }
  h = Math.round(h * 60);
  h < 60 && (h = h + 360);

  l = (cmax + cmin) / 2;

  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}
module.exports.showColors = showColors;
