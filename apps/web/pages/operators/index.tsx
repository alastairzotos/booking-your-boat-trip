import { OperatorDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { SeoHead } from "src/components/seo/head";
import { Titled } from "src/components/titled";
import { UserOperatorsList } from "src/components/user-operators-list";
import { OperatorsService } from "src/services/operators.service";

interface Props {
  operators: OperatorDto[];
}

const OperatorsPage: NextPage<Props> = ({ operators }) => {
  return (
    <>
      <SeoHead
        subtitle="Operators"
        description="View list of available operators"
      />

      <Titled title="Tour operators">
        <UserOperatorsList operators={operators} />
      </Titled>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const svc = new OperatorsService();

  return {
    props: {
      operators: await svc.getOperators(),
    },
  };
};

export default OperatorsPage;
