const API = import.meta.env.VITE_API;

export async function fetchCampaigns(token) {
  const response = await fetch(API + "/campaigns", {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw Error(await response.text());
  return response.json();
}

export async function createCampaign(token, { title, description }) {
  const response = await fetch(API + "/campaigns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) throw Error(await response.text());
  return response.json();
}
