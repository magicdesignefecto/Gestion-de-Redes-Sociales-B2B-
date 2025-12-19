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
});
