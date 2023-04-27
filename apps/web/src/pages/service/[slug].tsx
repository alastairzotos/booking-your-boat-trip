import { ServiceDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getServiceBySlug } from "clients/services.client";
import { SeoHead } from "components/lib/site/_core/seo-head";
import { UserLayoutContainer } from "components/lib/site/_core/user-layout-container";
import { UserServiceView } from "components/screens/site/service/service";

interface Props {
  service: ServiceDto;
}

const ServicePage: NextPage<Props> = ({ service }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle={`${service.name} by ${service.operator.name}`}
        description={service.description}
      />

      <UserServiceView service={service} />
    </UserLayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    return {
      props: {
        service: await getServiceBySlug(slug),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default ServicePage;
