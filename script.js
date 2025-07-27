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
        
        this.init();
    }
    
    async init() {
        await this.loadAudioData();
        this.bindEvents();
    }
    
    async loadAudioData() {
        try {
            this.audioData = {
                "sehua_1.mp3": {
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
            console.log('音频数据加载成功:', this.audioData);
        } catch (error) {
            console.error('加载音频数据失败:', error);
        }
    }
    
    bindEvents() {
        this.timImage.addEventListener('click', () => this.playRandomAudio());
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
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new TimBook();
});

// 添加触摸支持
document.addEventListener('touchstart', function() {}, { passive: true });