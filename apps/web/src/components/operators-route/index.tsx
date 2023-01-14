import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useUserState } from '../../state/user';
import { urls } from '../../urls';

export const OperatorsRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const user = useUserState(s => s.loggedInUser);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user?.role !== 'admin' && user?.role !== 'operator') {
        router.push(urls.home());
      }
    }
  }, [user?.role])

  return (
    <>
      {children}
    </>
  )
}