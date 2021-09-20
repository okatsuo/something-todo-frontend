import jwt from 'jsonwebtoken'

export const jwtDecode = (value: string) => {
  const data = jwt.decode(value, { complete: true })
  return data?.payload
}

export const jwtVerify = (token: string) => {
  const secretKey = process.env.JWT_ENCODED as string
  try {
    jwt.verify(token, secretKey)
    return true
  } catch (error) {
    return false
  }
}
