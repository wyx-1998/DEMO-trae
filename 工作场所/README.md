# 工作场所安全管理平台 - 产品需求文档 (PRD)

## 1. 产品概述

### 1.1 产品定位
工作场所安全管理平台是一个企业级安全生产综合管理系统，覆盖工作场所安全管理的全业务流程，包括建构筑物管理、危险品管理、消防管理、有限空间管理等六大核心模块。

### 1.2 目标用户
- **主要用户**: 安全管理员、EHS工程师、设施管理人员、现场班组长
- **次要用户**: 公司领导、监管部门、外部审计人员、一线员工

### 1.3 业务价值
- 标准化安全管理工作流程，提升合规性
- 实时监控安全状态，预防安全事故发生
- 数据驱动安全管理，提升决策科学性
- 建立完整的安全管理知识库和追溯体系

## 2. 功能需求

### 2.1 建（构）筑物管理模块

#### 2.1.1 产品定位
建构筑物管理模块专注于企业建筑物和构筑物的全生命周期安全管理，包括基础信息管理、检测记录管理和版本控制。

#### 2.1.2 核心功能

**建筑物登记台账管理**
```javascript
// 建构筑物基础数据模型
{
  buildingId: String,           // 建筑物唯一标识
  basicInfo: {
    name: String,               // 建筑物名称
    location: String,           // 坐落区域
    area: Number,               // 占地面积 (㎡)
    structure: Enum,            // 建筑结构类型
    height: Number,             // 高度 (m)
    floors: Number,             // 楼层数
    usage: String,              // 使用性质
    startDate: Date,            // 启用日期
    status: Enum,               // 状态: ACTIVE/INACTIVE/RENOVATION
    designLife: Number,         // 设计年限
    constructionYear: Number     // 建设年份
  },
  technicalParams: {
    fireRating: String,         // 防火等级
    seismicGrade: String,       // 抗震等级
    loadBearing: Number,        // 承重能力
    materialQuality: String     // 建材质量等级
  }
}
```

**建筑结构类型枚举**
```javascript
const STRUCTURE_TYPES = {
  FRAME: '框架',
  SHEAR_WALL: '剪力墙',
  FRAME_SHEAR: '框-剪',
  PLATE_COLUMN_WALL: '板柱-墙',
  CORE_TUBE: '核心筒',
  TUBE_STRUCTURE: '筒体',
  STEEL_FRAME: '钢框架',
  BRACED_FRAME: '支撑框架',
  SPACE_FRAME: '网架',
  BENT_FRAME: '排架',
  BOTTOM_FRAME_MASONRY: '底框-砌体',
  PREFABRICATED: '装配式',
  SEISMIC_ISOLATION: '隔震',
  ENERGY_DISSIPATION: '消能'
}
```

**检测记录管理**
```javascript
// 检测记录数据模型
{
  inspectionId: String,
  buildingId: String,
  inspectionType: Enum,        // 检测类型: SETTLEMENT/LIGHTNING/STRUCTURAL
  inspectionDate: Date,
  inspectionAgency: String,     // 检测机构
  inspectionResult: {
    pass: Boolean,              // 是否合格
    deviations: [String],       // 偏差项
    recommendations: String,     // 建议
    nextInspectionDate: Date   // 下次检测日期
  },
  attachments: [{
    fileName: String,
    fileSize: Number,
    uploadTime: Date,
    uploader: String,
    fileUrl: String
  }],
  version: Number,              // 版本号
  status: Enum                  // 状态: DRAFT/REVIEW/APPROVED
}
```

**版本管理和追溯**
- 自动版本控制，每次修改生成新版本
- 版本对比功能，支持差异查看
- 历史版本回溯和查看
- 版本时间线展示

#### 2.1.3 用户权限矩阵
| 功能模块 | 公司领导 | 安全管理员 | 资产管理员 | 外部审计 |
|---------|---------|-----------|-----------|---------|
| 查看台账 | ✓ | ✓ | ✓ | ✓ |
| 新建建筑 | ✗ | ✓ | ✓ | ✗ |
| 编辑信息 | ✗ | ✓ | ✓ | ✗ |
| 删除记录 | ✗ | ✓ | ✓ | ✗ |
| 版本管理 | ✓ | ✓ | ✓ | ✓ |
| 数据导出 | ✓ | ✓ | ✓ | ✓ |

### 2.2 生产安全设施管理模块

#### 2.2.1 产品定位
基于GB 18209.2-2010国家标准的安全设施管理系统，管理安全标志、设备标志和安全防护设施的配置、部署和维护。

#### 2.2.2 核心功能

**标准标志库管理**
```javascript
// 安全标志数据模型
{
  signId: String,
  signInfo: {
    name: String,               // 标志名称
    code: String,               // 标志编号
    category: Enum,             // 标志类别
    type: Enum,                 // 标志种类
    imageUrl: String,           // 标志图片URL
    description: String,        // 标志含义
    usageScenario: String,      // 使用场景
    installationStandard: String, // 安装标准
    size: String,               // 标准尺寸
    material: String            // 材质要求
  }
}

// 标志类别枚举
const SIGN_CATEGORIES = {
  PROHIBITION: '禁止',
  WARNING: '警告',
  MANDATORY: '指令',
  INFORMATION: '提示'
}

// 标志种类枚举
const SIGN_TYPES = {
  ENVIRONMENTAL: '环境信息',
  LOCAL: '局部信息'
}
```

**设备标志库**
```javascript
// 设备标志数据模型
{
  equipmentSignId: String,
  signInfo: {
    name: String,               // 标志名称
    code: String,               // 标志编号
    meaning: String,            // 标志含义
    symbolUrl: String,          // 符号图片URL
    function: String,           // 功能说明
    applicableEquipment: [String], // 适用设备类型
    installationPosition: String, // 安装位置
    visibilityRequirements: String // 可见性要求
  }
}
```

**安全标志台账**
```javascript
// 标志部署台账数据模型
{
  deploymentId: String,
  locationInfo: {
    areaName: String,           // 区域名称
    department: String,         // 所属部门
    equipmentName: String,       // 所属设备
    specificLocation: String    // 具体位置
  },
  signConfig: [{
    signId: String,             // 标志ID
    quantity: Number,           // 数量
    installDate: Date,         // 安装日期
    condition: Enum,           // 状况: GOOD/DAMAGED/MISSING
    lastInspection: Date,      // 最后检查日期
    nextMaintenance: Date,     // 下次维护日期
    responsiblePerson: String   // 负责人
  }],
  managementInfo: {
    department: String,         // 管理部门
    manager: String,           // 管理员
    installContractor: String, // 安装单位
    maintenanceContractor: String // 维保单位
  }
}
```

