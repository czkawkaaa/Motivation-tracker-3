// 🎨 Kawaii Quest - Animations Module
// Obsługuje wszystkie animacje i efekty wizualne

// ======================
// CONFETTI ANIMATION
// ======================
function triggerConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    
    // Wyczyść poprzednie confetti
    container.innerHTML = '';
    
    // Utwórz 50 kolorowych confetti
    const colors = ['#ff9ac2', '#4fc3f7', '#8be9b6', '#c39cff', '#ff6b9d', '#ffd54f'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Losowe właściwości
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 0.5;
        const animationDuration = 2 + Math.random() * 2;
        
        confetti.style.left = `${left}%`;
        confetti.style.backgroundColor = color;
        confetti.style.animationDelay = `${animationDelay}s`;
        confetti.style.animationDuration = `${animationDuration}s`;
        confetti.classList.add(`confetti-${shape}`);
        
        container.appendChild(confetti);
    }
    
    // Usuń confetti po animacji
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// ======================
// PROGRESS BAR ANIMATION
// ======================
function animateProgressBar(element, targetPercent, duration = 1000) {
    if (!element) return;
    
    const startPercent = parseFloat(element.style.width) || 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out-cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentPercent = startPercent + (targetPercent - startPercent) * eased;
        
        element.style.width = `${currentPercent}%`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Jeśli osiągnięto milestone, dodaj pulsowanie
            if (targetPercent >= 100 || targetPercent % 25 === 0) {
                element.classList.add('milestone-pulse');
                setTimeout(() => element.classList.remove('milestone-pulse'), 1000);
            }
        }
    }
    
    requestAnimationFrame(update);
}

// ======================
// STREAK FLAME ANIMATION
// ======================
function animateStreakFlame(streakNumber) {
    const streakElement = document.getElementById('streakNumber');
    if (!streakElement) return;
    
    // Dodaj shake animation
    streakElement.classList.add('streak-shake');
    setTimeout(() => streakElement.classList.remove('streak-shake'), 500);
    
    // Skaluj flame emoji bazując na wielkości streaku
    const flameScale = 1 + Math.min(streakNumber / 75, 0.5); // Max 1.5x scale
    streakElement.style.transform = `scale(${flameScale})`;
    
    // Pulsowanie dla dużych streaków
    if (streakNumber >= 7) {
        streakElement.classList.add('flame-pulse');
    } else {
        streakElement.classList.remove('flame-pulse');
    }
}

// ======================
// CHECKBOX POP ANIMATION
// ======================
function animateCheckbox(checkboxElement) {
    if (!checkboxElement) return;
    
    const taskItem = checkboxElement.closest('.task-item');
    if (!taskItem) return;
    
    if (checkboxElement.checked) {
        // Animacja zaznaczenia
        taskItem.classList.add('task-pop');
        setTimeout(() => taskItem.classList.remove('task-pop'), 300);
        
        // Dodaj checkmark animation
        taskItem.classList.add('completed');
    } else {
        // Animacja odznaczenia
        taskItem.classList.remove('completed');
        taskItem.classList.add('task-unpop');
        setTimeout(() => taskItem.classList.remove('task-unpop'), 300);
    }
}

// ======================
// MILESTONE CELEBRATION
// ======================
function celebrateMilestone(streakNumber) {
    const milestones = [7, 14, 30, 50, 75];
    
    if (!milestones.includes(streakNumber)) return;
    
    // Triggeruj confetti
    triggerConfetti();
    
    // Pokaż specjalny banner
    const banner = document.createElement('div');
    banner.className = 'milestone-banner';
    banner.innerHTML = `
        <div class="milestone-content">
            <div class="milestone-icon">🎉</div>
            <h2>Gratulacje!</h2>
            <p>Osiągnąłeś ${streakNumber}-dniowy streak! 🔥</p>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // Animuj wejście
    setTimeout(() => banner.classList.add('show'), 100);
    
    // Usuń po 4 sekundach
    setTimeout(() => {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
    }, 4000);
}

// ======================
// CARD GLOW EFFECT
// ======================
function addCardGlow(cardElement) {
    if (!cardElement) return;
    cardElement.classList.add('card-glow');
}

function removeCardGlow(cardElement) {
    if (!cardElement) return;
    cardElement.classList.remove('card-glow');
}

// ======================
// BADGE FLIP ANIMATION
// ======================
function initBadgeFlipAnimation() {
    const badges = document.querySelectorAll('.badge-card');
    
    badges.forEach(badge => {
        // Dodaj strukturę dla flip
        if (!badge.querySelector('.badge-flip-inner')) {
            const front = document.createElement('div');
            front.className = 'badge-flip-front';
            front.innerHTML = badge.innerHTML;
            
            const back = document.createElement('div');
            back.className = 'badge-flip-back';
            back.innerHTML = `
                <p class="badge-description">${badge.querySelector('p')?.textContent || 'Odblokuj tę odznakę!'}</p>
            `;
            
            const inner = document.createElement('div');
            inner.className = 'badge-flip-inner';
            inner.appendChild(front);
            inner.appendChild(back);
            
            badge.innerHTML = '';
            badge.appendChild(inner);
            badge.classList.add('badge-flip-container');
        }
    });
}

// ======================
// PARALLAX SCROLL EFFECT
// ======================
function initParallax() {
    const cards = document.querySelectorAll('.card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        cards.forEach((card, index) => {
            const speed = 0.05 + (index % 3) * 0.02; // Różne prędkości dla różnych kart
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ======================
// SMOOTH NUMBER COUNTER
// ======================
function animateCounter(element, start, end, duration = 1000) {
    if (!element) return;
    
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * eased);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ======================
// CELEBRATION SOUND (Optional)
// ======================
function playCelebrationSound() {
    // Możesz dodać dźwięk jeśli masz plik audio
    // const audio = new Audio('celebration.mp3');
    // audio.play();
}

// ======================
// INIT ALL ANIMATIONS
// ======================
function initAnimations() {
    console.log('🎨 Initializing animations...');
    
    // Init badge flips
    if (document.querySelector('.badge-card')) {
        initBadgeFlipAnimation();
    }
    
    // Init parallax (opcjonalnie - może być za dużo na mobile)
    // initParallax();
    
    // Dodaj event listenery dla checkboxów
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('task-checkbox')) {
            animateCheckbox(e.target);
        }
    });
    
    console.log('✅ Animations ready!');
}

// Automatyczna inicjalizacja gdy DOM jest gotowy
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// Eksportuj funkcje dla użycia w innych plikach
window.triggerConfetti = triggerConfetti;
window.animateProgressBar = animateProgressBar;
window.animateStreakFlame = animateStreakFlame;
window.celebrateMilestone = celebrateMilestone;
window.animateCounter = animateCounter;
window.addCardGlow = addCardGlow;
window.removeCardGlow = removeCardGlow;
