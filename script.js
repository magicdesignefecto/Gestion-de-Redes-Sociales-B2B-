// =====================================================
// MAGIC DESIGN EFECTO - Landing Page Script
// Gestión de Redes Sociales B2B
// =====================================================

const packageData = {
    Esencial: {
        platforms: {
            fb: { features: ['Gestión de Página FB', '12 publicaciones de alto impacto en FB', 'Diseño gráfico profesional', 'Sistema de contenido evergreen', 'Optimización de horarios prime', 'Publicidad Ads 1er. Mes por 1 semana (REGALO)'] },
            ig: { features: ['Gestión de Página IG', '12 publicaciones de alto impacto en IG', 'Diseño gráfico profesional', 'Templates de marca personalizados', 'Optimización de horarios prime', 'Publicidad Ads 1er. Mes por 1 semana (REGALO)'] },
            tk: { features: ['Gestión de Canal TK', '12 videos de alto impacto en TikTok', 'Análisis de tendencias', 'Edición de video profesional', 'Optimización de horarios prime', 'Influencer IA y Real combinado', 'TIKTOK ADS 1er. Mes 1 semana (REGALO)'] }
        }
    },
    Premium: {
        platforms: {
            fb: { features: ['Gestión de Página FB', '20 publicaciones estratégicas', 'Stories/Reels semanales', 'Gestión activa de comunidad', 'Estrategia de contenido 360°', 'Publicidad Ads 1er. Mes por 14 días (REGALO)'] },
            ig: { features: ['Gestión de Página IG', '20 publicaciones estratégicas en IG', 'Stories/Reels semanales', 'Gestión activa de engagement', 'Calendario editorial temático', 'Publicidad Ads 1er. Mes por 14 días (REGALO)'] },
            tk: { features: ['Gestión de Canal TK', '20 videos estratégicos en TikTok', 'Stories/Reels semanales', 'Sistema de engagement multiplicador', 'Uso de audios en tendencia', 'Influencer en tendencia de nicho 5 videos', 'Publicidad Ads 1er. Mes por 14 días (REGALO)'] }
        }
    },
    Elite: {
        platforms: {
            fb: { features: ['Gestión de Página FB', '30+ publicaciones mensuales en FB', 'Diseño gráfico y video premium', 'Campañas publicitarias optimizadas', 'Dashboard ejecutivo personalizado', 'Publicidad Ads 1er. Mes por 20 días (REGALO)'] },
            ig: { features: ['Gestión de Página IG', '30+ publicaciones mensuales en IG', 'Diseño gráfico y video premium', 'Influencer marketing y colaboraciones', 'Tácticas de growth hacking', 'Publicidad Ads 1er. Mes por 20 días (REGALO)'] },
            tk: { features: ['Gestión de Canal TK', '30+ videos mensuales en TikTok', 'Diseño y edición de video premium', 'Colaboraciones con influencers', 'Ecosistema de contenido sinérgico', 'Influencer en tendencia de nicho 10 videos', 'Publicidad Ads 1er. Mes por 20 días (REGALO)'] }
        }
    }
};

