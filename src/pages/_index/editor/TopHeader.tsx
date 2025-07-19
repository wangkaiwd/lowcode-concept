import { FileText, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'

export const TopHeader = () => <header
  className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">L</span>
      </div>
      <h1 className="text-xl font-bold text-primary">LowCode Studio</h1>
    </div>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <FileText className="w-4 h-4"/>
      <span>未命名项目</span>
    </div>
  </div>
  <div className="flex items-center gap-3">
    <Button variant="default" size="sm">
      <Rocket className="w-4 h-4 mr-2"/>
      发布
    </Button>
  </div>
</header>
