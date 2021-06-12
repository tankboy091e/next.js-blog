import { convertTimestamp, convetDatetime } from 'lib/util/date'
import React from 'react'

export default function Time({
  timeStamp,
  className,
}: {
  timeStamp: string
  className: string
}) {
  return (
    <time className={className} dateTime={convetDatetime(timeStamp)}>
      {convertTimestamp(timeStamp)}
    </time>
  )
}
