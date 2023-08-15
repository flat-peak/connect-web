import styled from "styled-components";
import {CheckBox, CheckBoxOutlineBlank} from '@styled-icons/material';
import {TouchableOpacity} from './TouchableOpacity';

const CheckboxContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 19px;
  height: 64px;
  box-sizing: border-box;
  padding: 0 15px;
  border-style: solid;
  display: flex;
  border-color: ${({ theme }) => theme.colors.text.guidingButton};
  border-width: 1px;
  border-radius: ${({ theme }) => theme.roundness}px;
  position: relative;
`;

const CheckboxLabel = styled.span`
  margin-left: 40px;
  color: ${({ theme }) => theme.colors.text.uiControl};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 19px;
  line-height: 23px;
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


export default function Checkbox({ title, value, onChange }) {
  return (
    <CheckboxContainer onClick={() => onChange && onChange(!value)}>
      { !!value ? <CheckedIcon/> : <UncheckedIcon/>}
      <CheckboxLabel>{title}</CheckboxLabel>
    </CheckboxContainer>
  );
}
