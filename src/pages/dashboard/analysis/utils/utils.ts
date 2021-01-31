import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import moment from 'moment';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

export function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type: 'week' | 'month'): RangePickerValue {
  if (type === 'week') {
    return [moment().subtract(1, 'weeks'), moment()];
  }

  return [moment().subtract(1, 'months'), moment()];
}
