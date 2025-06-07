document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            backToTopButton.classList.remove('visible');
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const posX = Math.random() * 100;
        const posY = Math.random() * 100 + 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particlesContainer.appendChild(particle);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const modals = {
        followers: document.getElementById('followersModal'),
        gamerscore: document.getElementById('gamerscoreModal'),
        gamertag: document.getElementById('gamertagModal'),
        lfg: document.getElementById('lfgModal'),
        followerBot: document.getElementById('followerBotModal'),
        messageSpammer: document.getElementById('messageSpammerModal'),
        profilePicture: document.getElementById('profilePictureModal'),
        profilePictureCheckout: document.getElementById('profilePictureCheckoutModal'),
        contactUs: document.getElementById('contactUsModal')
    };

    const buttons = {
        followers: document.querySelectorAll('.followers-purchase-btn'),
        gamerscore: document.querySelectorAll('.gamerscore-purchase-btn'),
        gamertag: document.querySelectorAll('.gamertag-purchase-btn'),
        lfg: document.querySelectorAll('.lfg-purchase-btn'),
        followerBot: document.querySelectorAll('.follower-bot-purchase-btn'),
        messageSpammer: document.querySelectorAll('.message-spammer-purchase-btn'),
        profilePicture: document.querySelectorAll('.profile-picture-purchase-btn'),
        profilePictureCheckout: document.querySelectorAll('.profile-picture-checkout-btn'),
        contactUs: document.querySelectorAll('.custom-package-btn')
    };

    Object.keys(buttons).forEach(key => {
        buttons[key].forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                if (key === 'contactUs') {
                    modals.contactUs.style.display = 'flex';
                } else if (key === 'profilePictureCheckout') {
                    modals.profilePictureCheckout.style.display = 'flex';
                } else if (key === 'profilePicture') {
                    modals.profilePictureCheckout.style.display = 'flex';
                } else {
                    modals[key].style.display = 'flex';
                }
                document.body.style.overflow = 'hidden';
            });
        });
    });

    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal-overlay').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    document.querySelectorAll('.package-option').forEach(option => {
        option.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            modal.querySelectorAll('.package-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const price = this.dataset.price;
            const packageName = this.querySelector('h4').textContent;
            modal.querySelector('.selected-package').textContent = packageName;
            modal.querySelector('.selected-price').textContent = `$${price}`;
            modal.querySelector('.total-price').textContent = `$${price}`;
        });
    });

    document.querySelectorAll('.method-option').forEach(option => {
        option.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            modal.querySelectorAll('.method-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const purchaseHandlers = {
        followers: {
            selector: '#followersModal .followers-purchase-btn',
            inputs: ['followers-gamertag'],
            tosCheckbox: 'followers-tos-agreement',
            urls: {
                '1000': 'https://paymentpage',
                '2000': 'https://paymentpage',
                '5000': 'https://paymentpage',
                '10000': 'https://paymentpage',
                '20000': 'https://paymentpage',
                default: 'https://x6aa.com/'
            }
        },
        gamerscore: {
            selector: '#gamerscoreModal .gamerscore-purchase-btn',
            inputs: ['gamerscore-gamertag'],
            tosCheckbox: 'gamerscore-tos-agreement',
            urls: {
                '50000': 'https://paymentpage',
                '200000': 'https://paymentpage',
                '500000': 'https://paymentpage',
                '1000000': 'https://paymentpage',
                default: 'https://x6aa.com/'
            }
        },
        gamertag: {
            selector: '#gamertagModal .gamertag-purchase-btn',
            inputs: ['gamertag-email'],
            tosCheckbox: 'gamertag-tos-agreement',
            urls: {
                'daily': 'https://paymentpage',
                'weekly': 'https://paymentpage',
                'monthly': 'https://paymentpage',
                'lifetime': 'https://paymentpage',
                default: 'https://x6aa.com/'
            }
        },
        lfg: {
            selector: '#lfgModal .lfg-purchase-btn',
            inputs: ['lfg-email'],
            tosCheckbox: 'lfg-tos-agreement',
            urls: {
                'daily': 'https://paymentpage',
                'weekly': 'https://paymentpage',
                'monthly': 'https://paymentpage',
                'lifetime': 'https://paymentpage',
                default: 'https://x6aa.com/'
            }
        },
        followerBot: {
            selector: '#followerBotModal .follower-bot-purchase-btn',
            inputs: ['follower-bot-email'],
            tosCheckbox: 'follower-bot-tos-agreement',
            urls: {
                'daily': 'https://paymentpage',
                'weekly': 'https://paymentpage',
                'monthly': 'https://paymentpage',
                'lifetime': 'https://paymentpage',
                default: 'https://x6aa.com/'
            }
        },
        messageSpammer: {
            selector: '#messageSpammerModal .message-spammer-purchase-btn',
            inputs: ['message-spammer-email'],
            tosCheckbox: 'message-spammer-tos-agreement',
            urls: {
                'daily': 'https://paymentpage',
                'weekly': 'https://paymentpage',
                'monthly': 'https://paymentpage',
                'lifetime': 'https://paymentpage',
                default: 'https://x6aa.com/'
            }
        },
        profilePicture: {
            selector: '#profilePictureModal .profile-picture-purchase-btn',
            inputs: ['profile-picture-gamertag', 'profile-picture-selection'],
            tosCheckbox: 'profile-picture-tos-agreement',
            urls: {
                'custom': 'https://paymentpage',
                default: 'https://x6aa.com/'
            }
        },
        profilePictureCheckout: {
            selector: '#profilePictureCheckoutModal .profile-picture-checkout-btn',
            inputs: ['profile-picture-checkout-gamertag', 'profile-picture-checkout-link'],
            tosCheckbox: 'profile-picture-checkout-tos-agreement',
            urls: {
                'custom': 'https://paymentpage',
                default: 'https://paymentpage'
            }
        }
    };

    Object.keys(purchaseHandlers).forEach(key => {
        document.querySelector(purchaseHandlers[key].selector).addEventListener('click', function(e) {
            e.preventDefault();
            const inputs = purchaseHandlers[key].inputs.map(id => document.getElementById(id));
            const tosCheckbox = document.getElementById(purchaseHandlers[key].tosCheckbox);
            const selectedPackage = modals[key].querySelector('.package-option.active');
            let hasError = false;

            inputs.forEach(input => {
                if (!input.value) {
                    input.classList.remove('shake');
                    void input.offsetWidth;
                    input.classList.add('shake');
                    input.style.border = '2px solid #ff4444';
                    setTimeout(() => input.classList.remove('shake'), 500);
                    hasError = true;
                } else {
                    input.style.border = '';
                }
            });

            if (hasError) return;

            if (!tosCheckbox.checked) {
                tosCheckbox.classList.remove('shake', 'red-neon-glow');
                void tosCheckbox.offsetWidth;
                tosCheckbox.classList.add('shake', 'red-neon-glow');
                setTimeout(() => {
                    tosCheckbox.classList.remove('shake', 'red-neon-glow');
                }, 800);
                return;
            }

            const amount = selectedPackage.dataset.amount;
            const url = purchaseHandlers[key].urls[amount] || purchaseHandlers[key].urls.default;
            window.location.href = url;
        });
    });

    document.querySelectorAll('input[required], select[required]').forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });

    const announcementBanner = document.getElementById('announcementBanner');
    const closeButton = document.getElementById('closeAnnouncement');

    if (!announcementBanner || !closeButton) {
        console.error('Announcement banner or close button not found');
        return;
    }

    setTimeout(() => {
        announcementBanner.style.display = 'flex';
    }, 3000);

    closeButton.addEventListener('click', () => {
        announcementBanner.classList.add('hide');
        setTimeout(() => {
            announcementBanner.style.display = 'none';
            announcementBanner.classList.remove('hide');
        }, 500);
    });
});
