import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { Button, FormInput } from "@src/UI";

import { money } from "@src/assets";

import { useStateContext } from "@src/context";

import { checkIfImage } from "@src/utils";

import cn from "classnames";

export function CreateCampaign() {
  const { createCampaign } = useStateContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const changeField = (fieldName: string, el: any) => {
    setForm({ ...form, [fieldName]: el });
  };

  const handleSubmit = async () => {
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("wrong picture");
        setForm({ ...form, image: "" });
      }
    });
  };
  return (
    <section
      className={cn(
        "flex justify-center items-center flex-col",
        "bg-[#1c1c24] rounded-xl p-4 sm:p-10"
      )}
    >
      {isLoading && "loading"}
      <div className="flex justify-center items-center p-4 sm:min-w-[380px] bg-[#3a3a43]">
        <h1 className="font-epilogue text-xl sm:text-[24px] font-semibold text-white">
          Start a Campaign
        </h1>
      </div>
      <div className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-10">
          <FormInput
            type="input"
            className=""
            inputType="text"
            value={form.name}
            setValue={(el: string) => changeField("name", el)}
            title="Your Name"
            placeholder="John Doe"
          />
          <FormInput
            type="input"
            className=""
            placeholder="write title"
            inputType="text"
            value={form.title}
            setValue={(el: string) => changeField("title", el)}
            title="Campaign Title"
          />
        </div>
        <FormInput
          type="textarea"
          className=""
          placeholder="write your story"
          value={form.description}
          setValue={(el: string) => changeField("description", el)}
          title="Campaign Title"
        />
        <div className="w-full py-10 flex items-center p-4 bg-[#976dfd] rounded-xl">
          <img src={money} alt="money" />
          <h4 className="font-epilogue text-white text-[15px] ml-5">
            You will get 100% of amount
          </h4>
        </div>
        <div className="w-full flex flex-wrap items-end gap-10">
          <FormInput
            type="input"
            inputType="text"
            className=""
            value={form.target}
            setValue={(el: string) => changeField("target", el)}
            title="Goal"
            placeholder="ETH 100%"
          />
          <FormInput
            type="input"
            className=""
            placeholder="end date"
            inputType="date"
            value={form.deadline}
            setValue={(el: string) => changeField("deadline", el)}
            title="End Date"
          />
        </div>
        <FormInput
          type="input"
          className=""
          placeholder="Campaign image"
          value={form.image}
          inputType="url"
          setValue={(el: string) => changeField("image", el)}
          title="Campaign image"
        />
        <Button
          className="bg-[#1dc071] w-fit mx-auto text-white h-fit py-[15px] rounded-xl px-3"
          onClick={handleSubmit}
        >
          Submit new compaign
        </Button>
      </div>
    </section>
  );
}
