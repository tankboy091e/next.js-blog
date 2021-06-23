import getOrigin from 'lib/util/origin'

export default function Preload() {
  fetch(`${getOrigin()}/api/ping`)
  return (
    <></>
  )
}
