import styled from "styled-components";

export const PriceMarker = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 4.5px;
  background-color: ${({ color }) => color || "#ffffff"};
  margin-right: 10px;
  margin-top: 5px;
`;
