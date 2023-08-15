import styled from 'styled-components';

export const TouchableOpacity = styled.div
   .attrs(({disabled, onClick}) => {
     return {
       onClick: (e) => !disabled && onClick && onClick(e),
       'data-disabled': disabled
    }
   })`
  & {
    opacity: 1;
  }
  &:active {
    opacity: 0.7;
  }
`;
