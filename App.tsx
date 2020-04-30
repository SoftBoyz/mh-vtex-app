import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import React from "react";
import { default as theme } from "./assets/theme/theme.json";
import { AppNavigator } from "./src/routes";

export default () => (
  <>
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);
