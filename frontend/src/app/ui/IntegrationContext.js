import {createContext, useContext, useRef} from 'react';

export const IntegrationContext = createContext({
  onComplete: () => {},
  setClientSchedule: () => {},
  setAuthMetaData: () => {},
  auth: '',
  state: '',
  apiKey: ''
});

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

    return (
      <IntegrationContext.Provider
        value={{
          onComplete: (action) => onComplete({state: sharedState.current, auth, action: action}),
          setAuthMetaData,
          setClientSchedule,
          setProvider,
          auth,
          state: JSON.parse(atob(sharedState.current)),
          apiKey
      }}>
        {children}
      </IntegrationContext.Provider>
    );
}

export const useIntegration = () => useContext(IntegrationContext);
