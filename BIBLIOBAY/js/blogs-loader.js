document.addEventListener("DOMContentLoaded", async () => {
    const blogsContainer = document.querySelector(".blogs .box-container");
    const loadMoreBtn = document.querySelector("#load-more");

    if (!blogsContainer) return;

    try {
        // 1. Fetch only PUBLISHED blogs
        const response = await fetch("http://127.0.0.1:8000/api/v1/blogs/?status=published");
        
        if (!response.ok) throw new Error("Failed to fetch blogs");
        
        const data = await response.json();
        const blogs = data.results || data;

        // 2. Handle Empty State
        if (blogs.length === 0) {
            blogsContainer.innerHTML = '<div style="font-size:1.5rem; color:#666; width:100%; text-align:center;">No blog posts available yet. Check back later!</div>';
            if(loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        // 3. Clear container
        blogsContainer.innerHTML = "";

        // 4. Generate HTML
        blogs.forEach((blog, index) => {
            // Format Date
            const dateObj = new Date(blog.published_at || blog.created_at);
            const dateStr = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            
            // Image Fallback
            const imageUrl = blog.featured_image || `./img/blog${(index % 9) + 1}.jpg`;

            // Logic to hide blogs after the 3rd one (for "Load More" functionality)
            const displayStyle = index < 3 ? 'inline-block' : 'none';

            const html = `
                <div class="box" style="display: ${displayStyle}">
                    <div class="image">
                        <img src="${imageUrl}" alt="${blog.title}" onerror="this.src='./img/blog1.jpg'">
                    </div>
                    <div class="content">
                        <h3>${blog.title}</h3>
                        <p>${blog.excerpt || blog.content.substring(0, 120) + '...'}</p>
                        <!-- Link to read more (For now just an alert) -->
                        <a href="javascript:void(0)" class="btn" onclick="alert('Full blog view coming soon!')">read more</a>
                        <div class="icons">
                            <span> <i class="fas fa-calendar"></i> ${dateStr} </span>
                            <span> <i class="fas fa-user"></i> by ${blog.author_name} </span>
                        </div>
                    </div>
                </div>
            `;
            blogsContainer.innerHTML += html;
        });

        // 5. Initialize "Load More" Button Logic
        if (loadMoreBtn) {
            let currentItem = 3;
            
            // Hide button if less than 3 items
            if (blogs.length <= 3) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
                
                loadMoreBtn.onclick = () => {
                    const boxes = [...document.querySelectorAll(".blogs .box-container .box")];
                    for (let i = currentItem; i < currentItem + 3; i++) {
                        if (boxes[i]) {
                            boxes[i].style.display = "inline-block";
                        }
                    }
                    currentItem += 3;
                    
                    // Hide button if no more items
                    if (currentItem >= boxes.length) {
                        loadMoreBtn.style.display = "none";
                    }
                };
            }
        }

    } catch (error) {
        console.error("Error loading blogs:", error);
        blogsContainer.innerHTML = '<p style="text-align:center; font-size:1.4rem;">Failed to load blogs.</p>';
    }
});