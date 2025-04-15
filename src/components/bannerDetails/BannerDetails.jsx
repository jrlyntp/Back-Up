import React from "react";

const BannerDetails = ({ reverse }) => {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 dark:text-white">
      <div className="container flex flex-col items-center justify-center py-10 md:h-[500px] ">
        <div className="grid grid-cols-1 items-center gap-4  md:grid-cols-2">
          {/* text container */}
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
            className={`flex flex-col items-start gap-4 text-left md:items-start p-4 md:p-8 md:text-left ${
              reverse ? "md:order-last" : ""
            } `}
          >
            <h1 className="text-2xl md:text-4xl ">
            We Create Events That Leave a Lasting Impact.
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
            we specialize in crafting memorable events that resonate long after they’ve ended. Our team is dedicated to designing experiences that are not just events, but moments that truly make a difference.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
            From corporate conferences to personal celebrations, we make sure every detail counts. Whether it's through seamless logistics or creative themes, we’re committed to delivering events that exceed expectations.
            </p>
            <div>
              <ul className="flex list-inside list-disc flex-col gap-2 md:gap-4">
                <li className="font-medium">
                What type of event are you most excited to attend?
                </li>
                <li className="font-medium">
                What do you look for in an event experience?
                </li>
                <li className="font-medium">
                How would you like to feel by the end of the event?
                </li>
              </ul>
            </div>
            <button className="btn-primary">Get Started</button>
          </div>

          {/* img container */}
          <div
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className={reverse ? "order-1" : ""}
          >
            <img
  src="src/assets/blogs/logo (2).png"
  alt="not found"
  className="mx-auto w-full p-4 md:max-w-[400px]"
/>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerDetails;
