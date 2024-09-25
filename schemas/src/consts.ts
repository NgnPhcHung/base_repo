export enum CategoryStatus {
  Inuse = "Inuse",
  Deprecated = "Deprecated",
  Unused = "Unused",
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

export enum InventoryStatusType {
    Published = "Published",
    Unpublished = "Unpublished",
    Removed = "Removed",
    Expired = "Expired",
    ZeroStock = "ZeroStock",
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
}

