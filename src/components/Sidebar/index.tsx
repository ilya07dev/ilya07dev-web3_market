import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDisconnect } from "@thirdweb-dev/react";

import { navlinks } from "@src/constants";
import { logo } from "@src/assets";
import { Icon } from "./components/Icon";

import cn from "classnames";

export function Sidebar() {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState("dashboard");

  const disConnect = useDisconnect();

  return (
    <article className="flex flex-col justify-between items-center sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon className="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>
      <div
        className={cn(
          "flex flex-col justify-between items-center flex-1",
          "w-[76px] py-4 mt-12",
          "bg-[#1c1c24] rounded-[20px]"
        )}
      >
        <div className="flex flex-col justify-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleCLick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
                if (link.name === "logout") disConnect();
              }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
