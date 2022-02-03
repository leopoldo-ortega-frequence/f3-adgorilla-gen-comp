import { genPaths } from "../paths.js";
const drawGenGraph = () => {
  const container = document.getElementById("slide-content");
  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    WIDTH = container.clientWidth - margin.left - margin.right,
    HEIGHT = container.clientHeight - 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#slide-content")
    .append("svg")
    .attr("width", WIDTH + margin.left + margin.right)
    .attr("height", HEIGHT + margin.top + margin.bottom)
    .attr("transform", "translate(0,-340)");
  const g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  svg
    .append("text")
    .attr("transform", "translate(60,100)")
    .attr("font-size", "1.6rem")
    .attr("font-weight", "bold")
    .text("Generation Composites");
  const color = d3
    .scaleOrdinal()
    .range(["#e89a41", "#99273a", "#cb673d", "#54354a", "#f0f2f1"]);

  d3.json("data/population.json").then((data) => {
    data.forEach((d) => {
      d.year = +d.year;
      d.population = +d.population;
    });
    // define x scale, name of series
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, WIDTH])
      .paddingInner(0.02)
      .paddingOuter(0.1);

    // define y scale, number of views
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.population) + 20])
      .range([HEIGHT, 0]);

    // call the x scale
    const xAxisCall = d3
      .axisBottom(xScale)
      .tickValues(xScale.domain().filter((d) => !(d % 10)));
    g.append("g")
      .attr("transform", `translate(0,${HEIGHT})`)
      .call(xAxisCall)
      .selectAll("text")
      .attr("y", 10)
      .attr("x", -5)
      .attr("text-anchor", "end")
      .classed("tick-label", true);

    // call the yscale
    // const yAxisCall = d3.axisLeft(yScale);
    // g.append("g").call(yAxisCall).classed("tick-label", true);

    // create y-axis label
    g.append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Total Hours Viewed");

    // create the rectangle
    const rect = g.selectAll("rect").data(data);

    rect
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.year))
      .attr("y", (d) => yScale(d.population))
      .attr("width", xScale.bandwidth)
      .attr("height", (d) => HEIGHT - yScale(d.population))
      .attr("fill", (d) => color(d.category));

    // draw the svg icons
    const greatestGenG = g
      .append("g")
      .attr("fill", "white")
      .attr("transform", "translate(72,310)");
    greatestGenG.append("path").attr("d", genPaths.greatestGen);
    greatestGenG
      .append("text")
      .text("Greatest Generation")
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("transform", "translate(10,50)");
    const babyBoomersG = g
      .append("g")
      .attr("fill", "white")
      .attr("transform", "translate(260,310)");
    babyBoomersG.append("path").attr("d", genPaths.babyBoomers);
    babyBoomersG
      .append("text")
      .text("Baby Boomers")
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("transform", "translate(10,50)");
    const genXG = g
      .append("g")
      .attr("fill", "white")
      .attr("transform", "translate(470,310)");
    genXG.append("path").attr("d", genPaths.genX);
    genXG
      .append("text")
      .text("Generation X")
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("transform", "translate(10,50)");
    const millenialsG = g
      .append("g")
      .attr("fill", "white")
      .attr("transform", "translate(730,310)");
    millenialsG.append("path").attr("d", genPaths.millenials);
    millenialsG
      .append("text")
      .text("Millenials")
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("transform", "translate(10,50)");
  });
};

export { drawGenGraph };
