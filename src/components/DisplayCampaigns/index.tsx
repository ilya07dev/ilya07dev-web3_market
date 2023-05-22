import { useNavigate } from "react-router-dom";

import { CampaignFund } from "./components/CampaignFund";

import { loader } from "@src/assets";
import { ICampaignFund } from "@src/types";

interface IProps {
  title: string;
  isLoading: boolean;
  campaigns: ICampaignFund[];
}
export function DisplayCampaigns({ title, isLoading, campaigns }: IProps) {
  const navigate = useNavigate();
  const handleNavigate = (campaign: ICampaignFund) => {
    navigate(`/campaign-detail/${campaign.title}`, { state: campaign });
  };

  const filteredCampaign = campaigns.filter((el) => el.title !== "dsf");
  return (
    <section>
      <h1 className="font-epilogue font-semibold text-white text-lg">
        {title}: ({filteredCampaign.length})
      </h1>
      <div className="flex flex-wrap mt-5 gap-6">
        {isLoading && (
          <img className="w-[100px] h-[100px]" alt="loading" src={loader} />
        )}
        {!isLoading && filteredCampaign.length === 0 && (
          <p className="font-epilogue font-semibold text-[#818183] text-md">
            You have no campaigns
          </p>
        )}
        {!isLoading &&
          filteredCampaign.length > 0 &&
          filteredCampaign.map((campaign: ICampaignFund) => (
            <CampaignFund
              onClick={() => handleNavigate(campaign)}
              key={campaign.pId}
              campaign={campaign}
            />
          ))}
      </div>
    </section>
  );
}
