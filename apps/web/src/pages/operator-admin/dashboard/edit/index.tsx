import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/lib/backend/_core/breadcrumbs";
import { OperatorDashboardPage } from "components/lib/backend/operator/dashboard/operator/operator-dashboard-page";
import { OwnerOperatorDashboardProvider } from "components/lib/backend/operator/dashboard/operator/operator-dashboard-providers";
import { OperatorEdit } from "components/screens/backend/operator/dashboard/operator/operator-edit";

const OperatorPage: NextPage = () => {
  return (
    <OwnerOperatorDashboardProvider>
      <OperatorDashboardPage>
        {(operator) => (
          <>
            <Breadcrumbs
              list={[
                { href: urls.home(), title: "Home" },
                { href: urls.operators.dashboard(), title: "Dashboard" },
              ]}
              current="Edit operator"
            />

            <OperatorEdit id={operator._id} />
          </>
        )}
      </OperatorDashboardPage>
    </OwnerOperatorDashboardProvider>
  );
};

OperatorPage.getInitialProps = () => ({});

export default OperatorPage;
