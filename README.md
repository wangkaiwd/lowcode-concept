# LowCode Studio

一个基于 React 的现代化低代码可视化页面构建器，支持拖拽生成页面和通过变量动态配置组件属性。

![LowCode Studio](https://img.shields.io/badge/LowCode-Studio-blue)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-blue)

## ✨ 特性

### 🎨 可视化编辑器
- **拖拽式设计**：从组件库拖拽组件到画布，快速构建页面
- **实时预览**：所见即所得的编辑体验

### 🧩 丰富的组件库
- **基础组件**：按钮、文本、图片、容器等常用组件
- **交互组件**：支持点击、悬停等交互效果
- **布局组件**：灵活的容器布局系统

### ⚙️ 智能属性配置
- **样式配置**：可视化调整组件样式属性
- **数据绑定**：支持通过变量动态设置组件属性

### 🔧 现代化技术栈
- [React](https://react.dev/) - UI 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [React Router](https://reactrouter.com/) - 路由管理
- [Lucide React](https://lucide.dev/) - 图标库

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

### 启动开发服务器

```bash
# 启动开发服务器
pnpm dev
```

访问 `http://localhost:5173` 即可开始使用 LowCode Studio。

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 🏗️ 项目结构

```
lowcode-concept/
├── src/
│   ├── components/          # UI 组件库
│   │   └── ui/             # shadcn/ui 组件
│   ├── pages/              # 页面组件
│   │   └── _index/         # 主编辑器页面
│   │       └── editor/     # 编辑器核心组件
│   │           ├── ComponentPanel.tsx   # 组件库面板
│   │           ├── CanvasPanel.tsx      # 画布面板
│   │           └── ConfigPanel.tsx      # 属性配置面板
│   ├── lib/                # 工具函数
│   └── assets/             # 静态资源
├── public/                 # 公共资源
└── ...配置文件
```

## 📦 部署

项目支持多种部署方式：

### GitHub Pages

项目已配置 GitHub Actions，推送到 `main` 分支会自动部署到 GitHub Pages。

### 静态部署

```bash
# 构建静态文件
pnpm build

# 部署 dist 目录到任意静态服务器
```

⭐ 如果这个项目对您有帮助，请给它一个星标！
