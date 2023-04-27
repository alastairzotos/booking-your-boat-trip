import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/screens/backend/lib/breadcrumbs";
import { ServiceSchemaCategoryCreate } from "components/screens/backend/screens/admin/screens/schema-categories/screens/service-schema-category-create";

const ServiceSchemaCategoryCreatePage: NextPage = () => {
  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          {
            href: urls.admin.serviceSchemaCategories(),
            title: "Service schema categories",
          },
        ]}
        current="Create service schema category"
      />

      <ServiceSchemaCategoryCreate />
    </>
  );
};

ServiceSchemaCategoryCreatePage.getInitialProps = () => ({});

export default ServiceSchemaCategoryCreatePage;
