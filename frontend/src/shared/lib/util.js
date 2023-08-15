export const addLeadingZero = (v) => (v < 10 ? "0" + String(v) : String(v));

/**
 * @param {string} from
 * @param {string} to
 * @return {string}
 */
export const formatRangeValues = (from, to) => {
  const rangeFromLabel = typeof from !== "undefined" ? String(from) : "";
  const rangeToLabel = typeof to !== "undefined" ? String(to) : "";
  if (!rangeFromLabel || !rangeFromLabel) {
    return rangeFromLabel || rangeToLabel;
  }
  if (rangeFromLabel === rangeToLabel) {
    return rangeFromLabel;
  }
  return `${rangeFromLabel} - ${rangeToLabel}`;
};

/**
 * Formats dates array:
 * [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] -> 1-15
 * [1,2,3,4,5,8,11,12,13] -> 1-5, 8, 11-13
 * @param {Array<string|number>} dates
 * @return {string}
 */
export const formatDateRanges = (dates) => {
  return dates
    .map(Number)
    .sort((a, b) => a - b)
    .reduce((acc, date) => {
      if (acc.length) {
        const last = acc[acc.length - 1];
        if (last.to + 1 === date) {
          last.to = date;
          return acc;
        }
      }
      return acc.concat([{ from: date, to: date }]);
    }, [])
    .map(({ from, to }) => formatRangeValues(from, to))
    .join(", ");
};
