import { DateTime } from 'luxon';

const formatDate = (date: Date) =>
  DateTime.fromISO(date.toString()).toLocaleString(DateTime.DATE_MED);

export default formatDate;
