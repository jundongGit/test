# 数字转中文大写转换器

一个采用 Material Design 设计规范的数字转中文大写转换器，具有现代化的用户体验和视觉设计。

## 设计特点

- 🎨 **Material Design 风格**：采用 Google Material Design 设计规范
- 🎯 **简洁易用**：只需输入数字，立即显示中文大写
- 📱 **响应式设计**：完美适配各种设备尺寸
- ⚡ **实时转换**：输入时即时显示结果
- 🔢 **支持范围**：0-999999999999（万亿级别）

## 设计系统

### 色彩规范
- **主色调**：#2196F3（Material Blue）
- **强调色**：#FF9800（Material Orange）
- **成功色**：#4CAF50（Material Green）
- **错误色**：#F44336（Material Red）

### 间距系统
- **8dp Grid**：8px、16px、24px、32px、40px、48px、56px、64px
- **圆角规范**：4px、8px、12px、50%
- **阴影层次**：24级阴影系统（Elevation）

### 字体规范
- **字体族**：Roboto（Material Design 标准字体）
- **字号**：12px、14px、16px、20px、24px、34px
- **行高**：16px、20px、28px、32px、40px

### 动画系统
- **快速动画**：150ms cubic-bezier(0.4, 0, 0.2, 1)
- **中等动画**：225ms cubic-bezier(0.4, 0, 0.2, 1)
- **慢速动画**：300ms cubic-bezier(0.4, 0, 0.2, 1)

## 功能特点

### 核心功能
- 实时数字转换
- 智能输入验证
- 错误状态提示
- 成功状态反馈

### 交互体验
- **Ripple 效果**：Material Design 标准涟漪效果
- **浮动操作按钮**：FAB 快速清空功能
- **卡片设计**：Material Card 组件风格
- **文本字段**：Material Text Field 设计

### 实用功能
- 一键清空输入
- 示例数字快速测试
- 结果复制到剪贴板
- 页面可见性优化
- 深色模式支持

## 使用方法

1. 打开 `index.html` 文件
2. 在输入框中输入数字（0-999,999,999,999）
3. 自动显示对应的中文大写数字
4. 点击结果区域可复制到剪贴板

## 快捷键

- `ESC`：清空输入
- `Ctrl/Cmd + Enter`：清空输入
- `Ctrl/Cmd + C`：复制结果

## 技术栈

- **HTML5**：语义化结构
- **CSS3**：Material Design 设计系统
- **JavaScript (ES6+)**：模块化交互逻辑
- **Google Fonts**：Roboto 字体

无需安装任何依赖，直接在浏览器中打开即可使用！

## 设计理念

本应用严格遵循 Material Design 设计规范，包括：

- **材质**：模拟真实世界的材质和物理特性
- **层次**：通过阴影和深度创建视觉层次
- **动效**：流畅的动画和过渡效果
- **色彩**：丰富的色彩系统和对比度
- **可访问性**：支持深色模式和触摸设备

## Material Design 特性

### 组件设计
- **Material Cards**：带有阴影和圆角的卡片组件
- **Text Fields**：下划线样式的输入框
- **Icon Buttons**：圆形图标按钮
- **Floating Action Button**：浮动操作按钮

### 交互效果
- **Ripple Effect**：点击时的涟漪扩散效果
- **Elevation**：悬停和点击时的阴影变化
- **State Changes**：焦点、悬停、激活状态
- **Loading States**：加载状态指示器

### 响应式设计
- **8dp Grid System**：统一的间距系统
- **Breakpoints**：移动端、平板、桌面适配
- **Touch Targets**：适合触摸的最小尺寸
- **Gesture Support**：触摸手势支持 