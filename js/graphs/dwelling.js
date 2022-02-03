const drawDwellingGraph = () => {
  const container = document.getElementById("slide-content");
  // need to do this to rdender the house svg

  const width = container.clientWidth / 2,
    height = 300;

  const svg = d3
    .select("#slide-content")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", `translate(${0},420)`);

  const g = svg.append("g").attr("transform", `translate(30,0)`);

  const color = d3
    .scaleOrdinal()
    .range(["#e89a41", "#99273a", "#cb673d", "#54354a", "#f0f2f1"]);

  // dwelling title
  svg
    .append("text")
    .text("Dwelling Profile")
    .attr("x", width / 4 - 40)
    .attr("y", 20)
    .attr("font-weight", "bold")
    .attr("font-size", "1.6rem");

  // advertiser
  svg
    .append("text")
    .text("Prepared for Best Buy")
    .attr("x", width - 40)
    .attr("y", height - 20)
    .attr("font-weight", "bold")
    .attr("text-anchor", "end")
    .attr("font-size", "1rem")
    .attr("fill", "#e89a41");

  // house svg
  var img = g
    .append("svg:image")
    .attr("xlink:href", "./assets/house.svg")
    .attr("width", 200)
    .attr("height", 200)
    .attr("x", width / 4)
    .attr("y", 40);

  d3.csv("data/dwelling.csv").then((data) => {
    data.forEach((d) => {
      d.percentage = +d.percentage;
    });
    data.forEach((d, i) =>
      g
        .append("text")
        .attr("x", i * 250)
        .attr("y", 110)
        .text(d.dwelling)
    );
    data.forEach((d, i) =>
      g
        .append("text")
        .attr("x", i * 260 + 20)
        .attr("y", 80)
        .attr("font-weight", "bold")
        .attr("font-size", "1.8rem")
        .attr("fill", color(d.percentage))
        .text(`${d.percentage}%`)
    );
  });
};

export { drawDwellingGraph };