var player;
var playPauseBtn;
var playIcon;
var pauseIcon;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'zkgKVKlmRO8',
        playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            loop: 1,
            mute: 1,
            playlist: 'zkgKVKlmRO8',
            playsinline: 1,
            modestbranding: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (playIcon && pauseIcon) {
        if (event.data == YT.PlayerState.PLAYING) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        } else {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Create audio element for button click sound
    const clickSound = new Audio('https://raw.githubusercontent.com/magicdesignefecto/Gestion-de-Redes-Sociales/main/myinstants.mp3');

    // Mobile menu - Always visible on mobile (bottom navigation bar)
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        // Remove hidden class on mobile to show the bottom nav bar
        mobileMenu.classList.remove('hidden');
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    function updateCardContent(card) {
        const planName = card.dataset.plan;
        const detailsContainer = card.querySelector('.details-container');
        const activePlatformButton = card.querySelector('.platform-selector button.active');
        const platform = activePlatformButton ? activePlatformButton.dataset.platform : 'fb';
        const features = packageData[planName].platforms[platform].features;
        const featuresHtml = features.map(feature => `
            <li class="flex items-start">
                <svg class="w-5 h-5 text-brand-medium-blue mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="text-gray-300">${feature}</span>
            </li>`).join('');
        detailsContainer.innerHTML = `<ul class="space-y-4 text-left">${featuresHtml}</ul>`;
    }

    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        updateCardContent(card);
        const platformButtons = card.querySelectorAll('.platform-selector button');
        platformButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Play sound effect
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log('Sound play failed:', e));

                platformButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                updateCardContent(card);
            });
        });
    });

    document.getElementById('year').textContent = new Date().getFullYear();

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    const modal = document.getElementById('contact-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const whatsappForm = document.getElementById('whatsappForm');
    const planButtons = document.querySelectorAll('.plan-cta');

    planButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.pricing-card');
            const planName = card.dataset.plan;
            modal.classList.remove('hidden');
            whatsappForm.dataset.plan = planName;
        });
    });

    function closeModal() {
        modal.classList.add('hidden');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    whatsappForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const whatsappNum = document.getElementById('whatsapp').value;
        const plan = whatsappForm.dataset.plan;
        const miNumero = '59163212806';
        const mensaje = `¡Hola Magic Design Efecto! Estoy interesado/a en el Plan ${plan}. Mi nombre es ${nombre} y mi número de WhatsApp es ${whatsappNum}.`;
        const mensajeCodificado = encodeURIComponent(mensaje);
        const url = `https://api.whatsapp.com/send?phone=${miNumero}&text=${mensajeCodificado}`;
        window.open(url, '_blank');
    });

    playPauseBtn = document.getElementById('play-pause-btn');
    const videoOverlay = document.getElementById('video-overlay');
    playIcon = document.getElementById('play-icon');
    pauseIcon = document.getElementById('pause-icon');

    const togglePlay = () => {
        if (player && typeof player.getPlayerState === 'function') {
            const playerState = player.getPlayerState();
            if (playerState == YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        }
    };

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlay);
    }
    if (videoOverlay) {
        videoOverlay.addEventListener('click', togglePlay);
    }

    // =====================================================
    // ANALYTICS EVENTS - Track conversions
    // =====================================================

    // Track CTA clicks
    document.querySelectorAll('.btn-primary, .plan-cta').forEach(btn => {
        btn.addEventListener('click', function () {
            if (typeof gtag === 'function') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': this.textContent.trim()
                });
            }
        });
    });

    // Track scroll depth
    let scrollDepths = [25, 50, 75, 100];
    let trackedDepths = [];

    window.addEventListener('scroll', function () {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                trackedDepths.push(depth);
                if (typeof gtag === 'function') {
                    gtag('event', 'scroll_depth', {
                        'event_category': 'engagement',
                        'event_label': `${depth}%`
                    });
                }
            }
        });
    });

    // =====================================================
    // EXIT INTENT MODAL - Footer Trigger
    // =====================================================
    const exitModal = document.getElementById('exit-modal');
    const exitModalClose = document.getElementById('exit-modal-close');
    const exitModalDismiss = document.getElementById('exit-modal-dismiss');
    const exitModalCta = document.getElementById('exit-modal-cta');
    const footer = document.querySelector('footer');

    let exitModalShown = false;
    let footerObserverTriggered = false;

    // Check if modal was dismissed in this session
    const exitModalDismissed = sessionStorage.getItem('exitModalDismissed');

    // Notification sound
    const notificationSound = new Audio('https://voicebot.su/uploads/sounds/17/16117/16117.mp3');
    notificationSound.volume = 0.5;

    // Get modal content element
    const exitModalContent = document.getElementById('exit-modal-content');
    const exitModalBackdrop = document.getElementById('exit-modal-backdrop');

    // Show exit modal function
    function showExitModal() {
        if (exitModalShown || exitModalDismissed) return;

        exitModalShown = true;

        // Play notification sound
        notificationSound.play().catch(e => console.log('Audio play prevented:', e));

        // Show modal container and add flex
        exitModal.classList.remove('hidden');
        exitModal.classList.add('flex');

        // Trigger animation after a small delay
        setTimeout(() => {
            if (exitModalBackdrop) {
                exitModalBackdrop.classList.remove('opacity-0');
                exitModalBackdrop.classList.add('opacity-100');
            }
            if (exitModalContent) {
                exitModalContent.classList.remove('scale-95', 'opacity-0');
                exitModalContent.classList.add('scale-100', 'opacity-100');
            }
        }, 50);

        // Track event
        if (typeof gtag === 'function') {
            gtag('event', 'exit_modal_shown', {
                'event_category': 'engagement',
                'event_label': 'footer_trigger'
            });
        }
    }

    // Hide exit modal function
    function hideExitModal() {
        if (exitModalBackdrop) {
            exitModalBackdrop.classList.remove('opacity-100');
            exitModalBackdrop.classList.add('opacity-0');
        }
        if (exitModalContent) {
            exitModalContent.classList.remove('scale-100', 'opacity-100');
            exitModalContent.classList.add('scale-95', 'opacity-0');
        }

        // Hide container after animation
        setTimeout(() => {
            exitModal.classList.add('hidden');
            exitModal.classList.remove('flex');
        }, 300);

        sessionStorage.setItem('exitModalDismissed', 'true');
    }

    // Intersection Observer for footer
    if (footer && exitModal) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !footerObserverTriggered && !exitModalDismissed) {
                    footerObserverTriggered = true;
                    // Wait 5 seconds after reaching footer
                    setTimeout(() => {
                        showExitModal();
                    }, 5000);
                }
            });
        }, {
            threshold: 0.3
        });

        footerObserver.observe(footer);
    }

    // Close modal events
    if (exitModalClose) {
        exitModalClose.addEventListener('click', hideExitModal);
    }

    if (exitModalDismiss) {
        exitModalDismiss.addEventListener('click', hideExitModal);
    }

    // Close on backdrop click
    if (exitModalBackdrop) {
        exitModalBackdrop.addEventListener('click', hideExitModal);
    }

    // CTA click - open contact modal and hide exit modal
    if (exitModalCta) {
        exitModalCta.addEventListener('click', (e) => {
            e.preventDefault();
            hideExitModal();
            // Open contact modal
            const contactModal = document.getElementById('contact-modal');
            if (contactModal) {
                contactModal.classList.remove('hidden');
            }
            // Track conversion
            if (typeof gtag === 'function') {
                gtag('event', 'exit_modal_conversion', {
                    'event_category': 'conversion',
                    'event_label': 'diagnostico_gratuito'
                });
            }
        });
    }
});
