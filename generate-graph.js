const { ChartJSNodeCanvas, ChartCallback } = require("chartjs-node-canvas");
const fs = require("fs");

const backgroundColor = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 206, 86, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(153, 102, 255, 0.5)",
  "rgba(255, 159, 64, 0.5)",
  "rgba(153, 159, 150, 0.5)",
];

const borderColor = [
  "rgba(255,99,132,1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(153, 159, 150, 1)",
];

// bug workaround: https://github.com/vmpowerio/chartjs-node/issues/26
if (global.CanvasGradient === undefined) {
  global.CanvasGradient = function () {};
}

let width = process.env.WIDTH ? parseInt(process.env.WIDTH) : 600;
let height = process.env.HEIGHT ? parseInt(process.env.HEIGHT) : 400;
console.log(`Width = ${width} and Height = ${height}`);
const canvasRenderService = new ChartJSNodeCanvas({ width, height });

exports.renderBarChartWithChartJS = async (chartOption) => {
  let configuration = {
    type: "bar",
    data: {
      labels: chartOption.labels,
      datasets: [],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: chartOption.title,
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };
  let counter = 0;
  chartOption.data.forEach((item) => {
    configuration.data.datasets.push({
      label: item.label,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1,
      data: item.data,
    });
    counter++;
  });

  console.log(JSON.stringify(configuration, null, 2));
  const chartCallback = (ChartJS) => {
    ChartJS.defaults.responsive = true;
    ChartJS.defaults.maintainAspectRatio = false;
  };

  return await canvasRenderService.renderToBuffer(configuration);
};

exports.renderLineChartWithChartJS = async (chartOption) => {
  let configuration = {
    type: "line",
    data: {
      labels: chartOption.labels,
      datasets: [],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: chartOption.title,
        },
      },
    },
  };
  let counter = 0;
  chartOption.data.forEach((item) => {
    configuration.data.datasets.push({
      label: item.label,
      backgroundColor: backgroundColor[counter],
      borderColor: borderColor[counter],
      borderWidth: 1,
      data: item.data,
    });
    counter++;
  });

  console.log(JSON.stringify(configuration, null, 2));
  const chartCallback = (ChartJS) => {
    ChartJS.defaults.responsive = true;
    ChartJS.defaults.maintainAspectRatio = false;
  };

  return await canvasRenderService.renderToBuffer(configuration);
};
