export enum CategoryStatus {
  Inuse = "Inuse",
  Deprecated = "Deprecated",
  Unused = "Unused",
}

export enum DiscountApplyType {
  All = "All",
  Specific = "Specific",
}


export enum FriendEvents {
  SendFriendRequest = "sendFriendRequest",
  FriendRequestSent = "friendRequestSent",
  ReceiveFriendRequest = "receiveFriendRequest",
  AcceptFriendRequest = "acceptFriendRequest",
}

export enum FriendRequestStatus {
  Pending = "Pending",
  Accepted = "Accepted",
  Rejected = "Rejected",
}

export enum InventoryStatus {
  Published = "Published",
  Unpublished = "Unpublished",
  Removed = "Removed",
  Expired = "Expired",
  ZeroStock = "ZeroStock",
}

export enum DiscountType {
  Percentage = "Percentage",
  FixedAmount = "Fixed Amount",
}

export enum OrderStatus {
  New = "New",
  Confirmed = "Confirmed",
  Completed = "Completed",
  Draft = "Draft",
  Open = "Open",
  ToBePaid = "ToBePaid",
}

export enum RfqStatus {
  Draft = "Draft",
  Open = "Open",
  QuotedPartially = "QuotedPartially",
  Quoted = "Quoted",
  OrderedPartially = "OrderedPartially",
  Ordered = "Ordered",
  Cancelled = "Cancelled",
  Expired = "Expired",
  UnderBidding = "UnderBidding",
}

export enum SocketEvents {
  JoinRoom = "joinRoom",
  Error = "error",
}

export enum UserRole {
  Admin = "admin",
  User = "user",
  ShopOwner = "shop owner",
}

