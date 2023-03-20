import { Box } from "@mui/system";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { DefaultErrorFallback } from "src/components/default-error-fallback";
import { Footer } from "src/components/footer";
import { SeoHead } from "src/components/seo/head";
import { UserAppBar } from "src/components/user-app-bar";

export const UserLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SeoHead description="Book a boat in Corfu with ease" />
      <UserAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <ErrorBoundary FallbackComponent={DefaultErrorFallback}>
          <div>{children}</div>
        </ErrorBoundary>
        <Footer />
      </Box>
    </>
  );
};