**批量操作功能**
- 从标准库批量导入标志
- 批量参数配置
- 批量位置分配
- 批量状态更新

### 2.3 通风与照明管理模块

#### 2.3.1 产品定位
基于GB 50019-2015标准的通风与照明设施管理系统，确保工作场所环境符合职业健康安全要求。

#### 2.3.2 核心功能

**通风设施管理**
```javascript
// 通风设施数据模型
{
  ventilationId: String,
  equipmentInfo: {
    name: String,               // 设施名称
    model: String,               // 型号
    manufacturer: String,        // 生产厂家
    serialNumber: String,        // 序列号
    purchaseDate: Date,          // 采购日期
    warrantyPeriod: Number,      // 质保期(月)
    price: Number               // 价格
  },
  technicalParams: {
    ventilationType: Enum,       // 通风类型
    airVolume: Number,          // 风量 (m³/h)
    pressure: Number,           // 压力 (Pa)
    power: Number,              // 功率 (kW)
    efficiency: Number,         // 效率 (%)
    noiseLevel: Number,         // 噪音 (dB)
    airVelocity: Number         // 风速 (m/s)
  },
  installationInfo: {
    location: String,           // 安装位置
    installDate: Date,          // 安装日期
    responsibleDepartment: String, // 所属部门
    supervisor: String,         // 监护人
    serviceArea: String,        // 服务区域
    coverageArea: Number        // 覆盖面积 (㎡)
  },
  operationStatus: {
    status: Enum,               // 运行状态: RUNNING/STOPPED/MAINTENANCE/FAULT
    lastMaintenance: Date,      // 最后维护日期
    nextMaintenance: Date,      // 下次维护日期
    totalOperatingHours: Number, // 累计运行时间
    energyConsumption: Number    // 能耗 (kWh)
  }
}

// 通风类型枚举 (基于GB 50019-2015)
const VENTILATION_TYPES = {
  SUPPLY: '送风',
  EXHAUST: '排风',
  BALANCED: '平衡/换气',
  PRESSURE_CONTROL: '压力控制/防烟',
  PURIFICATION: '净化/洁净',
  EMERGENCY: '事故/应急'
}
```

**照明设施管理**
```javascript
// 照明设施数据模型
{
  lightingId: String,
  equipmentInfo: {
    name: String,               // 设施名称
    lampType: Enum,             // 灯具类型
    model: String,               // 型号
    manufacturer: String,        // 生产厂家
    power: Number,              // 功率 (W)
    luminousFlux: Number,       // 光通量 (lm)
    colorTemperature: Number,   // 色温 (K)
    cri: Number,                // 显色指数 (Ra)
    lifespan: Number            // 额定寿命 (h)
  },
  technicalParams: {
    illuminance: Number,        // 照度 (lux)
  uniformity: Number,          // 照度均匀度
  glareRating: String,         // 眩光等级
  mountingHeight: Number,      // 安装高度 (m)
  spacing: Number,             // 间距 (m)
  controlMethod: String         // 控制方式
  },
  installationInfo: {
    location: String,           // 安装位置
    installDate: Date,          // 安装日期
    areaType: Enum,             // 区域类型
    lightingStandard: String,    // 适用照明标准
    responsibleDepartment: String // 所属部门
  }
}

// 灯具类型枚举
const LAMP_TYPES = {
  LED: 'LED',
  FLUORESCENT: '荧光灯',
  INCANDESCENT: '白炽灯',
  HALOGEN: '卤素灯',
  INDUCTION: ' induction灯',
  HIGH_PRESSURE_SODIUM: '高压钠灯',
  METAL_HALIDE: '金卤灯'
}

// 区域类型枚举
const AREA_TYPES = {
  OFFICE: '办公区',
  WORKSHOP: '生产车间',
  WAREHOUSE: '仓库',
  CORRIDOR: '走廊',
  STAIRCASE: '楼梯间',
  EMERGENCY_EXIT: '安全出口',
  CONTROL_ROOM: '控制室',
  LABORATORY: '实验室'
}
```

**维护记录管理**
- 定期检查记录
- 故障维修记录
- 更换部件记录
- 能耗监测记录

### 2.4 消防安全管理模块

#### 2.4.1 产品定位
消防安全管理模块确保企业消防设施器材的合规配置、有效维护和及时检查，保障消防安全。

#### 2.4.2 核心功能

**消防设施器材台账**
```javascript
// 消防设施数据模型
{
  fireEquipmentId: String,
  equipmentInfo: {
    name: String,               // 设施名称
    type: Enum,                 // 设施类型
    model: String,               // 型号
    manufacturer: String,        // 生产厂家
    serialNumber: String,        // 序列号
    productionDate: Date,        // 生产日期
    installationDate: Date      // 安装日期
  },
  locationInfo: {
    building: String,           // 所在建筑
    floor: String,              // 楼层
    room: String,               // 房间号
    specificLocation: String,   // 具体位置
    coordinate: {                // 坐标
      x: Number,
      y: Number
    }
  },
  technicalParams: {
    capacity: Number,           // 容量/规格
    pressure: Number,           // 压力 (MPa)
    range: Number,              // 有效范围 (m)
    responseTime: Number,        // 响应时间 (s)
    operatingTemperature: {     // 工作温度
      min: Number,
      max: Number
    }
  },
  maintenanceInfo: {
    lastInspection: Date,       // 上次检查日期
    nextInspection: Date,       // 下次检查日期
    lastMaintenance: Date,      // 上次维护日期
  inspector: String,           // 检查员
  maintenanceCompany: String,  // 维保单位
  status: Enum                 // 状态: NORMAL/EXPIRED/DAMAGED/MISSING
  }
}

// 消防设施类型枚举
const FIRE_EQUIPMENT_TYPES = {
  FIRE_EXTINGUISHER: '灭火器',
  FIRE_HYDRANT: '消防栓',
  FIRE_HOSE: '消防水带',
  FIRE_ALARM: '火灾报警器',
  SMOKE_DETECTOR: '烟雾探测器',
  HEAT_DETECTOR: '温度探测器',
  EMERGENCY_LIGHT: '应急照明',
  EVACUATION_SIGN: '疏散指示标志',
  GAS_ALARM: '可燃气体报警器',
  SPRINKLER_SYSTEM: '自动喷水灭火系统',
  FIRE_BLANKET: '灭火毯',
  FIRE_AXE: '消防斧'
}
```

