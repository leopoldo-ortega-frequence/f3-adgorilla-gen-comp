const genPaths = {
  "Greatest Generation": [
    "M31.37,7.15H28.86a10.49,10.49,0,0,1-3.23-.61L18,2.24a1.65,1.65,0,0,0,.12-0.61,1.63,1.63,0,1,0-1.63,1.63,1.61,1.61,0,0,0,1-.34L22,6.34c0.81,0.45.72,0.81-.21,0.81H2A1.8,1.8,0,0,0,0,9V26.18a1.86,1.86,0,0,0,2,1.9h2a0.56,0.56,0,0,1,.57.56,2,2,0,1,0,4.05,0,0.57,0.57,0,0,1,.57-0.56h15a0.56,0.56,0,0,1,.56.56,2,2,0,1,0,4.06,0,0.56,0.56,0,0,1,.57-0.56h2a2,2,0,0,0,2.1-1.9V9a1.93,1.93,0,0,0-2.1-1.82h0Zm-20.8,18a7.59,7.59,0,1,1,7.61-7.59,7.6,7.6,0,0,1-7.61,7.59h0ZM21.76,9.66h6.7a1.67,1.67,0,0,1,1.68,1.67A1.48,1.48,0,0,1,29,13H27.39l1.52-1.06a0.69,0.69,0,1,0-.79-1.14L25,13h-3.2a1.67,1.67,0,0,1,0-3.35h0Zm0.48,15.5a2,2,0,1,1,2-2,2,2,0,0,1-2,2h0Zm6.09,0a2,2,0,1,1,2-2,2,2,0,0,1-2,2h0Zm0,0",
  ],
  "Baby Boomers": [
    "M18.2,0a18.2,18.2,0,1,0,18.2,18.2A18.2,18.2,0,0,0,18.2,0h0ZM5.06,19.48H4.3a16.58,16.58,0,0,1,4-10.8L8.83,9.21A15.83,15.83,0,0,0,5.06,19.48h0Zm2.64,0H6.95a14,14,0,0,1,3.22-8.92l0.54,0.54a13.19,13.19,0,0,0-3,8.39h0Zm10.5,5.95a7.22,7.22,0,1,1,7.22-7.22,7.22,7.22,0,0,1-7.22,7.22h0ZM26,26a13.2,13.2,0,0,0,3-8.39h0.76a14,14,0,0,1-3.22,8.92Zm2.41,2.41-0.53-.54a15.83,15.83,0,0,0,3.77-10.26h0.76a16.58,16.58,0,0,1-4,10.8h0ZM20.64,18.2a2.44,2.44,0,1,1-2.44-2.44,2.44,2.44,0,0,1,2.44,2.44h0Zm0,0",
  ],
  "Generation X": [
    "M32.2,0H30.59A2.68,2.68,0,0,0,28.5,1.27l-2.23,3.9A2.43,2.43,0,0,1,24,6.34H11.45A2.42,2.42,0,0,1,9.21,5.18L7,1.19A2.6,2.6,0,0,0,4.89,0H3.27A3.36,3.36,0,0,0,0,3.47v17A3.36,3.36,0,0,0,3.27,24H32.2a3.77,3.77,0,0,0,3.74-3.47v-17A3.77,3.77,0,0,0,32.2,0h0ZM9.26,16a2.55,2.55,0,1,1,2.55-2.55A2.56,2.56,0,0,1,9.26,16h0Zm12.44-1.43a1.24,1.24,0,0,1-1.24,1.24H14.85a1.24,1.24,0,0,1-1.24-1.24V12.22A1.24,1.24,0,0,1,14.85,11h5.62a1.24,1.24,0,0,1,1.24,1.24v2.36ZM26.07,16a2.55,2.55,0,1,1,2.55-2.55A2.56,2.56,0,0,1,26.07,16h0Zm0,0",
    "M10.76,2.91a2.74,2.74,0,0,0,2.1,1.32h9.77a2.71,2.71,0,0,0,2.09-1.3L25.58,1.3A0.8,0.8,0,0,0,24.85,0H10.63A0.78,0.78,0,0,0,9.9,1.27Zm0,0",
  ],
  iGen: [
    "M1.73,0H21.3A1.58,1.58,0,0,1,23,1.35V32.29a1.58,1.58,0,0,1-1.73,1.35H1.73A1.58,1.58,0,0,1,0,32.29V1.35A1.58,1.58,0,0,1,1.73,0h0ZM3.58,3.48V14.2h16V3.48h-16Zm8.57,13.08a7.69,7.69,0,1,0,7.69,7.69,7.69,7.69,0,0,0-7.69-7.69h0Zm0,0",
    " M12.16,28a3.77,3.77,0,1,0-3.77-3.78A3.78,3.78,0,0,0,12.16,28h0Zm0,0 ",
  ],
};

const houseSVG = () => {
  return `
  <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" class="house-svg" viewBox="0 0 219.7 309.62" width="219.7"  height="309.62" >
          <polyline class="house-svg-1" points="105.76 5.11 19.39 19.61 19.39 307.26 74.24 307.26 74.24 307.45 74.66 307.45 74.66 255.81 106.55 255.81"></polyline>
          <rect class="house-svg-2 fill-primary" width="105.76" height="309.62" fill="none"></rect>
          <path class="house-svg-3" d="M40.48,88.41H15.8V63.73H40.48V88.41ZM79.82,63.73H55.14V88.41H79.82V63.73ZM40.48,102H15.8v24.68H40.48V102Zm39.34,0H55.14v24.68H79.82V102ZM40.48,140.37H15.8V165H40.48V140.37Zm39.34,0H55.14V165H79.82V140.37ZM40.48,178.69H15.8v24.68H40.48V178.69Zm39.34,0H55.14v24.68H79.82V178.69ZM40.48,217H15.8v24.68H40.48V217Zm39.34,0H55.14v24.68H79.82V217ZM40.48,255.33H15.8V280H40.48V255.33Z" transform="translate(18.5 1)" fill="#FFFFFF"></path>
          <circle class="house-svg-4 fill-secondary" cx="115.21" cy="282.8" r="3.83"></circle>
          <circle class="house-svg-1 fill-primary" cx="100.14" cy="282.8" r="3.83"></circle>
          <polygon class="house-svg-4 fill-secondary" points="108.32 113.94 219.7 182.91 219.7 188.02 107.81 117.51 108.32 113.94"></polygon>
          <polygon class="house-svg-4 fill-secondary" points="108.31 120.07 108.31 256.52 139.16 256.52 139.16 308.6 199.77 308.6 199.77 177.29 108.31 120.07"></polygon>
          <rect class="house-svg-3" x="154.88" y="218.01" width="24.68" height="24.68" fill="#FFFFFF"></rect>
          <rect class="house-svg-3" x="115.03" y="218.01" width="24.68" height="24.68" fill="#FFFFFF"></rect>
          <rect class="house-svg-3" x="154.88" y="256.33" width="24.68" height="24.68" fill="#FFFFFF"></rect>
        </svg>
  
  
  `;
};

export { genPaths, houseSVG };
