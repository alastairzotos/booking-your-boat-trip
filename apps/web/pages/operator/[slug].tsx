import { OperatorDto, ServiceDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getOperatorWithServicesById } from "src/clients/operators.client";
import { OperatorLayout } from "src/components/operator-layout";
import { SeoHead } from "src/components/seo/head";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserServicesView } from "src/components/user-services-view";

interface Props {
  operator: OperatorDto;
  services: ServiceDto[];
}

const OperatorPage: NextPage<Props> = ({ operator, services }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle={operator.name}
        description={`View details and services offered by ${operator.name}`}
      />
      <OperatorLayout operator={operator}>
        <UserServicesView services={services} groupByType />
      </OperatorLayout>
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

  const operatorId = slug.split("-").pop()!;

  try {
    const { operator, services } = await getOperatorWithServicesById(
      operatorId
    );

    return {
      props: {
        operator,
        services,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default OperatorPage;
