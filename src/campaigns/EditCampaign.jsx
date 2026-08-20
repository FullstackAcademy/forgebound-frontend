import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { fetchCampaign, updateCampaign } from "./api";

export default function EditCampaign() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCampaign(token, id)
      .then(setCampaign)
      .catch((e) => setError(e.message));
  }, [token, id]);

  const onSubmit = async (formData) => {
    const title = formData.get("title");
    const description = formData.get("description");
    try {
      await updateCampaign(token, id, { title, description });
      navigate(`/campaigns/${id}`);
    } catch (e) {
      setError(e.message);
    }
  };

  if (!campaign)
    return <p className="max-w-md mx-auto p-6 text-stone-500">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-stone-800 mb-4">Edit Campaign</h1>
      <form action={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-stone-700">Title</span>
          <input
            name="title"
            required
            defaultValue={campaign.title}
            className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-stone-700">
            Description
          </span>
          <textarea
            name="description"
            rows={4}
            defaultValue={campaign.description ?? ""}
            className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2"
          />
        </label>
        <button className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800">
          Save
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
