export interface Product {
  product_id: number;
  name: string;
  url_slug: string;
  description: string;
  low_stock_threshold: number;
  stock_quantity: number;
  original_price: number;
  sales_off: number;
  new_price: number;
  thumbnail_url: string;
  sales_count: number;
  views_count: number;
  average_rating: number;
  brand_id: number;
  is_active: boolean;
  specifications: any;
  created_at: string;
  updated_at: string;
  Brands: {
    name: string;
    logo_url: string;
  };
  Categories: {
    name: string;
    url_slug: string;
  }[];
};
