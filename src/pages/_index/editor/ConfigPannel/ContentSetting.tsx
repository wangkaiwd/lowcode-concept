import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { useActiveBlock } from '@/store/useBlockStore.ts'

const ContentSetting = () => {
  const activeBlock = useActiveBlock()
  const getFormField = () => {
    switch (activeBlock.type) {
      case 'text':
        return (
          <FormField
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>文本</FormLabel>
                <FormControl>
                  <Input type={'text'} placeholder="请输入文本内容" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )
      case 'image':
        return (
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem>
                <FormLabel>链接</FormLabel>
                <FormControl>
                  <Input type={'text'} placeholder="请输入图片链接" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )
      case 'button':
        return (
          <FormField
            name="children"
            render={({ field }) => (
              <FormItem>
                <FormLabel>文本</FormLabel>
                <FormControl>
                  <Input type={'text'} placeholder="请输入按钮文本" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )
      default:
        return null
    }
  }
  return (
    <Accordion type="single" collapsible defaultValue={'item-1'}>
      <AccordionItem value="item-1">
        <AccordionTrigger>内容</AccordionTrigger>
        <AccordionContent className={'space-y-4'}>
          {getFormField()}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ContentSetting
