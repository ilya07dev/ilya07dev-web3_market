import { useEffect, useState } from "react";

import { DisplayCampaigns } from "@src/components/DisplayCampaigns";

import { useStateContext } from "@src/context";
import { ICampaignFund } from "@src/types";

export function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCompaigns] = useState([]);

  const { contract, address, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setIsLoading(false);
    setCompaigns(data);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);
  const myCampaign = campaigns.filter(
    (el: ICampaignFund) => el.owner === address
  );
  return (
    <DisplayCampaigns
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={myCampaign}
    />
  );
}
