# 大坝安全管理模块 - 产品需求文档 (PRD)

## 1. 产品概述

### 1.1 产品定位
大坝安全管理模块是企业安全生产管理系统的核心组成部分，专注于大坝设施的全生命周期安全管理，包括状态监控、风险预警、合规管理和数据可视化等功能。

### 1.2 目标用户
- **主要用户**: 大坝安全管理员、安全工程师、维护人员
- **次要用户**: 企业管理层、监管部门、外部审计人员

### 1.3 业务价值
- 实时监控大坝安全状态，预防安全事故
- 标准化大坝管理流程，提升合规性
- 数据驱动的决策支持，优化资源配置
- 历史数据追溯分析，支持持续改进

## 2. 功能需求

### 2.1 核心功能模块

#### 2.1.1 大坝概览仪表板
**功能描述**: 提供大坝安全状态的实时监控和数据可视化

**核心功能**:
- 多大坝状态总览
- 关键指标实时展示
- 风险等级可视化
- 异常状态预警提示

**数据需求**:
```javascript
{
  damId: String,           // 大坝唯一标识
  damName: String,         // 大坝名称
  riskLevel: Enum,         // 风险等级: LOW/MEDIUM/HIGH/CRITICAL
  status: Enum,           // 运行状态: NORMAL/ATTENTION/FAULT
  lastUpdate: DateTime,    // 最后更新时间
  keyMetrics: {            // 关键指标
    waterLevel: Number,    // 水位
    seepage: Number,       // 渗流量
    displacement: Number,  // 位移量
    stress: Number         // 应力值
  }
}
```

#### 2.1.2 大坝安全管理台账
**功能描述**: 大坝基础信息、技术参数、检查记录的结构化管理

**核心功能**:
- 大坝基础信息录入和编辑
- 技术参数配置管理
- 检查记录维护
- 版本控制和历史追溯

**数据需求**:
```javascript
{
  basicInfo: {
    name: String,              // 大坝名称
    location: String,          // 地理位置
    type: Enum,               // 大坝类型: CONCRETE/EARTH/ROCKFILL
    height: Number,           // 坝高
    length: Number,           // 坝长
    completionDate: Date,     // 竣工日期
    designFloodLevel: Number, // 设计洪水位
    normalWaterLevel: Number, // 正常蓄水位
  },
  technicalParams: {
    catchmentArea: Number,     // 流域面积
    reservoirCapacity: Number, // 水库库容
    spillwayCapacity: Number, // 泄洪能力
    maxDischarge: Number,     // 最大下泄流量
  },
  inspectionRecords: [{        // 检查记录
    id: String,
    inspectionType: Enum,      // 检查类型: ROUTINE/SPECIAL/EMERGENCY
    inspectionDate: Date,
    inspector: String,
    findings: String,
    recommendations: String,
    status: Enum               // 状态: NORMAL/ATTENTION/URGENT
  }]
}
```

#### 2.1.3 监测数据管理
**功能描述**: 实时监测数据的采集、处理、分析和存储

**核心功能**:
- 实时数据采集接口
- 数据质量控制和清洗
- 趋势分析和预警
- 历史数据查询和导出

**数据需求**:
```javascript
{
  monitoringData: {
    sensorId: String,          // 传感器ID
    sensorType: Enum,         // 传感器类型: WATER_LEVEL/DISPLACEMENT/SEEPAGE
    location: String,          // 监测点位置
    timestamp: DateTime,       // 采集时间
    value: Number,            // 监测值
    unit: String,             // 单位
    quality: Enum,            // 数据质量: GOOD/SUSPECT/BAD
    alarmThreshold: {          // 报警阈值
      warning: Number,        // 预警值
      critical: Number        // 危险值
    }
  }
}
```

### 2.2 数据交互需求

#### 2.2.1 搜索和筛选
- **多条件组合搜索**: 支持按大坝名称、风险等级、运行状态等组合搜索
- **实时筛选**: 筛选条件实时生效，无需页面刷新
- **搜索结果保存**: 支持保存常用搜索条件

#### 2.2.2 数据导入导出
- **批量导入**: 支持Excel格式的批量数据导入
- **导出功能**: 支持Excel、PDF等格式的报表导出
- **数据校验**: 导入数据进行格式和逻辑校验

## 3. 技术需求

### 3.1 前端技术架构
```javascript
// 技术栈要求
{
  "framework": "Vue 3",
  "ui-library": "Element Plus",
  "icons": "Font Awesome 6.4.0",
  "charts": "ECharts/Apache ECharts",
  "http-client": "Axios",
  "date-handling": "day.js"
}
```

### 3.2 组件设计要求

#### 3.2.1 基础组件
```vue
<!-- 大坝状态卡片组件 -->
<template>
  <div class="dam-status-card" :class="riskLevelClass">
    <div class="dam-header">
      <img :src="damImage" :alt="damName" class="dam-image">
      <div class="dam-info">
        <h3>{{ damName }}</h3>
        <p class="location">{{ location }}</p>
        <div class="status-badges">
          <el-tag :type="statusType">{{ statusText }}</el-tag>
          <el-tag :type="riskType" effect="plain">{{ riskText }}</el-tag>
        </div>
      </div>
    </div>
    <div class="metrics-grid">
      <div v-for="metric in keyMetrics" :key="metric.name" class="metric-item">
        <span class="metric-name">{{ metric.name }}</span>
        <span class="metric-value" :class="metric.status">{{ metric.value }}</span>
      </div>
    </div>
  </div>
</template>
```

