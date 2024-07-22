import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear.js' // ES 2015

dayjs.extend(weekOfYear);

const now = dayjs()

console.log(now.date())