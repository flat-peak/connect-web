import {Provider as StoreProvider} from 'react-redux';
import { store } from '../lib/store';
import Router from './Router';
import { ThemeProvider } from "styled-components";
import {theme} from '../lib/theme/theme';

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router/>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
