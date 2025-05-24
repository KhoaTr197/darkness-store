export interface BaseApiResponse {
  status: 'success' | 'error';
  message?: string;
  error?: string;
  queryTime?: number;
  url?: string;
  page?: number;
  total?: number;
}

export interface ProductApiResponse extends BaseApiResponse {
  data: Product;
}
export interface ProductsApiResponse extends BaseApiResponse {
  list: Product[];
}

export interface ReviewsApiResponse extends BaseApiResponse {
  data: Review[];
}