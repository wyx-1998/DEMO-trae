# PC端设计指南

## 项目概述

本项目是**中建材安全管理系统**的PC端应用，主要服务于企业安全生产管理、危险物品管理、工作场所管理等B端业务场景。系统采用Vue3 + Element Plus技术栈，提供完整的企业级管理功能。

## 设计原则

### 1. 专业严谨
- 符合企业级应用的专业形象
- 信息层级清晰，数据展示准确
- 操作流程规范，符合业务逻辑
- 安全合规，满足监管要求

### 2. 高效易用
- 减少用户认知负担
- 提供快捷操作路径
- 支持批量处理和自动化
- 优化常用功能路径

### 3. 一致统一
- 视觉风格统一
- 交互模式一致
- 组件使用规范
- 设计语言统一

### 4. 可扩展性
- 模块化设计
- 配置化功能
- 插件化架构
- 主题可定制

## 技术架构

### 技术栈
- **前端框架**：Vue3 + Composition API
- **UI组件库**：Element Plus
- **图表库**：ECharts 5.x
- **图标库**：Font Awesome 6.x
- **构建工具**：Vite/Webpack
- **状态管理**：Pinia/Vuex

### 页面架构
```
┌─────────────────────────────────────────────┐
│                 顶部导航栏                    │
├─────────────────────────────────────────────┤
│  │                                          │
│  │              主内容区                     │
│侧│                                          │
│边│                                          │
│栏│                                          │
│  │                                          │
│  │                                          │
└─────────────────────────────────────────────┘
```

## 色彩系统

### 主色调
```css
/* 主题色 - 蓝色系 */
--color-primary: #3366CC;          /* 主品牌色 */
--color-primary-light: #4C8BF5;    /* 浅色 */
--color-primary-dark: #2554B2;     /* 深色 */
--color-primary-bg: #E3F2FD;       /* 背景色 */

/* 功能色 */
--color-success: #00B042;          /* 成功 */
--color-warning: #FF943E;          /* 警告 */
--color-error: #F25643;            /* 错误 */
--color-info: #3498DB;             /* 信息 */
```

### 中性色
```css
/* 文字色 */
--text-primary: #1F1F1F;           /* 主要文字 */
--text-secondary: #666666;         /* 次要文字 */
--text-tertiary: #999999;          /* 辅助文字 */
--text-disabled: #C0C4CC;          /* 禁用文字 */

/* 背景色 */
--bg-page: #F5F7FA;                /* 页面背景 */
--bg-card: #FFFFFF;                /* 卡片背景 */
--bg-hover: #F5F7FA;               /* 悬停背景 */
--bg-active: #ECF5FF;              /* 激活背景 */

/* 边框色 */
--border-base: #DCDFE6;            /* 基础边框 */
--border-light: #E4E7ED;           /* 浅色边框 */
--border-lighter: #EBEEF5;         /* 更浅边框 */
```

## 字体系统

### 字体族
```css
font-family: 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
```

### 字体规格
```css
/* 标题层级 */
--font-size-h1: 24px;              /* 一级标题 */
--font-size-h2: 20px;              /* 二级标题 */
--font-size-h3: 18px;              /* 三级标题 */
--font-size-h4: 16px;              /* 四级标题 */

/* 内容文字 */
--font-size-large: 16px;           /* 大字号 */
--font-size-base: 14px;            /* 标准字号 */
--font-size-small: 13px;           /* 小字号 */
--font-size-mini: 12px;            /* 最小字号 */

/* 字重 */
--font-weight-normal: 400;         /* 常规 */
--font-weight-medium: 500;         /* 中等 */
--font-weight-semibold: 600;       /* 半粗 */
--font-weight-bold: 700;           /* 粗体 */
```

### 行高规范
```css
--line-height-tight: 1.4;          /* 紧凑 */
--line-height-base: 1.5;           /* 标准 */
--line-height-loose: 1.6;          /* 宽松 */
```

## 布局系统

### 栅格系统
```css
/* 基于24栅格 */
--grid-columns: 24;                /* 总列数 */
--grid-gutter: 20px;               /* 列间距 */
--grid-margin: 30px;               /* 外边距 */
```

### 间距规范
```css
/* 基础间距（8px倍数）*/
--spacing-xs: 8px;                 /* 超小间距 */
--spacing-sm: 16px;                /* 小间距 */
--spacing-md: 24px;                /* 中间距 */
--spacing-lg: 32px;                /* 大间距 */
--spacing-xl: 48px;                /* 超大间距 */

/* 具体应用 */
--page-padding: 30px;              /* 页面内边距 */
--card-padding: 24px;              /* 卡片内边距 */
--section-spacing: 32px;           /* 模块间距 */
--element-spacing: 16px;           /* 元素间距 */
```

## 组件规范

