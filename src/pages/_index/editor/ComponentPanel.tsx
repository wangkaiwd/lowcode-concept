import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { components } from '@/mock/components.ts'

const ComponentPanel = () => {
  return (
    <div className="w-80 bg-background border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">组件库</h2>
          <Badge variant="secondary" className="text-xs">
            {components.length}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">拖拽组件到画布</p>
      </div>
      <Separator/>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <TooltipProvider>
            <div className="grid grid-cols-2 gap-3">
              {components.map((component) => {
                const IconComponent = component.icon
                return (
                  <Tooltip key={component.type}>
                    <TooltipTrigger asChild>
                      <Card
                        className="cursor-pointer transition-all duration-200 hover:shadow-md group border-dashed border-2 hover:border-solid hover:border-primary/20"
                        draggable
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center space-y-2">
                            <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                              <IconComponent
                                size={20}
                                className="text-muted-foreground group-hover:text-primary transition-colors"
                              />
                            </div>
                            <div className="text-xs text-center font-medium group-hover:text-primary transition-colors">
                              {component.name}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-sm">{component.description}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </TooltipProvider>
        </div>
      </ScrollArea>
    </div>
  )
}

export default ComponentPanel
