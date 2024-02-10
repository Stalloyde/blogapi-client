import { DateTime } from 'luxon';

const formatDate = (date: string) =>
  DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);

export default formatDate;