### 顶部导航栏
```css
/* 导航栏规格 */
.header {
  height: 60px;                    /* 导航栏高度 */
  background: #ffffff;             /* 背景色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 阴影 */
  border-bottom: 1px solid #e4e7ed; /* 边框 */
  padding: 0 20px;                 /* 内边距 */
}

/* Logo区域 */
.header-left .logo {
  font-size: 18px;                 /* Logo字号 */
  font-weight: bold;               /* 字重 */
  color: #409EFF;                  /* Logo颜色 */
}

/* 导航菜单 */
.top-nav {
  gap: 24px;                       /* 菜单间距 */
}

.nav-link {
  padding: 8px 16px;               /* 内边距 */
  border-radius: 6px;              /* 圆角 */
  font-size: 14px;                 /* 字号 */
  font-weight: 500;                /* 字重 */
}
```

### 侧边栏
```css
/* 侧边栏规格 */
.sidebar {
  width: 260px;                    /* 侧边栏宽度 */
  background: #ffffff;             /* 背景色 */
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05); /* 阴影 */
  border-right: 1px solid #e4e7ed; /* 边框 */
}

/* 菜单项 */
.menu-item {
  padding: 12px 20px;              /* 内边距 */
  border-left: 3px solid transparent; /* 左边框 */
  font-size: 14px;                 /* 字号 */
}

.menu-item:hover {
  background-color: #f5f7fa;       /* 悬停背景 */
  border-left-color: #409EFF;      /* 悬停边框 */
  color: #409EFF;                  /* 悬停文字色 */
}

.menu-item.active {
  background-color: #ecf5ff;       /* 激活背景 */
  border-left-color: #409EFF;      /* 激活边框 */
  color: #409EFF;                  /* 激活文字色 */
}
```

### 主内容区
```css
/* 内容区规格 */
.main-content {
  background: #fff;                /* 背景色 */
  flex: 1;                         /* 自适应宽度 */
}

/* 内容头部 */
.content-header {
  padding: 20px 30px;              /* 内边距 */
  background: #fff;                /* 背景色 */
  border-bottom: 1px solid #e4e7ed; /* 边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 阴影 */
}

/* 页面标题 */
.content-header h1 {
  font-size: 24px;                 /* 标题字号 */
  color: #303133;                  /* 标题颜色 */
  font-weight: 600;                /* 字重 */
}
```

## 表单设计

### 表单布局
```css
/* 表单基础样式 */
.form-container {
  background: #fff;                /* 背景色 */
  border-radius: 8px;              /* 圆角 */
  padding: 30px;                   /* 内边距 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 阴影 */
}

/* 表单项规格 */
.form-item {
  margin-bottom: 24px;             /* 表单项间距 */
}

.form-label {
  font-size: 14px;                 /* 标签字号 */
  color: #606266;                  /* 标签颜色 */
  font-weight: 500;                /* 字重 */
  margin-bottom: 8px;              /* 标签与输入框间距 */
}
```

### 输入控件
```css
/* 输入框规格 */
.el-input__inner {
  height: 40px;                    /* 输入框高度 */
  border-radius: 6px;              /* 圆角 */
  border: 1px solid #dcdfe6;       /* 边框 */
  font-size: 14px;                 /* 字号 */
  padding: 0 12px;                 /* 内边距 */
}

/* 选择器规格 */
.el-select .el-input__inner {
  height: 40px;                    /* 选择器高度 */
  border-radius: 6px;              /* 圆角 */
}

/* 按钮规格 */
.el-button {
  border-radius: 6px;              /* 圆角 */
  font-size: 14px;                 /* 字号 */
  font-weight: 500;                /* 字重 */
}

.el-button--primary {
  background-color: #3366CC;       /* 主按钮背景 */
  border-color: #3366CC;           /* 主按钮边框 */
}
```

## 表格设计

### 表格基础样式
```css
/* 表格容器 */
.table-container {
  background: #fff;                /* 背景色 */
  border-radius: 8px;              /* 圆角 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 阴影 */
  overflow: hidden;                /* 溢出隐藏 */
}

/* 表格规格 */
.el-table {
  font-size: 14px;                 /* 表格字号 */
}

.el-table th {
  background-color: #f5f7fa;       /* 表头背景 */
  color: #303133;                  /* 表头文字色 */
  font-weight: 600;                /* 表头字重 */
  height: 48px;                    /* 表头高度 */
}

.el-table td {
  height: 48px;                    /* 单元格高度 */
  padding: 8px 16px;               /* 单元格内边距 */
}
```

### 表格操作
```css
/* 操作按钮 */
.table-actions {
  display: flex;                   /* 弹性布局 */
  gap: 8px;                        /* 按钮间距 */
  align-items: center;             /* 垂直居中 */
}

.table-actions .el-button {
  padding: 6px 12px;               /* 按钮内边距 */
  font-size: 13px;                 /* 按钮字号 */
}
```

## 图表设计

### 图表容器
```css
/* 图表规格 */
.chart-container {
  background: #fff;                /* 背景色 */
  border-radius: 8px;              /* 圆角 */
  padding: 24px;                   /* 内边距 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 阴影 */
}

.chart-title {
  font-size: 18px;                 /* 图表标题字号 */
  color: #303133;                  /* 图表标题颜色 */
  font-weight: 600;                /* 字重 */
  margin-bottom: 20px;             /* 标题与图表间距 */
}
```

