export interface UserCreationBody {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
  }

export interface SingleResult {
  data: { [key: string]: any };
  }

export interface User {
  id: number;
  hash?: string;
  isArchived?: boolean;
  dateCreate?: Date;
  dateUpdate?: Date;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  role: string;
  }

export interface UserLoginBody {
  username: string;
  password: string;
  }

export interface PaginationResult {
  data: { [key: string]: any };
  total: number;
  page: number;
  limit: number;
  }

export interface FriendRequestUpdatingBody {
  senderId: number;
  receiverId: number;
  status: string;
  }

