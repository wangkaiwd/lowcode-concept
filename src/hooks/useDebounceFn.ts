import { useMemo, useRef } from 'react'
import { debounce } from 'lodash-es'

export const useDebounceFn = (cb: (...args: any[]) => any, options: any) => {
  const cbRef = useRef(cb)
  cbRef.current = cb
  return useMemo(() => {
    return debounce((...args: any[]) => cbRef.current(...args), options)
  }, [])
}
