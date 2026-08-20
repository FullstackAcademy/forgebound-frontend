import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { joinCampaign } from "./api";

export default function JoinCampaign() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
    const code = formData.get("code");
    try {
      const member = await joinCampaign(token, code);
      navigate(`/campaigns/${member.campaign_id}`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-stone-800 mb-4">
        Join a Campaign
      </h1>
      <form action={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-stone-700">
            Invite Code
          </span>
          <input
            name="code"
            required
            className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 font-mono"
          />
        </label>
        <button className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800">
          Join
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
