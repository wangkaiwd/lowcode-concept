import { Card, CardContent } from '@/components/ui/card';
import { Palette } from 'lucide-react';

// 画布面板
const CanvasPanel = () => {
  return (
    <div className="flex-1 bg-muted/20 flex flex-col">
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto h-full">
          {/* 画布区域 */}
          <Card 
            className="min-h-full border-2 border-dashed border-border/40 relative shadow-sm overflow-auto"
          >
            <CardContent className="p-0 h-full">
              {/* 空状态提示 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground max-w-md">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Palette className="w-8 h-8 text-primary/60" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">开始设计你的页面</h3>
                  <p className="text-sm leading-relaxed mb-6">
                    从左侧组件库拖拽组件到这里开始创建你的应用界面
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CanvasPanel; 