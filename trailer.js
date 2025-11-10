// Получаем элементы модального окна и контейнер видео
const trailerModalElement = document.getElementById('trailerModal');
const videoContainer = document.getElementById('video-container');

// ------------------------------------------
// ФУНКЦИИ УПРАВЛЕНИЯ МОДАЛЬНЫМ ОКНОМ
// ------------------------------------------

/** Показывает модальное окно с анимацией */
function showTrailerModal(movieTitle, trailerKey) {
    // 1. Формируем URL и вставляем iframe
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

    // 2. Показываем модальное окно
    trailerModalElement.classList.add('show');
}

/** Скрывает модальное окно с анимацией и очищает видео */
function hideTrailerModal() {
    // 1. Убираем класс 'show'
    trailerModalElement.classList.remove('show');
    
    // 2. Очищаем видео после задержки
    setTimeout(() => {
        videoContainer.innerHTML = '';
    }, 300);
}

// ------------------------------------------
// ОБРАБОТЧИКИ СОБЫТИЙ ДЛЯ ВСЕХ СТРАНИЦ
// ------------------------------------------

// Функция для инициализации обработчиков на странице
function initializeTrailerHandlers() {
    // Ищем все контейнеры с карточками на разных страницах
    const containers = [
        'movies-list',    // Страница movies
        'series-list',    // Страница series  
        'cartoons-list'   // Страница cartoons
    ];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.addEventListener('click', function(event) {
                const card = event.target.closest('.media-card');
                // Убедитесь, что клик не был на элементах управления (рейтинг, избранное)
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

// --- 2. Скрытие при клике на фон (backdrop) ---
if (trailerModalElement) {
    trailerModalElement.addEventListener('click', function(event) {
        // Проверяем, что клик был именно по самому фону (.custom-modal-backdrop)
        if (event.target === trailerModalElement) {
            hideTrailerModal();
        }
    });
}

// --- 3. Скрытие при нажатии клавиши Escape ---
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && trailerModalElement.classList.contains('show')) {
        hideTrailerModal();
    }
});

// Инициализируем обработчики при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeTrailerHandlers);