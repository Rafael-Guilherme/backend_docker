export function GraphChart(chartData: any) {
  return `function () {
    const data = google.visualization.arrayToDataTable(${JSON.stringify(
      chartData
    )});

    options={
      title: "Desempenho Checklist Currículo Denver",
      titleTextStyle: { fontSize: 20, bold: true, color: "#1F4E79" },
      is3D: true,
      chartArea: { width: "40%", height: "85%" },
      colors: ["#ecb7bf", "#06beb6", "#a8b4ff",],
      annotations: {
        textStyle: {
          fontSize: 10,
        },
      },
    };

    const chart = new google.visualization.BarChart(container);
    chart.draw(data, options);
  }`;
}
