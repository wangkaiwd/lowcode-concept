import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'

const SizeSetting = () => {
  return (
    <Accordion type="single" collapsible defaultValue={'item-1'}>
      <AccordionItem value="item-1">
        <AccordionTrigger>尺寸</AccordionTrigger>
        <AccordionContent className={'space-y-4'}>
          <FormField
            name="size.width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>宽度</FormLabel>
                <FormControl>
                  <Input type={'number'} placeholder="请输入宽度" {...field}
                         onChange={(event) => field.onChange(event.target.valueAsNumber)}/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="size.height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>高度</FormLabel>
                <FormControl>
                  <Input type={'number'} placeholder="请输入宽度" {...field} onChange={(event) => {
                    field.onChange(event.target.valueAsNumber)
                  }}/>
                </FormControl>
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default SizeSetting