**检查与试验管理**
```javascript
// 检查试验记录数据模型
{
  inspectionId: String,
  inspectionInfo: {
    equipmentId: String,        // 设施ID
    inspectionType: Enum,       // 检查类型
    inspectionDate: Date,       // 检查日期
    inspector: String,          // 检查员
    inspectionAgency: String,    // 检查机构
    weatherCondition: String,   // 天气条件
    temperature: Number,        // 温度 (℃)
    humidity: Number           // 湿度 (%)
  },
  testResults: {
    visualInspection: {
      appearance: Enum,         // 外观状况
      accessibility: Enum,      // 可及性
      signage: Enum,           // 标识清晰度
      corrosion: Enum          // 腐蚀情况
    },
    functionalTest: {
      startupTime: Number,     // 启动时间 (s)
      operatingPressure: Number, // 工作压力 (MPa)
      flowRate: Number,        // 流量 (L/min)
      alarmSound: Enum,        // 报警声级
      batteryStatus: Enum      // 电池状态
    },
  overallResult: {
    pass: Boolean,             // 是否合格
    score: Number,             // 评分 (0-100)
    defects: [String],         // 缺陷列表
    recommendations: String,   // 改进建议
    nextTestDate: Date         // 下次测试日期
  }
}
```

**消防检查类型枚举**
```javascript
const INSPECTION_TYPES = {
  DAILY: '日常巡查',
  MONTHLY: '月度检查',
  QUARTERLY: '季度检查',
  ANNUAL: '年度检查',
  SPECIAL: '专项检查',
  ACCEPTANCE: '验收检查',
  EMERGENCY: '应急检查'
}
```

### 2.5 危险物品管理模块

#### 2.5.1 产品定位
危险物品管理模块基于危险化学品安全管理条例和GB 15258标准，实现危险化学品的全程监控和管理。

#### 2.5.2 核心功能

**危险化学品信息库**
```javascript
// 危险化学品基础数据模型
{
  chemicalId: String,
  basicInfo: {
    chineseName: String,        // 中文名称
    englishName: String,        // 英文名称
    casNumber: String,          // CAS号
    molecularFormula: String,   // 分子式
    molecularWeight: Number,    // 分子量
    synonyms: [String],         // 别名
    appearance: String,          // 外观与性状
    odor: String,               // 气味
    density: Number,            // 密度 (g/cm³)
    meltingPoint: Number,       // 熔点 (℃)
    boilingPoint: Number,       // 沸点 (℃)
    flashPoint: Number,         // 闪点 (℃)
    solubility: String         // 溶解性
  },
  hazardInfo: {
    hazardClassification: [{    // 危险性分类
      category: String,         // 危险类别
      categoryCode: String,     // 危险类别代码
      pictogram: String,        // 危险象形图
      signalWord: String,       // 信号词
      hazardStatement: String,  // 危险说明
      precautionaryStatement: String // 防范说明
    }],
    physicalHazards: [String],  // 物理危险
    healthHazards: [String],    // 健康危险
    environmentalHazards: [String] // 环境危险
  },
  storageInfo: {
    storageConditions: {        // 储存条件
      temperature: {            // 温度要求
        min: Number,
        max: Number,
        unit: String
      },
      humidity: {              // 湿度要求
        min: Number,
        max: Number,
        unit: String
      },
      ventilation: String,      // 通风要求
      lightProtection: Boolean, // 避光要求
      incompatibleChemicals: [String] // 不相容物质
    },
    storageLocation: String,    // 储存位置
    maxStorageQuantity: Number, // 最大储存量
    packagingRequirements: String // 包装要求
  },
  emergencyInfo: {
    fireFightingMeasures: String, // 消防措施
    accidentalReleaseMeasures: String, // 泄漏应急处理
    firstAidMeasures: {          // 急救措施
      inhalation: String,       // 吸入
      skinContact: String,      // 皮肤接触
      eyeContact: String,       // 眼睛接触
      ingestion: String         // 食入
    },
    emergencyContact: String,   // 应急联系电话
    msdsFileUrl: String         // MSDS文件URL
  }
}
```

**危险化学品台账**
```javascript
// 危险化学品台账数据模型
{
  ledgerId: String,
  chemicalInfo: {
    chemicalId: String,         // 化学品ID
    batchNumber: String,        // 批号
    purity: Number,             // 纯度 (%)
    quantity: Number,           // 数量
    unit: Enum,                 // 单位
    packaging: String,          // 包装规格
    supplier: String,           // 供应商
    manufacturer: String,       // 生产厂家
    productionDate: Date,       // 生产日期
    expirationDate: Date,       // 有效期
    purchaseDate: Date,         // 采购日期
    price: Number,             // 单价
    totalValue: Number         // 总价值
  },
  storageManagement: {
    storageLocation: String,    // 储存位置
    storageCondition: String,   // 储存条件
    areaCode: String,          // 库区编码
    shelfNumber: String,       // 货架号
    quarantineStatus: Enum,     // 隔离状态
    lastInspection: Date,       // 上次检查日期
    nextInspection: Date       // 下次检查日期
  },
  usageManagement: {
    purpose: String,           // 用途
    usageDepartment: String,    // 使用部门
    responsiblePerson: String,  // 责任人
    consumptionRate: Number,   // 消耗速率
    reorderLevel: Number,      // 再订购水平
    safetyStock: Number        // 安全库存
  },
  regulatoryCompliance: {
    dangerousLevel: Enum,       // 危险等级
    licenseNumber: String,     // 许可证号
    registrationNumber: String, // 登记号
  inspectionRecord: String    // 检查记录
  }
}

// 危险等级枚举
const DANGER_LEVELS = {
  EXTREMELY_DANGEROUS: '剧毒',
  HIGHLY_DANGEROUS: '高毒',
  MODERATELY_DANGEROUS: '中等毒',
  SLIGHTLY_DANGEROUS: '低毒',
  HARMFUL: '有害',
  IRRITANT: '刺激'
}

// 单位枚举
const UNITS = {
  KG: '千克',
  G: '克',
  MG: '毫克',
  L: '升',
  ML: '毫升',
  T: '吨',
  BOTTLE: '瓶',
  DRUM: '桶',
  BAG: '袋'
}
```

