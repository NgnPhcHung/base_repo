export interface UserCreationBody {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: "admin" | "user";
}

export interface SingleResult {
  data: {};
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
  role: "admin" | "user";
}

export interface UserLoginBody {
  username: string;
  password: string;
}

export interface PaginationResult {
  data: {}[][];
  total: number;
  page: number;
  limit: number;
}

export interface FriendRequestUpdatingBody {
  senderId: number;
  receiverId: number;
  status: "Pending" | "Accepted" | "Rejected";
}
