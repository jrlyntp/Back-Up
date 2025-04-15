import React from "react";
import HeroImg from "../../assets/hero.svg";

const Hero = () => {
  return (
    <div className="h-[650px] md:h-[600px]  bg-gradient-to-r from-violet-950 to-violet-900 pt-32 md:pt-48">
      <section className="container flex flex-col items-center justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 text-white">
          {/* hero text container */}
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
            className="flex flex-col items-center text-center gap-4 md:items-start md:text-left"
          >
            <h1 className="text-4xl">
           We Create Events That Leave a Lasting Impact
            </h1>
            <p>
            an innovative event management system that transforms the way you organize, track, and engage with events, ensuring every moment is memorable and impactful.
            </p>
            <div className="space-x-4">
              <button className="btn-primary">Sign Up</button>
              <button className="btn-outline">Login</button>
            </div>
          </div>
          {/* hero Image container */}
          <div
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className="mx-auto max-w-xs p-4"
          >
            <img src={HeroImg} alt="Not Found" className="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
