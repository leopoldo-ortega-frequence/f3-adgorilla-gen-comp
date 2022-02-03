const {
  select,
  max,
  csv,
  area,
  extent,
  scaleTime,
  scaleLinear,
  axisLeft,
  axisBottom,
  curveBasis,
  format,
} = d3;
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

  d3.json("data/population.json").then((data) => {
    data.forEach((d) => {
      d.values.forEach((x) => {
        x.year = +x.year;
        x.population = +x.population;
      });
    });

    const xValue = (d) => d.year;
    const colorValue = (d) => d.category;
    const yValue = (d) => d.population;
    const color = d3
      .scaleOrdinal()
      .range(["#e89a41", "#99273a", "#cb673d", "#54354a", "#f0f2f1"]);

    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, WIDTH])
      // enables the table to have data padding to look nicer where data isn't on the edges.
      .nice();

    const yScale = scaleLinear()
      .domain([0, max(data, yValue) + 20])
      .range([HEIGHT, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    data.forEach((x) => {
      const categoryName = x.category;
      const graphData = x.values;
      console.log(categoryName);
      console.log(graphData);
      const xValue = (d) => d.year;
      const colorValue = (d) => d.category;
      const yValue = (d) => d.population;

      const areaGenerator = area()
        .x((d) => xScale(xValue(d)))
        .y0(HEIGHT)
        .y1((d) => yScale(yValue(d)))
        .curve(curveBasis);

      g.append("path")
        .attr("class", "line_path")
        .attr("fill", color(colorValue))
        .attr("d", areaGenerator(data));

      const xAxis = axisBottom(xScale)
        .ticks(6)
        .tickSize(-HEIGHT)
        .tickPadding(15);

      const yAxisTickFormat = (number) =>
        format(".1s")(number).replace("G", "B");

      const yAxis = axisLeft(yScale);
      //.tickSize(-WIDTH)
      //.tickPadding(10)
      //.tickFormat(yAxisTickFormat);

      const yAxisG = g.append("g").call(yAxis);
      yAxisG.selectAll(".domain").remove();

      yAxisG
        .append("text")
        .attr("class", "axis-label")
        .attr("y", -70)
        .attr("x", -HEIGHT / 2)
        .attr("fill", "black")
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text(yAxisLabel);

      g.append("g")
        .call(yAxis) //a function that is invoked in the select.
        .selectAll(".domain") //removes tick like and y axis line
        .remove();

      const xAxisG = g
        .append("g")
        .call(xAxis) //a function that is invoked in the select.
        .attr("transform", `translate(0,${innerHeight})`);

      xAxisG
        .select(".domain") //removes x axis line
        .remove();
      xAxisG
        .append("text")
        .attr("class", "axis-label")
        .text(xAxisLabel)
        .attr("y", 75)
        .attr("x", WIDTH / 2)
        .attr("fill", "black");

      svg
        .append("text")
        .attr("class", "axis-title")
        .text(title)
        .attr("y", 45)
        .attr("x", WIDTH / 2);
    });
  });
};

export { drawGenGraph };
