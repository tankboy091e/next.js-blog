export function convertTimestamp(timestamp: string): string {
  const [dow, month, date, year] = timestamp.split(' ')

  return `${year}년 ${months.indexOf(month) + 1}월 ${parseInt(date, 10)}일 ${dayOfWeek[dow]}요일`
}

export function convertBookDate(timestamp: string): string {
  const [year, month, date] = timestamp.split('-')
  return `${year}년 ${parseInt(month, 10)}월 ${parseInt(date, 10)}일`
}

export function convetDatetime(timestamp: string): string {
  // eslint-disable-next-line no-unused-vars
  const [_, month, date, year] = timestamp.split(' ')

  return `${year}-${months.indexOf(month) + 1}-${parseInt(date, 10)}`
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
