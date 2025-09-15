const API_BASE = import.meta.env.VITE_API_BASE;

export const fetchFlowersByShop = async (
  shopId: number,
  sort: "asc" | "desc" = "asc",
  page = 1,
  limit = 6
) => {
  try {
    const res = await fetch(
      `${API_BASE}/flowers?shopId=${shopId}&sort=${sort}&page=${page}&limit=${limit}`
    );
    if (!res.ok) throw new Error("Error receiving products");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const toggleFavorite = async (id: number) => {
  try {
    const res = await fetch(`${API_BASE}/flowers/${id}/favorite`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Error receiving favorites");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
