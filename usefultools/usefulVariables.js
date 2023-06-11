export const chart_options = {
  plugins: {
    legend: {
      display: true,
    },
  },
  elements: {
    line: {
      tension: 0.2, //0  disables bezier curves askip
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 0,
    },
  },
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      display: true,
    },
    y: {
      display: false,
    },
  },
};
