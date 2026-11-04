/**
 * AYPDA - Media Gallery, Search Filtering, Lightbox & Video Player Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Gallery Filter Pills
  const filterButtons = document.querySelectorAll('.filter-pill-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-card, .activity-item-card, .news-item-card');
  const searchInput = document.getElementById('search-filter-input');

  function filterItems() {
    const activeBtn = document.querySelector('.filter-pill-btn.active');
    const selectedCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    galleryItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category') || '';
      const itemTitle = (item.querySelector('h3, h4, .gallery-item-title') || {}).textContent || '';
      const itemDesc = (item.querySelector('p') || {}).textContent || '';
      
      const matchesCategory = selectedCategory === 'all' || itemCategory.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = !query || itemTitle.toLowerCase().includes(query) || itemDesc.toLowerCase().includes(query);

      if (matchesCategory && matchesSearch) {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      } else {
        item.style.display = 'none';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterItems();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterItems);
  }

  // 2. Photo Lightbox Modal
  const lightboxModal = document.getElementById('aypda-lightbox-modal');
  let currentImageIndex = 0;
  const imageElements = Array.from(document.querySelectorAll('.gallery-item-card'));

  function openLightbox(index) {
    if (!lightboxModal || imageElements.length === 0) return;
    currentImageIndex = index;
    const card = imageElements[index];
    const img = card.querySelector('img');
    const title = (card.querySelector('.gallery-item-title') || {}).textContent || '';

    const modalImg = lightboxModal.querySelector('.lightbox-image');
    const modalCap = lightboxModal.querySelector('.lightbox-caption');

    if (modalImg && img) modalImg.src = img.src;
    if (modalCap) modalCap.textContent = title;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageElements.length;
    openLightbox(currentImageIndex);
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageElements.length) % imageElements.length;
    openLightbox(currentImageIndex);
  }

  imageElements.forEach((card, index) => {
    // Only bind if not a video card with a play trigger
    if (!card.querySelector('.video-play-trigger')) {
      card.addEventListener('click', () => openLightbox(index));
    }
  });

  if (lightboxModal) {
    const closeBtn = lightboxModal.querySelector('.lightbox-close-btn');
    const nextBtn = lightboxModal.querySelector('.lightbox-next');
    const prevBtn = lightboxModal.querySelector('.lightbox-prev');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);
    if (prevBtn) prevBtn.addEventListener('click', showPrevImage);

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    });
  }

  // 3. Video Modal Engine (Supports both local MP4 videos and YouTube embeds)
  const videoModal = document.getElementById('aypda-video-modal');
  const videoTriggers = document.querySelectorAll('.video-play-trigger');

  if (videoModal) {
    const iframe = videoModal.querySelector('iframe');
    const videoElem = videoModal.querySelector('video');
    const closeBtn = videoModal.querySelector('.video-close-btn');

    videoTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const videoSrc = trigger.getAttribute('data-video-src');
        const videoId = trigger.getAttribute('data-video-id');

        if (videoSrc) {
          // Play local MP4
          if (iframe) iframe.style.display = 'none';
          if (videoElem) {
            videoElem.style.display = 'block';
            videoElem.src = videoSrc;
            videoElem.play();
          }
        } else if (videoId) {
          // Play YouTube Embed
          if (videoElem) {
            videoElem.pause();
            videoElem.style.display = 'none';
          }
          if (iframe) {
            iframe.style.display = 'block';
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
          }
        }

        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeVideo() {
      videoModal.classList.remove('active');
      if (videoElem) {
        videoElem.pause();
        videoElem.src = '';
      }
      if (iframe) iframe.src = '';
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeVideo);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideo();
    });
    document.addEventListener('keydown', (e) => {
      if (videoModal.classList.contains('active') && e.key === 'Escape') closeVideo();
    });
  }
});