### 2.6 有限空间管理模块

#### 2.6.1 产品定位
有限空间管理模块确保对有限空间作业的安全管控，包括空间识别、风险评估、作业许可和气体监测。

#### 2.6.2 核心功能

**有限空间台账**
```javascript
// 有限空间数据模型
{
  confinedSpaceId: String,
  spaceInfo: {
    name: String,               // 空间名称
    code: String,               // 编码
    type: Enum,                 // 空间类型
    location: {                 // 位置信息
      building: String,         // 建筑物
      floor: String,            // 楼层
      coordinates: {            // 坐标
        x: Number,
        y: Number,
        z: Number
      },
      description: String       // 位置描述
    },
    physicalProperties: {       // 物理特性
      dimensions: {             // 尺寸
        length: Number,         // 长度 (m)
        width: Number,          // 宽度 (m)
        height: Number          // 高度 (m)
      },
      volume: Number,           // 体积 (m³)
      area: Number,             // 面积 (㎡)
      accessPoints: [{          // 出入口
        location: String,
        size: String,
        type: Enum              // 出入口类型
      }],
      ventilationInfo: String,   // 通风情况
      lightingInfo: String       // 照明情况
    }
  },
  hazardAssessment: {
    identifiedHazards: [{        // 已识别危险
      type: Enum,               // 危险类型
      description: String,      // 危险描述
      severity: Enum,          // 严重程度
      probability: Enum,        // 发生概率
      riskLevel: Enum,         // 风险等级
      controlMeasures: [String] // 控制措施
    }],
    atmosphericHazards: {         // 大气危险
      oxygenDeficiency: Boolean, // 缺氧
      flammableAtmosphere: Boolean, // 易燃易爆
      toxicAtmosphere: Boolean,      // 有毒气体
      otherAtmosphericHazards: [String]
    },
    physicalHazards: [{          // 物理危险
      type: Enum,
      description: String,
      controlMeasures: [String]
    }]
  },
  controlMeasures: {
    engineeringControls: [String], // 工程控制
    administrativeControls: [String], // 管理控制
    ppeRequirements: [{           // PPE要求
      type: String,
      quantity: Number,
      specification: String
    }],
    emergencyProcedures: String,   // 应急程序
    rescuePlan: String            // 救援计划
  },
  managementInfo: {
    responsibleDepartment: String, // 责任部门
    supervisor: String,          // 监护人
    authorizedEntrants: [String], // 授权进入人员
    lastInspection: Date,        // 上次检查日期
    nextInspection: Date,        // 下次检查日期
    inspectionRecord: String     // 检查记录
  }
}

// 有限空间类型枚举
const SPACE_TYPES = {
  TANK: '储罐',
  VESSEL: '容器',
  SILO: '筒仓',
  PIT: '地坑',
  TRENCH: '地沟',
  PIPELINE: '管道',
  VAT: '反应釜',
  SEWER: '下水道',
  TUNNEL: '隧道',
  VAULT: '地下室',
  MANHOLE: '人孔',
  BOILER: '锅炉'
}

// 危险类型枚举
const HAZARD_TYPES = {
  OXYGEN_DEFICIENCY: '缺氧',
  FLAMMABLE_GAS: '易燃气体',
  TOXIC_GAS: '有毒气体',
  ENGULFMENT: ' engulfment',
  ENTRAPMENT: ' entrapment',
  ELECTRICAL: '电气危险',
  MECHANICAL: '机械危险',
  TEMPERATURE_EXTREME: '温度极端',
  NOISE: '噪音',
  RADIATION: '辐射',
  CHEMICAL_EXPOSURE: '化学品暴露'
}
```

**气体检测配置**
```javascript
// 气体检测设备配置数据模型
{
  gasDetectorId: String,
  equipmentInfo: {
    model: String,               // 型号
    manufacturer: String,        // 生产厂家
    serialNumber: String,        // 序列号
    calibrationDate: Date,       // 校准日期
    nextCalibration: Date        // 下次校准日期
  },
  detectionCapabilities: [{
    gasType: Enum,               // 气体类型
    detectionRange: {            // 检测范围
      min: Number,
      max: Number,
      unit: String
    },
    alarmThreshold: {            // 报警阈值
      low: Number,               // 低报警
      high: Number,              // 高报警
      twa: Number                // 时均阈值
    },
    resolution: Number,          // 分辨率
    responseTime: Number         // 响应时间 (s)
  }],
  operationalSettings: {
    samplingMethod: Enum,        // 采样方式
    pumpFlowRate: Number,        // 泵流量 (L/min)
    displayBacklight: Boolean,   // 显示背光
    alarmMethods: [String],      // 报警方式
    dataLogging: Boolean,        // 数据记录
    wirelessTransmission: Boolean // 无线传输
  }
}

// 气体类型枚举
const GAS_TYPES = {
  OXYGEN: '氧气',
  COMBUSTIBLE_GAS: '可燃气体',
  CARBON_MONOXIDE: '一氧化碳',
  HYDROGEN_SULFIDE: '硫化氢',
  AMMONIA: '氨气',
  CHLORINE: '氯气',
  NITROGEN_DIOXIDE: '二氧化氮',
  SULFUR_DIOXIDE: '二氧化硫',
  VOLATILE_ORGANIC_COMPOUNDS: '挥发性有机化合物',
  METHANE: '甲烷',
  PROPANE: '丙烷',
  BUTANE: '丁烷'
}
```

## 3. 技术需求

### 3.1 前端技术架构
```javascript
// 技术栈规范
{
  "framework": "Vue 3",
  "ui-library": "Element Plus",
  "build-tool": "Vite",
  "state-management": "Pinia",
  "router": "Vue Router 4",
  "http-client": "Axios",
  "charts": "ECharts",
  "date-library": "day.js",
  "validation": "Yup",
  "utils": "Lodash",
  "icons": "Font Awesome 6.4.0"
}
```

### 3.2 项目结构规范
```
src/
├── components/              # 公共组件
│   ├── common/              # 通用组件
│   ├── forms/               # 表单组件
│   └── charts/              # 图表组件
├── views/                   # 页面组件
│   ├── building/            # 建构筑物管理
│   ├── safety-facility/     # 生产安全设施
│   ├── ventilation-lighting/ # 通风照明管理
│   ├── fire-safety/         # 消防安全管理
│   ├── dangerous-goods/     # 危险物品管理
│   └── confined-space/     # 有限空间管理
├── stores/                  # 状态管理
├── api/                     # API接口
├── utils/                   # 工具函数
├── styles/                  # 样式文件
├── assets/                  # 静态资源
└── types/                   # TypeScript类型定义
```