### 图表配色
```css
/* 图表颜色系统 */
--chart-color-primary: #3366CC;    /* 主数据色 */
--chart-color-success: #00B042;    /* 成功数据色 */
--chart-color-warning: #FF943E;    /* 警告数据色 */
--chart-color-error: #F25643;      /* 错误数据色 */
--chart-color-info: #3498DB;       /* 信息数据色 */
```

## 交互设计

### 按钮交互
```css
/* 按钮状态 */
.el-button:hover {
  transform: translateY(-1px);     /* 悬停上移 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* 悬停阴影 */
  transition: all 0.3s ease;       /* 过渡动画 */
}

.el-button:active {
  transform: scale(0.98);          /* 点击缩放 */
  transition: transform 0.1s ease; /* 过渡动画 */
}

.el-button:disabled {
  opacity: 0.6;                    /* 禁用透明度 */
  cursor: not-allowed;             /* 禁用光标 */
}
```

### 卡片交互
```css
/* 卡片悬停 */
.card-hover {
  transition: all 0.3s ease;       /* 过渡动画 */
}

.card-hover:hover {
  transform: translateY(-2px);     /* 悬停上移 */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12); /* 悬停阴影 */
}
```

## 响应式设计

### 断点设置
```css
/* 响应式断点 */
@media (max-width: 768px) {
  /* 平板响应式 */
  .sidebar {
    width: 200px;                  /* 侧边栏宽度调整 */
  }

  .content-header {
    padding: 15px 20px;            /* 内容头部内边距调整 */
  }
}

@media (max-width: 576px) {
  /* 手机响应式 */
  .sidebar {
    position: fixed;               /* 固定定位 */
    left: -260px;                  /* 默认隐藏 */
    transition: left 0.3s;         /* 过渡动画 */
  }

  .sidebar.show {
    left: 0;                       /* 显示侧边栏 */
  }
}
```

## 动效设计

### 过渡动效
```css
/* 页面过渡 */
.page-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* 贝塞尔曲线 */
}

/* 元素过渡 */
.element-transition {
  transition: all 0.2s ease;       /* 简易过渡 */
}
```

### 加载动效
```css
/* 骨架屏 */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## 无障碍设计

### 可访问性
```css
/* 焦点样式 */
:focus {
  outline: 2px solid #3366CC;      /* 焦点轮廓 */
  outline-offset: 2px;             /* 轮廓偏移 */
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .element {
    border: 2px solid #000;        /* 高对比度边框 */
  }
}

/* 减少动效 */
@media (prefers-reduced-motion: reduce) {
  .element {
    transition: none;              /* 禁用过渡 */
    animation: none;               /* 禁用动画 */
  }
}
```

## 主题定制

### 主题变量
```css
/* 主题定制变量 */
:root {
  /* 主色调 */
  --el-color-primary: #3366CC;
  --el-color-success: #00B042;
  --el-color-warning: #FF943E;
  --el-color-error: #F25643;

  /* 中性色 */
  --el-text-color-primary: #1F1F1F;
  --el-text-color-regular: #303133;
  --el-text-color-secondary: #606266;
  --el-text-color-placeholder: #C0C4CC;

  /* 边框色 */
  --el-border-color: #DCDFE6;
  --el-border-color-light: #E4E7ED;
  --el-border-color-lighter: #EBEEF5;
  --el-border-color-extra-light: #F2F6FC;

  /* 填充色 */
  --el-fill-color: #F5F7FA;
  --el-fill-color-light: #F0F2F5;
  --el-fill-color-lighter: #EBEEF5;
  --el-fill-color-extra-light: #F2F6FC;

  /* 背景色 */
  --el-bg-color: #FFFFFF;
  --el-bg-color-page: #F5F7FA;
}
```

## 设计检查清单

### 视觉检查
- [ ] 色彩系统统一协调
- [ ] 字体层级清晰易读
- [ ] 间距系统一致
- [ ] 对齐精准

### 交互检查
- [ ] 按钮状态完整
- [ ] 表单验证清晰
- [ ] 反馈及时明确
- [ ] 操作流程顺畅

### 布局检查
- [ ] 栅格系统应用
- [ ] 响应式适配
- [ ] 信息层级分明
- [ ] 视觉平衡

### 性能检查
- [ ] 加载性能优化
- [ ] 动画流畅度
- [ ] 内存使用合理
- [ ] 代码规范

## 设计工具

### 推荐工具
- **Figma**：界面设计
- **Sketch**：矢量设计
- **Adobe XD**：原型设计
- **Zeplin**：设计交付

### 开发工具
- **Vue DevTools**：调试工具
- **Element Plus**：组件库
- **ECharts**：图表库
- **Font Awesome**：图标库

## 参考资源

### 设计系统
- Element Plus设计系统
- Ant Design设计规范
- Material Design
- Microsoft Fluent Design

### 前端框架
- Vue3官方文档
- Element Plus官方文档
- ECharts官方文档
- CSS Grid/Flexbox指南

---

*本指南基于中建材安全管理系统项目实践总结，适用于企业级B端PC端产品设计。*