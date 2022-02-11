import { genPaths } from "../paths.js";
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
    this.parseDate = d3.timeParse("%Y");
    this.init();
  }

  init() {
    this.xValue = (d) => d.year;

    this.yValue = (d) => d.value;
    this.color = d3
      .scaleOrdinal()
      .range(["primary", "secondary", "tertiary", "quaternary"]);

    this.xScale = d3
      .scaleLinear()
      .domain(d3.extent(this.data, this.xValue))
      .range([0, this.width]);
    this.yScale = d3.scaleLinear().domain([0, 100]).range([this.height, 0]);

    this.graphG = this.selector
      .append("g")
      .attr("class", "population-container")
      .attr("transform", "translate(25,0)");

    this.xAxis = d3
      .axisBottom(this.xScale)
      .ticks()
      .tickPadding(15)
      .tickFormat((d, i) => {
        return d;
      });
    //.tickFormat(d3.timeFormat("%Y"));

    this.yAxis = d3.axisLeft(this.yScale).tickPadding(10);

    this.xAxisG = this.graphG
      .append("g")
      .attr("class", "x-axis-G")
      .call(this.xAxis)
      .attr("transform", `translate(0,${this.height - 15})`)
      .select(".domain")
      .remove();
    this.yAxisG = this.graphG
      .append("g")
      .attr("class", "y-axis")
      .call(this.yAxis);

    //title
    this.selector
      .append("text")
      .attr("x", 20)
      .attr("y", 10)
      .attr("font-weight", "bold")
      .attr("font-size", "1.6rem")
      .text("General Composition");

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
    newData.forEach((d) => {
      d.year = this.parseDate(d.year);
    });

    this.formattedData = [];
    for (let name of this.genNames) {
      let newObj = {};
      newObj[name] = {
        values: [],
      };
      this.formattedData.push(newObj);
    }

    for (let i of newData) {
      let year = new Date(i.year).getFullYear();

      for (let x = 0; x < this.breakpoints.length; x++) {
        if (year <= this.breakpoints[x]) {
          this.formattedData[x][this.genNames[x]].values.push({
            year: year,
            value: i.value,
            maxSum: i.maxSum,
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

    this.enterClip = this.enterG.selectAll(".line-data").data(
      (d, i) => d[this.genNames[i]].values,
      (d, i) => d[this.genNames[i]]
    );
    this.enterLines = this.enterClip.enter().merge(this.enterClip);

    this.rectG = this.enterG
      .append("g")
      .attr("class", `gen-rect population-data`)
      .attr("transform", (d, i) => {
        let subtractXVal = d[this.genNames[i]].values.length * 7;
        let midYIdx = d[this.genNames[i]].values;
        let subtractYVal = midYIdx[Math.floor(midYIdx.length / 2)];

        return `translate(${this.xScale(this.breakpoints[i]) - subtractXVal}, ${
          this.yScale(subtractYVal.value) / 3
        })`;
      });
    this.rect = this.rectG
      .append("rect")
      .attr(
        "class",
        (d, i) => ` population-data fill-${this.color(d[this.genNames[i]])}`
      )
      .attr("width", 80)
      .attr("height", 60);

    this.rectText = this.rectG
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", 40)
      .attr("y", 30)
      .attr("fill", "#fff")
      .attr("font-weight", "bold")
      .text((d, i) => {
        let sum = 0;
        d[this.genNames[i]].values.forEach((x) => {
          sum += x.value;
        });

        return `${((sum / d[this.genNames[i]].values[0].maxSum) * 100).toFixed(
          2
        )}%`;
      });

    this.path = this.enterG
      .append("path")
      .attr(
        "class",
        (d, i) => `population-data fill-${this.color(d[this.genNames[i]])}`
      );
    this.areaPath = this.path
      .transition(this.t)
      .attr("d", (d, i) => this.areaGenerator(d[this.genNames[i]].values))
      .transition(this.t);
    //this.Bbox = this.areaPath.getTotalLength();

    this.clips = this.enterLines
      .append("line")
      .style("stroke", "#fff")
      .attr("fill", "none")
      .attr("class", "population-data")
      .style("stroke-width", 0.3)
      .attr("y1", (d) => this.yScale(d.value) - 18)
      .attr("x1", (d) => this.xScale(d.year))
      .attr("y2", this.height)
      .attr("x2", (d) => this.xScale(d.year));

    this.graphBottom = this.enterG
      .append("g")
      .attr("class", `gen-bottom population-data`)
      .attr("transform", (d, i) => {
        let subtractXVal = d[this.genNames[i]].values.length * 5.5;
        return `translate(${this.xScale(this.breakpoints[i]) - subtractXVal},${
          this.height - 70
        })`;
      });
    this.img = this.graphBottom
      .append("path")
      .attr("fill", "#fff")
      .attr("d", (d, i) => {
        return genPaths[this.genNames[i]][0];
      });
    this.imgText = this.graphBottom
      .append("text")
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("y", 60)
      .attr("x", 20)
      .text((d, i) => this.genNames[i]);
    this.enterClip.exit().remove();
    this.dataCall
      .exit()

      .remove();
  }
}
