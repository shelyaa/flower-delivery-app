const API_BASE = import.meta.env.VITE_API_BASE;

export const fetchShops = async () => {
  try {
    const res = await fetch(`${API_BASE}/shops`);
    if (!res.ok) throw new Error("Error receiving stores");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
