import { FriendRequestStatus } from "./consts";

export interface FriendRequestUpdatingBody {
  requestId: number
  
  senderId: number;

  receiverId: number;

  status: FriendRequestStatus;
}


import { UserRole } from "./consts";

export interface UserCreationBody {
  firstName: string;

  lastName: string;

  username: string;

  password: string;

  role: UserRole;
}



export interface UserLoginBody {
  username: string;

  password: string;
}


