// 数字转中文大写转换器 - Material Design 风格
class NumberToChineseConverter {
    constructor() {
        // 数字到中文的映射
        this.digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        this.units = ['', '拾', '佰', '仟'];
        this.bigUnits = ['', '万', '亿', '万亿'];
        
        // DOM元素
        this.numberInput = document.getElementById('numberInput');
        this.resultDisplay = document.getElementById('resultDisplay');
        this.clearBtn = document.getElementById('clearBtn');
        this.fabBtn = document.getElementById('fabBtn');
        
        // 状态管理
        this.isLoading = false;
        this.hasError = false;
        
        // 绑定事件
        this.bindEvents();
        
        // 初始化
        this.init();
    }
    
    // 初始化
    init() {
        // 聚焦到输入框
        this.numberInput.focus();
        
        // 添加输入框的焦点效果
        this.numberInput.addEventListener('focus', () => {
            this.addFocusState();
        });
        
        this.numberInput.addEventListener('blur', () => {
            this.removeFocusState();
        });
        
        // 初始化 Ripple 效果
        this.initRippleEffects();
    }
    
    // 初始化 Ripple 效果
    initRippleEffects() {
        const rippleElements = document.querySelectorAll('.ripple');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createRipple(e, element);
            });
        });
    }
    
    // 创建 Ripple 效果
    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // 绑定事件
    bindEvents() {
        // 输入事件 - 实时转换
        this.numberInput.addEventListener('input', (e) => {
            this.handleInput(e.target.value);
        });
        
        // 清空按钮事件
        this.clearBtn.addEventListener('click', () => {
            this.clearInput();
        });
        
        // 浮动操作按钮事件
        this.fabBtn.addEventListener('click', () => {
            this.clearInput();
        });
        
        // 键盘事件
        this.numberInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearInput();
            }
        });
        
        // 点击示例数字
        document.querySelectorAll('.example-item').forEach(element => {
            element.addEventListener('click', (e) => {
                const numberElement = element.querySelector('.example-number');
                if (numberElement) {
                    const number = numberElement.textContent;
                    this.numberInput.value = number;
                    this.handleInput(number);
                    this.numberInput.focus();
                    
                    // 添加点击反馈
                    this.addClickFeedback(element);
                }
            });
        });
        
        // 结果区域点击复制
        this.resultDisplay.addEventListener('click', () => {
            this.copyResult();
        });
    }
    
    // 处理输入
    handleInput(value) {
        // 移除所有非数字字符
        const cleanValue = value.replace(/[^\d]/g, '');
        
        // 更新输入框的值（如果被清理了）
        if (cleanValue !== value) {
            this.numberInput.value = cleanValue;
        }
        
        // 检查是否为空
        if (!cleanValue) {
            this.showPlaceholder();
            this.removeErrorState();
            return;
        }
        
        // 检查数字范围
        const num = parseInt(cleanValue);
        if (num > 999999999999) {
            this.showError('数字超出范围，请输入 0-999,999,999,999 之间的数字');
            return;
        }
        
        // 转换数字
        try {
            this.setLoadingState(true);
            
            // 模拟异步处理（实际是同步的，但为了展示加载状态）
            setTimeout(() => {
                const result = this.convertToChinese(num);
                this.showResult(result);
                this.addSuccessState();
                this.setLoadingState(false);
            }, 150);
            
        } catch (error) {
            this.showError('转换失败，请检查输入');
            this.setLoadingState(false);
        }
    }
    
    // 数字转中文大写的核心算法
    convertToChinese(num) {
        if (num === 0) return '零';
        
        const result = [];
        let unitIndex = 0;
        
        while (num > 0) {
            const section = num % 10000;
            const sectionStr = this.convertSection(section);
            
            if (sectionStr) {
                if (unitIndex > 0) {
                    result.unshift(this.bigUnits[unitIndex]);
                }
                result.unshift(sectionStr);
            }
            
            num = Math.floor(num / 10000);
            unitIndex++;
        }
        
        return result.join('');
    }
    
    // 转换四位数字段
    convertSection(section) {
        if (section === 0) return '';
        
        const result = [];
        const sectionStr = section.toString().padStart(4, '0');
        
        for (let i = 0; i < 4; i++) {
            const digit = parseInt(sectionStr[i]);
            const unit = this.units[3 - i];
            
            if (digit > 0) {
                result.push(this.digits[digit] + unit);
            } else if (digit === 0 && result.length > 0 && !result[result.length - 1].includes('零')) {
                result.push('零');
            }
        }
        
        // 清理多余的零
        return this.cleanZeros(result.join(''));
    }
    
    // 清理多余的零
    cleanZeros(str) {
        // 移除末尾的零
        str = str.replace(/零+$/, '');
        
        // 移除连续的零
        str = str.replace(/零+/g, '零');
        
        // 移除单位前的零
        str = str.replace(/零([万亿])/g, '$1');
        
        return str;
    }
    
    // 显示结果
    showResult(result) {
        this.resultDisplay.innerHTML = `<span class="result-text">${result}</span>`;
        this.resultDisplay.classList.remove('placeholder');
        this.resultDisplay.classList.add('has-result');
        this.removeErrorState();
    }
    
    // 显示占位符
    showPlaceholder() {
        this.resultDisplay.innerHTML = '<span class="placeholder">等待输入...</span>';
        this.resultDisplay.classList.remove('has-result');
    }
    
    // 显示错误
    showError(message) {
        this.resultDisplay.innerHTML = `<span class="error-text">${message}</span>`;
        this.resultDisplay.classList.remove('has-result');
        this.addErrorState();
        this.hasError = true;
    }
    
    // 清空输入
    clearInput() {
        this.numberInput.value = '';
        this.showPlaceholder();
        this.removeErrorState();
        this.removeSuccessState();
        this.numberInput.focus();
    }
    
    // 复制结果
    copyResult() {
        const resultText = this.resultDisplay.querySelector('.result-text');
        if (resultText) {
            navigator.clipboard.writeText(resultText.textContent).then(() => {
                this.showCopySuccess();
            }).catch(() => {
                this.showCopyError();
            });
        }
    }
    
    // 显示复制成功
    showCopySuccess() {
        const originalText = this.resultDisplay.querySelector('.result-text').textContent;
        this.resultDisplay.innerHTML = '<span class="result-text" style="color: var(--success-color);">已复制到剪贴板！</span>';
        
        setTimeout(() => {
            this.resultDisplay.innerHTML = `<span class="result-text">${originalText}</span>`;
        }, 1500);
    }
    
    // 显示复制错误
    showCopyError() {
        const originalText = this.resultDisplay.querySelector('.result-text').textContent;
        this.resultDisplay.innerHTML = '<span class="result-text" style="color: var(--error-color);">复制失败，请手动复制</span>';
        
        setTimeout(() => {
            this.resultDisplay.innerHTML = `<span class="result-text">${originalText}</span>`;
        }, 1500);
    }
    
    // 设置加载状态
    setLoadingState(loading) {
        this.isLoading = loading;
        if (loading) {
            this.numberInput.classList.add('loading');
            this.resultDisplay.classList.add('loading');
        } else {
            this.numberInput.classList.remove('loading');
            this.resultDisplay.classList.remove('loading');
        }
    }
    
    // 添加焦点状态
    addFocusState() {
        this.numberInput.parentElement.classList.add('focused');
    }
    
    // 移除焦点状态
    removeFocusState() {
        this.numberInput.parentElement.classList.remove('focused');
    }
    
    // 添加错误状态
    addErrorState() {
        this.numberInput.classList.add('error');
        this.resultDisplay.classList.add('error');
    }
    
    // 移除错误状态
    removeErrorState() {
        this.numberInput.classList.remove('error');
        this.resultDisplay.classList.remove('error');
        this.hasError = false;
    }
    
    // 添加成功状态
    addSuccessState() {
        this.numberInput.classList.add('success');
        this.resultDisplay.classList.add('success');
        
        // 2秒后移除成功状态
        setTimeout(() => {
            this.removeSuccessState();
        }, 2000);
    }
    
    // 移除成功状态
    removeSuccessState() {
        this.numberInput.classList.remove('success');
        this.resultDisplay.classList.remove('success');
    }
    
    // 添加点击反馈
    addClickFeedback(element) {
        element.style.transform = 'scale(0.98)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new NumberToChineseConverter();
    
    // 添加Material Design风格的额外样式
    const style = document.createElement('style');
    style.textContent = `
        .result-text {
            color: var(--text-primary);
            font-weight: 400;
        }
        
        .error-text {
            color: var(--error-color);
            font-weight: 400;
        }
        
        .has-result {
            background: var(--bg-surface);
            border-color: var(--primary-color);
        }
        
        .focused .number-input {
            border-bottom-color: var(--primary-color);
            box-shadow: 0 2px 0 0 var(--primary-color);
        }
        
        .example-item {
            cursor: pointer;
            user-select: none;
            transition: var(--transition-medium);
        }
        
        .example-item:hover {
            background: var(--bg-surface);
            border-color: var(--primary-color);
            box-shadow: var(--elevation-2);
            transform: translateY(-2px);
        }
        
        .example-item:active {
            transform: translateY(0);
            box-shadow: var(--elevation-1);
        }
        
        /* Material Design Ripple 效果 */
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Material Design 加载动画 */
        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid var(--divider-color);
            border-top-color: var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        
        /* 工具提示样式 */
        .clear-btn[title]:hover::after,
        .fab[title]:hover::after {
            content: attr(title);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(97, 97, 97, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: var(--border-radius-small);
            font-size: var(--font-size-caption);
            white-space: nowrap;
            z-index: 1000;
            margin-bottom: var(--spacing-1);
            box-shadow: var(--elevation-2);
        }
        
        /* 响应式优化 */
        @media (max-width: 480px) {
            .examples-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .fab {
                bottom: var(--spacing-2);
                right: var(--spacing-2);
            }
        }
        
        /* 深色模式支持 */
        @media (prefers-color-scheme: dark) {
            :root {
                --text-primary: rgba(255, 255, 255, 0.87);
                --text-secondary: rgba(255, 255, 255, 0.54);
                --text-disabled: rgba(255, 255, 255, 0.38);
                --text-hint: rgba(255, 255, 255, 0.38);
                --bg-primary: #121212;
                --bg-secondary: #1E1E1E;
                --bg-surface: #1E1E1E;
                --bg-background: #121212;
                --divider-color: rgba(255, 255, 255, 0.12);
            }
        }
    `;
    document.head.appendChild(style);
});

// 添加一些实用功能
window.addEventListener('load', () => {
    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter 清空输入
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('numberInput').value = '';
            document.getElementById('numberInput').dispatchEvent(new Event('input'));
        }
        
        // Ctrl/Cmd + C 复制结果
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            const resultText = document.querySelector('.result-text');
            if (resultText) {
                navigator.clipboard.writeText(resultText.textContent);
            }
        }
    });
    
    // 添加页面可见性API支持
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // 页面重新可见时，聚焦到输入框
            document.getElementById('numberInput').focus();
        }
    });
    
    // 添加触摸支持
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // 添加性能监控
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`页面加载时间: ${loadTime}ms`);
        });
    }
}); 