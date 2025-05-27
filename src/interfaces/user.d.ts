export interface User {
  user_id: number;
  email: string;
  full_name: string;
  telephone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewUser extends Pick<User, "full_name", "email"> {}
