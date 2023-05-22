import { useEffect, useState } from "react";

import { DisplayCampaigns } from "@src/components/DisplayCampaigns";

import { useStateContext } from "@src/context";

export function HomePage() {
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
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
}
