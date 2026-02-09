const thumbnails = document.querySelectorAll('.thumbnail-row img');
const mainImage = document.getElementById('mainImage');

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    thumbnails.forEach(t => t.classList.remove('active'));

    const newSrc = thumbnail.dataset.image;
    mainImage.src = newSrc;

    thumbnail.classList.add('active');
  });
});
