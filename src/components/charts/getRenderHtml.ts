type GetRenderHtmlOptions = {
  packages: string[]
  width: number | string
  height: number | string
  mapsApiKey: string
}

export function getRenderHtml(content: string, options: GetRenderHtmlOptions) {
  const packages = options.packages.map(packageName => {
    return `'${packageName}',`;
  });

  const width = typeof options.width === 'number' ? `${options.width}px` : options.width
  const height = typeof options.height === 'number' ? `${options.height}px` : options.height

  return `
  <style>
  .table-header {
    background: #F3C843;
    color: #FFFFFF;
  }

  .table-header-cell {
    background: none;
    padding: 8px !important;
  }
  </style>
  <div id="chart_div" style="width: ${width}; height: ${height};"></div>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript">
    const container = document.getElementById('chart_div');
    google.charts.load('current', {
      packages:[${packages}],
      mapsApiKey: '${options.mapsApiKey}',
    });
    google.charts.setOnLoadCallback(getDrawChart());
    function getDrawChart() {
      const drawChartFn = function(window, document) {
        ${content}
        if (typeof drawChart === 'function') {
          drawChart();
        }
        if (typeof chart !== 'undefined') {
          return chart;
        }
      }
      return function() {
        window.chart = drawChartFn({}, {
          getElementById: () => { return container; },
        });
      }
    }
  </script>
  `;
}
