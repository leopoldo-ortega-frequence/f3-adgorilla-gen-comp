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
  const currDate = new Date().getFullYear() - 18;
  for (let i = 0; i < currDate - +year; i++) {
    let obj = {};
    obj.year = currDate - i;
    obj.value = Math.ceil(Math.random() * max + 40);
    data.push(obj);
  }
  return data;
};
