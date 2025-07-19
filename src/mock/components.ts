import { Image, MousePointer2, Square, Type } from 'lucide-react'

export const components = [
  { name: '按钮', type: 'button', icon: MousePointer2, description: '可点击的交互按钮' },
  { name: '文本', type: 'text', icon: Type, description: '静态文本显示' },
  { name: '图片', type: 'image', icon: Image, description: '图片展示组件' },
  { name: '容器', type: 'container', icon: Square, description: '布局容器组件' },
]
