// data imports
import { DeviceData, generatePopData } from "./data.js";

// graphs imports

import { DeviceChart } from "./graphs/deviceChart.js";
import { DwellingChart } from "./graphs/dwellingChart.js";
import { GenChart } from "./graphs/genChart.js";

// global variables
let deviceData;
let dwellingData;
let populationData;

const MARGIN = { top: 30, right: 20, bottom: 30, left: 10 };
const WIDTH = 768;
const HEIGHT = 768;
const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

// global scales
const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

const svg = d3
  .select("#slide-content")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT);
const g = svg
  .append("g")
  .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`);
// create lines for the graph separation
g.append("line")
  .attr("class", "stroke-dark")
  .style("stroke-width", 2)
  .attr("y1", innerHeight - 280)
  .attr("x1", MARGIN.left)
  .attr("y2", innerHeight - 280)
  .attr("x2", innerWidth);

// bottom vertical line
g.append("line")
  .attr("class", "stroke-dark")
  .style("stroke-width", 2)
  .attr("x1", innerWidth / 2)
  .attr("y1", innerHeight - 250)
  .attr("x2", innerWidth / 2)
  .attr("y2", innerHeight);

// g element for each graph
const genG = g
  .append("g")
  .attr("class", "gen-graph-container")
  .attr("transform", `translate(0,0)`);
const deviceG = g
  .append("g")
  .attr("class", "device-graph-container")
  .attr("transform", `translate(0,${innerHeight - 250})`);
const dwellingG = g
  .append("g")
  .attr("class", "dwelling-graph-container")
  .attr("transform", `translate(${innerWidth / 2},${innerHeight - 250})`);

//drawDwellingGraph();

//
function createData() {
  let newData = new DeviceData(100, 3, ["desktop", "smart phone", "tablet"]);
  deviceData = newData.data;
  newData = new DeviceData(100, 2, ["Rents Home/Apartment", "Owns Home/Condo"]);
  dwellingData = newData.data;
  populationData = generatePopData(20, "1930");
}
createData();
const deviceChart = new DeviceChart(deviceG, deviceData, innerWidth / 2, 300);
const genChart = new GenChart(genG, populationData, innerWidth - 40, 408);
const dwellingChart = new DwellingChart(
  dwellingG,
  dwellingData,
  innerWidth / 2,
  300
);

// function drawGraphs() {
//   // call the graphs here
//   drawDeviceGraph(deviceG, {
//     data: deviceData,
//     width: innerWidth / 2,
//     height: 300,
//   });
// }

setInterval(() => {
  createData();
  deviceChart.updateData(deviceData);
  dwellingChart.updateData(dwellingData);
  genChart.updateData(populationData);
}, 1000);

// call data creation function
// createData();
// // invoke the drawGrpah function
// drawGraphs();
