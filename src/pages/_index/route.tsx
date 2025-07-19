import { Button } from '@/components/ui/button';
import { Rocket, FileText } from 'lucide-react';
import ComponentPanel from '@/pages/_index/editor/ComponentPanel';
import CanvasPanel from '@/pages/_index/editor/CanvasPanel';
import ConfigPanel from '@/pages/_index/editor/ConfigPanel';

// 主页面组件
const Editor = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* 顶部工具栏 */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">L</span>
            </div>
            <h1 className="text-xl font-bold text-primary">LowCode Studio</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>未命名项目</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" size="sm">
            <Rocket className="w-4 h-4 mr-2" />
            发布
          </Button>
        </div>
      </header>

      {/* 主要内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        <ComponentPanel />
        <CanvasPanel />
        <ConfigPanel />
      </div>
    </div>
  );
};

export default Editor;