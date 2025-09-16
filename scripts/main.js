// 主应用程序脚本
class InspectionApp {
    constructor() {
        this.currentPage = 'inspection-list';
        this.currentCategory = 'inspection'; // 当前活动的顶部菜单分类
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadInitialPage();
        this.initializeNavigation();
        this.initSidebarState();
    }

    bindEvents() {
        // 绑定侧边栏菜单项点击事件
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleMenuClick(e.currentTarget);
            });
        });

        // 绑定顶部导航主菜单点击事件
        const topNavLinks = document.querySelectorAll('.nav-link[data-category]');
        topNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleTopNavCategoryClick(e.currentTarget);
            });
        });

        // 绑定侧边栏折叠按钮事件
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // 监听来自iframe的消息
        window.addEventListener('message', (event) => {
            this.handlePostMessage(event);
        });

        // 绑定iframe加载事件
        const contentFrame = document.getElementById('content-frame');
        contentFrame.addEventListener('load', () => {
            this.handleFrameLoad();
        });

        // 响应式菜单切换
        this.initResponsiveMenu();
    }

    handleMenuClick(menuItem) {
        const page = menuItem.getAttribute('data-page');
        if (page && page !== this.currentPage) {
            this.navigateToPage(page, menuItem);
        }
    }

    handleTopNavCategoryClick(navLink) {
        const category = navLink.getAttribute('data-category');
        if (category && category !== this.currentCategory) {
            this.switchSidebarCategory(category);
            this.updateTopNavActiveState(navLink);
            this.currentCategory = category;
        }
    }

    handlePostMessage(event) {
        // 处理来自iframe的导航消息
        if (event.data && event.data.type === 'navigate') {
            const targetPage = event.data.page;
            const menuItem = document.querySelector(`.menu-item[data-page="${targetPage}"]`);
            
            if (menuItem) {
                // 使用现有的导航方法
                this.navigateToPage(targetPage, menuItem);
                
                // 如果有数据需要传递，可以在这里处理
                if (event.data.data) {
                    console.log('传递的数据:', event.data.data);
                    sessionStorage.setItem('navigationData', JSON.stringify(event.data.data));
                }
                
                // 如果有模式参数，同样传递
                if (event.data.mode) {
                    console.log('访问模式:', event.data.mode);
                    sessionStorage.setItem('navigationMode', event.data.mode);
                }
            } else {
                console.warn(`找不到页面 "${targetPage}" 对应的菜单项`);
                utils.showMessage(`页面 "${targetPage}" 不存在`, 'error');
            }
        }
    }


    navigateToPage(page, menuItem) {
        // 更新活动状态
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        menuItem.classList.add('active');

        // 更新页面标题和面包屑
        const pageTitle = menuItem.querySelector('span').textContent;
        const sectionTitle = menuItem.closest('.menu-section').querySelector('.menu-title').textContent.trim();
        
        document.getElementById('page-title').textContent = pageTitle;
        document.getElementById('current-page').textContent = pageTitle;
        
        // 更新面包屑中的分类
        const breadcrumb = document.querySelector('.breadcrumb span');
        breadcrumb.textContent = sectionTitle;

        // 加载对应页面
        this.loadPage(page);
        this.currentPage = page;
    }


    // 切换侧边栏菜单分类显示
    switchSidebarCategory(category) {
        const allSections = document.querySelectorAll('.menu-section');
        
        // 隐藏所有菜单分组
        allSections.forEach(section => {
            section.classList.add('hidden');
        });
        
        // 显示对应分类的菜单分组
        const targetSections = document.querySelectorAll(`.menu-section[data-category="${category}"]`);
        targetSections.forEach(section => {
            section.classList.remove('hidden');
        });
        
        // 如果是巡检分类，默认激活第一个菜单项
        if (category === 'inspection') {
            const firstMenuItem = document.querySelector('.menu-section[data-category="inspection"] .menu-item');
            if (firstMenuItem && !document.querySelector('.menu-item.active')) {
                this.handleMenuClick(firstMenuItem);
            }
        }
        
        // 如果是数据看板分类，默认激活第一个菜单项
        if (category === 'dashboard') {
            const firstMenuItem = document.querySelector('.menu-section[data-category="dashboard"] .menu-item');
            if (firstMenuItem && !document.querySelector('.menu-item.active')) {
                this.handleMenuClick(firstMenuItem);
            }
        }
    }

    // 更新顶部导航的激活状态
    updateTopNavActiveState(activeLink) {
        // 清除所有顶部导航的激活状态
        document.querySelectorAll('.nav-link[data-category]').forEach(link => {
            link.classList.remove('active');
        });
        
        // 设置当前点击的导航为激活状态
        activeLink.classList.add('active');
    }

    loadPage(page) {
        const contentFrame = document.getElementById('content-frame');
        const pageUrl = `pages/${page}.html`;
        
        // 显示加载状态
        this.showLoading();
        
        // 加载页面
        contentFrame.src = pageUrl;
    }

    loadInitialPage() {
        this.loadPage(this.currentPage);
    }

    // 初始化导航状态
    initializeNavigation() {
        // 设置初始的侧边栏分类显示
        this.switchSidebarCategory(this.currentCategory);
        
        // 设置初始的顶部导航激活状态
        const initialTopNavLink = document.querySelector(`.nav-link[data-category="${this.currentCategory}"]`);
        if (initialTopNavLink) {
            this.updateTopNavActiveState(initialTopNavLink);
        }
    }

    handleFrameLoad() {
        // 隐藏加载状态
        this.hideLoading();
        
        // 可以在这里添加页面加载完成后的处理逻辑
        console.log(`页面 ${this.currentPage} 加载完成`);
    }

    showLoading() {
        const iframeContainer = document.querySelector('.iframe-container');
        if (!document.querySelector('.loading')) {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading';
            loadingDiv.textContent = '加载中...';
            iframeContainer.appendChild(loadingDiv);
        }
    }

    hideLoading() {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.remove();
        }
    }

    initResponsiveMenu() {
        // 移动端菜单切换
        if (window.innerWidth <= 576) {
            this.createMobileMenuToggle();
        }

        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 576) {
                this.createMobileMenuToggle();
            } else {
                this.removeMobileMenuToggle();
            }
        });
    }

    createMobileMenuToggle() {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
            toggle.style.cssText = `
                position: fixed;
                top: 15px;
                left: 15px;
                z-index: 1001;
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                padding: 8px;
                border-radius: 4px;
                cursor: pointer;
            `;
            
            toggle.addEventListener('click', () => {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('show');
            });
            
            document.body.appendChild(toggle);
        }
    }

    removeMobileMenuToggle() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (toggle) {
            toggle.remove();
        }
    }

    // 侧边栏折叠/展开功能
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const toggleIcon = document.querySelector('#sidebar-toggle i');
        
        if (sidebar.classList.contains('collapsed')) {
            // 展开侧边栏
            sidebar.classList.remove('collapsed');
            toggleIcon.className = 'fas fa-bars';
        } else {
            // 折叠侧边栏
            sidebar.classList.add('collapsed');
            toggleIcon.className = 'fas fa-indent';
        }
        
        // 保存状态到localStorage
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    }

    // 初始化侧边栏状态
    initSidebarState() {
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        const sidebar = document.querySelector('.sidebar');
        const toggleIcon = document.querySelector('#sidebar-toggle i');
        
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            toggleIcon.className = 'fas fa-indent';
        }
    }
}

