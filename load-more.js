// load-more.js

document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const newsContainer = document.getElementById('news-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const noMoreNewsMsg = document.getElementById('no-more-news');
    let currentPage = 1; // Tracks the current page/set of data loaded

    // **IMPORTANT:** Replace '/api/more-news' with your actual server endpoint.
    const API_URL = '/api/more-news';
    
    // Placeholder data function for demonstration purposes
    // In a real application, this data would come from the fetch call.
    function getPlaceholderNews(page) {
        if (page > 3) { // Simulate having no more data after page 3
            return [];
        }

        const newsData = [
            {
                id: 3,
                title: "KPop Demon Hunters 2 Confirmed At Netflix — Aiming For A 2029 Release",
                summary: "Netflix and Sony Pictures Animation have confirmed a sequel to *KPop Demon Hunters*, aiming for a 2029 release, with creators Maggie Kang and Chris Appelhans set to return, though plot details remain under wraps.",
                image: "images/rumi.jpg", 
                link: "#"
            },
            {
                id: 4,
                title: "The Best Movies Of 2025 (So Far)",
                summary: "Empire magazine has ranked the top 10 films of 2025 so far, highlighting a mix of horror hits, dramas, thrillers, and character-driven stories, while noting that six months of the year remain for more cinematic highlights.",
                image: "images/best.jpg", // Replace with a real image path
                link: "#"
            },
            {
                id: 5,
                title: "Brendan Fraser And Rachel Weisz In Talks For New The Mummy Movie From Ready Or Not Directors",
                summary: "Directors Matt Bettinelli-Olpin and Tyler Gillett are reportedly planning a new *The Mummy* movie as a sequel to *The Mummy Returns*, with Brendan Fraser and Rachel Weisz potentially returning as Rick and Evelyn O’Connell.",
                image: "images/The.jpg", // Replace with a real image path
                link: "#"
            }
        ];

        // Simulate different sets of news for different pages
        if (page === 1) return newsData.slice(0, 2);
        if (page === 2) return newsData.slice(1, 3);
        if (page === 3) return [newsData[0]];
        return [];
    }

    /**
     * Creates the HTML structure for a single news item.
     * @param {Object} news - The news object from the API.
     * @returns {string} The HTML string for the news card.
     */
    function createNewsCardHTML(news) {
        return `
            <div class="col-12 new-content">
                <div class="media-card" style="max-width: 900px; margin: 0 auto;">
                    <img src="${news.image}" alt="${news.title}" class="img-fluid">
                    <div>
                        <h3>${news.title}</h3>
                        <p>
                            ${news.summary}
                            <a href="${news.link}" target="_blank" class="text-danger text-decoration-none">Read more</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Fetches and loads additional news content.
     */
    async function loadMoreContent() {
        // Disable button and show loading indicator
        loadMoreBtn.disabled = true;
        loadingIndicator.style.display = 'block';

        try {
            // ** Uncomment the fetch block below and remove the placeholder call
            //    when you have a real API endpoint!
            
            /*
            const response = await fetch(`${API_URL}?page=${currentPage + 1}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const newNewsItems = data.news; // Adjust based on your API response structure
            */
            
            // --- Placeholder data simulation START ---
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
            const newNewsItems = getPlaceholderNews(currentPage + 1);
            // --- Placeholder data simulation END ---
            

            if (newNewsItems && newNewsItems.length > 0) {
                let allNewsHTML = '';
                newNewsItems.forEach(news => {
                    allNewsHTML += createNewsCardHTML(news);
                });
                
                // Append the new content to the container
                newsContainer.insertAdjacentHTML('beforeend', allNewsHTML);
                currentPage++; // Increment page counter for the next load

            } else {
                // If the array is empty or null, assume no more news
                loadMoreBtn.style.display = 'none'; // Hide the button
                noMoreNewsMsg.style.display = 'block'; // Show "No more news" message
            }

        } catch (error) {
            console.error('Error loading additional content:', error);
            // Optionally, show an error message to the user
            alert('Failed to load more content. Please try again.');
        } finally {
            // Re-enable button and hide loading indicator
            loadMoreBtn.disabled = false;
            loadingIndicator.style.display = 'none';
        }
    }

    // Attach the event listener to the button
    loadMoreBtn.addEventListener('click', loadMoreContent);
});