### 3.3 组件开发规范

#### 3.3.1 通用表格组件
```vue
<!-- StandardTable.vue -->
<template>
  <div class="standard-table">
    <div class="table-header">
      <div class="table-title">{{ title }}</div>
      <div class="table-actions">
        <el-button @click="handleRefresh">刷新</el-button>
        <el-button type="primary" @click="handleExport">导出</el-button>
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="table-filters" v-if="hasFilters">
      <el-form :model="filters" inline>
        <slot name="filters"></slot>
        <el-form-item>
          <el-button @click="resetFilters">重置</el-button>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="tableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      :height="tableHeight"
      border
    >
      <el-table-column type="selection" width="55" v-if="selectable" />
      <slot name="columns"></slot>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <slot name="actions" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>

    <div class="table-footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
```

#### 3.3.2 表单组件规范
```vue
<!-- StandardForm.vue -->
<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    :label-width="labelWidth"
    :disabled="disabled"
  >
    <el-row :gutter="20">
      <el-col v-for="field in formFields" :key="field.prop" :span="field.span || 12">
        <el-form-item :label="field.label" :prop="field.prop">
          <!-- 输入框 -->
          <el-input
            v-if="field.type === 'input'"
            v-model="formData[field.prop]"
            :placeholder="field.placeholder"
            :maxlength="field.maxlength"
          />

          <!-- 选择框 -->
          <el-select
            v-else-if="field.type === 'select'"
            v-model="formData[field.prop]"
            :placeholder="field.placeholder"
            :multiple="field.multiple"
            clearable
          >
            <el-option
              v-for="option in field.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>

          <!-- 日期选择器 -->
          <el-date-picker
            v-else-if="field.type === 'date'"
            v-model="formData[field.prop]"
            type="date"
            :placeholder="field.placeholder"
            value-format="YYYY-MM-DD"
          />

          <!-- 其他字段类型... -->
          <slot :name="field.prop" :field="field"></slot>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="submitting">
        {{ submitText }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
```

### 3.4 状态管理规范
```javascript
// stores/building.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getBuildingList, createBuilding, updateBuilding, deleteBuilding } from '@/api/building'

export const useBuildingStore = defineStore('building', () => {
  // 状态
  const buildingList = ref([])
  const currentBuilding = ref(null)
  const loading = ref(false)
  const total = ref(0)

  // 分页参数
  const pagination = ref({
    page: 1,
    pageSize: 20,
    keyword: '',
    status: null,
    structure: null
  })

  // 计算属性
  const activeBuildings = computed(() =>
    buildingList.value.filter(building => building.status === 'ACTIVE')
  )

  // 方法
  const fetchBuildings = async () => {
    loading.value = true
    try {
      const { data } = await getBuildingList(pagination.value)
      buildingList.value = data.items
      total.value = data.total
    } catch (error) {
      console.error('获取建筑物列表失败:', error)
    } finally {
      loading.value = false
    }
  }

  const addBuilding = async (buildingData) => {
    try {
      await createBuilding(buildingData)
      await fetchBuildings()
      return true
    } catch (error) {
      console.error('创建建筑物失败:', error)
      return false
    }
  }

  const updateBuildingInfo = async (id, buildingData) => {
    try {
      await updateBuilding(id, buildingData)
      await fetchBuildings()
      return true
    } catch (error) {
      console.error('更新建筑物失败:', error)
      return false
    }
  }

  const removeBuilding = async (id) => {
    try {
      await deleteBuilding(id)
      await fetchBuildings()
      return true
    } catch (error) {
      console.error('删除建筑物失败:', error)
      return false
    }
  }

  return {
    buildingList,
    currentBuilding,
    loading,
    total,
    pagination,
    activeBuildings,
    fetchBuildings,
    addBuilding,
    updateBuildingInfo,
    removeBuilding
  }
})
```

### 3.5 API接口规范
```javascript
// api/building.js
import request from '@/utils/request'

// 建构筑物管理接口
export const buildingApi = {
  // 获取建筑物列表
  getList(params) {
    return request({
      url: '/api/buildings',
      method: 'get',
      params
    })
  },

  // 获取建筑物详情
  getDetail(id) {
    return request({
      url: `/api/buildings/${id}`,
      method: 'get'
    })
  },

  // 创建建筑物
  create(data) {
    return request({
      url: '/api/buildings',
      method: 'post',
      data
    })
  },

  // 更新建筑物
  update(id, data) {
    return request({
      url: `/api/buildings/${id}`,
      method: 'put',
      data
    })
  },

  // 删除建筑物
  delete(id) {
    return request({
      url: `/api/buildings/${id}`,
      method: 'delete'
    })
  },

  // 批量导入建筑物
  batchImport(file) {
    const formData = new FormData()
    formData.append('file', file)
    return request({
      url: '/api/buildings/import',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // 导出建筑物数据
  export(params) {
    return request({
      url: '/api/buildings/export',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}
```

