import styled from "styled-components";
import { Text } from "./Text";
import {TouchableOpacity} from './TouchableOpacity';
import {CheckBox, CheckBoxOutlineBlank} from '@styled-icons/material'

export const ButtonContainer = styled.div`
  margin-top: 24px;
  background-color: ${({ theme }) => theme.colors.buttons.guiding};
  border-color: ${({ theme }) => theme.colors.text.guidingButton};
  border-width: 1px;
  border-radius: ${({ theme }) => theme.roundness}px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: ${({ checked }) => (checked ? 1 : 0.5)};
`;

const CheckedIcon = styled(CheckBox).attrs(({ theme }) => ({
  width: 24,
  height: 24,
  color: theme.colors.text.uiControl,
}))`
  position: absolute;
  left: 15px;
`;
const UncheckedIcon = styled(CheckBoxOutlineBlank).attrs(({ theme }) => ({
  width: 24,
  height: 24,
  color: theme.colors.text.uiControl,
}))`
  position: absolute;
  left: 15px;
`;

export default function ButtonCheckbox({ title, subTitle, value, onChange }) {
  return (
    <TouchableOpacity onClick={() => onChange && onChange(!value)}>
      <ButtonContainer checked={!!value}>
        { !!value ? <CheckedIcon/> : <UncheckedIcon/>}
        <Text variant={"guiding-button"}>{title}</Text>
        {subTitle && <Text variant={"guiding-button-sub"}>{subTitle}</Text>}
      </ButtonContainer>
    </TouchableOpacity>
  );
}
