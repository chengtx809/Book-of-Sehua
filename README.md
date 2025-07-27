# Tim涩话之书 📖

一个优雅互动的音频语录展示网页，点击Tim的头像即可随机播放精选的"涩话"语录，并展示对应的文字内容。

## ✨ 功能特性

- **🎵 音频播放**：点击头像随机播放Tim的经典语录
- **💬 文字展示**：同步显示语录的文字内容
- **🎨 优雅动画**：流畅的过渡动画和视觉效果
- **📱 响应式设计**：完美适配手机、平板和桌面设备
- **⌨️ 键盘支持**：ESC键关闭弹窗，支持触摸操作
- **🎯 交互反馈**：点击时的缩放动效增强用户体验

## 🚀 快速开始

### 本地运行

1. **克隆或下载项目**

2. **直接打开**
   双击 `index.html` 文件，或在浏览器中打开即可使用

### 在线部署

将项目文件上传到任何静态网站托管服务：
- GitHub Pages
- Netlify
- Vercel
- 或任何支持静态文件的服务器

## ⚙️ 配置文件说明

### 音频数据配置

音频和语录内容在 [`script.js`](script.js:20-40) 中配置：

```javascript
this.audioData = {
    "sehua_1.MP3": {
        "text": "遇不到志同道合的伙伴，是不是因为我太弱，太奇怪",
        "author": "Tim"
    },
    "sehua_2.MP3": {
        "text": "当你把你对未来的期待收缩到一天之内，或者说几个小时之内，那可能你的感觉会更好一些",
        "author": "Tim"
    },
    "sehua_3.MP3": {
        "text": "每个人都有对巴黎的理解和期待，当你来了以后或许心满意足，或许不尽人意，但是不管怎么样，你都会对这个城市有一个新的了解。",
        "author": "Tim"
    }
};
```

### 如何添加新的语录

1. **准备音频文件**
   - 将新的音频文件放入 `sehua_audio/` 文件夹
   - 支持 `.mp3` 和 `.MP3` 格式

2. **更新配置**
   在 [`script.js`](script.js:22-35) 的 `audioData` 对象中添加新条目：

   ```javascript
   "新文件名.mp3": {
       "text": "新的语录文字内容",
       "author": "Tim"
   }
   ```

3. **文件命名规范**
   
   - 使用英文命名，避免特殊字符
   - 推荐使用 `sehua_序号.mp3` 的格式

## 📁 项目结构

```
tim-book/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 核心JavaScript
├── img/
│   └── tim.png         # Tim头像图片
├── sehua_audio/        # 音频文件夹
│   ├── sehua_1.mp3     # 语录1
│   ├── sehua_2.MP3     # 语录2
│   └── sehua_3.MP3     # 语录3
└── README.md          # 项目说明
```
## 🛠️ 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 现代样式和动画
- **Vanilla JavaScript** - 原生JavaScript，无依赖
- **响应式设计** - 移动端优先

## 🎯 使用技巧

- **点击头像**：播放随机语录
- **点击关闭按钮**：关闭文字卡片
- **点击背景**：点击卡片外部区域关闭
- **按ESC键**：快速关闭卡片
- **刷新页面**：重新加载应用
## 📱 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙋‍♂️ 联系方式

如有问题或建议，欢迎通过以下方式联系：
- 提交 Issue
- 发送邮件
- 其他联系方式

**享受Tim的涩话之书吧！** 📖✨