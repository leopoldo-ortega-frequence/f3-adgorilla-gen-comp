export class DeviceData {
  constructor(max, numCount, keys) {
    this.max = max;
    this.numCount = numCount;
    this.keys = keys;
  }

  get data() {
    return this.generate(this.max, this.numCount, this.keys);
  }
  randombetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generate(max, numCount, keys) {
    var r = [];
    const newData = [];
    var currsum = 0;
    for (var i = 0; i < numCount - 1; i++) {
      r[i] = this.randombetween(1, max - (numCount - i - 1) - currsum);
      currsum += r[i];
    }
    r[numCount - 1] = max - currsum;

    for (let i = 0; i < keys.length; i++) {
      let newObj = {};
      newObj["name"] = keys[i];
      newObj["value"] = r[i];
      newData.push(newObj);
    }
    return newData;
  }
}

export const generatePopData = (max, year) => {
  const data = [];
  let maxSum = 0;
  const currDate = new Date().getFullYear() - 18;
  for (let i = 0; i < currDate - +year; i++) {
    let obj = {};
    obj.year = currDate - i;
    obj.value = Math.ceil(Math.random() * max + 40);
    data.push(obj);
  }
  data.forEach((x) => {
    maxSum += x.value;
  });
  data.forEach((x) => {
    x.maxSum = maxSum;
  });

  return data;
};

export const colors = [
  {
    primary: "#e89a41",
    secondary: "#cb673d",
    tertiary: "#99273a",
    quaternary: "#54354a",
  },
  {
    primary: "#fd7f6f",
    secondary: "#7eb0d5",
    tertiary: "#b2e061",
    quaternary: "#bd7ebe",
  },
  {
    primary: "#b04238",
    secondary: "#df8879",
    tertiary: "#a4a2a8",
    quaternary: "#b3bfd1",
  },
  {
    primary: "#e27c7c",
    secondary: "#6d4b4b",
    tertiary: "#333333",
    quaternary: "#466964",
  },
  {
    primary: "#e27d60",
    secondary: "#84cdca",
    tertiary: "#e8a87c",
    quaternary: "#c38d9e",
  },
];
