import styled from "styled-components";
import {TouchableOpacity} from './TouchableOpacity';

export const Section = styled.div`
  margin-bottom: 20px;
`;
export const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ isFirst }) => (isFirst ? 0 : 10)}px;
`;

export const SectionTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 17px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.text.body};
`;

const ButtonText = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 15px;
  line-height: 18px;
  color: #73adfe;
`;

export function SectionButton({ label, ...props }) {
  return (
    <TouchableOpacity {...props}>
      <ButtonText>{label}</ButtonText>
    </TouchableOpacity>
  );
}
