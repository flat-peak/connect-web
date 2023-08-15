import styled from "styled-components";

const Wrapper = styled.div`
  flex: 1;
  padding: 0 ${({ theme }) => theme.screenHorizontalOffset}px;
  display: flex;
  flex-direction: column;
`;

export default Wrapper;
