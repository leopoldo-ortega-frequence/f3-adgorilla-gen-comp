export class GenChart {
  constructor(_selector, _data, _width, _height) {
    this.selector = _selector;
    this.data = _data;
    this.width = _width;
    this.height = _height;
    this.genNames = [
      "Greatest Generation",
      "Baby Boomers",
      "Generation X",
      "iGen",
    ];
    this.breakpoints = [1945, 1964, 1982, new Date().getFullYear() - 18];
    this.init();
  }

  init() {
    this.xValue = (d) => d.year;

    this.yValue = (d) => d.value;
    this.color = d3
      .scaleOrdinal()
      .range(["primary", "secondary", "tertiary", "quaternary"]);

    this.xScale = d3
      .scaleTime()
      .domain(d3.extent(this.data, this.xValue))
      .range([0, this.width]);
    this.yScale = d3.scaleLinear().domain([0, 100]).range([this.height, 0]);

    this.graphG = this.selector
      .append("g")
      .attr("class", "population-container")
      .attr("transform", "translate(25,0)");

    this.xAxis = d3.axisBottom(this.xScale).ticks(6).tickPadding(15);
    this.yAxis = d3.axisLeft(this.yScale).tickPadding(10);
    this.xAxisG = this.graphG
      .append("g")
      .call(this.xAxis)
      .attr("transform", `translate(0,${this.height})`);
    this.yAxisG = this.graphG
      .append("g")
      .attr("class", "y-axis")
      .call(this.yAxis);

    this.areaGenerator = d3
      .area()
      .x((d) => this.xScale(this.xValue(d)))
      .y0(this.height)
      .y1((d) => this.yScale(this.yValue(d)))
      .curve(d3.curveBasis);

    //.attr("d", this.areaGenerator(this.data));

    this.updateData(this.data);
  }

  updateData(newData) {
    // will need to manipulate data here

    //console.log(newData);
    this.formattedData = [];
    for (let name of this.genNames) {
      let newObj = {};
      newObj[name] = {
        values: [],
      };
      this.formattedData.push(newObj);
    }

    for (let i of newData) {
      let year = i.year;
      for (let x = 0; x < this.breakpoints.length; x++) {
        if (year <= this.breakpoints[x]) {
          this.formattedData[x][this.genNames[x]].values.push({
            year: year,
            value: i.value,
          });
          break;
        }
      }
    }
    //this.updateVis(newData);
    this.updateVis(this.formattedData);
  }

  updateVis(data) {
    this.t = d3.transition().duration(750);

    this.dataCall = this.graphG
      .selectAll(".population-data")
      .data(data, (d, i) => d[this.genNames[i]]);
    this.enterG = this.dataCall
      .enter()
      .append("g")

      .attr("class", "population-data")
      .merge(this.dataCall);

    //this.path.selectAll("d").transition(this.t);
    this.enterClip = this.enterG.selectAll(".line-data").data(
      (d, i) => d[this.genNames[i]].values,
      (d, i) => d[this.genNames[i]]
    );
    this.enterLines = this.enterClip.enter().merge(this.enterClip);

    // const clips = this.enterClip.append("text").text((d, i) => {
    //   console.log(d, i);
    //   return d.value;
    // });

    this.path = this.enterG
      .append("path")
      .attr(
        "class",
        (d, i) => `population-data fill-${this.color(d[this.genNames[i]])}`
      );
    this.path
      .transition(this.t)
      .attr("d", (d, i) => this.areaGenerator(d[this.genNames[i]].values))
      .transition(this.t);

    const clips = this.enterLines
      .append("line")
      .style("stroke", "#fff")
      .attr("fill", "none")
      .attr("class", "population-data")
      .style("stroke-width", 0.5)
      .attr("y1", (d) => this.yScale(d.value) - 30)
      .attr("x1", (d) => this.xScale(d.year))
      .attr("y2", this.height)
      .attr("x2", (d) => this.xScale(d.year));

    this.enterClip.exit().remove();
    this.dataCall.exit().remove();
  }
}
