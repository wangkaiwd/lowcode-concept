import process from 'node:process'

export const getBase = () => {
  return process.env.NODE_ENV === 'development' ? '/' : '/lowcode-concept/'
}
