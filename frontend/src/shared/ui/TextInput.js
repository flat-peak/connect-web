import styled from "styled-components";

export const TextInput = styled.input`
  background-color: #ffffff;
  width: 100%;
  box-sizing: border-box;
  height: 44px;
  border-radius: ${({ theme }) => theme.roundness}px;
  padding: 0 18px;
  font-family: ${({ theme }) => theme.fonts.body};
  border: 1px solid ${({ theme }) => theme.colors.body};
`;
