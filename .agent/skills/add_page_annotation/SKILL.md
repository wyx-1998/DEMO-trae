---
name: Add Page Annotation (Info Mark)
description: Adds a yellow info mark component to the page for displaying explanations in a popover, with auto-incrementing numbers.
---

# Add Page Annotation (Info Mark)

This skill adds a standardized "Info Mark" (a small yellow square) to a Vue 3 + Element Plus page. Clicking the mark displays a popover with custom content.
Each mark is automatically numbered based on its mounting order (effectively its order in the DOM).

## Prerequisites

- The page must be using **Vue 3** and **Element Plus**.
- Detailed steps below assume the page has a `<style>` section and a Vue setup script.

## Instructions

### 1. Setup (One-time per page)

#### A. Add CSS Styles
Add the following CSS to the `<style>` section:

```css
        /* 增加说明标识样式 */
        body {
            counter-reset: info-mark-counter;
        }

        .info-mark {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 16px;
            height: 16px;
            background-color: #E6A23C; /* 警告黄 */
            border-radius: 2px;
            cursor: pointer;
            vertical-align: middle;
            margin-left: 4px;
            position: relative;
            top: -1px;
            
            /* 文字样式 */
            font-size: 10px;
            color: #fff;
            line-height: 1;
        }

        .info-mark::after {
            counter-increment: info-mark-counter;
            content: counter(info-mark-counter);
        }

        .info-mark:hover {
            opacity: 0.8;
        }
```

#### B. Register Global Component
In the Vue setup code, register the component and initialize the counter.

**Before:**
```javascript
        createApp({ ... }).use(ElementPlus).mount('#app');
```

**After:**
```javascript
        const app = createApp({ ... });

        app.component('info-mark', {
            props: ['content'],
            template: `
                <el-popover
                    placement="top"
                    title="说明"
                    :width="200"
                    trigger="click"
                    :content="content"
                >
                    <template #reference>
                        <span class="info-mark" @click.stop></span>
                    </template>
                </el-popover>
            `
        });

        app.use(ElementPlus).mount('#app');
```

### 2. Management Operations

#### Adding a Mark
Insert the tag where you want the mark to appear.
```html
<info-mark content="Description text here"></info-mark>
```

#### Referencing by Number
Because the numbers correspond to the order of `onMounted` execution (which typically follows the DOM order in the source code), **you can refer to marks by their number** when modifying or deleting.
1.  Read the file and find all `<info-mark>` tags.
2.  Count them from top to bottom.
3.  The 1st tag corresponds to Mark #1, the 2nd to Mark #2, etc.

#### Modifying Content
"Change the content of Mark #1":
- Find the 1st `<info-mark>` in the file.
- Update its `content` field.

#### Deleting a Mark
"Delete Mark #2":
- Find the 2nd `<info-mark>` in the file.
- Delete the tag.
*Note: Refreshing the page will re-number the remaining marks.*

### 3. Best Practices for Batch Operations

When performing multiple operations (Add/Modify/Delete) in a single request, usage of **indices** can be risky if not handled carefully.

**AI Implementation Strategy:**
To avoid "Off-by-one" errors during batch updates, the AI should follow this safe execution order:

1.  **Resolve Indices to Content (First Pass)**: Before editing, read the file and map "Mark #X" to its unique HTML content or context (e.g., "The mark next to 'Total Amount'").
2.  **Execute Modifications**: Update the `content` of existing tags using the resolved context (string replacement). This preserves their existence and position.
3.  **Execute Deletions**: Remove the tags scheduled for deletion.
4.  **Execute Additions**: Insert new tags.

**Why this works**: By "locking on" to the code content first (Resolution phase), the AI decouples the operation from the shifting indices. Even if Mark #1 is deleted, the AI already knows that "Mark #2" refers to the specific code block `<info-mark content="Project Total"...>` and can target it directly for modification.

**Recommendation for Users:**
Although the AI handles re-indexing logic safely, providing **unique keywords** (e.g., "Delete the mark for 'Plan Total'") is always the safest method.

## User Workflow Specification

When the user requests to use this skill, the AI must first output the following specification rules to guide the user on how to annotate the documentation file (`页面元素分析.md`).

**Rule Set Output:**

> **请按以下规范在文档中进行标注：**
>
> 1.  **新增标注**：
>     在对应的页面元素描述后添加：`【标注：您的说明内容】`
>     *示例*：`* **提取类型**: 输入框 【标注：此处支持模糊搜索】`
>
> 2.  **修改标注**：
>     直接修改括号内的文字。
>     *示例*：`**原**: 【标注：旧内容】 -> **新**: 【标注：新内容】`
>
> 3.  **删除标注**：
>     将标注内容改为 "删除" 或 "DELETE"。
>     *示例*：`【删除标注】` 或 `【标注：删除】`
>
> **操作步骤：**
> 1.  您直接在文档中按上述格式编辑。
> 2.  完成后通知我：“已更新标注，请同步”。
> 3.  我将自动扫描文档并更新代码。

**AI Logic:**
- Upon receiving the "sync" command, the AI scans `页面元素分析.md` for `【标注：...】` patterns.
- It maps these patterns to the corresponding HTML files and elements described in the markdown structure.
- It applies updates (Add/Modify/Delete) to the HTML files.
