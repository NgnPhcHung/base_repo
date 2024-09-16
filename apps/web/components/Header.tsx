import { currentUser } from "@/store";

export const Header = () => {
  const { user } = currentUser((state) => ({ user: state.user }));

  return <>{user?.fullName}</>;
};
