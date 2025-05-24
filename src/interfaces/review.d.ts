export interface Review {
  review_id: number;
  User: ReviewUser;
  product_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}