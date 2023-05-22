import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useMetamask } from "@thirdweb-dev/react";

import { menu, search, thirdweb } from "@src/assets";
import { shortenAddress } from "@src/utils/shortenAddress";
import { navlinks } from "@src/constants";
import { useStateContext } from "@src/context";
import { Button } from "@src/UI/Button";

import cn from "classnames";

export function Navbar() {
  const { address } = useStateContext();

  const navigate = useNavigate();

  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const connect = useMetamask();

  return (
    <article
      className={cn(
        "flex flex-col-reverse md:flex-row justify-between",
        "mb-[35px] gap-6"
      )}
    >
      <div
        className={cn(
          "flex lg:flex-1 flex-row bg-[#1c1c24] rounded-[100px]",
          "max-w-[450px] h-[52px] py-2 pl-4 pr-2 gap-10"
        )}
      >
        <input
          className="flex w-full font-epilogue text-sm text-white placeholder:text-[#4b5264] bg-transparent outline-none"
          type="text"
          placeholder="Search"
        />
        <div
          className={cn(
            "w-[72px] h-full rounded-[20px] bg-[#4acd8d]",
            "flex justify-center items-center cursor-pointer"
          )}
        >
          <img className="w-4 h-4 object-contain" src={search} alt="" />
        </div>
      </div>
      <div className="hidden sm:flex flex-row justify-end items-center gap-5">
        <Button
          onClick={() => {
            if (address) {
              navigate("create-campaign");
            } else {
              connect();
            }
          }}
          className={cn(
            address ? "bg-[#1dc071]" : "bg-[#8c6dfd]",
            "w-[180px] py-3 flex justify-center items-center",
            "font-epiloge font-semibold text-white",
            "rounded-lg duration-500"
          )}
        >
          {address ? shortenAddress(address) : "connect"}
        </Button>
        <Link
          className="bg-[#2c2f32] rounded-full w-[50px] h-[50px] flex justify-center items-center"
          to="/profile"
        >
          <img
            className="w-[60%] h-[60%] object-contain"
            src={thirdweb}
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex sm:hidden justify-between items-center relative">
        <Link
          className="bg-[#2c2f32] rounded-full w-[50px] h-[50px] flex justify-center items-center"
          to="/profile"
        >
          <img
            className="w-[60%] h-[60%] object-contain"
            src={thirdweb}
            alt="logo"
          />
        </Link>
        <img
          className="w-10 h-10 object-contain cursor-pointer"
          src={menu}
          alt="menu"
          onClick={() => setToggleDrawer(!toggleDrawer)}
        />
        <div
          className={cn(
            "absolute w-full top-[60px] right-0 bg-[#1c1c24] z-10 pt-4 pb-10 duration-500",
            !toggleDrawer && "-translate-y-[100vh]"
          )}
        >
          <ul className="w-full mb-4">
            {navlinks.map((link) => (
              <li
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
                className={cn(
                  "flex items-center gap-5 p-4",
                  "text-xl font-semibold font-epilogue",
                  isActive === link.name
                    ? "bg-[#3a3a43] text-[#1dc071]"
                    : "text-[#808191]"
                )}
                key={link.name}
              >
                <img
                  className={
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }
                  src={link.imgUrl}
                  alt="url"
                />
                {link.name}
              </li>
            ))}
          </ul>
          <Button
            onClick={() => {
              if (address) {
                navigate("create-campaign");
              } else {
                connect();
              }
            }}
            className={cn(
              address ? "bg-[#1dc071]" : "bg-[#8c6dfd]",
              "w-[180px] py-3 ml-3 flex justify-center items-center",
              "font-epiloge font-semibold text-white",
              "rounded-lg duration-500"
            )}
          >
            {address ? shortenAddress(address) : "connect"}
          </Button>
        </div>
      </div>
    </article>
  );
}
