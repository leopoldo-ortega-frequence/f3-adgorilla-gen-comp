// file to generate device usage pie chart
const drawDeviceGraph = () => {
  const container = document.getElementById("slide-content");
  const width = container.clientWidth / 2,
    height = 300,
    radius = Math.min(width, height) / 2.5;

  const color = d3
    .scaleOrdinal()
    .range(["#e89a41", "#99273a", "#cb673d", "#54354a", "#f0f2f1"]);

  const arc = d3
    .arc()
    .outerRadius(radius - 20) // chops offf outer circle
    .innerRadius(radius - 50); // chops off innrer circle, use this to convert pie chart to donut

  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.usage);

  const svg = d3
    .select("#slide-content")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr(
      "transform",
      "translate(0," + (container.clientHeight - height) + ")"
    );

  svg
    .append("text")
    .text("Device Usage")
    .attr("x", 60)
    .attr("y", 20)
    .attr("font-size", "1.6rem")
    .attr("font-weight", "bold");

  const g = svg
    .append("g")
    .attr("transform", "translate(" + 120 + "," + height / 2 + ")");

  g.append("image")
    .attr(
      "xlink:href",
      "https://s3.amazonaws.com/brandcdn-assets/partners/frequence/proposal-v2/img/icon-devices.png"
    )
    .attr("x", -36)
    .attr("y", -30);

  const legend = g.append("g").attr("transform", `translate(${140}, ${-50})`);

  d3.csv("data/device.csv").then((data) => {
    data.forEach((d) => {
      d.usage = +d.usage;
    });
    //   data.forEach((d, i) => {
    //     console.log(d);
    //     console.log(i);
    //   });
    data.forEach((d, i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 45})`);

      legendRow
        .append("rect")
        .attr("width", 30)
        .attr("height", 30)
        .attr("fill", color(d.usage));

      legendRow
        .append("text")
        .attr("x", 40)
        .attr("y", 20)
        .attr("text-anchor", "start")
        .text(`${d.usage}% ${d.device}`);
    });
    g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .append("path")
      .attr("d", arc)
      .style("fill", (d) => color(d.data.usage));
  });
};

export { drawDeviceGraph };