### 3.6 数据字典管理
```javascript
// utils/dictionary.js
export const DICTIONARY = {
  // 建筑结构类型
  STRUCTURE_TYPES: [
    { value: 'FRAME', label: '框架' },
    { value: 'SHEAR_WALL', label: '剪力墙' },
    { value: 'FRAME_SHEAR', label: '框-剪' },
    { value: 'PLATE_COLUMN_WALL', label: '板柱-墙' },
    { value: 'CORE_TUBE', label: '核心筒' },
    { value: 'TUBE_STRUCTURE', label: '筒体' },
    { value: 'STEEL_FRAME', label: '钢框架' },
    { value: 'BRACED_FRAME', label: '支撑框架' },
    { value: 'SPACE_FRAME', label: '网架' },
    { value: 'BENT_FRAME', label: '排架' },
    { value: 'BOTTOM_FRAME_MASONRY', label: '底框-砌体' },
    { value: 'PREFABRICATED', label: '装配式' },
    { value: 'SEISMIC_ISOLATION', label: '隔震' },
    { value: 'ENERGY_DISSIPATION', label: '消能' }
  ],

  // 建筑物状态
  BUILDING_STATUS: [
    { value: 'ACTIVE', label: '启用', type: 'success' },
    { value: 'INACTIVE', label: '弃用', type: 'info' },
    { value: 'RENOVATION', label: '装修', type: 'warning' }
  ],

  // 检测类型
  INSPECTION_TYPES: [
    { value: 'SETTLEMENT', label: '沉降监测' },
    { value: 'LIGHTNING', label: '防雷接地' },
    { value: 'STRUCTURAL', label: '结构安全' },
    { value: 'FIRE_SAFETY', label: '消防安全' }
  ],

  // 通风类型
  VENTILATION_TYPES: [
    { value: 'SUPPLY', label: '送风' },
    { value: 'EXHAUST', label: '排风' },
    { value: 'BALANCED', label: '平衡/换气' },
    { value: 'PRESSURE_CONTROL', label: '压力控制/防烟' },
    { value: 'PURIFICATION', label: '净化/洁净' },
    { value: 'EMERGENCY', label: '事故/应急' }
  ]
}

// 字典工具函数
export const getDictLabel = (dict, value) => {
  const item = DICTIONARY[dict]?.find(item => item.value === value)
  return item?.label || value
}

export const getDictType = (dict, value) => {
  const item = DICTIONARY[dict]?.find(item => item.value === value)
  return item?.type || 'info'
}
```

## 4. 用户界面需求

### 4.1 响应式设计规范
```scss
// 断点设置
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1600px
);

// 响应式混入
@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

// 布局网格
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;

  @include respond-to(sm) {
    max-width: 540px;
  }

  @include respond-to(md) {
    max-width: 720px;
  }

  @include respond-to(lg) {
    max-width: 960px;
  }

  @include respond-to(xl) {
    max-width: 1140px;
  }

  @include respond-to(xxl) {
    max-width: 1320px;
  }
}
```

### 4.2 设计系统
```css
:root {
  /* 品牌色彩 */
  --primary-color: #3366CC;
  --primary-light: #e6f7ff;
  --primary-dark: #0050b3;

  /* 功能色彩 */
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
  --card-background: #ffffff;

  /* 阴影 */
  --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-heavy: 0 8px 32px rgba(0, 0, 0, 0.16);

  /* 圆角 */
  --radius-small: 4px;
  --radius-medium: 8px;
  --radius-large: 12px;

  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* 字体 */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;

  /* 行高 */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-loose: 1.75;
}
```

### 4.3 组件设计规范

#### 4.3.1 卡片组件
```vue
<!-- StandardCard.vue -->
<template>
  <div class="standard-card" :class="[cardClass, { loading }]">
    <div class="card-header" v-if="$slots.header || title">
      <slot name="header">
        <div class="card-title">
          <i v-if="icon" :class="icon"></i>
          {{ title }}
        </div>
        <div class="card-extra">
          <slot name="extra"></slot>
        </div>
      </slot>
    </div>

    <div class="card-body">
      <el-skeleton :loading="loading" animated>
        <template #default>
          <slot></slot>
        </template>
      </el-skeleton>
    </div>

    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.standard-card {
  background: var(--card-background);
  border-radius: var(--radius-medium);
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-medium);
  }

  &.loading {
    pointer-events: none;
    opacity: 0.7;
  }
}

.card-header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  display: flex;
  align-items: center;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);

  i {
    margin-right: var(--spacing-sm);
    color: var(--primary-color);
  }
}

.card-body {
  padding: var(--spacing-lg);
}

.card-footer {
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  background: var(--background-color);
}
</style>
```

#### 4.3.2 表单布局组件
```vue
<!-- FormLayout.vue -->
<template>
  <div class="form-layout">
    <el-row :gutter="gutter">
      <template v-for="field in fields" :key="field.key">
        <el-col :span="field.span || defaultSpan">
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            :required="field.required"
            :rules="field.rules"
          >
            <component
              :is="getComponent(field.type)"
              v-model="formData[field.prop]"
              v-bind="field.props"
              :placeholder="field.placeholder"
            />
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<style scoped>
.form-layout {
  .el-form-item {
    margin-bottom: var(--spacing-lg);
  }

  .el-form-item__label {
    font-weight: 500;
    color: var(--text-secondary);
  }
}
</style>
```

## 5. 安全需求

