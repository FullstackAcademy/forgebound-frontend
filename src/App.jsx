import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./campaigns/Dashboard";
import NewCampaign from "./campaigns/NewCampaign";
import CampaignDetail from "./campaigns/CampaignDetail";
import EditCampaign from "./campaigns/EditCampaign";
import JoinCampaign from "./campaigns/JoinCampaign";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/campaigns/new" element={<NewCampaign />} />
        <Route path="/campaigns/join" element={<JoinCampaign />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
        <Route path="/campaigns/:id/edit" element={<EditCampaign />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
