const text = (svg, txt, attributes) => {
  txt = svg.append("text").text(txt);
  return attr(txt, attributes);
};

const attr = (svg, attributes) => {
  for (let i in attributes) {
    svg.attr(i, attributes[i]);
  }
  return svg;
};

export default { text, attr };
