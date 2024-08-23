
export async function getBrands() {
    const api = await fetch("http://localhost:3000/api/brands", {cache: "force-cache"})
    const res = await api.json()
    return res
}
export async function setproduct() {
    const api = await fetch("http://localhost:3000/api/product", {cache: "force-cache"})
    const res = await api.json()
    return res
}
export async function getItemsByBrands(brand: string) {
    const api = await fetch(`http://localhost:3000/api/ItemsByBrand?brand=${brand}`, {cache: "force-cache"})
    const res = await api.json()
    return res
}
export async function getItemByCategory(category: string) {
    const api = await fetch(`http://localhost:3000/api/itemsByCategory?category=${category}`, {cache: "force-cache"})
    const res = await api.json()
    return res
}

export async function getItemById(category: string, pd_id: string) {
    if(!category && pd_id)
        {
            const api = await fetch(`http://localhost:3000/api/ItemById?pd_id=${pd_id}`, {cache: "force-cache"})
            const res = await api.json()
            return res
        }

    const api = await fetch(`http://localhost:3000/api/ItemById?pd_category=${category}&pd_id=${pd_id}`, {cache: "force-cache"})
    const res = await api.json()
    return res
}

export async function getFeedItems() {
    const api = await fetch("http://localhost:3000/api/feedItems", {cache: "force-cache"})
    const res = await api.json()
    return res

}