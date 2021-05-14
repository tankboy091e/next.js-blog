export default function convertTimestamp(timestamp: string): string {
  const [dow, month, date, year] = timestamp.split(' ')

  return `${year}년 ${months.indexOf(month) + 1}월 ${parseInt(date, 10)}일 ${dayOfWeek[dow]}요일`
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const dayOfWeek = {
  Sun: '일',
  Mon: '월',
  Tue: '화',
  Wed: '수',
  Thu: '목',
  Fri: '금',
  Sat: '토',
}
