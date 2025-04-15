import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  const importantLinks = [
    {
      name: "Home",
    },
    {
      name: "About",
    },
    {
      name: "Event",
    },
    {
      name: "Login",
    },
  ];

  const Links = [
    {
      name: "Privacy Policy",
    },
    {
      name: "Services",
    },
    {
      name: "About us",
    },
  ];
  return (
    <>
      <footer className="text-white rounded-t-3xl bg-gradient-to-r from-violet-950 to to-violet-900">
        <div className="mx-auto max-w-[1200px] p-4">
          {/* Footer Containt section */}
          <div className="grid py-5 md:grid-cols-3">
            <div className="px-4 py-8">
              <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-3xl">
                <a href="/#home" className="">
                EVEN
                  <span className="inline-block font-bold text-primary">
                    ZA
                  </span>
                </a>
              </h1>
              <p className="">
              is a dynamic event management system designed to streamline the organization and execution of events, ensuring seamless coordination and efficient tracking{" "}
              </p>
              <br />
              <div className="flex items-center gap-3">
                <FaLocationArrow />
                <p>Noida, Uttar Pradesh</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <FaMobileAlt />
                <p>+01 234 567 8910</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:pl-10 col-span-2">
              <div className="px-4 py-8">
                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  <FooterLinks links={importantLinks} />
                </ul>
              </div>
              <div className="px-4 py-8">
                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">
                  Links
                </h1>
                <ul className="flex flex-col gap-3">
                  <FooterLinks links={Links} />
                </ul>
              </div>
              <div className="px-4 py-8">
                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">
                  Social Links
                </h1>
                <div className="flex flex-col gap-3">
                  <h1>Subscribe to out newsletter</h1>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="rounded-full px-3 py-1 text-black focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <div className="flex gap-3 mt-6 items-center">
                    <a href="#" className="duration-200 hover:scale-105">
                      <FaInstagram className="text-3xl" />
                    </a>
                    <a href="#" className="duration-200 hover:scale-105">
                      <FaFacebook className="text-3xl" />
                    </a>
                    <a href="#" className="duration-200 hover:scale-105">
                      <FaLinkedin className="text-3xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
          <div className="bottom-footer">
            <p className="border-t-2 border-gray-300/50 py-6 text-center">
              Evenza @2025
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
