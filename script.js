// 🌸 Kawaii Quest - Motivation Tracker JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 Kawaii Quest załadowany!');
    
    // Theme Switching Functionality
    initializeThemeSwitcher();
    
    // Initialize interactive elements
    initializeHabits();
    initializeMoodTracker();
    initializeChallenges();
    
    // Load saved data from localStorage
    loadSavedData();
});

// Theme Switcher
function initializeThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // Load saved theme or default to pink
    const savedTheme = localStorage.getItem('kawaiiTheme') || 'pink';
    setTheme(savedTheme);
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            setTheme(theme);
            
            // Save theme preference
            localStorage.setItem('kawaiiTheme', theme);
            
            // Update active button
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Add cute animation
            button.style.transform = 'scale(1.3)';
            setTimeout(() => {
                button.style.transform = '';
            }, 200);
        });
    });
}

function setTheme(themeName) {
    const body = document.body;
    const themeClasses = ['theme-pink', 'theme-ocean', 'theme-mint', 'theme-lavender', 'theme-strawberry'];
    
    // Remove all theme classes
    themeClasses.forEach(cls => body.classList.remove(cls));
    
    // Add selected theme
    body.classList.add(`theme-${themeName}`);
    
    // Update active theme button
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
}

// Habit Tracker Functions
function initializeHabits() {
    const habitCards = document.querySelectorAll('.habit-card');
    
    habitCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            // Here you would typically update habit progress
            console.log('Habit clicked! 🎯');
        });
    });
    
    // Add button functionality
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Add cute bounce animation
            btn.style.transform = 'scale(1.3) rotate(180deg)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 300);
            
            console.log('Add button clicked! ✨');
            // Here you would show add habit/challenge/mood modal
        });
    });
}

// Mood Tracker Functions
function initializeMoodTracker() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const moodText = document.querySelector('.mood-text');
    
    const moodTexts = {
        0: "Today you're feeling sad 😢",
        1: "Today you're feeling neutral 😐", 
        2: "Today you're feeling happy 😊",
        3: "Today you're feeling great 😄",
        4: "Today you're feeling amazing 🥰"
    };
    
    moodButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active from all buttons
            moodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked button
            button.classList.add('active');
            
            // Update mood text
            moodText.textContent = moodTexts[index];
            
            // Save mood to localStorage
            localStorage.setItem('currentMood', index);
            
            // Add bounce animation
            button.style.transform = 'scale(1.4)';
            setTimeout(() => {
                button.style.transform = '';
            }, 200);
            
            console.log(`Mood set to: ${moodTexts[index]} 💖`);
        });
    });
}

// Challenge Functions
function initializeChallenges() {
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    challengeCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add hover effect on click
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
            
            console.log('Challenge clicked! 🏆');
        });
    });
}

// Save/Load Data Functions
function loadSavedData() {
    // Load saved mood
    const savedMood = localStorage.getItem('currentMood');
    if (savedMood !== null) {
        const moodButtons = document.querySelectorAll('.mood-btn');
        const moodText = document.querySelector('.mood-text');
        
        moodButtons.forEach(btn => btn.classList.remove('active'));
        if (moodButtons[savedMood]) {
            moodButtons[savedMood].classList.add('active');
        }
        
        const moodTexts = {
            0: "Today you're feeling sad 😢",
            1: "Today you're feeling neutral 😐", 
            2: "Today you're feeling happy 😊",
            3: "Today you're feeling great 😄",
            4: "Today you're feeling amazing 🥰"
        };
        
        if (moodText && moodTexts[savedMood]) {
            moodText.textContent = moodTexts[savedMood];
        }
    }
    
    // Load any other saved data here
    console.log('💾 Saved data loaded!');
}

// Utility Functions
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#4caf50' : '#f44336',
        color: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '1000',
        fontSize: '0.9rem',
        fontWeight: '500',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some kawaii interactions
document.addEventListener('click', (e) => {
    // Create floating hearts on clicks
    if (Math.random() < 0.1) { // 10% chance
        createFloatingHeart(e.clientX, e.clientY);
    }
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 2000);
}

// Add CSS animation for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);