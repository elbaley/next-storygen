import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Alert } from "@/components/ui/alert";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Alert />
      <Toaster />
    </>
  );
};
