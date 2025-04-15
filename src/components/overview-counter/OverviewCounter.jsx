import React from "react";
import CountUp from "react-countup";

const OverviewCounter = () => {
  return (
    <section className=" container h-12 md:h-32 p-3">
      <div className="mx-auto my-4 grid w-full -translate-y-12 grid-cols-4 divide-x divide-slate-700 bg-white p-2 shadow-lg dark:bg-gray-800 dark:text-white/70 md:max-w-[800px] md:-translate-y-20 md:p-8 ">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl">
            <CountUp end={234} suffix="+" duration={2.75} />
          </h1>
          <h1 className="sm:text-md text-xs  md:text-lg">Japan</h1>
        </div>
        <div className="flex  flex-col items-center justify-center">
          <h1 className="text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl">
            <CountUp end={56} suffix="+" duration={2.75} />
          </h1>
          <h1 className=" sm:text-md text-xs md:text-lg">Philippines</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl">
            <CountUp end={234} suffix="k+" />
          </h1>
          <h1 className="sm:text-md text-xs md:text-lg">Thailand</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl">
            <CountUp
              start={-875.039}
              end={160527.012}
              duration={2.75}
              separator=" "
              // decimals={4}
              // decimal=","
              suffix="+"
            />
          </h1>
          <h1 className="sm:text-md text-xs  md:text-lg">China</h1>
        </div>
      </div>
    </section>
  );
};

export default OverviewCounter;
