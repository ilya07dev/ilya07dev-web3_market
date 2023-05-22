import { Route, Routes } from "react-router-dom";

import { CampaignDetail, CreateCampaign, HomePage, ProfilePage } from "./pages";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

export default function Home() {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-grow">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/campaign-detail/:id" element={<CampaignDetail />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
        </Routes>
      </div>
    </div>
  );
}
