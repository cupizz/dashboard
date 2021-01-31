export type PieDataType = {
  x: string;
  y: number;
};

export type SearchDataType = {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
};

export type UserLikeCountType = {
  id: string;
  index: number;
  nickName: string;
  count: number;
};

export type OfflineDataType = {
  name: string;
  cvr: number;
};

export type OfflineChartData = {
  x: any;
  y1: number;
  y2: number;
};

export type RadarData = {
  name: string;
  label: string;
  value: number;
};
