import { useRef } from 'react'

export const useLatest = (value: any) => {
  const latestRef = useRef(value)
  latestRef.current = value
  return latestRef
}
