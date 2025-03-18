// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.bg-gray-800').forEach(el => {
    el.classList.add('transition-all', 'duration-500', 'opacity-0', 'translate-y-10');
    observer.observe(el);
});

// Buy button click handlers
const buyButtons = document.querySelectorAll('#buyButton, #finalBuyButton');
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Add a ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'absolute bg-white/20 rounded-full transform scale-0 animate-ripple';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 1000);
        
        // Show purchase modal
        showPurchaseModal();
    });
});

// Purchase modal
function showPurchaseModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 opacity-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold gradient-text">Complete Your Purchase</h3>
                <button class="close-modal text-gray-400 hover:text-white transition-colors">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-6">
                <div class="bg-gray-700/50 p-4 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-gray-300">Bundle Price</span>
                        <span class="text-xl font-bold">$199</span>
                    </div>
                    <div class="flex justify-between items-center text-sm text-gray-400">
                        <span>Original Price</span>
                        <span class="line-through">$499</span>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex items-center text-sm text-gray-300">
                        <i class="fas fa-check-circle text-green-500 mr-2"></i>
                        <span>Lifetime Access</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-300">
                        <i class="fas fa-check-circle text-green-500 mr-2"></i>
                        <span>Instant Download</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-300">
                        <i class="fas fa-check-circle text-green-500 mr-2"></i>
                        <span>24/7 Support</span>
                    </div>
                </div>
                <div class="space-y-4">
                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                        <i class="fas fa-lock mr-2"></i>
                        Proceed to Payment
                    </button>
                    <button class="cancel-button w-full border border-gray-700 text-gray-400 hover:bg-gray-700/50 font-bold py-3 px-6 rounded-lg transition-colors">
                        Cancel
                    </button>
                </div>
                <div class="text-center text-sm text-gray-400">
                    <i class="fas fa-shield-alt mr-1"></i>
                    Secure Payment • 30-Day Money Back Guarantee
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close modal when clicking close button
    const closeButton = modal.querySelector('.close-modal');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking cancel button
    const cancelButton = modal.querySelector('.cancel-button');
    cancelButton.addEventListener('click', () => {
        modal.remove();
    });
}

// Add floating animation to feature cards
const featureCards = document.querySelectorAll('#features .bg-gray-800');
featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('animate-float');
});

// Add hover effect to category cards
const categoryCards = document.querySelectorAll('#categories .bg-gray-800');
categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('shadow-lg', 'shadow-blue-500/20');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('shadow-lg', 'shadow-blue-500/20');
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add countdown timer for the special offer
function updateCountdown() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const timeLeft = endOfDay - now;

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
        countdownElement.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); 
