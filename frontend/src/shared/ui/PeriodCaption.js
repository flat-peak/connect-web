import styled from "styled-components";
import {formatDateRanges, formatRangeValues} from '../lib/util';

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
`;

const PeriodBox = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 1px 6px;
`;

const PeriodLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  color: #000000;
  font-size: 16px;
  line-height: 20px;
`;

export default function PeriodCaption({
  monthFrom,
  monthTo,
  dates,
  dayFrom,
  dayTo,
}) {
  return (
    <PeriodContainer>
      <PeriodBox>
        <PeriodLabel>{formatRangeValues(monthFrom, monthTo)}</PeriodLabel>
      </PeriodBox>

      {Boolean(dates?.length) && (
        <PeriodBox>
          <PeriodLabel>{formatDateRanges(dates)}</PeriodLabel>
        </PeriodBox>
      )}

      {Boolean(dayFrom && dayTo) && (
        <PeriodBox>
          <PeriodLabel>{formatRangeValues(dayFrom, dayTo)}</PeriodLabel>
        </PeriodBox>
      )}
    </PeriodContainer>
  );
}
