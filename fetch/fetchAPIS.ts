
export async function getBrands() {
    const api = await fetch("https://zeeshop-tau.vercel.app/api/brands", {cache: "force-cache"})
    const res = await api.json()
    return res
}
export async function setproduct() {
    const api = await fetch("https://zeeshop-tau.vercel.app/api/product", {cache: "force-cache"})
    const res = await api.json()
    return res
}
export async function getItemsByBrands(brand: string) {
    const api = await fetch(`https://zeeshop-tau.vercel.app/api/ItemsByBrand?brand=${brand}`, {cache: "force-cache"})
    const res = await api.json()
    return res
}
export async function getItemByCategory(category: string) {
    const api = await fetch(`https://zeeshop-tau.vercel.app/api/itemsByCategory?category=${category}`, {cache: "force-cache"})
    const res = await api.json()
    return res
}

export async function getItemById(category: string, pd_id: string) {
    if(!category && pd_id)
        {
            const api = await fetch(`https://zeeshop-tau.vercel.app/api/ItemById?pd_id=${pd_id}`, {cache: "force-cache"})
            const res = await api.json()
            return res
        }

    const api = await fetch(`https://zeeshop-tau.vercel.app/api/ItemById?pd_category=${category}&pd_id=${pd_id}`, {cache: "force-cache"})
    const res = await api.json()
    return res
}

export async function getFeedItems() {
    const api = await fetch("https://zeeshop-tau.vercel.app/api/feedItems", {cache: "force-cache"})
    const res = await api.json()
    return res

}