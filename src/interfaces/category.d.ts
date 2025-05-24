export interface Category {
  name: string;
  url_slug: string;
  parent_id: number | null;
  level: number;
  path: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}