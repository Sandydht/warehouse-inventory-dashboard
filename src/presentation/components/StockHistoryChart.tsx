import { useMemo } from "react";
import Chart from "react-apexcharts";

type StockHistoryPoint = {
  x: number;
  y: number;
};

function generateStockHistory30Days(startStock = 100): StockHistoryPoint[] {
  const data: StockHistoryPoint[] = [];
  let currentStock = startStock;

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const change = Math.floor(Math.random() * 10) - 5;
    currentStock = Math.max(0, currentStock + change);

    data.push({
      x: date.getTime(),
      y: currentStock,
    });
  }

  return data;
}

function StockHistoryChart() {
  const series = useMemo(
    () => [
      {
        name: "Stock",
        data: generateStockHistory30Days(120),
      },
    ],
    [],
  );

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Stock Quantity",
      },
      min: 0,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    markers: {
      size: 4,
    },
  };

  return (
    <div className="w-full h-auto rounded-lg border-gray-200 border bg-white overflow-hidden shadow-md flex flex-col items-start justify-start p-4 gap-4">
      <div className="w-full h-auto">
        <p className="text-left text-[22px] leading-7 text-black">
          Stock History (Last 30 Days)
        </p>
      </div>

      <div className="w-full h-auto">
        <Chart options={options} series={series} width="100%" height={400} />
      </div>
    </div>
  );
}

export default StockHistoryChart;
