import jwt from 'jsonwebtoken'

export const jwtDecode = (value: string) => {
  const data = jwt.decode(value, { complete: true })
  return data?.payload
}

export const jwtVerify = (token: string) => {
  // TODO: move the responsability only to backend. We can take the user profile instead doing that.
  const secretKey = process.env.JWT_ENCODED as string
  try {
    jwt.verify(token, secretKey)
    return true
  } catch (error) {
    return false
  }
}
