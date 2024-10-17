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

export interface InventoryFilterParams {
  limit: number;
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
  cursor: number;
  categoryId: number;
  status: 'Published' | 'Unpublished' | 'Removed' | 'Expired' | 'ZeroStock';
  }

export interface CartCreationBody {
  seller: number;
  buyer: number;
  quantity: number;
  itemId: number;
  }

export interface Category {
  id: number;
  isArchived?: boolean;
  dateCreate?: Date;
  dateUpdate?: Date;
  title: string;
  status: 'Inuse' | 'Deprecated' | 'Unused';
  description?: string;
  parent?: any;
  children?: any;
  inventories?: any[];
  }

export interface Inventory {
  id: number;
  isArchived?: boolean;
  dateCreate?: Date;
  dateUpdate?: Date;
  title: string;
  description: string;
  price: any;
  quantity: any;
  status: 'Published' | 'Unpublished' | 'Removed' | 'Expired' | 'ZeroStock';
  category: any;
  user: any;
  }

export interface Cart {
  id: number;
  isArchived?: boolean;
  dateCreate?: Date;
  dateUpdate?: Date;
  itemData: any;
  quantity: number;
  buyer: any;
  seller: any;
  }

export interface CartItemUpdatingBody {
  quantity: number;
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

export interface MarketCreationBody {
  orderItems: string[];
  buyer: number;
  seller: number;
  discount?: any;
  total: number;
  }

export interface CategoryEntity {
  hash: string;
  createdBy: number;
  updatedBy: number;
  isArchived: boolean;
  dateCreate: Date;
  dateUpdate: Date;
  title: string;
  status: 'Inuse' | 'Deprecated' | 'Unused';
  description: string;
  inventories: string[];
  }

export interface UserEntity {
  hash: string;
  createdBy: number;
  updatedBy: number;
  isArchived: boolean;
  dateCreate: Date;
  dateUpdate: Date;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  sentFriendRequests?: any[];
  receivedFriendRequests?: any[];
  userTwo?: any[];
  ordersAsBuyer?: any[];
  ordersAsSeller?: any[];
  cartForBuyer?: any[];
  cartForSeller?: any[];
  }

export interface InventoryEntity {
  hash: string;
  createdBy: number;
  updatedBy: number;
  isArchived: boolean;
  dateCreate: Date;
  dateUpdate: Date;
  title: string;
  description: string;
  price: any;
  quantity: any;
  status: 'Published' | 'Unpublished' | 'Removed' | 'Expired' | 'ZeroStock';
  category: any;
  user: any;
  views: number;
  }

export interface MarketFilterParams {
  limit: number;
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
  cursor: number;
  }

