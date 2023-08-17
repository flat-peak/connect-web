import {Page} from '../shared/ui/Page';
import ScreenTitle from '../shared/ui/ScreenTitle';
import Wrapper from '../shared/ui/Wrapper';
import {
  resolveMonthLabelByKey,
  TARIFF_ALL_DAYS,
  TARIFF_ALL_MONTHS,
  TARIFF_DAYS,
  TARIFF_MONTHS, TARIFF_SIDE,
  TARIFF_WEEKDAYS, TARIFF_WEEKEND,
} from '../app/lib/config/config';
import PeriodCaption from '../shared/ui/PeriodCaption';
import Button from '../shared/ui/Button';
import {Text} from '../shared/ui/Text';
import {useDispatch, useSelector} from 'react-redux';
import {selectLoading} from '../app/lib/store/reducers/providersReducer';
import {useEffect, useState} from 'react';
import {
  fetchProvider,
  fetchTariff,
  findWeekdaySchedule,
  selectDisplayName,
  selectPlan,
  selectProvider,
} from '../app/lib/store/reducers/tariffReducer';
import {extractPeaks} from '../shared/lib/peak-utils';
import Divider from '../shared/ui/Divider';
import {Section, SectionHeader} from '../shared/ui/Section';
import {ProductSummary} from '../shared/ui/ProductSummary';
import ScheduleGraph from '../widgets/ScheduleGraph';
import ScheduleSummary from '../widgets/ScheduleSummary';
import TabSwitcher from '../shared/ui/TabSwitcher';
import {useIntegration} from '../app/ui/IntegrationContext';
import Footer from "../shared/ui/Footer";
import Main from "../shared/ui/Main";

export default function Summary() {
  const {state: {tariff_id, provider_id}, apiKey, unwrapCallbackUrl, onComplete} = useIntegration();
  const plan = useSelector(selectPlan);
  const title = useSelector(selectDisplayName);
  const provider = useSelector(selectProvider);
  // const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const sides = [
    { title: "Import", id: TARIFF_SIDE.IMPORT },
    { title: "Export", id: TARIFF_SIDE.EXPORT },
  ];

  const [side, setSide] = useState(TARIFF_SIDE.IMPORT);

  useEffect(() => {
    if (plan.id) {
      return;
    }
    dispatch(fetchTariff({ tariffId: tariff_id, apiKey }));
  }, [apiKey, dispatch, tariff_id, plan.id])

  useEffect(() => {
    if (plan.id) {
      return;
    }
    dispatch(fetchProvider({ providerId: provider_id, apiKey }));
  }, [apiKey, dispatch, provider_id, plan.id])

  if (!plan?.id || !provider?.id) {
    return null
  }

  const importSchedule = findWeekdaySchedule(plan[TARIFF_SIDE.IMPORT]);
  const exportSchedule = findWeekdaySchedule(plan[TARIFF_SIDE.EXPORT]);

  const hasExportOption = exportSchedule && exportSchedule.data?.length;

  const targetSchedule =
    side === TARIFF_SIDE.IMPORT || !hasExportOption
      ? importSchedule
      : exportSchedule;

  const displayedSeasons = targetSchedule
    ? targetSchedule.data.map((entry) => ({
      side: side,
      entry: entry,
    }))
    : [];

  return (
    <Page>
        <ScreenTitle title={"Confirm your tariff"} />
        <Wrapper>
          <Section>
            <SectionHeader isFirst={true}>
              {title && <ProductSummary provider={provider} title={title} />}
            </SectionHeader>
          </Section>

          {hasExportOption && (
            <>
              <Divider />
              <TabSwitcher
                options={sides}
                value={side}
                onChange={(v) => setSide(v)}
              />
            </>
          )}

          <Text variant={"label"}>Schedule:</Text>
          <Main>
          {displayedSeasons.map(({ entry, side: seasonSide }, index) => {
            let monthFrom = entry.months[0];
            let monthTo = entry.months[entry.months.length - 1];
            if (entry.months[0] === TARIFF_ALL_MONTHS) {
              monthFrom = TARIFF_MONTHS[0];
              monthTo = TARIFF_MONTHS[TARIFF_MONTHS.length - 1];
            }

            return (
              <div key={seasonSide + "_" + index.toString()}>
                {entry.days_and_hours.map((daysData, dayIndex) => {
                  let dayFrom = daysData.days[0];
                  let dayTo = daysData.days[daysData.days.length - 1];

                  if (!daysData.days.length) {
                    dayFrom = undefined;
                    dayTo = undefined;
                  } else if (daysData.days[0] === TARIFF_ALL_DAYS) {
                    dayFrom = TARIFF_DAYS[0];
                    dayTo = TARIFF_DAYS[TARIFF_DAYS.length - 1];
                  } else if (daysData.days[0] === TARIFF_WEEKDAYS) {
                    dayFrom = TARIFF_DAYS[0];
                    dayTo = TARIFF_DAYS[4];
                  } else if (daysData.days[0] === TARIFF_WEEKEND) {
                    dayFrom = TARIFF_DAYS[5];
                    dayTo = TARIFF_DAYS[6];
                  }

                  const peaks = extractPeaks(daysData.hours);

                  return (
                    <div key={dayIndex.toString()}>
                      <Section>
                        <SectionHeader>
                          <PeriodCaption
                            monthFrom={resolveMonthLabelByKey(monthFrom)}
                            monthTo={resolveMonthLabelByKey(monthTo)}
                            dates={entry.dates || []}
                            dayFrom={dayFrom}
                            dayTo={dayTo}
                          />
                        </SectionHeader>
                        {peaks.length ? (
                          <>
                            <ScheduleGraph
                              style={{ marginTop: 23 }}
                              peaks={peaks}
                            />
                            <ScheduleSummary
                              peaks={peaks}
                              currencyCode={provider.currency_code}
                            />
                          </>
                        ) : (
                          <Text>No data</Text>
                        )}
                      </Section>
                      <Divider style={{ marginBottom: 22 }} />
                    </div>
                  );
                })}
              </div>
            );
          })}
          </Main>
          <Footer>
            <Button
              title={"Save"}
              variant="executive"
              disabled={loading}
              onClick={() => {
                unwrapCallbackUrl();
                onComplete('/confirm')
              }}
            />
            <Button
              title={"Start Over"}
              variant="destructive"
              disabled={loading}
              onClick={() => {
                unwrapCallbackUrl();
                onComplete('/cancel')
              }}
            />
          </Footer>
        </Wrapper>
    </Page>
  );
}
