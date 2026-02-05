import { useEffect, useMemo } from "react";
import Chart from "react-apexcharts";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getLast30DaysStockHistory } from "../store/stockHistory/stockHistoryThunk";

type StockHistoryPoint = {
  x: number;
  y: number;
};

function StockHistoryChart() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(
    (state) => state.stockHistory.getLast30DaysStockHistory,
  );

  useEffect(() => {
    dispatch(getLast30DaysStockHistory());
  }, [dispatch]);

  const series = useMemo(() => {
    if (!data) return [];

    return [
      {
        name: "Stock",
        data: data.map(
          (item): StockHistoryPoint => ({
            x: new Date(item.createdAt).getTime(),
            y: item.newStock,
          }),
        ),
      },
    ];
  }, [data]);

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
      labels: {
        format: "dd MMM",
      },
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
