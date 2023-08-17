import styled from 'styled-components';

export const Page = styled.article.attrs(() => ({id: 'page'}))`
  height: 100%;
  max-height: min(100vh, 844px);
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  box-sizing: border-box;
`;
