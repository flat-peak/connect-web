import styled from "styled-components";
import {TouchableOpacity} from './TouchableOpacity';

export const EditableTableRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${({ isLast }) => (isLast ? 0 : 18)}px;
  justify-content: space-between;
`;

export const EditableTableBoxes = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const EditableTableBox = styled(TouchableOpacity)`
  background-color: #ffffff;
  border-width: 1px;
  border-color: #000000;
  border-style: solid;
  border-radius: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 7px 14px;
  margin-left: ${({ isFirst }) => (isFirst ? 0 : 18)}px;
  position: relative;
  row-gap: 4px;
`;

export const EditableTableControl = styled.div`
  width: 35px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const EditableTableGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const EditableTableLabel = styled.span`
  display: flex;
  font-size: 17px;
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.body};
  color: #2c1a56;
`;

export const EditableTableValue = styled.span`
  font-size: ${({ isLong }) => (isLong ? 14 : 16)}px;
  line-height: 22px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  color: #333333;
`;

export const EditableTableInput = styled.input`
  font-size: ${({ isLong }) => (isLong ? 14 : 16)}px;
  line-height: 16px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  color: #333333;
  padding: 0;
  top: -2px;
  border: none;
  -webkit-appearance: none;
  background-color: transparent;
  width: 100%;
  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

export const EditableTableSelect = styled.select`
  font-size: ${({ isLong }) => (isLong ? 14 : 16)}px;
  line-height: 22px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  color: #333333;
  top: 0px;
  left: 0px;
  border: none;
  -webkit-appearance: none;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: transparent;
  padding: 14px 14px 0 14px;
  &:focus {
    outline: none;
  }
`;
