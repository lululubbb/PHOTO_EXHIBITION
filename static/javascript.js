let currentSlideIndex = 0;
function updateCarousel() {
    const images = document.querySelectorAll('.carousel-images img');
    if (images.length > 0) {
        images.forEach((img, index) => {
            img.style.display = index === currentSlideIndex ? 'block' : 'none';
        });
    }
}

function moveSlide(direction) {
    const images = document.querySelectorAll('.carousel-images img');
    currentSlideIndex = (currentSlideIndex + direction + images.length) % images.length;
    updateCarousel();
}

setInterval(() => {
    moveSlide(1);
}, 3000); // 每3秒自动切换

async function fetchPhotos() {
    try {
        const response = await fetch('http://127.0.0.1:8035/get_photos');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // 处理最新八张图片
        const latestGallery = document.querySelector('.carousel-images');
        if (latestGallery) { // 检查元素是否存在
            latestGallery.innerHTML = '';
            data.latest_photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = 'http://127.0.0.1:8035/' + photo.url;
                console.log(" img.src",photo.url);
                img.alt = photo.theme;
                latestGallery.appendChild(img);
            });
            updateCarousel();
        }

        const allGallery = document.querySelector('.static-gallery');
        if (allGallery) {
            allGallery.innerHTML = '';

            data.all_photos.forEach(photo => {
                const imageItem = document.createElement('div');
                imageItem.className = 'image-item';

                const img = document.createElement('img');
                img.src = 'http://127.0.0.1:8035/' + photo.url;
                img.alt = photo.theme;
                console.log(" img.src",photo.url);
                const infoCard = document.createElement('div');
                infoCard.className = 'info-card';

                const dateStr  = new Date(photo.time);
                const date = new Date(dateStr);
                // 获取年份、月份和日期
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                // 格式化成 "YYYY/MM/DD HH:mm"
                const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
                console.log("formattedDate:", formattedDate); // 输出: 2023/10/05 00:00:00

                // 加载图片并提取EXIF数据
                img.onload = () => {
                    EXIF.getData(img, function() {
                        const date = EXIF.getTag(this, "DateTimeOriginal");
                        const location = EXIF.getTag(this, "GPSLatitude") ? 
                            `${EXIF.getTag(this, "GPSLatitude")}, ${EXIF.getTag(this, "GPSLongitude")}` : '未知地点';
                            let formattedTime = '未知时间';
                            if (date) {
                                formattedTime = date.replace(/(\d{4}):(\d{2}):(\d{2}) (\d{2}:\d{2}:\d{2})/, '$1/$2/$3 $4');                                  }
                        // 更新信息卡片内容
                        infoCard.innerHTML = `
                            <p>地点(自动获取): <span class="location">${location}</span></p>
                            <p>地点(用户输入): <span class="location">${photo.place}</span></p>
                            <p>时间(自动获取): <span class="time">${formattedTime}</span></p>
                            <p>时间(用户输入): <span class="time">${formattedDate}</span></p>
                            <p>主题: <span class="theme">${photo.theme}</span></p>
                            <p>描述: <span class="description">${photo.description}</span></p>
                        `;
                    });
                };

                const zoomButton = document.createElement('button');
                zoomButton.className = 'zoom-button';
                zoomButton.textContent = '➕';

                img.onmouseover = () => infoCard.style.display = 'block';
                img.onmouseout = () => infoCard.style.display = 'none';

                imageItem.appendChild(img);
                imageItem.appendChild(infoCard);
                imageItem.appendChild(zoomButton);
                allGallery.appendChild(imageItem);

                // 放大图片的事件
                zoomButton.addEventListener('click', () => {
                    const largeImg = document.createElement('img');
                    largeImg.src = img.src;
                    largeImg.style.position = 'fixed';
                    largeImg.style.top = '50%';
                    largeImg.style.left = '50%';
                    largeImg.style.transform = 'translate(-50%, -50%)';
                    largeImg.style.zIndex = '100';
                    largeImg.style.maxWidth = '90%';
                    largeImg.style.maxHeight = '90%';
                    document.body.appendChild(largeImg);
            
                    // 关闭大图
                    largeImg.addEventListener('click', () => {
                        document.body.removeChild(largeImg);
                    });
                });
            });
        }
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

// 页面加载时调用函数
window.onload = () => {
    fetchPhotos();
};

document.addEventListener('DOMContentLoaded', () => {
    fetchPhotos();
});

document.getElementById('search-form').onsubmit = async function(event) {
    event.preventDefault();  // 阻止表单默认提交

    const formData = new FormData(this);
    const params = new URLSearchParams(formData).toString();

    try {
        const response = await fetch(`http://127.0.0.1:8035/search?${params}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const allGallery = document.querySelector('.static-gallery');
        allGallery.innerHTML = '';  // 清空之前的结果

        data.forEach(photo => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';

            const img = document.createElement('img');
            img.src = 'http://127.0.0.1:8035/' + photo.url;
            img.alt = photo.theme;

            const infoCard = document.createElement('div');
            infoCard.className = 'info-card';

            const dateStr  = new Date(photo.time);
            const date = new Date(dateStr);
            // 获取年份、月份和日期
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            // 格式化成 "YYYY/MM/DD HH:mm"
            const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
            console.log("formattedDate:", formattedDate); // 输出: 2023/10/05 00:00:00

            // 加载图片并提取EXIF数据
            img.onload = () => {
                EXIF.getData(img, function() {
                    const date = EXIF.getTag(this, "DateTimeOriginal");
                    const location = EXIF.getTag(this, "GPSLatitude") ? 
                        `${EXIF.getTag(this, "GPSLatitude")}, ${EXIF.getTag(this, "GPSLongitude")}` : '未知地点';
                        let formattedTime = '未知时间';
                        if (date) {
                            console.log("自动获取的时间格式",date)
                            formattedTime = date.replace(/(\d{4}):(\d{2}):(\d{2}) (\d{2}:\d{2}:\d{2})/, '$1/$2/$3 $4');                        }
                    // 更新信息卡片内容
                    infoCard.innerHTML = `
                        <p>地点(自动获取): <span class="location">${location}</span></p>
                        <p>地点(用户输入): <span class="location">${photo.place}</span></p>
                        <p>时间(自动获取): <span class="time">${formattedTime}</span></p>
                        <p>时间(用户输入): <span class="time">${formattedDate}</span></p>
                        <p>主题: <span class="theme">${photo.theme}</span></p>
                        <p>描述: <span class="description">${photo.description}</span></p>
                    `;
                });
            };

            const zoomButton = document.createElement('button');
            zoomButton.className = 'zoom-button';
            zoomButton.textContent = '➕';

            img.onmouseover = () => infoCard.style.display = 'block';
            img.onmouseout = () => infoCard.style.display = 'none';

            imageItem.appendChild(img);
            imageItem.appendChild(infoCard);
            imageItem.appendChild(zoomButton);
            allGallery.appendChild(imageItem);

            // 放大图片的事件
            zoomButton.addEventListener('click', () => {
                const largeImg = document.createElement('img');
                largeImg.src = img.src;
                largeImg.style.position = 'fixed';
                largeImg.style.top = '50%';
                largeImg.style.left = '50%';
                largeImg.style.transform = 'translate(-50%, -50%)';
                largeImg.style.zIndex = '100';
                largeImg.style.maxWidth = '90%';
                largeImg.style.maxHeight = '90%';
                document.body.appendChild(largeImg);
        
                // 关闭大图
                largeImg.addEventListener('click', () => {
                    document.body.removeChild(largeImg);
                });
            });
        });
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
};

