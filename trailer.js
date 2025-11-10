
const trailerModalElement = document.getElementById('trailerModal');
const videoContainer = document.getElementById('video-container');

function showTrailerModal(movieTitle, trailerKey) {
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`;
    videoContainer.innerHTML = `
        <iframe 
            src="${youtubeEmbedUrl}" 
            title="${movieTitle} Trailer" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;

    trailerModalElement.classList.add('show');
}
function hideTrailerModal() {
    trailerModalElement.classList.remove('show');
    
    setTimeout(() => {
        videoContainer.innerHTML = '';
    }, 300);
}

function initializeTrailerHandlers() {
    const containers = [
        'movies-list',  
        'series-list', 
        'cartoons-list'  
    ];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.addEventListener('click', function(event) {
                const card = event.target.closest('.media-card');
                const isControl = event.target.closest('.favorite-btn') || event.target.closest('.user-rating');
                
                if (!card || isControl) {
                    return;
                }

                const trailerKey = card.getAttribute('data-trailer-key');
                const movieTitle = card.querySelector('h3').textContent;

                if (trailerKey) {
                    showTrailerModal(movieTitle, trailerKey);
                } else {
                    console.warn(`Трейлер не найден для: ${movieTitle}`);
                }
            });
        }
    });
}

if (trailerModalElement) {
    trailerModalElement.addEventListener('click', function(event) {
        if (event.target === trailerModalElement) {
            hideTrailerModal();
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && trailerModalElement.classList.contains('show')) {
        hideTrailerModal();
    }
});

document.addEventListener('DOMContentLoaded', initializeTrailerHandlers);