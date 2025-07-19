import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, BarChart3, Zap, Settings } from 'lucide-react';

// 配置面板
const ConfigPanel = () => {
  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-card-foreground">属性配置</h2>
        <p className="text-sm text-muted-foreground mt-1">选择组件进行配置</p>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <Tabs defaultValue="style" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="style" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              样式
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              数据
            </TabsTrigger>
            <TabsTrigger value="event" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              事件
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="style" className="mt-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-base">样式配置</CardTitle>
                <CardDescription>
                  选择画布中的组件查看和编辑样式属性
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="mt-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-base">数据配置</CardTitle>
                <CardDescription>
                  配置组件数据源，绑定动态数据和API
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          
          <TabsContent value="event" className="mt-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-base">事件配置</CardTitle>
                <CardDescription>
                  设置组件事件处理，添加交互逻辑和动作
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConfigPanel; 