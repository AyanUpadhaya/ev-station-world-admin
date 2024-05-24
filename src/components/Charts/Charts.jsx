import React,{ Suspense, lazy } from "react"; 
import ChartArea from "./ChartTypes/ChartArea";
import ChartLine from "./ChartTypes/ChartLine";
const Charts = () => {
  const data = [
    { name: "Feb", uv: 400, pv: 1100, amt: 1800, date: "01" },
    { name: "Mar", uv: 200, pv: 1400, amt: 1300, date: "03" },
    { name: "Mar", uv: 250, pv: 870, amt: 700, date: "04" },
    { name: "Apr", uv: 400, pv: 1500, amt: 1200, date: "05" },
    { name: "May", uv: 100, pv: 1100, amt: 1900, date: "07" },
    { name: "Jun", uv: 600, pv: 1200, amt: 1400, date: "09" },
    { name: "Jul", uv: 300, pv: 1200, amt: 1900, date: "11" },
    { name: "Aug", uv: 100, pv: 1700, amt: 1700, date: "13" },
    { name: "Sep", uv: 800, pv: 1400, amt: 1100, date: "15" },
    { name: "Oct", uv: 300, pv: 1600, amt: 1500, date: "17" },
    { name: "Nov", uv: 100, pv: 1100, amt: 1700, date: "19" },
    { name: "Dec", uv: 800, pv: 1400, amt: 1100, date: "21" },
    { name: "Jan", uv: 200, pv: 1700, amt: 1500, date: "23" },
  ];

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 items-stretch justify-around gap-6">
      <div className="bg-whiteHigh rounded-xl">
        <ChartArea data={data} title="New Users"></ChartArea>
      </div>
      <div className="bg-whiteHigh rounded-xl flex-1">
        <ChartLine data={data} title="New Wallpapers"></ChartLine>
      </div>
    </section>
  );
};

export default Charts;
