import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";
import { urls } from "urls";

import { useUserState } from "src/state/user";

export const AdminRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const user = useUserState((s) => s.loggedInUser);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user?.role !== "admin") {
        router.push(urls.home());
      }
    }
  }, [user?.role]);

  return <>{children}</>;
};
