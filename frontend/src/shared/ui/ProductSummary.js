import styled from "styled-components";
import {SectionTitle} from './Section';

export const ProductSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProductSummaryTitle = styled.div`
  display: flex;
  align-items: center;
`;

export function ProductSummary({ provider, title }) {
  return (
    <ProductSummaryContainer>
      <SectionTitle>
        <ProductSummaryTitle>Tariff name: {title}</ProductSummaryTitle>
      </SectionTitle>
    </ProductSummaryContainer>
  );
}
