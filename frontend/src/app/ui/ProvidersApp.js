import {Provider as StoreProvider} from 'react-redux';
import { store } from '../lib/store';
import { ThemeProvider } from "styled-components";
import {theme} from '../lib/theme/theme';
import Providers from '../../pages/Providers';
import React from 'react';

function ProvidersApp() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Providers/>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default ProvidersApp;