#### 3.2.2 数据表格组件
- 使用 Element Plus 的 Table 组件
- 支持排序、筛选、分页
- 自定义列渲染
- 批量操作支持

#### 3.2.3 图表可视化组件
- 基于 ECharts 的数据可视化
- 实时数据更新
- 交互式图表操作
- 多种图表类型支持

### 3.3 状态管理
```javascript
// Vue 3 Composition API 状态管理
import { reactive, ref, computed } from 'vue'

const damStore = reactive({
  // 大坝列表
  dams: [],
  currentDam: null,

  // 监测数据
  monitoringData: {},

  // 加载状态
  loading: false,

  // 筛选条件
  filters: {
    riskLevel: null,
    status: null,
    keyword: ''
  }
})
```

### 3.4 API 接口规范

#### 3.4.1 基础接口
```javascript
// 大坝列表接口
GET /api/dams
Response: {
  "code": 200,
  "data": {
    "total": 10,
    "items": [DamData],
    "page": 1,
    "pageSize": 20
  }
}

// 大坝详情接口
GET /api/dams/:id
Response: {
  "code": 200,
  "data": DamDetailData
}
```

#### 3.4.2 监测数据接口
```javascript
// 实时监测数据
GET /api/dams/:id/monitoring/realtime
Response: {
  "code": 200,
  "data": [MonitoringData]
}

// 历史监测数据
GET /api/dams/:id/monitoring/history
Query Parameters:
- startTime: DateTime
- endTime: DateTime
- sensorTypes: String[]
```

## 4. 用户界面需求

### 4.1 响应式设计
- **桌面端**: 最小宽度 1200px
- **平板端**: 768px - 1199px
- **移动端**: < 768px

### 4.2 主题和样式
```css
:root {
  /* 品牌色彩 */
  --primary-color: #3366CC;
  --primary-light: #e6f7ff;
  --primary-dark: #0050b3;

  /* 状态色彩 */
  --success-color: #52c41a;
  --warning-color: #faad14;
  --danger-color: #ff4d4f;
  --info-color: #1890ff;

  /* 中性色彩 */
  --text-primary: #262626;
  --text-secondary: #595959;
  --text-disabled: #bfbfbf;
  --border-color: #d9d9d9;
  --background-color: #f5f5f5;
}
```

### 4.3 交互规范
- **加载状态**: 统一的 Loading 组件
- **错误处理**: 友好的错误提示和处理
- **操作反馈**: 成功/失败的操作提示
- **确认操作**: 危险操作的二次确认

## 5. 性能需求

### 5.1 页面性能
- **首屏加载时间**: < 3秒
- **页面切换时间**: < 1秒
- **数据查询响应**: < 2秒
- **图表渲染时间**: < 1秒

### 5.2 数据处理
- **实时数据更新**: 最小间隔 5秒
- **批量数据导入**: 最大支持 1000条记录
- **数据导出**: 支持 10000条记录导出

## 6. 安全需求

### 6.1 权限控制
```javascript
// 权限定义
const permissions = {
  VIEW_DAM_OVERVIEW: 'dam:view',
  EDIT_DAM_INFO: 'dam:edit',
  MANAGE_MONITORING: 'dam:monitoring',
  EXPORT_DATA: 'dam:export',
  DELETE_RECORDS: 'dam:delete'
}

// 角色权限
const roles = {
  ADMIN: ['*'],                              // 系统管理员
  DAM_MANAGER: ['dam:view', 'dam:edit'],     // 大坝管理员
  VIEWER: ['dam:view']                       // 只读用户
}
```

### 6.2 数据安全
- 敏感数据加密传输
- 操作日志记录
- 数据访问权限控制
- 定期数据备份

## 7. 测试需求

### 7.1 功能测试
- 单元测试覆盖率 > 80%
- 组件集成测试
- 端到端测试覆盖主要业务流程

### 7.2 性能测试
- 页面加载性能测试
- 大数据量处理测试
- 并发访问压力测试

### 7.3 兼容性测试
- 主流浏览器兼容性
- 不同设备响应式测试
- 不同分辨率适配测试

## 8. 部署和运维

### 8.1 构建要求
```javascript
// package.json 脚本
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext .vue,.js,.ts"
  }
}
```

### 8.2 环境配置
- **开发环境**: 本地开发服务器
- **测试环境**: 模拟数据和接口
- **生产环境**: 正式服务器部署

## 9. 项目排期

### 9.1 开发阶段
- **第一阶段**: 基础框架搭建 (2周)
- **第二阶段**: 核心功能开发 (4周)
- **第三阶段**: 数据可视化和报表 (2周)
- **第四阶段**: 测试和优化 (2周)

### 9.2 里程碑
- **MVP版本**: 基础的大坝管理和查看功能
- **Beta版本**: 完整功能，内部测试
- **正式版本**: 生产环境部署

## 10. 风险评估

### 10.1 技术风险
- **数据兼容性**: 与现有系统的数据接口对接
- **性能瓶颈**: 大量实时数据的处理性能
- **浏览器兼容**: 不同浏览器的兼容性问题

### 10.2 缓解措施
- 提前进行技术调研和原型验证
- 制定数据迁移和接口规范
- 建立完善的测试体系

---

**文档版本**: v1.0
**最后更新**: 2025-11-27
**负责人**: 开发团队
**审核人**: 产品经理