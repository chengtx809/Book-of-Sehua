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
        this.preloadedAudios = {}; // 缓存预加载的音频对象
        
        this.init();
    }
    
    async init() {
        await this.loadAudioData();
        this.bindEvents();
        // 不再预加载所有音频，改为按需加载
        console.log('音频加载策略：按需加载');
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
                    "text": "每个人都有对巴黎的理解和期待，当你来了以后或许心满意足，或许不尽人意，但是不管怎么样，你都会对这个城市有一个新的了解",
                    "author": "Tim"
                },
                "sehua_4.MP3": {
                    "text": "但是有一点我真的觉得挺值得学的，就是他们从来不为自己的休息而有愧疚感",
                    "author": "Tim"
                },
                "sehua_5.MP3": {
                    "text": "你的善意和爱心，真的很重要",
                    "author": "Tim"
                },
                "sehua_6.MP3": {
                    "text": "当你看人类所有的历史，悲欢离合，英雄小人，爱恨情仇，都只在这么一颗小小的蓝色星球之上",
                    "author": "Tim"
                },
                "sehua_7.MP3": {
                    "text": "似乎我们做什么事，其实它都没有意义，最终我们都会化为尘土",
                    "author": "Tim"
                },
                "sehua_8.MP3": {
                    "text": "如果这个宇宙的结局是注定的，是消亡，是归于死寂，那或许这更说明，只有过程才是最重要的，这是我们能够改变的唯一的事。",
                    "author": "Tim"
                },
                "sehua_9.MP3": {
                    "text": "如果这些画面，让你对明天多了一些期待，会有这么一点点燃的感觉，那就够了",
                    "author": "Tim"
                },
                "sehua_10.MP3": {
                    "text": "梦想可以大，第一步总是小的",
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
        
        // 添加旋转动画效果
        this.timImage.classList.add('spin');
        
        // 立即抽取涩话
        const result = this.selectRandomSehua();
        
        // 预加载音频
        const preloadedAudio = this.preloadAudio(result.audioFile);
        this.audioPlayer.src = preloadedAudio.src;
        
        // 旋转动画完成后直接显示结果并播放音频
        setTimeout(() => {
            this.showCard();
            this.finalizeAnimation(result);
        }, 800); // 与旋转动画时长一致
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
        // 如果已经预加载过，直接返回
        if (this.preloadedAudios[audioFile]) {
            return this.preloadedAudios[audioFile];
        }
        
        // 创建新的音频对象并预加载
        const audio = new Audio(`sehua_audio/${audioFile}`);
        audio.preload = 'auto';
        
        // 缓存音频对象
        this.preloadedAudios[audioFile] = audio;
        
        // 开始加载
        audio.load();
        console.log('动画过程中预加载音频:', audioFile);
        
        return audio;
    }
    
    preloadAllAudios() {
        // 移除预加载所有音频的方法，改为按需加载
        console.log('preloadAllAudios 方法已废弃，使用按需加载策略');
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
        
        // 移除旋转动画类
        this.timImage.classList.remove('spin');
        
        // 重新启用点击
        this.timImage.style.pointerEvents = 'auto';
    }
    
    // 移除startAnimation方法，因为不再需要文字滚动效果
    
    finalizeAnimation(result) {
        // 移除旋转动画效果
        this.timImage.classList.remove('spin');
        
        // 显示最终结果
        this.quoteText.textContent = result.text;
        this.quoteAuthor.textContent = `—— ${result.author}`;
        
        // 音频已经在动画开始时加载完成，直接播放
        console.log('直接使用预加载的音频:', result.audioFile);
        
        // 播放音频
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