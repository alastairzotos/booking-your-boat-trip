import { Grid } from "@mui/material";
import { OperatorDto } from "dtos";
import React from "react";

import { OperatorView } from "src/components/operator-view";

interface Props {
  operator: OperatorDto;
}

export const OperatorLayout: React.FC<React.PropsWithChildren<Props>> = ({
  operator,
  children,
}) => {
  return (
    <Grid container>
      <Grid item sm={12} md={4} sx={{ p: 2 }}>
        <OperatorView operator={operator} />
      </Grid>

      <Grid item sm={12} md={8} sx={{ p: 2 }}>
        {children}
      </Grid>
    </Grid>
  );
};