### 5.1 权限管理体系
```javascript
// 权限定义
const PERMISSIONS = {
  // 建构筑物管理权限
  BUILDING_VIEW: 'building:view',
  BUILDING_CREATE: 'building:create',
  BUILDING_UPDATE: 'building:update',
  BUILDING_DELETE: 'building:delete',
  BUILDING_EXPORT: 'building:export',

  // 生产安全设施管理权限
  SAFETY_FACILITY_VIEW: 'safety_facility:view',
  SAFETY_FACILITY_CREATE: 'safety_facility:create',
  SAFETY_FACILITY_UPDATE: 'safety_facility:update',
  SAFETY_FACILITY_DELETE: 'safety_facility:delete',

  // 通风照明管理权限
  VENTILATION_LIGHTING_VIEW: 'ventilation_lighting:view',
  VENTILATION_LIGHTING_CREATE: 'ventilation_lighting:create',
  VENTILATION_LIGHTING_UPDATE: 'ventilation_lighting:update',
  VENTILATION_LIGHTING_DELETE: 'ventilation_lighting:delete',

  // 消防安全管理权限
  FIRE_SAFETY_VIEW: 'fire_safety:view',
  FIRE_SAFETY_CREATE: 'fire_safety:create',
  FIRE_SAFETY_UPDATE: 'fire_safety:update',
  FIRE_SAFETY_DELETE: 'fire_safety:delete',

  // 危险物品管理权限
  DANGEROUS_GOODS_VIEW: 'dangerous_goods:view',
  DANGEROUS_GOODS_CREATE: 'dangerous_goods:create',
  DANGEROUS_GOODS_UPDATE: 'dangerous_goods:update',
  DANGEROUS_GOODS_DELETE: 'dangerous_goods:delete',

  // 有限空间管理权限
  CONFINED_SPACE_VIEW: 'confined_space:view',
  CONFINED_SPACE_CREATE: 'confined_space:create',
  CONFINED_SPACE_UPDATE: 'confined_space:update',
  CONFINED_SPACE_DELETE: 'confined_space:delete',

  // 系统管理权限
  SYSTEM_ADMIN: 'system:admin',
  USER_MANAGEMENT: 'system:user',
  ROLE_MANAGEMENT: 'system:role',
  DATA_EXPORT: 'system:export',
  DATA_IMPORT: 'system:import'
}

// 角色权限配置
const ROLE_PERMISSIONS = {
  SUPER_ADMIN: Object.values(PERMISSIONS),

  ADMIN: [
    ...Object.values(PERMISSIONS).filter(p => p !== 'SYSTEM_ADMIN'),
  ],

  SAFETY_MANAGER: [
    PERMISSIONS.BUILDING_VIEW,
    PERMISSIONS.BUILDING_CREATE,
    PERMISSIONS.BUILDING_UPDATE,
    PERMISSIONS.BUILDING_EXPORT,
    PERMISSIONS.SAFETY_FACILITY_VIEW,
    PERMISSIONS.SAFETY_FACILITY_CREATE,
    PERMISSIONS.SAFETY_FACILITY_UPDATE,
    PERMISSIONS.VENTILATION_LIGHTING_VIEW,
    PERMISSIONS.VENTILATION_LIGHTING_CREATE,
    PERMISSIONS.VENTILATION_LIGHTING_UPDATE,
    PERMISSIONS.FIRE_SAFETY_VIEW,
    PERMISSIONS.FIRE_SAFETY_CREATE,
    PERMISSIONS.FIRE_SAFETY_UPDATE,
    PERMISSIONS.DANGEROUS_GOODS_VIEW,
    PERMISSIONS.DANGEROUS_GOODS_CREATE,
    PERMISSIONS.DANGEROUS_GOODS_UPDATE,
    PERMISSIONS.CONFINED_SPACE_VIEW,
    PERMISSIONS.CONFINED_SPACE_CREATE,
    PERMISSIONS.CONFINED_SPACE_UPDATE,
    PERMISSIONS.DATA_EXPORT
  ],

  FACILITY_MANAGER: [
    PERMISSIONS.BUILDING_VIEW,
    PERMISSIONS.BUILDING_UPDATE,
    PERMISSIONS.SAFETY_FACILITY_VIEW,
    PERMISSIONS.SAFETY_FACILITY_UPDATE,
    PERMISSIONS.VENTILATION_LIGHTING_VIEW,
    PERMISSIONS.VENTILATION_LIGHTING_UPDATE,
    PERMISSIONS.FIRE_SAFETY_VIEW,
    PERMISSIONS.FIRE_SAFETY_UPDATE,
    PERMISSIONS.DATA_EXPORT
  ],

  VIEWER: [
    PERMISSIONS.BUILDING_VIEW,
    PERMISSIONS.SAFETY_FACILITY_VIEW,
    PERMISSIONS.VENTILATION_LIGHTING_VIEW,
    PERMISSIONS.FIRE_SAFETY_VIEW,
    PERMISSIONS.DANGEROUS_GOODS_VIEW,
    PERMISSIONS.CONFINED_SPACE_VIEW
  ]
}
```

### 5.2 数据安全要求
```javascript
// 数据加密配置
const securityConfig = {
  // 传输加密
  transport: {
    protocol: 'HTTPS',
    tlsVersion: '1.3',
    certificateValidation: true
  },

  // 数据存储加密
  storage: {
    encryptionAlgorithm: 'AES-256-GCM',
    keyManagement: 'HSM',
    backupEncryption: true
  },

  // 敏感数据脱敏
  dataMasking: {
    phoneNumber: 'phone',
    emailAddress: 'email',
    idCard: 'idCard',
    sensitiveFields: ['password', 'secret', 'token']
  }
}

// 操作审计
const auditConfig = {
  // 审计事件类型
  eventTypes: [
    'LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE',
    'EXPORT', 'IMPORT', 'VIEW', 'DOWNLOAD', 'UPLOAD'
  ],

  // 审计字段
  auditFields: [
    'userId', 'username', 'action', 'resource', 'resourceId',
    'ipAddress', 'userAgent', 'timestamp', 'result', 'details'
  ],

  // 数据保留策略
  retentionPolicy: {
    auditLogs: '5年',
    accessLogs: '1年',
    errorLogs: '6个月'
  }
}
```

## 6. 性能需求

### 6.1 性能指标要求
```javascript
// 性能基准
const performanceBenchmarks = {
  // 页面加载性能
  pageLoad: {
    firstContentfulPaint: '< 1.5s',
    largestContentfulPaint: '< 2.5s',
    timeToInteractive: '< 3s',
    cumulativeLayoutShift: '< 0.1'
  },

  // 接口响应性能
  apiResponse: {
    simpleQuery: '< 500ms',
    complexQuery: '< 2s',
    fileUpload: '< 30s',
    batchOperation: '< 60s'
  },

  // 用户交互性能
  userInteraction: {
    buttonClick: '< 100ms',
    formValidation: '< 200ms',
    tableSort: '< 300ms',
    modalOpen: '< 200ms'
  },

  // 数据处理性能
  dataProcessing: {
    tableRender_100rows: '< 500ms',
    tableRender_1000rows: '< 2s',
    chartRender: '< 1s',
    fileGeneration_1000records: '< 5s'
  }
}
```

### 6.2 前端性能优化策略
```javascript
// 路由懒加载
const routes = [
  {
    path: '/building',
    component: () => import('@/views/building/index.vue')
  },
  {
    path: '/safety-facility',
    component: () => import('@/views/safety-facility/index.vue')
  }
]

// 组件异步加载
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})

// 虚拟滚动优化
const VirtualTable = {
  props: ['items', 'itemHeight', 'containerHeight'],
  setup(props) {
    const scrollTop = ref(0)
    const startIndex = computed(() => Math.floor(scrollTop.value / props.itemHeight))
    const endIndex = computed(() =>
      Math.min(
        startIndex.value + Math.ceil(props.containerHeight / props.itemHeight) + 1,
        props.items.length
      )
    )

    const visibleItems = computed(() =>
      props.items.slice(startIndex.value, endIndex.value)
    )

    return { visibleItems, startIndex, scrollTop }
  }
}
```

## 7. 测试需求

### 7.1 测试策略
```javascript
// 测试金字塔
const testingStrategy = {
  unitTests: {
    target: '70%',
    tools: ['Vitest', 'Jest'],
    coverage: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },

  integrationTests: {
    target: '20%',
    tools: ['Vue Test Utils', 'Cypress'],
    focus: ['Component Integration', 'API Integration']
  },

  e2eTests: {
    target: '10%',
    tools: ['Cypress', 'Playwright'],
    focus: ['Critical User Journeys', 'Cross-browser Testing']
  }
}
```

