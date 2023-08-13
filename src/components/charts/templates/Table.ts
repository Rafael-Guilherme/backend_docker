export function TableChart(chartData: any) {
  return `function () {
    const data = google.visualization.arrayToDataTable(${JSON.stringify(
      chartData
    )});

    options={
      title: "Competências Desenvolvidas",
      legend: { position: "none" },
      annotations: {
        textStyle: {
          fontSize: 18,
          bold: true,
          textAlign: "center",
        },
      },
    };

    const chart = new google.visualization.Table(container);
    chart.draw(data, options);
  }`;
}
