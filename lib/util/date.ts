export function getDateArray(timestamp: string) {
  const date = new Date(timestamp)
  return {
    dow: dayOfWeek[date.getDay()],
    month: date.getMonth() + 1,
    date: date.getDate(),
    year: date.getFullYear(),
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

const dayOfWeek = [
  '일',
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
]
