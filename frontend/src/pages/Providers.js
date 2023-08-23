import {Page} from '../shared/ui/Page';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchProviderList, selectLoading, selectProviders} from '../app/lib/store/reducers/providersReducer';
import ScreenTitle from '../shared/ui/ScreenTitle';
import Wrapper from '../shared/ui/Wrapper';
import Main from '../shared/ui/Main';
import {TouchableOpacity} from '../shared/ui/TouchableOpacity';
import FlatList from 'flatlist-react';
import ProviderButton from '../shared/ui/ProviderButton';
import {TextInput} from '../shared/ui/TextInput';
import {useIntegration} from '../app/ui/IntegrationContext';


const ProvidersContainer = styled.div`
  flex: 1;
  margin-top: 20px;
`;

export default function Providers() {
  const loading = useSelector(selectLoading);
  const providers = useSelector(selectProviders);
  //const country_code = useSelector(selectCountry);
  const {apiKey, state: {postal_address: {country_code}}, onComplete, wrapCallbackUrl, setProvider} = useIntegration();
  const dispatch = useDispatch();
  const [keyword, setState] = useState("");

  useEffect(() => {
    dispatch(fetchProviderList({ keyword, countryCode: country_code, apiKey }));
  }, [keyword, country_code, dispatch, apiKey]);

  return (
    <Page className='block-centered'>
        <ScreenTitle title={"Select your electricity provider"} />
        <Wrapper>
          <Main>
          <div className='search-block'>
              <TextInput
                placeholder={"Search"}
                className='search-input'
                placeholderTextColor="#aeacac"
                onInput={(e) => setState(e.target.value)}
                value={keyword}
                autoCapitalize="none"
                autoCorrect={"off"}
              />
            </div>
            <ProvidersContainer>
              <FlatList
                list={loading ? [] : providers}
                renderWhenEmpty={() => <div></div>}
                renderItem={( item, index ) => (
                  <TouchableOpacity
                    key={index.toString()}
                    onClick={() => {
                      wrapCallbackUrl();
                      setProvider(item);
                      onComplete(item.integration_settings.onboard_url);
                    }}
                  >
                    <ProviderButton item={item} />
                  </TouchableOpacity>
                )}
              />
            </ProvidersContainer>
          </Main>
        </Wrapper>
    </Page>
  );
}
