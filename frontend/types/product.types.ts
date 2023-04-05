export interface ITable {
  id: string;
  code: string;
  name: string;
  category: string;
  brand: string;
  type: string;
  description: string;
}

export interface IProductProps {
  current_page: number;
  data: ITable[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { active: string; label: string; url: string }[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
