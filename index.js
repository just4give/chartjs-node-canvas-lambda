const { ChartJSNodeCanvas, ChartCallback } = require("chartjs-node-canvas");
const { renderBarChartWithChartJS, renderLineChartWithChartJS } = require("./generate-graph");

const REGION = process.env.REGION || "us-east-1";
const SUPPORTED_CHART_TYPES = ["bar", "line"];

exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  let response = {
    statusCode: 200,
  };

  if (!SUPPORTED_CHART_TYPES.includes(event.type)) {
    response.statusCode = 422;
    response.body = undefined;
    response.message = `Supported chart types are ${SUPPORTED_CHART_TYPES.join(", ")}`;
    return response;
  }

  try {
    let imgBuff1;
    switch (event.type) {
      case "line":
        imgBuff1 = (await renderLineChartWithChartJS(event)).toString("base64");
        break;
      case "bar":
        imgBuff1 = (await renderBarChartWithChartJS(event)).toString("base64");
        break;
      default:
        break;
    }

    response.body = `data:image/png;base64,${imgBuff1}`;
  } catch (e) {
    console.error("Failed to generate chart", e);
    response.statusCode = 500;
    response.message = "Failed to generate chart " + e;
  }

  return response;
};
