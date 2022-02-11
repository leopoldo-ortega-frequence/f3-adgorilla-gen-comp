// data imports
import { DeviceData, generatePopData, colors } from "./data.js";

// graphs imports

import { DeviceChart } from "./graphs/deviceChart.js";
import { DwellingChart } from "./graphs/dwellingChart.js";
import { GenChart } from "./graphs/genChart.js";

// global variables
let deviceData;
let dwellingData;
let populationData;

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// handle color tool here
const colorTool = document.querySelector("#color-tool");
const colorList = document.querySelector("#color-list");

// populate the list with the colors
const ul = document.createElement("ul");
// create custom color picker
const li = document.createElement("li");
const option1 = document.createElement("input");
option1.type = "color";
option1.value = "#e89a41";
option1.classList.add("primary-picker");
const option2 = document.createElement("input");
option2.type = "color";
option2.value = "#cb673d";
option2.classList.add("secondary-picker");
const option3 = document.createElement("input");
option3.type = "color";
option3.value = "#99273a";
option3.classList.add("tertiary-picker");
const option4 = document.createElement("input");
option4.type = "color";
option4.value = "#54354a";
option4.classList.add("quaternary-picker");
li.appendChild(option1);
li.appendChild(option2);
li.appendChild(option3);
li.appendChild(option4);
ul.appendChild(li);
colors.forEach((d, i) => {
  const li = document.createElement("li");
  li.classList.add("color-option");
  const button1 = document.createElement("button");
  button1.classList.add("color-box");
  button1.style.backgroundColor = d.primary;
  button1.value = i;
  const button2 = document.createElement("button");
  button2.classList.add("color-box");
  button2.style.backgroundColor = d.secondary;
  button2.value = i;
  const button3 = document.createElement("button");
  button3.classList.add("color-box");
  button3.style.backgroundColor = d.tertiary;
  button3.value = i;
  const button4 = document.createElement("button");
  button4.classList.add("color-box");
  button4.style.backgroundColor = d.quaternary;
  button4.value = i;
  li.appendChild(button1);
  li.appendChild(button2);
  li.appendChild(button3);
  li.appendChild(button4);
  ul.appendChild(li);
});
colorList.appendChild(ul);
colorTool.addEventListener("click", (e) => {
  colorList.classList.toggle("active");
});
colorList.addEventListener("click", (e) => {
  if (e.target.classList.contains("color-box")) {
    const newColors = colors[e.target.value];
    console.log(newColors);
    document.documentElement.style.setProperty(
      "--color-primary",
      `${newColors.primary}`
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      `${newColors.secondary}`
    );
    document.documentElement.style.setProperty(
      "--color-tertiary",
      `${newColors.tertiary}`
    );
    document.documentElement.style.setProperty(
      "--color-quaternary",
      `${newColors.quaternary}`
    );
  }
});
/* --color-primary: #e89a41;
  --color-secondary: #cb673d;
  --color-Tertiary: #99273a;
  --color-Quaternary: */

document.querySelector(".primary-picker").addEventListener("input", (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty("--color-primary", `${color}`);
});
document.querySelector(".secondary-picker").addEventListener("input", (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty("--color-secondary", `${color}`);
});
document.querySelector(".tertiary-picker").addEventListener("input", (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty("--color-tertiary", `${color}`);
});
document.querySelector(".quaternary-picker").addEventListener("input", (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty("--color-quaternary", `${color}`);
});
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
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
}, 1600);

// call data creation function
// createData();
// // invoke the drawGrpah function
// drawGraphs();
