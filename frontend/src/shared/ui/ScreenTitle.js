import styled from "styled-components";
import {Text} from "./Text";

const ScreenTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px ${({ theme }) => theme.screenHorizontalOffset}px 12px;
`;

const ScreenSubTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px ${({ theme }) => theme.screenHorizontalOffset}px 12px;
`;

const ScreenTitleText = styled.div`
  ${({ theme }) => `
    color: ${theme.colors.text.heading};
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.heading}px;
    line-height: ${theme.fontSizes.heading * 1.5}px;
    text-align: left;
  `}
`;
export default function ScreenTitle({ title, subTitle }) {
  return (
    <>
      <ScreenTitleContainer>
        <ScreenTitleText>{title}</ScreenTitleText>
      </ScreenTitleContainer>
      {subTitle && (
        <ScreenSubTitleContainer>
          <Text variant="sub-heading">{subTitle}</Text>
        </ScreenSubTitleContainer>
      )}
    </>
  );
}
