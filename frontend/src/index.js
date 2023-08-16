import React from 'react';
import ReactDOM from 'react-dom/client';
import ProvidersApp from './app/ui/ProvidersApp';
import {IntegrationProvider} from './app/ui/IntegrationContext';
import SummaryApp from './app/ui/SummaryApp';

window.bootstrap = (({auth, state, apiUrl, mode, onComplete}) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <IntegrationProvider
      auth={auth}
      state={state}
      apiUrl={apiUrl}
      onComplete={onComplete}>
      {mode === 'summary' ? <SummaryApp/> : <ProvidersApp />}
    </IntegrationProvider>
  );
})
