export interface UserTableListItem {
  key: number;
  active?: boolean;
  avatar: string;
  nickName: string;
  email: string;
  phone: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface UserTableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface UserTableListData {
  list: UserTableListItem[];
  pagination: Partial<UserTableListPagination>;
}

export interface UserTableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
