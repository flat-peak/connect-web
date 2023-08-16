import styled from "styled-components";
import {TouchableOpacity} from './TouchableOpacity';
import {Text} from './Text';

const TabSwitcherContainer = styled.div`
  margin: 22px ${({ theme }) => theme.screenHorizontalOffset}px;
  background-color: ${({ theme }) => theme.colors.tabs.inactive};
  border-radius: ${({ theme }) => theme.roundness}px;
  flex-direction: row;
`;

const TabSwitcherControl = styled(TouchableOpacity)`
  flex: 1;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.roundness}px;
  z-index: ${({ isActive }) => (isActive ? 1 : 0)};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.tabs.active : "transparent"};
`;

export default function TabSwitcher({ options, value, onChange }) {
  return (
    <TabSwitcherContainer>
      {options.map((item) => (
        <TabSwitcherControl
          key={item.id}
          isActive={item.id === value}
          onClick={() => onChange(item.id)}
        >
          <Text variant="ui-control">{item.title}</Text>
        </TabSwitcherControl>
      ))}
    </TabSwitcherContainer>
  );
}
