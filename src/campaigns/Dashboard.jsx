import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { fetchCampaigns } from "./api";

export default function Dashboard() {
  const { token } = useAuth();
  const [campaigns, setCampaigns] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCampaigns(token)
      .then(setCampaigns)
      .catch((e) => setError(e.message));
  }, [token]);

  return (
    <div className="max-w-3x1 mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2x1 font-bold text-stone-800">Your Campaigns</h1>
        <Link
          to="/campaigns/new"
          className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800"
        >
          New Campaign
        </Link>
      </div>
      {error && <p className="text-red-600">{error}</p>}

      {campaigns?.length === 0 && (
        <p className="text-stone-500">
          No Campaigns yet - create your first one.
        </p>
      )}

      <ul className="space-y-3">
        {campaigns?.map((c) => (
          <li
            key={c.id}
            className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50"
          >
            <h2 className="font-semibold text-lg text-stone-800">{c.title}</h2>
            {c.description && (
              <p className="text-stone-600 text-sm">{c.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
