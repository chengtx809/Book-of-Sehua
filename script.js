class TimBook {
    constructor() {
        this.audioData = null;
        this.audioPlayer = document.getElementById('audioPlayer');
        this.timImage = document.getElementById('timImage');
        this.cardOverlay = document.getElementById('cardOverlay');
        this.textCard = document.getElementById('textCard');
        this.quoteText = document.getElementById('quoteText');
        this.quoteAuthor = document.getElementById('quoteAuthor');
        this.closeBtn = document.getElementById('closeBtn');
        this.extractionIndicator = document.getElementById('extractionIndicator');
        
        this.init();
    }
    
    async init() {
        await this.loadAudioData();
        this.bindEvents();
    }
    
    async loadAudioData() {
        try {
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
            
            // 从音频数据中提取所有涩话文本用于动画效果
            this.sehuaTexts = Object.values(this.audioData).map(item => item.text);
            
            console.log('音频数据加载成功:', this.audioData);
            console.log('涩话文本数据加载成功:', this.sehuaTexts);
        } catch (error) {
            console.error('加载音频数据失败:', error);
        }
    }
    
    bindEvents() {
        this.timImage.addEventListener('click', () => this.handleTimClick());
        this.closeBtn.addEventListener('click', () => this.closeCard());
        this.cardOverlay.addEventListener('click', (e) => {
            if (e.target === this.cardOverlay) {
                this.closeCard();
            }
        });
        
        // 音频播放结束事件
        this.audioPlayer.addEventListener('ended', () => {
            console.log('音频播放结束');
        });
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.cardOverlay.classList.contains('active')) {
                this.closeCard();
            }
        });
    }
    
    handleTimClick() {
        // 禁用点击，防止重复触发
        this.timImage.style.pointerEvents = 'none';
        
        // 添加抽取动画效果
        this.timImage.classList.add('extracting');
        this.timImage.classList.add('shake');
        
        // 显示抽取指示器
        this.extractionIndicator.classList.add('active');
        
        // 立即抽取涩话并预加载音频
        const result = this.selectRandomSehua();
        
        // 预加载音频
        this.preloadAudio(result.audioFile);
        
        // 延迟开始动画效果，让用户看到抽取动画
        setTimeout(() => {
            this.timImage.classList.remove('shake');
            this.timImage.classList.add('spin');
            
            setTimeout(() => {
                this.startAnimation(result);
            }, 400);
        }, 500);
    }
    
    selectRandomSehua() {
        const audioFiles = Object.keys(this.audioData);
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        const selectedAudio = audioFiles[randomIndex];
        const audioInfo = this.audioData[selectedAudio];
        
        return {
            audioFile: selectedAudio,
            text: audioInfo.text,
            author: audioInfo.author
        };
    }
    
    preloadAudio(audioFile) {
        const audio = new Audio(`sehua_audio/${audioFile}`);
        audio.load();
        console.log('预加载音频:', audioFile);
    }
    
    playRandomAudio() {
        if (!this.audioData) {
            console.error('音频数据未加载');
            return;
        }
        
        const audioFiles = Object.keys(this.audioData);
        if (audioFiles.length === 0) {
            console.error('没有可用的音频文件');
            return;
        }
        
        // 随机选择音频
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        const selectedAudio = audioFiles[randomIndex];
        const audioInfo = this.audioData[selectedAudio];
        
        console.log('选择音频:', selectedAudio);
        
        // 设置音频源
        this.audioPlayer.src = `sehua_audio/${selectedAudio}`;
        
        // 设置文字内容
        this.quoteText.textContent = audioInfo.text;
        this.quoteAuthor.textContent = `—— ${audioInfo.author}`;
        
        // 播放音频
        this.audioPlayer.play().catch(error => {
            console.error('播放音频失败:', error);
            // 某些浏览器需要用户交互后才能播放音频
            this.showCard();
        });
        
        // 显示卡片
        this.showCard();
        
        // 添加点击动效
        this.timImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.timImage.style.transform = '';
        }, 150);
    }
    
    showCard() {
        this.cardOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 添加出现动画
        setTimeout(() => {
            this.textCard.style.transform = 'scale(1) translateY(0)';
        }, 10);
    }
    
    closeCard() {
        this.cardOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // 停止音频
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        
        // 重置卡片动画
        this.textCard.style.transform = 'scale(0.8) translateY(20px)';
        
        // 清理动画定时器
        if (this.currentAnimationTimer) {
            clearInterval(this.currentAnimationTimer);
            this.currentAnimationTimer = null;
        }
        
        // 隐藏抽取指示器（如果还在显示）
        this.extractionIndicator.classList.remove('active');
        
        // 移除所有动画类
        this.timImage.classList.remove('extracting', 'shake', 'spin');
        
        // 重新启用点击
        this.timImage.style.pointerEvents = 'auto';
    }
    
    startAnimation(result) {
        // 隐藏抽取指示器
        this.extractionIndicator.classList.remove('active');
        
        // 显示卡片
        this.showCard();
        
        // 添加动画类
        this.textCard.classList.add('animating');
        
        // 设置初始状态
        this.quoteText.textContent = '';
        this.quoteAuthor.textContent = '';
        
        // 开始快速切换动画
        let animationCount = 0;
        const totalAnimations = 20; // 增加切换次数
        const animationInterval = 150; // 减少间隔时间，更快切换
        
        const animationTimer = setInterval(() => {
            const randomTextIndex = Math.floor(Math.random() * this.sehuaTexts.length);
            this.quoteText.textContent = this.sehuaTexts[randomTextIndex];
            this.quoteAuthor.textContent = '—— 抽取中...';
            
            // 添加闪烁效果
            this.quoteText.style.animation = 'none';
            setTimeout(() => {
                this.quoteText.style.animation = 'textFlash 0.15s ease-in-out';
            }, 10);
            
            animationCount++;
            
            if (animationCount >= totalAnimations) {
                clearInterval(animationTimer);
                this.textCard.classList.remove('animating');
                this.finalizeAnimation(result);
            }
        }, animationInterval);
        
        // 保存定时器引用以便清理
        this.currentAnimationTimer = animationTimer;
    }
    
    finalizeAnimation(result) {
        // 移除抽取动画效果
        this.timImage.classList.remove('extracting');
        this.timImage.classList.remove('spin');
        
        // 显示最终结果
        this.quoteText.textContent = result.text;
        this.quoteAuthor.textContent = `—— ${result.author}`;
        
        // 设置音频并播放
        this.audioPlayer.src = `sehua_audio/${result.audioFile}`;
        this.audioPlayer.play().catch(error => {
            console.error('播放音频失败:', error);
        });
        
        // 重新启用点击
        setTimeout(() => {
            this.timImage.style.pointerEvents = 'auto';
        }, 500);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new TimBook();
});

// 添加触摸支持
document.addEventListener('touchstart', function() {}, { passive: true });