import nookies from 'nookies'

export default async function hermes(
  input: RequestInfo,
  init?: RequestInit,
) : Promise<Response> {
  const { token } = nookies.get()
  const { headers, ...props } = init
  return fetch(input, {
    ...props,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  })
}
