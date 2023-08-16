import styled from "styled-components";
import { Text } from "../shared/ui/Text";
import {getPeakColor, getPeakLabel} from '../shared/lib/peak-utils';
import {formatCurrency} from '../shared/lib/util';
import {PriceMarker} from './PriceMarker';

const GraphTableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 10px;
`;

const GraphTableCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const PriceCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const PrimaryText = styled.span`
  font-size: 16px;
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text.body};
`;

export default function ScheduleSummary({ peaks, currencyCode }) {
  if (!peaks || !peaks.length) {
    return null;
  }

  const formatTime = (v) => v.substring(0, 5);
  const entries = peaks.map((item, index) => {
    const nextPeak = peaks[index + 1];
    return (
      <GraphTableRow key={index.toString()}>
        <GraphTableCol>
          <PriceMarker color={getPeakColor(item.type)} />
          <PriceCol>
            <PrimaryText>{getPeakLabel(item.type)}</PrimaryText>
            <PrimaryText>
              {formatCurrency(item.price || 0, currencyCode)} / kWh
            </PrimaryText>
          </PriceCol>
        </GraphTableCol>
        <div>
          <PrimaryText>
            {[
              formatTime(item.timeFrom),
              formatTime(nextPeak ? nextPeak.timeFrom : peaks[0].timeFrom),
            ].join(" - ")}
          </PrimaryText>
        </div>
      </GraphTableRow>
    );
  });

  return (
    <>
      <Text variant={"label"}>Prices</Text>
      {entries}
    </>
  );
}
