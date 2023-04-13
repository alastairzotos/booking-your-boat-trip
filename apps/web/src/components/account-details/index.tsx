import { Typography } from "@mui/material";
import React from "react";

import { DeleteAccountButton } from "src/components/delete-account-button";
import { KeyValues } from "src/components/key-values";
import { useUserState } from "src/state/users";

export const AccountDetails: React.FC = () => {
  const user = useUserState((s) => s.loggedInUser);

  if (!user) {
    return <Typography>You are not logged in</Typography>;
  }

  return (
    <>
      <KeyValues
        sx={{ width: 600, mb: 3, mt: 3 }}
        kv={{
          Name: user.givenName,
          Email: user.email,
          Role: user.role,
        }}
      />

      <DeleteAccountButton />
    </>
  );
};