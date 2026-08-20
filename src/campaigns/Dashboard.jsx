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
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Your Campaigns</h1>
        <div className="flex gap-3">
          <Link
            to="/campaigns/join"
            className="border border-amber-700 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-50"
          >
            Join Campaign
          </Link>
          <Link
            to="/campaigns/new"
            className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800"
          >
            New Campaign
          </Link>
        </div>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {campaigns?.length === 0 && (
        <p className="text-stone-500">
          No campaigns yet — create your first one.
        </p>
      )}

      <ul className="space-y-3">
        {campaigns?.map((c) => (
          <li key={c.id}>
            <Link
              to={`/campaigns/${c.id}`}
              className="block border border-stone-200 rounded-lg p-4 hover:bg-stone-50"
            >
              <h2 className="font-semibold text-lg text-stone-800">
                {c.title}
              </h2>
              {c.description && (
                <p className="text-stone-600 text-sm">{c.description}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
