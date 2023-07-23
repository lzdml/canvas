export interface ReqParams {
  username: string;
  password: string;
}

export interface ReqAuth {
  auths: string[];
  modules: string[];
  is_admin?: 0 | 1;
}

export interface ResResult {
  data?: ResResultData;
  status: string | '';
  headers: object;
}
export interface ResResultData {
  code?: number;
  result?: any;
  message: string;
  status: string;
}

export interface LoginResultData {
  status: number | string;
  msg: string;
}

export interface RankData {
  point_all: string;
  time_end: string;
  ue_account: string;
  [key: string]: unknown;
}

export type RankResultData = LoginResultData & {
  data: RankData[];
};