### 7.2 测试用例示例
```javascript
// 建筑物管理模块测试
describe('建筑物管理', () => {
  // 组件单元测试
  test('建筑物列表组件渲染正确', () => {
    const wrapper = mount(BuildingList, {
      props: { buildings: mockBuildings }
    })
    expect(wrapper.findAll('.building-card')).toHaveLength(mockBuildings.length)
  })

  // API集成测试
  test('获取建筑物列表API正常', async () => {
    const response = await buildingApi.getList({ page: 1, pageSize: 10 })
    expect(response.code).toBe(200)
    expect(response.data.items).toBeDefined()
  })

  // 表单验证测试
  test('建筑物表单验证规则正确', async () => {
    const wrapper = mount(BuildingForm)
    await wrapper.find('[data-testid="name-input"]').setValue('')
    await wrapper.find('[data-testid="submit-btn"]').trigger('click')
    expect(wrapper.find('.error-message').exists()).toBe(true)
  })
})
```

## 8. 部署和运维

### 8.1 构建配置
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: process.env.NODE_ENV === 'development',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          elementPlus: ['element-plus'],
          utils: ['lodash-es', 'dayjs']
        }
      }
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 8.2 CI/CD 配置
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:e2e

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.PRIVATE_KEY }}
          script: |
            cd /var/www/workplace-safety
            tar -xzf dist.tar.gz
            systemctl restart nginx
```

## 9. 项目排期和里程碑

### 9.1 开发阶段规划
```javascript
const projectPhases = {
  // 第一阶段：基础架构搭建 (2周)
  phase1: {
    duration: '2周',
    tasks: [
      '项目初始化和环境搭建',
      '设计系统和组件库开发',
      '路由和状态管理架构',
      'API接口设计和Mock',
      '构建和部署配置'
    ],
    deliverables: [
      '项目脚手架',
      '基础组件库',
      'API文档',
      '开发环境配置'
    ]
  },

  // 第二阶段：核心模块开发 (6周)
  phase2: {
    duration: '6周',
    modules: [
      { name: '建构筑物管理', duration: '1周' },
      { name: '生产安全设施管理', duration: '1周' },
      { name: '通风与照明管理', duration: '1周' },
      { name: '消防安全管理', duration: '1.5周' },
      { name: '危险物品管理', duration: '1周' },
      { name: '有限空间管理', duration: '0.5周' }
    ],
    deliverables: [
      '六大核心模块完整功能',
      '数据导入导出功能',
      '基础权限控制',
      '单元测试覆盖'
    ]
  },

  // 第三阶段：高级功能和优化 (4周)
  phase3: {
    duration: '4周',
    tasks: [
      '高级权限管理',
      '数据可视化',
      '批量操作功能',
      '高级搜索和筛选',
      '性能优化',
      '响应式适配'
    ],
    deliverables: [
      '完整权限体系',
      '数据图表和报表',
      '移动端适配',
      '性能优化报告'
    ]
  },

  // 第四阶段：测试和上线 (2周)
  phase4: {
    duration: '2周',
    tasks: [
      '集成测试',
      '用户验收测试',
      '安全测试',
      '性能测试',
      '生产环境部署',
      '用户培训'
    ],
    deliverables: [
      '测试报告',
      '用户手册',
      '生产环境',
      '培训材料'
    ]
  }
}
```

### 9.2 里程碑和验收标准
```javascript
const milestones = {
  'M1-架构完成': {
    date: '2025-12-11',
    criteria: [
      '项目脚手架可用',
      '基础组件库完成',
      '开发环境配置完成',
      'API文档发布'
    ]
  },

  'M2-MVP版本': {
    date: '2026-01-22',
    criteria: [
      '六大模块基础功能完成',
      'CRUD操作可用',
      '基础搜索和筛选',
      '数据导入导出'
    ]
  },

  'M3-功能完整版': {
    date: '2026-02-19',
    criteria: [
      '所有规划功能完成',
      '权限体系完整',
      '移动端适配完成',
      '性能优化达标'
    ]
  },

  'M4-正式上线': {
    date: '2026-03-05',
    criteria: [
      '所有测试通过',
      '生产环境部署',
      '用户培训完成',
      '运维文档齐全'
    ]
  }
}
```

## 10. 风险评估和缓解措施

### 10.1 技术风险
```javascript
const technicalRisks = {
  '技术选型风险': {
    probability: 'Medium',
    impact: 'High',
    description: 'Vue 3生态成熟度和人才储备',
    mitigation: [
      '技术调研和PoC验证',
      '团队技术培训',
      '备用方案准备'
    ]
  },

  '性能风险': {
    probability: 'Medium',
    impact: 'Medium',
    description: '大数据量场景下的性能瓶颈',
    mitigation: [
      '虚拟滚动技术',
      '分页和懒加载',
      '前端缓存策略',
      '性能监控和优化'
    ]
  },

  '兼容性风险': {
    probability: 'Low',
    impact: 'Medium',
    description: '不同浏览器和设备兼容性',
    mitigation: [
      'polyfill和babel配置',
      '跨浏览器测试',
      '渐进式增强设计'
    ]
  }
}
```

### 10.2 业务风险
```javascript
const businessRisks = {
  '需求变更风险': {
    probability: 'High',
    impact: 'Medium',
    description: '业务需求频繁变更',
    mitigation: [
      '敏捷开发方法',
      '版本控制',
      '需求管理流程',
      '变更影响评估'
    ]
  },

  '数据迁移风险': {
    probability: 'Medium',
    impact: 'High',
    description: '现有数据迁移到新系统',
    mitigation: [
      '数据清洗和标准化',
      '迁移脚本开发',
      '数据验证机制',
      '回滚方案'
    ]
  },

  '用户接受度风险': {
    probability: 'Medium',
    impact: 'Medium',
    description: '用户对新系统的接受度',
    mitigation: [
      '用户参与设计',
      '易用性测试',
      '渐进式推广',
      '培训和文档支持'
    ]
  }
}
```

---

**文档版本**: v1.0
**最后更新**: 2025-11-27
**产品负责人**: 产品经理
**技术负责人**: 技术总监
**项目经理**: 项目管理办公室
**审核状态**: 待审核