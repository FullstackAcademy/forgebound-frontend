import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { createCampaign } from "./api";

export default function NewCampaign() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
    const title = formData.get("title");
    const description = formData.get("description");
    try {
      await createCampaign(token, { title, description });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2x1 font-bold text-stone-800 mb-4">New Campaign</h1>
      <form action={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-stone-700">Title</span>
          <input
            name="title"
            required
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
            className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2"
          />
        </label>
        <button className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800">
          Create
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
