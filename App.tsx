import * as eva from '@eva-design/eva';
import { ApplicationProvider } from "@ui-kitten/components";
import React from 'react';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return <HomeScreen/>
}

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App/>
  </ApplicationProvider>
)