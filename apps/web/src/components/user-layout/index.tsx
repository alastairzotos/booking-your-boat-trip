import { Box, Container } from "@mui/material";
import * as React from "react";

import { SeoHead } from "src/components/seo/head";
import { UserAppBar } from "src/components/user-app-bar";

export const UserLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SeoHead description="Book a boat in Corfu with ease" />
      <UserAppBar />
      <Container maxWidth="xl">
        <Box sx={{ p: 4, mt: 2 }}>{children}</Box>
      </Container>
    </>
  );
};
