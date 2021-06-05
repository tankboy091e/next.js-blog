export function getDateArray(timestamp: string) {
  const [dow, month, date, year] = timestamp.split(' ')
  return {
    dow: dayOfWeek[dow],
    month: months.indexOf(month) + 1,
    date: parseInt(date, 10),
    year,
  }
}

export function convertTimestamp(timestamp: string): string {
  const {
    dow,
    month,
    date,
    year,
  } = getDateArray(timestamp)

  return `${year}년 ${month}월 ${date}일 ${dow}요일`
}

export function convertBookDate(timestamp: string): string {
  const [year, month, date] = timestamp.split('-')
  return `${year}년 ${parseInt(month, 10)}월 ${parseInt(date, 10)}일`
}

export function convetDatetime(timestamp: string): string {
  const { month, date, year } = getDateArray(timestamp)
  return `${year}-${month}-${date}`
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
