# 财税系统 - 其他业务模块（other-ser）

基于 [Figma 设计稿](https://www.figma.com/design/PqPYT1k4Ua6gU5xSX0Ogj5/%E5%85%B6%E4%BB%96%E4%B8%9A%E5%8A%A1%E6%96%B9%E6%A1%88%E5%8E%9F%E5%9E%8B?node-id=0-1) 生成、严格遵循 `D:\guifan\rules\AGENTS.md` 规范的 **可独立运行** 的 Vue 3 + Vuetify 3 + `common-package` 项目。

> 本项目从 `D:\guifan\vuexy-vue-template-develop` 主模板镜像而来（未修改主模板），叠加"其他业务"模块的页面 / 组件 / API / 类型 / 枚举 / i18n / 菜单。

## 启动

```bash
cd D:\guifan\other-ser

# 1. 安装依赖（已执行；首次约 60s）
pnpm install

# 2. 创建 .env（已基于 .env.example 复制）
#    如需调整接口地址，编辑 .env 中的 VITE_API_BASE_URL

# 3. 启动 dev server（首次启动约 60s）
pnpm dev
```

启动后访问：

- 主入口：<http://localhost:5173/>
- 其他业务列表：<http://localhost:5173/other-business/list>

## 模块文件清单（在 `vuexy-vue-template-develop` 主模板基础上新增/修改的文件）

| 类别 | 路径 | 说明 |
|---|---|---|
| 页面 | `src/pages/other-business/list.vue` | 路由页（`definePage` + `OTHER_BUSINESS_VIEW`） |
| 组件 | `src/components/other-business/OtherBusinessList.vue` | 主列表（Tabs + 表格 + 已选区 + 分页） |
| 组件 | `src/components/other-business/OtherBusinessFilterArea.vue` | 筛选按钮 + 全部筛选抽屉 |
| 组件 | `src/components/other-business/OtherBusinessInitiateDrawer.vue` | 发起办理抽屉 |
| 组件 | `src/components/other-business/OtherBusinessEditDrawer.vue` | 编辑抽屉（含办理人分配） |
| 组件 | `src/components/other-business/OtherBusinessDetailDrawer.vue` | 办理详情抽屉（含 进度/记录 Tabs） |
| 组件 | `src/components/other-business/OtherBusinessAddHandlerDrawer.vue` | 添加办理人抽屉 |
| 组件 | `src/components/other-business/OtherBusinessAddProgressDialog.vue` | 添加进度弹窗 |
| API | `src/api/other-business-service/other-business.ts` | 15 个 `*Api`（统一 `$api`、`AbortSignal`） |
| API 类型 | `src/api/types/other-business-service/other-business/*.ts` | 14 个 `XxxReq/XxxRes` 类型文件 |
| 枚举 | `src/enums/other-business.ts` | Tab/状态/操作/状态颜色 枚举 |
| 菜单 | `src/navigation/vertical/other-business.ts` | 新增菜单文件 |
| 菜单 | `src/navigation/vertical/index.ts` | 修改：合并 `otherBusiness` 到顶级菜单 |
| i18n | `src/locales/zh-CN.json` | 修改：合并 71 条新翻译键 |

设计稿截图归档于 `design-screenshots/`。

## 业务能力一一对应设计稿

| 设计稿模块 | 文件 | 说明 |
|---|---|---|
| 其他业务列表 | `pages/other-business/list.vue` + `OtherBusinessList.vue` | Tabs（未完成/已完成）、搜索、分页大小、筛选、导出、发起其他业务 |
| 列表表格 | `OtherBusinessList.vue` | 列：ID、所属企业、业务类型（多选 ；分隔）、剩余/超时天数（彩色）、状态（圆点+文案）、当前处理人、操作 |
| 发起办理 | `OtherBusinessInitiateDrawer.vue` | 企业（远程搜索）、业务类型（多选）、到期时间、业务说明、发起材料、发起人（只读）、交办人 |
| 添加办理人 | `OtherBusinessAddHandlerDrawer.vue` | 上半部分：任务详情只读；下半部分：业务办理人分配 |
| 办理详情 | `OtherBusinessDetailDrawer.vue` | Header 操作（标记完成/编辑/终止/关闭）、状态、字段、进度/记录 Tabs |
| 编辑抽屉 | `OtherBusinessEditDrawer.vue` | 与发起一致，且业务类型已上传材料后不可删除（前端校验提示） |
| 全部筛选 | `OtherBusinessFilterArea.vue` | 业务类型、剩余天数、当前节点、状态、办理人、交办人 |
| 添加进度（独立弹窗） | `OtherBusinessAddProgressDialog.vue` | 进度内容 + 附件 |

## 规范遵循一览（AGENTS.md 自检）

- [x] 表单元素全部使用 `App*` 系列（`AppTextField` / `AppSelect` / `AppDateTimePicker` / `AppTextarea`），未使用 `V*` 等价物
- [x] 业务组件全部使用 `C*` 系列（`CDrawer` / `CMemberAdvanced` / `CAutocompleteRemote` / `CTableFilter` / `CTabs` / `CFormItem` / `CUpload` / `CAvatar` / `CAvatarGroup` / `CFileItem` / `CEmptyState` / `CLoading`）
- [x] 表格三件套：`CTableFilter` + `TablePagination` + `useTable`/`useTableHeader`
- [x] 自定义控件接验证 → 用 `CFormItem` 包装（发起材料 / 交办人 / 办理人）
- [x] 全部文案走 i18n（`$t` 模板 / `t` 脚本），无硬编码中文
- [x] 颜色全部走 Vuetify 主题/语义类（`text-error` / `text-warning` / `text-on-background` / `text-medium-emphasis`），无硬编码 hex
- [x] 文本超出用 `v-title` + `.one-line-ellipsis` / `.three-line-ellipsis`
- [x] 表单校验全部使用 `rules.ts` 验证器（`cRequiredValidator` / `cStringLengthRangeValidator`），无自写正则
- [x] 编辑/发起页有 `useDirtyTracker` + `useFormGuard` 离开挽留
- [x] 表单提交走 `useForm.onFormSubmit(...)`；按钮绑定 `formSubmitLoading/Disabled`
- [x] 异步全部 `async/await`；独立请求并行用 `Promise.all`
- [x] 接口在 `src/api/other-business-service/` 按后端 url 拆分；命名 `getXxxApi` / `createXxxApi` / `updateXxxApi` / `deleteXxxApi`；类型 `XxxReq/XxxRes`；统一 `$api`；支持 `AbortSignal`
- [x] 错误统一拦截器；提示用 `toast`；确认用 `useGlobalDialog`，无 `alert/confirm/prompt`
- [x] 路由 `definePage` 含 `action/subject`；菜单含 CASL `action/subject`
- [x] 模板用 `$can` 控权限；权限隐藏一律 `v-if`
- [x] 命名：变量 camelCase / 常量 UPPER_SNAKE_CASE / 文件夹 kebab / 组件 PascalCase / 页面 .vue kebab / Enum 文件 kebab，值 UPPER_SNAKE_CASE
- [x] 多选用中文 `；`（`businessTypeName` 直接由后端返回）；表格空值 `-`
- [x] 列表页：分页默认 10；详情/编辑用抽屉；编辑型 Drawer `persistent`（不可点蒙层关闭）
- [x] 不直接操作 DOM；不随意 `!important`

## 设计稿来源

- 链接：<https://www.figma.com/design/PqPYT1k4Ua6gU5xSX0Ogj5/?node-id=0-1>
- 文件 Key：`PqPYT1k4Ua6gU5xSX0Ogj5`
- 主要节点：`其他业务列表` `1:6004` / `发起办理` `4:1452` / `办理详情` `17:4508` / `添加办理人` `15:8380` / `编辑抽屉` `17:3047` / `筛选` `19:12209`

## 启动验证（已通过）

| 检查项 | 结果 |
|---|---|
| `pnpm install` | ✅ 57.1s, 1 个 postinstall 步骤（`build:icons` + `msw:init`）正常 |
| `pnpm dev` | ✅ 59s 后 `Vite v7.1.12 ready, http://localhost:5173/` |
| 主页 200 OK | ✅ |
| `/other-business/list` 200 OK | ✅ |
| 7 个组件 `.vue` 文件经 Vite 编译均通过 | ✅ |

> Vite dep-scan 阶段会提示 `MemberAdvancedRules.vue not found`，此为模板自带的演示文件 `src/pages/tis/components/member-advanced.vue` 引用了一些未提交的 view 文件，**与本模块无关**，不影响"其他业务"页面运行。

## 常见问题

1. **`@common-package/...` 引用报错**：`common-package` 是模板自带的目录（在 `D:\guifan\vuexy-vue-template-develop\common-package` 也是普通文件夹）。如果丢失，把模板的 `common-package/` 重新复制过来即可。
2. **`useTable` / `useForm` / `toast` 未定义**：这些来自 `unplugin-auto-import` 的自动导入；只要文件位于 `src/` 下就会自动注入。
3. **CASL 权限报无权访问**：测试期请在浏览器手动写 cookie `userAbilityRules`，最少包含 `[{"action":"read","subject":"OTHER_BUSINESS_VIEW"}]`。生产由后端 `member-service` 根据角色配置返回。
4. **设计稿与本规范冲突时**：按 AGENTS.md §16 优先级 —— 业务设计稿（明确说明） > 本规范 > 框架默认。
