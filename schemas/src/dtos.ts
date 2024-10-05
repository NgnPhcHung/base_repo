export interface UserCreationBody {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: 'admin' | 'user' | 'shop owner';
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
  role: 'admin' | 'user' | 'shop owner';
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

export interface CartCreationBody {
  seller: number;
  buyer: number;
  quantity: number;
  itemId: number;
  }

export interface Discount {
  id: number;
  isArchived?: boolean;
  dateCreate?: Date;
  dateUpdate?: Date;
  name: string;
  description: string;
  discountType: string;
  startDate: any;
  endDate: any;
  isActive: any;
  maxUses: any;
  usesCount: any;
  usersUsed: string[];
  maxUsedPerUser: any;
  minOrderValue: any;
  discountValue: any;
  applyType: string;
  discountItems: string[];
  discountOrders: string[];
  }

export interface Order {
  id: number;
  isArchived?: boolean;
  dateCreate?: Date;
  dateUpdate?: Date;
  title: string;
  status: string;
  orderDate: Date;
  total: number;
  buyer: any;
  seller: any;
  discountData?: any;
  }

export interface PurchaseOrderCreationBody {
  orderItems: string[];
  buyer: number;
  seller: number;
  discount?: any;
  total: number;
  }

