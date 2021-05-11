export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getClassName(...args : string[]) {
  const clean = args.filter((value) => value !== null)
  return clean.join(' ')
}
