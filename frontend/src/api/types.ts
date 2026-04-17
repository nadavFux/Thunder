export interface User {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  created_at: string;
}

export interface Mission {
  id: string;
  name: string;
  description?: string;
  project_id: string;
  aoi: Record<string, unknown>;
  stac_items: string[];
  created_at: string;
}

export interface Job {
  id: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  mission_id: string;
  results_collection?: string;
  created_at: string;
  updated_at: string;
}

export interface STACItem {
  id: string;
  collection: string;
  properties: Record<string, unknown>;
  assets: Record<string, unknown>;
  bbox: number[];
  geometry: Record<string, unknown>;
}

export interface DRAConfig {
  contrast: number;
  brightness: number;
  gamma: number;
}

export interface APIError {
  detail: string | { msg: string; type: string; loc: (string | number)[] }[];
}
