import { tagType, thirdweb } from "@src/assets";
import { ICampaignFund } from "@src/types";
import { daysLeft } from "@src/utils";

interface IProps {
  campaign: ICampaignFund;
  onClick: any;
}

export function CampaignFund({ campaign, onClick }: IProps) {
  const remainingDays = daysLeft(campaign.deadline);
  return (
    <article
      className="w-full sm:w-[288px] rounded-2xl bg-[#1c1c24] cursor-pointer"
      onClick={onClick}
    >
      <img
        className="w-full h-[158px] rounded-2xl"
        src={campaign.image}
        alt="img"
      />
      <div className="flex flex-col p-4">
        <div className="flex">
          <img className="w-5 h-5" src={tagType} alt="" />
          <p className="ml-3 mt-1 font-epilogue font-medium text-sm text-[#808191]">
            Category
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white truncate">
            {campaign.title}
          </h3>
          <p className="mt-1 text-[#808191] text-sm truncate">
            {campaign.description}
          </p>
        </div>
        <div className="w-full grid-cols-2 grid justify-between flex-wrap mt-4 gap-2 font-semibold">
          <span className="text-white">{campaign.amountCollected || 0}</span>
          <span className="text-right text-white">
            {(Number(campaign.deadline) * 10000000).toFixed(0)}
          </span>
          <span className="text-[#808191] sm:max-w-[120px] truncate">
            Raised of {Number(remainingDays) ? remainingDays : 0}
          </span>
          <span className="text-right text-[#808191]">days Left</span>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <img
            src={thirdweb}
            className="w-10 h-10 rounded-full bg-[#13131a] p-2"
            alt=""
          />
          <p className="text-[#b2b3bd]  truncate">{campaign.owner}</p>
        </div>
      </div>
    </article>
  );
}
