import {createContext, useContext, useRef} from 'react';

export const IntegrationContext = createContext({
  onComplete: () => {},
  setClientSchedule: () => {},
  setAuthMetaData: () => {},
  wrapCallbackUrl: () => {},
  unwrapCallbackUrl: () => {},
  auth: '',
  state: {},
  apiKey: ''
});

const wrappedBaseUrl = [
  window.location.protocol,
  '//',
  window.location.host,
  '/summary?callback_url='
].join('');

export const IntegrationProvider = ({onComplete, auth, state, children}) => {
    const sharedState = useRef(state);
    const apiKey = atob(auth).split(':').shift();
    const setClientSchedule = (schedule) => {
      const stateObject = JSON.parse(atob(sharedState.current));
      if (!stateObject.client_metadata) {
        stateObject.client_metadata = {}
      }
      stateObject.client_metadata.schedule = schedule;
      sharedState.current = btoa(JSON.stringify(stateObject));
    }

    const setAuthMetaData = (data) => {
      const stateObject = JSON.parse(atob(sharedState.current));
      stateObject.auth_metadata = data;
      sharedState.current = btoa(JSON.stringify(stateObject));
    }
    const setProvider = (provider) => {
      const stateObject = JSON.parse(atob(sharedState.current));
      stateObject.provider_id = provider.id;
      sharedState.current = btoa(JSON.stringify(stateObject));
    }

    const wrapCallbackUrl = () => {
      const stateObject = JSON.parse(atob(sharedState.current));
      stateObject.callback_url = wrappedBaseUrl + btoa(stateObject.callback_url || '');
      sharedState.current = btoa(JSON.stringify(stateObject));
    }

    const unwrapCallbackUrl = () => {
      const stateObject = JSON.parse(atob(sharedState.current));
      if (stateObject.callback_url) {
        const orig = stateObject.callback_url;
        const basePart = stateObject.callback_url.replace(wrappedBaseUrl, '');
        stateObject.callback_url = basePart ? atob(basePart) : '';

        console.log('unwrapCallbackUrl',orig, '->', stateObject.callback_url);
        sharedState.current = btoa(JSON.stringify(stateObject));
      }
    }

    return (
      <IntegrationContext.Provider
        value={{
          onComplete: (action) => onComplete({state: sharedState.current, auth, action: action}),
          setAuthMetaData,
          setClientSchedule,
          setProvider,
          wrapCallbackUrl,
          unwrapCallbackUrl,
          auth,
          state: JSON.parse(atob(sharedState.current)),
          apiKey
      }}>
        {children}
      </IntegrationContext.Provider>
    );
}

export const useIntegration = () => useContext(IntegrationContext);
