export class DwellingChart {
  constructor(_selector, _data, _width, _height) {
    this.selector = _selector;
    this.data = _data;
    this.width = _width;
    this.height = _height;

    this.init();
  }

  init() {
    this.color = d3
      .scaleOrdinal()
      .range(["primary", "secondary", "tertiary", "quaternary"]);

    // dwelling title
    this.selector
      .append("text")
      .text("Dwelling Profile")
      .attr("x", this.width / 2)
      .attr("text-anchor", "end")
      .attr("y", 20)
      .attr("font-weight", "bold")
      .attr("font-size", "1.6rem");

    // advertiser
    this.selector
      .append("text")
      .text("Prepared for Best Buy")
      .attr("x", this.width)
      .attr("y", this.height - 30)
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .attr("font-size", "1rem")
      .attr("class", "fill-primary");

    // house svg
    this.img = this.selector
      .append("svg:image")
      .attr("xlink:href", "./assets/house.svg")
      .attr("width", 180)
      .attr("height", 180)
      .attr("x", this.width / 4)
      .attr("y", 45);

    //this.updateData(this.data);
  }

  updateData(newData) {
    this.updateVis(newData);
  }

  updateVis(data) {
    this.dataCall = this.selector
      .selectAll(".dwelling-data")
      .data(data, (d) => d.name);
    this.enterG = this.dataCall
      .enter()
      .append("g")
      .attr("class", "dwelling-data")
      .merge(this.dataCall);

    this.enterG
      .append("text")
      .attr("class", "dwelling-data")
      .attr("font-size", "14px")
      .attr("x", (d, i) => i * 250 + 10)
      .attr("y", 110)
      .text((d) => d.name);

    this.enterG
      .append("text")
      .attr("x", (d, i) => i * 260 + 20)
      .attr("y", 80)
      .attr("font-weight", "bold")
      .attr("font-size", "1.8rem")
      .attr("class", (d) => `dwelling-data fill-${this.color(d.name)}`)
      .text((d) => `${d.value}%`);

    this.dataCall.exit().remove();
  }
}
