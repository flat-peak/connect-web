import styled from "styled-components";

const Main = styled.main.attrs(() => ({id: 'main'}))`
  flex: 1;
  max-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default Main;
