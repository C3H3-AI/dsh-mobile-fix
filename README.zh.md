# dsh-mobile-fix

一个 DSH（DeepSeek Harness）客户端插件，用于在手机 / 窄屏下优化 Web 界面。

> English README: [README.md](README.md)

## 功能

- **手机端设置界面单栏化** — 把桌面端“左导航 + 右内容”的两栏设置对话框，改成单栏手机布局：
  左导航折叠成顶部横条，内容占满剩余宽度。
- **双击最大化** — 双击设置面板（按钮 / 链接以外的区域）可切换到全屏，再次双击恢复。
- **手机端侧边栏默认隐藏** — 手机上侧边栏默认收起，只保留左上角一个汉堡图标；
  点击后以浮层方式滑出侧边栏。
- **通用手机端加固** — 对话框尺寸、安全区 padding、16px 输入框 / 按钮。

## 安装

安装到任意 profile：

```bash
dsh plugin --profile <profile> add dsh-mobile-fix
```

然后重启 DSH（或刷新页面 — 客户端 bundle 在页面加载时注入）。
本插件不依赖 `dsh-web-ui-all` 或其他插件，是一个独立的纯客户端插件。

## 开发

```bash
pnpm install
pnpm build      # tsup + client-loader 包装
```

- `lib/client.js` 是 DSH 客户端 bundle（已用 `__ModuleLoader__.load` 包装）。
- `lib/index.js` 是 host 端空实现。
- `src/client/index.ts` 是客户端源码；`src/index.ts` 是 host 端源码。

## 许可证

MIT
