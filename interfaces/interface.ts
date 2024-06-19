export interface Product {
    brand: string;
    product: string;
    pd_picture: string;
    dscnt_price: string | null;
    pd_strike: string | null;
    pd_dscnt_price: string | null;
    item_spec: object,
    image_urls: string[];
    comments: string[] | null;
    product_id: string;
    seller_name: string;
    sizes: string[];
    product_desc: string;
    product_title: string;
    pd_material: string;
    price: string;
    ratings: string | null;
    rating_count: string | null;
    pdp_name: string;
}

export type Comment = {
    comment: string;
    images: string[];
    user_name: string;
    date: string;
  };
  