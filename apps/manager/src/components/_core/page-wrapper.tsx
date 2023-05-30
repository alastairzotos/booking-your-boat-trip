import { ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import React from "react";

import {
  ColorModeContextProvider,
  ColourModeActions,
} from "contexts/color-mode";
import { ColourMode, getColourMode, setColourMode } from "util/colour";

export const PageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [mode, setMode] = React.useState<ColourMode>(getColourMode());
  const colorMode = React.useMemo<ColourModeActions>(
    () => ({
      toggleColourMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        setColourMode(newMode);
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: grey[100],
                  paper: "#fff",
                },
              }
            : {
                background: {
                  default: "#000",
                  paper: "#2a2a2a",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContextProvider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {children}
      </ThemeProvider>
    </ColorModeContextProvider>
  );
};
