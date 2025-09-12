const API_BASE = "http://localhost:5000";

export const fetchFlowersByShop = async (
  shopId: number,
  sort: "asc" | "desc" = "asc"
) => {
  try {
    const res = await fetch(
      `${API_BASE}/flowers?shopId=${shopId}&sort=${sort}`
    );
    if (!res.ok) throw new Error("Помилка при отриманні квітів");
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
    if (!res.ok) throw new Error("Помилка при оновленні улюбленого");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
