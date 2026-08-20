const API = import.meta.env.VITE_API;

export async function fetchCampaigns(token) {
  const response = await fetch(API + "/campaigns", {
    headers: { Authorization: `Bearer ${token}` },
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

export async function fetchCampaign(token, id) {
  const response = await fetch(API + "/campaigns/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw Error(await response.text());
  return response.json();
}

export async function updateCampaign(token, id, { title, description }) {
  const response = await fetch(API + "/campaigns/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) throw Error(await response.text());
  return response.json();
}

export async function deleteCampaign(token, id) {
  const response = await fetch(API + "/campaigns/" + id, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw Error(await response.text());
}

export async function fetchMembers(token, id) {
  const response = await fetch(API + "/campaigns/" + id + "/members", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw Error(await response.text());
  return response.json();
}

export async function fetchInviteCode(token, id) {
  const response = await fetch(API + "/campaigns/" + id + "/invite", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw Error(await response.text());
  return response.json();
}

export async function joinCampaign(token, code) {
  const response = await fetch(API + "/campaigns/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code }),
  });
  if (!response.ok) throw Error(await response.text());
  return response.json();
}

export async function removeMember(token, campaignId, userId) {
  const response = await fetch(
    API + "/campaigns/" + campaignId + "/members/" + userId,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!response.ok) throw Error(await response.text());
}
