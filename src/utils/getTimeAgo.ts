import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

export const getTimeAgo = (date: Date) => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};
