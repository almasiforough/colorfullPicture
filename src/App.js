import React, { Suspense } from 'react';
import './App.css';
const FirstColourPart = React.lazy(() => import('./component/firstColourPart'));
const SecondColourPart = React.lazy(() => import('./component/SecondColourPart'));
let rgbArr = [];
let hueIndex = [0];
let currentHue;
let saturationIndex = [0];
let currentSaturation;
let sortedArr = [];
let sortedRgbArr = [];
let firstPart = [];
let secondPart = [];
class App extends React.Component {
  state = {
    firstPart: [],
    secondPart: []
  }
  componentDidMount() {
    this.makArgbarr();
    this.hueSort();
    this.makeHueIndexArray();
    this.saturationSort();
    this.makeSaturationIndexArray();

    sortedRgbArr = sortedArr.map((data) => {
      return rgbArr[data.index];
    });

    this.breakingArrays(sortedRgbArr);
    this.setState(
      {
        firstPart: firstPart,
        secondPart: secondPart
      }
    );
  }
  // ----------------------Making RBG array----------------------
  makArgbarr = () => {
    for (let i = 1; i <= 256; i += 8) {
      for (let j = 1; j <= 256; j += 8) {
        for (let k = 1; k <= 256; k += 8) {
          rgbArr.push([i, j, k])
        }
      }
    }
  }
  // ------------Sorting Hue------------------------------------
  makeHueIndexArray() {
    currentHue = Math.floor(sortedArr[0].color[0])
    sortedArr = sortedArr.map((e, i) => {
      if (Math.floor(e.color[0]) !== currentHue) {
        hueIndex.push(i);
        currentHue = Math.floor(e.color[0])
      }
      return e
    })
    hueIndex.push(sortedArr.length)
  }
  hueSort = () => {
    sortedArr = rgbArr.map((e, i) => {
      return { color: this.rgbToHsl(e), index: i };
    }).sort((e1, e2) => {
      return e1.color[0] - e2.color[0];
    })
  }
  // --------------------Sorting saturation------------------------
  makeSaturationIndexArray() {
    currentSaturation = Math.floor(sortedArr[0].color[1]);
    let indexOfH = hueIndex[1];
    sortedArr = sortedArr.map((e, i) => {
      if (i !== indexOfH) {
        if (Math.floor(e.color[1]) !== currentSaturation) {
          saturationIndex.push(i);
          currentSaturation = Math.floor(e.color[1])
        }
      }
      return e
    })
    saturationIndex.push(sortedArr.length)
  }
  saturationSort = () => {
    for (let k = 1; k < hueIndex.length; k++) {
      let length = hueIndex[k] - hueIndex[k - 1];
      let startindex = hueIndex[k - 1];

      if (k === 1 || k === hueIndex.length - 1) {
        let arr = sortedArr.splice(startindex, length);
        arr.sort((e1, e2) => {
          return e1.color[1] - e2.color[1];
        });
        if (k === 1) {
          sortedArr = arr.concat(sortedArr)
        }
        else if (k === hueIndex.length - 1) {
          sortedArr = sortedArr.concat(arr)
        }
      }
      else {
        let firstArrayLength = hueIndex[k - 1];
        let firstArray = sortedArr.splice(0, firstArrayLength);
        let arr = sortedArr.splice(0, length);

        arr.sort((e1, e2) => {
          return e1.color[1] - e2.color[1];
        });
        firstArray = firstArray.concat(arr);
        sortedArr = firstArray.concat(sortedArr)
      }
    }
  }
  // -----------------Converting RGBarr to HSLarr----------------------
  rgbToHsl = (c) => {
    let r = c[0] / 255,
      g = c[1] / 255,
      b = c[2] / 255;
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = d / (1 - Math.abs(2 * l - 1))
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          break;
      }
    }
    return [h * 60, s * 100, l * 100];
  }
  // -------------Breaking Arrays for Lazy Loading------------------------
  breakingArrays = (arr) => {
    let lenght = arr.length;
    firstPart = arr.splice(0, lenght / 2);
    secondPart = arr;
  }
  render() {
    return (
      <div className="container">
        <Suspense fallback={<div></div>}>
          <FirstColourPart sortedArray={this.state.firstPart} />
          <SecondColourPart sortedArray={this.state.secondPart} />
        </Suspense>
      </div>
    );
  }
}


export default App;
