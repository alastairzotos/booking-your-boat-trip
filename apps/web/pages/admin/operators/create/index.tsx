import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorCreate } from "src/components/operator-create";

const CreateOperatorPage: NextPage = () => {
  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.operators(), title: "Operators" },
        ]}
        current="Create operator"
      />

      <OperatorCreate />
    </>
  );
};

CreateOperatorPage.getInitialProps = () => ({});

export default CreateOperatorPage;
