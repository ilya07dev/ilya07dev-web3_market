import { ICampaignFund } from "@src/types";
import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { createContext, useContext } from "react";
export type GlobalContent = {
  copy: string;
  setCopy: (c: string) => void;
};
const StateContext = createContext();
export const StateContextProvisder = ({ children }: any) => {
  const { contract } = useContract(
    "0xA22dFee3e7aEb2d7398A11D43A8b0c8326EceCda"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();
  const publishCampaign = async (form: any) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };
  const getCampaigns = async () => {
    const data = await contract?.call("getCampaigns");
    const parsedCampaigns = data.map((campaign: ICampaignFund, i: number) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: ethers.utils.formatEther(campaign.deadline.toNumber()),
      amountCollected: campaign.amountCollected,
      image: campaign.image,
      pId: i,
    }));
    return parsedCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };
  const getDonations = async (pId) => {
    const donations = await contract?.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        getDonations,
        donate,
        getCampaigns,
        connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
