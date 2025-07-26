import SizeSetting from '@/pages/_index/editor/ConfigPannel/SizeSetting.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useActiveBlock, useBlockActions } from '@/store/useBlockStore.ts'
import { useLatest } from '@/hooks/useLatest.ts'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { debounce } from 'lodash-es'
import ContentSetting from '@/pages/_index/editor/ConfigPannel/ContentSetting.tsx'

const SettingForm = () => {
  const activeBlock = useActiveBlock()
  const activeBlockLatestRef = useLatest(activeBlock)
  const { updateBlock } = useBlockActions()
  const methods = useForm({
    defaultValues: {},
  })

  useEffect(() => {
    methods.reset(activeBlock.props)
  }, [activeBlock.id])

  useEffect(() => {
    const debouncedCb = debounce(({ values }) => {
      updateBlock({
        ...activeBlockLatestRef.current,
        props: values,
      })
    }, 800)
    const callback = methods.subscribe({
      formState: {
        values: true,
        isDirty: true,
      },
      callback: debouncedCb,
    })

    return () => {
      callback()
      debouncedCb.cancel()
    }
  }, [methods, methods.subscribe, activeBlockLatestRef, updateBlock])

  return (
    <Form {...methods}>
      <form>
        <SizeSetting/>
        <ContentSetting/>
      </form>
    </Form>
  )
}

export default SettingForm
