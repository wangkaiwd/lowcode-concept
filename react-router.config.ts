import type { Config } from '@react-router/dev/config'
import { getBase } from './scripts/helper.ts'

export default {
  appDirectory: 'src',
  basename: getBase(),
  ssr: false,
} satisfies Config