// 页面配置映射
const pageConfig = {
    'inspection-list': {
        title: '巡检记录列表',
        section: '巡检管理'
    },
    'inspection-detail': {
        title: '巡检记录详情',
        section: '巡检管理'
    },
    'inspection-settings': {
        title: '巡检设置',
        section: '巡检管理'
    },
    'factory-management': {
        title: '工厂管理',
        section: '巡检设置'
    },
    'camera-management': {
        title: '摄像机管理',
        section: '巡检设置'
    },
    'schedule-management': {
        title: '巡检计划管理',
        section: '巡检设置'
    },
    'alert-recipients': {
        title: '预警接收人管理',
        section: '巡检设置'
    },
    'dashboard-analysis': {
        title: '无票作业分析看板',
        section: '数据看板'
    },
    'user-management': {
        title: '用户管理',
        section: '系统管理'
    },
    'system-settings': {
        title: '系统设置',
        section: '系统管理'
    }
};

// 工具函数
const utils = {
    // 格式化日期
    formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    },

    // 显示消息提示
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            z-index: 1002;
            animation: slideIn 0.3s ease;
        `;
        
        // 设置背景色
        const colors = {
            info: '#3498db',
            success: '#27ae60',
            warning: '#f39c12',
            error: '#e74c3c'
        };
        messageDiv.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(messageDiv);
        
        // 3秒后自动移除
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    },

    // 确认对话框
    confirm(message, callback) {
        if (window.confirm(message)) {
            callback && callback();
        }
    }
};

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new InspectionApp();
    console.log('无票作业巡检系统已启动');
});

// 全局错误处理
window.addEventListener('error', (e) => {
    console.error('应用程序错误:', e.error);
    utils.showMessage('系统发生错误，请刷新页面重试', 'error');
});

// 导出工具函数供其他页面使用
window.utils = utils;
window.pageConfig = pageConfig;