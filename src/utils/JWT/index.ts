import jwt from 'jsonwebtoken'

export const jwtDecode = (value: string) => {
  const data = jwt.decode(value, { complete: true })
  return data?.payload
}
