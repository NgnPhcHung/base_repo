export interface UserCreationBody {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  }

export interface SingleResult {
  data: {  };
  }

export interface User {
  id: number;
  isArchived?: boolean;
  dateCreate?: Date;
  dateUpdate?: Date;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  role: 'admin' | 'user';
  }

export interface UserLoginBody {
  username: string;
  password: string;
  }

export interface PaginationResult {
  limit: number;
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
  cursor: number;
  data: string[];
  total: number;
  }

export interface FriendRequestUpdatingBody {
  requestId: number;
  senderId: number;
  receiverId: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  }

export interface LocationQueryParams {
  limit: number;
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
  cursor: number;
  province: {  };
  ward: {  };
  district: {  };
  }

export interface ProvinceFilterParam {
  limit: number;
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
  cursor: number;
  name: string;
  code: number;
  }

