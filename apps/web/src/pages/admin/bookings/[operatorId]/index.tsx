import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { BookingAnalytics } from "components/screens/backend/screens/admin/screens/bookings/screens/booking-analytics";
import { Breadcrumbs } from "components/screens/backend/lib/breadcrumbs";

const OperatorBookingsPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.operatorId as string;

  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.bookings(), title: "Bookings" },
        ]}
        current="Operator"
      />

      <BookingAnalytics operatorId={id} />
    </>
  );
};

OperatorBookingsPage.getInitialProps = () => ({});

export default OperatorBookingsPage;
