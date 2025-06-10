document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe with Publishable Key
    const stripe = Stripe('pk_live_51RHruF06XnUtC0HX0w4CWzfNMGATA0skgovfEEJOOyb5PpOlWx5rfOCv3JdugRmy1AUMrCC1xsxfhBvpiI6jGX3W00UvAfDAeL'); // Replace with your Stripe Publishable Key

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
            productName: 'Profile Visibility Boost'
        },
        gamerscore: {
            selector: '#gamerscoreModal .gamerscore-purchase-btn',
            inputs: ['gamerscore-gamertag'],
            tosCheckbox: 'gamerscore-tos-agreement',
            productName: 'Gamerscore Enhancement'
        },
        gamertag: {
            selector: '#gamertagModal .gamertag-purchase-btn',
            inputs: ['gamertag-email'],
            tosCheckbox: 'gamertag-tos-agreement',
            productName: 'Rare Gamertag Reservation'
        },
        lfg: {
            selector: '#lfgModal .lfg-purchase-btn',
            inputs: ['lfg-email'],
            tosCheckbox: 'lfg-tos-agreement',
            productName: 'LFG Promotion'
        },
        followerBot: {
            selector: '#followerBotModal .follower-bot-purchase-btn',
            inputs: ['follower-bot-email'],
            tosCheckbox: 'follower-bot-tos-agreement',
            productName: 'Follower Boost Manager'
        },
        messageSpammer: {
            selector: '#messageSpammerModal .message-spammer-purchase-btn',
            inputs: ['message-spammer-email'],
            tosCheckbox: 'message-spammer-tos-agreement',
            productName: 'Message Sender'
        },
        profilePicture: {
            selector: '#profilePictureModal .profile-picture-purchase-btn',
            inputs: ['profile-picture-gamertag', 'profile-picture-selection'],
            tosCheckbox: 'profile-picture-tos-agreement',
            productName: 'Classic Xbox Profile Picture'
        },
        profilePictureCheckout: {
            selector: '#profilePictureCheckoutModal .profile-picture-checkout-btn',
            inputs: ['profile-picture-checkout-gamertag', 'profile-picture-checkout-link'],
            tosCheckbox: 'profile-picture-checkout-tos-agreement',
            productName: 'Classic Xbox Profile Picture'
        }
    };

    Object.keys(purchaseHandlers).forEach(key => {
        document.querySelectorAll(purchaseHandlers[key].selector).forEach(button => {
            button.addEventListener('click', async function(e) {
                e.preventDefault();
                const modal = this.closest('.modal-overlay');
                const inputs = purchaseHandlers[key].inputs.map(id => document.getElementById(id));
                const tosCheckbox = document.getElementById(purchaseHandlers[key].tosCheckbox);
                const selectedPackage = modal.querySelector('.package-option.active');
                let hasError = false;
                let firstInvalidElement = null;

                // Check inputs
                inputs.forEach(input => {
                    if (!input.value) {
                        input.classList.remove('shake');
                        void input.offsetWidth; // Trigger reflow for animation restart
                        input.classList.add('shake');
                        input.style.border = '2px solid #ff4444';
                        setTimeout(() => input.classList.remove('shake'), 500);
                        if (!firstInvalidElement) firstInvalidElement = input; // Store first invalid input
                        hasError = true;
                    } else {
                        input.style.border = '';
                    }
                });

                // Check ToS checkbox
                if (!tosCheckbox.checked) {
                    tosCheckbox.classList.remove('shake', 'red-neon-glow');
                    void tosCheckbox.offsetWidth;
                    tosCheckbox.classList.add('shake', 'red-neon-glow');
                    setTimeout(() => {
                        tosCheckbox.classList.remove('shake', 'red-neon-glow');
                    }, 800);
                    if (!firstInvalidElement) firstInvalidElement = tosCheckbox; // Store ToS if no invalid inputs
                    hasError = true;
                }

                // Scroll to the first invalid element if there’s an error
                if (hasError && firstInvalidElement) {
                    const modalContent = modal.querySelector('.modal-content');
                    firstInvalidElement.scrollIntoView({
                        behavior: 'smooth', // Smooth scrolling
                        block: 'center' // Center the element in the modal’s visible area
                    });
                    // Ensure the modal content itself scrolls (in case scrollIntoView doesn’t adjust it)
                    modalContent.scrollTop = firstInvalidElement.offsetTop - modalContent.offsetTop - 50; // Add padding
                    return;
                }

                // Disable the button
                this.classList.add('disabled');
                this.disabled = true;

                const amount = selectedPackage.dataset.amount;
                const price = parseFloat(selectedPackage.dataset.price);
                const productName = purchaseHandlers[key].productName;
                const inputValues = {};
                inputs.forEach(input => {
                    inputValues[input.id] = input.value;
                });

                let userIp = 'Unknown';
                let country = 'Unknown';
                try {
                    const ipResponse = await fetch('https://ipapi.co/json/');
                    const ipData = await ipResponse.json();
                    userIp = ipData.ip;
                    country = ipData.country_name;
                } catch (error) {
                    console.error('Error fetching IP data:', error);
                }

                const data = {
                    productName,
                    amount,
                    price,
                    userIp,
                    country,
                    ...inputValues
                };

                try {
                    const response = await fetch('https://d817-173-208-162-126.ngrok-free.app/create-checkout-session', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    const session = await response.json();

                    if (session.url) {
                        window.location.href = session.url;
                    } else {
                        alert('Failed to create checkout session. Please try again.');
                        // Re-enable the button on failure
                        this.classList.remove('disabled');
                        this.disabled = false;
                    }
                } catch (error) {
                    console.error('Error creating checkout session:', error);
                    alert('An error occurred. Please try again later.');
                    // Re-enable the button on error
                    this.classList.remove('disabled');
                    this.disabled = false;
                }
            });
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
