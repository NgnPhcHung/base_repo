import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-screen h-screen grid place-items-center">{children}</div>
  );
}
