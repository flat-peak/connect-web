import styled from "styled-components";

const Wrapper = styled.section.attrs(() => ({id: 'wrapper'}))`
  padding: 0 ${({ theme }) => theme.screenHorizontalOffset}px;
  display: flex;
  flex-direction: column;

  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
`;

export default Wrapper;
