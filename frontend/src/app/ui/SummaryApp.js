import {Provider as StoreProvider} from 'react-redux';
import { store } from '../lib/store';
import { ThemeProvider } from "styled-components";
import {theme} from '../lib/theme/theme';
import Summary from '../../pages/Summary';

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Summary/>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
