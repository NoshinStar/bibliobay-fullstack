document.addEventListener("DOMContentLoaded", async () => {
    const reviewsWrapper = document.querySelector(".reviews-slider .swiper-wrapper");

    if (!reviewsWrapper) return;

    try {
        // 1. Fetch only APPROVED reviews
        const response = await fetch("http://127.0.0.1:8000/api/v1/reviews/?status=approved");
        const data = await response.json();
        const reviews = data.results || data;

        // 2. Handle Empty State
        if (reviews.length === 0) {
            reviewsWrapper.innerHTML = `
                <div class="swiper-slide box" style="text-align:center;">
                    <p>No reviews yet. Be the first to write one!</p>
                </div>`;
            return;
        }

        // 3. Clear container
        reviewsWrapper.innerHTML = "";

        // 4. Generate HTML
        reviews.forEach((review) => {
            // Generate Stars
            let starsHtml = "";
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    starsHtml += '<i class="fas fa-star"></i>';
                } else {
                    starsHtml += '<i class="far fa-star"></i>'; // Empty star
                }
            }

            // Random Avatar
            const avatarNum = (review.id % 6) + 1; 
            const avatarUrl = `./img/avatar${avatarNum}.svg`; 

            const html = `
                <div class="swiper-slide box">
                    <i class="fas fa-quote-left quote"></i>
                    <p>${review.comment}</p>
                    <div class="content">
                        <div class="info">
                            <div class="name">${review.user_name}</div>
                            
                            <!-- FIXED: Removed the word "on" -->
                            <div class="job">${review.book_title}</div>
                            
                            <div class="stars">
                                ${starsHtml}
                            </div>
                        </div>
                        <div class="image">
                            <img src="${avatarUrl}" alt="${review.user_name}" onerror="this.src='./img/avatar2.svg'">
                        </div>
                    </div>
                </div>
            `;
            reviewsWrapper.innerHTML += html;
        });

        // 5. Initialize Swiper
        initReviewSwiper(reviews.length);

    } catch (error) {
        console.error("Error loading reviews:", error);
    }
});

function initReviewSwiper(count) {
    if (typeof Swiper !== 'undefined') {
        // Destroy existing instance if any
        const existingSwiper = document.querySelector('.reviews-slider').swiper;
        if (existingSwiper) existingSwiper.destroy();

        new Swiper(".reviews-slider", {
            spaceBetween: 10,
            grabCursor: true,
            
            // FIXED: Only loop if we have more than 3 reviews
            // This prevents seeing the same review twice
            loop: count > 3, 
            
            centeredSlides: count > 3, // Only center if looping
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }
}