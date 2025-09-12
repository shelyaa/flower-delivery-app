const API_BASE = "http://localhost:5000";

export const fetchShops = async () => {
  try {
    const res = await fetch(`${API_BASE}/shops`);
    if (!res.ok) throw new Error("Помилка при отриманні магазинів");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};