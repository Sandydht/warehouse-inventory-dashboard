import StockHistoryChart from "../components/StockHistoryChart";

function DashboardPage() {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-4">
      <div className="w-full h-auto flex flex-col items-start justify-start">
        <p className="text-left text-[22px] leading-7 font-bold">Dashboard</p>
        <p className="text-left text-[16px] leading-6">
          Monitor and manage inventory activities that require your attention.
        </p>
      </div>

      <StockHistoryChart />
    </div>
  );
}

export default DashboardPage;
