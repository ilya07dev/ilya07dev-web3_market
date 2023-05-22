import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { useStateContext } from "@src/context";

import { CountBox } from "@src/components/CountBox";

import { thirdweb } from "@src/assets";
import { Button } from "@src/UI";
import { calculateBarPercentage, daysLeft } from "@src/utils";

export function CampaignDetail() {
  const { contract, donate, address, getDonations } = useStateContext();

  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const fetchDonate = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonate();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount);
    setIsLoading(false);
  };

  const remainigDays = daysLeft(state.deadline);
  console.log(state);
  return (
    <section>
      {isLoading && "Loading"}
      <div className="w-full flex flex-col md:flex-row mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            className="w-full h-[450px] rounded-xl"
            src={state.image}
            alt=""
          />
          <div className="relative w-full h-2 mt-2 bg-[#3a3a43]">
            <div
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
              className="absolute h-full bg-[#4acd8d]"
            ></div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox
            value={Number(remainigDays) ? remainigDays : 0}
            title="Days Left"
          />
          <CountBox
            value={state.amountCollected || 0}
            title={`raised of ${state.target}`}
          />
          <CountBox value={donators.length} title="Total Backers" />
        </div>
      </div>

      <div className="flex mt-[60px] flex-col lg:flex-row">
        <div className="flex-1">
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-[20px] uppercase text-white">
              Creator
            </h4>
            <div className="flex items-center flex-wrap gap-4">
              <img
                src={thirdweb}
                className="w-10 h-10 rounded-full bg-[#2c2f32] p-2 cursor-pointer"
                alt=""
              />
              <div>
                <span className="font-sembold text-white break-all">
                  {state.owner}
                </span>
                <p className="text-sm text-[#808191]">10 Campaigns</p>
              </div>
            </div>
          </div>
          <div className="mt-[60px] flex flex-col gap-5">
            <h4 className="font-semibold text-[20px] uppercase text-white">
              Story
            </h4>
            <p className="text-[#808191]">{state.description}</p>
          </div>
          <div className="mt-[60px] flex flex-col gap-5">
            <h4 className="font-semibold text-[20px] uppercase text-white">
              Donators
            </h4>
            <div className="flex flex-col gap-4 mt-2">
              {donators.length > 0 ? (
                donators.map((donator) => <div>donator</div>)
              ) : (
                <p className="text-[#808191]">No donators yet</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-[20px] uppercase text-white">
            Fund
          </h4>
          <div className="flex flex-col mt-5 p-4 bg-[#1c1c24] rounded-xl">
            <p className="font-medium text-lg text-center text-[#808191]">
              Fund teh Campaign
            </p>
            <input
              value={amount}
              onChange={(el) => setAmount(el.target.value)}
              className="w-full py-3 sm:px-5 px-4 mt-[30px] outline-none border border-[#3a3a43] bg-transparent text-white"
              type="number"
              placeholder="ETH 0.1"
              step={0.01}
            />
            <div className="mt-5 p-4 bg-[#13131a] rounded-xl">
              <h4 className="font-semibold text-sm text-white">
                Back it bacause if you believe in it
              </h4>
              <p className="mt-5 text-[#808191]">
                Support me, I wanna work as a Frontend developer, I have strong
                knowledge of React, typeScript, redux, recoil, tailwind, learn
                next.js & web3
              </p>
            </div>
            <Button
              className="py-3 px-4 mt-4 w-full bg-[#8c6dfd] text-white"
              onClick={handleDonate}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
