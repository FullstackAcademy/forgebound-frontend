import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import {
  fetchCampaign,
  fetchMembers,
  fetchInviteCode,
  removeMember,
  deleteCampaign,
} from "./api";

export default function CampaignDetail() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [members, setMembers] = useState(null);
  const [inviteCode, setInviteCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCampaign(token, id)
      .then(setCampaign)
      .catch((e) => setError(e.message));
    fetchMembers(token, id)
      .then(setMembers)
      .catch((e) => setError(e.message));
  }, [token, id]);

  const isGM = campaign?.owner_id === user?.id;

  const handleGetInviteCode = async () => {
    try {
      const { inviteCode } = await fetchInviteCode(token, id);
      setInviteCode(inviteCode);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await removeMember(token, id, userId);
      setMembers((prev) => prev.filter((m) => m.user_id !== userId));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this campaign? This can't be undone.")) return;
    try {
      await deleteCampaign(token, id);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  if (error)
    return <p className="max-w-3xl mx-auto p-6 text-red-600">{error}</p>;
  if (!campaign)
    return <p className="max-w-3xl mx-auto p-6 text-stone-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">
            {campaign.title}
          </h1>
          {campaign.description && (
            <p className="text-stone-600 mt-2">{campaign.description}</p>
          )}
        </div>
        {isGM && (
          <div className="flex gap-2 shrink-0 ml-4">
            <Link
              to={`/campaigns/${id}/edit`}
              className="border border-stone-300 text-stone-700 px-3 py-1.5 rounded-lg text-sm hover:bg-stone-50"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="border border-red-300 text-red-600 px-3 py-1.5 rounded-lg text-sm hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {isGM && (
        <div className="mt-6 border border-stone-200 rounded-lg p-4">
          <h2 className="font-semibold text-stone-800 mb-2">Invite Players</h2>
          {inviteCode ? (
            <p className="font-mono bg-stone-100 rounded px-3 py-2 inline-block">
              {inviteCode}
            </p>
          ) : (
            <button
              onClick={handleGetInviteCode}
              className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800"
            >
              Get Invite Code
            </button>
          )}
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-semibold text-stone-800 mb-2">Members</h2>
        <ul className="space-y-2">
          {members?.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between border border-stone-200 rounded-lg px-4 py-2"
            >
              <span className="text-stone-700">
                {m.username}{" "}
                <span className="text-stone-400 text-sm">({m.role})</span>
              </span>
              {isGM && m.role !== "GM" && (
                <button
                  onClick={() => handleRemoveMember(m.user_id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
