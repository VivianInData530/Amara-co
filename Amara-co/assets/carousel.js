class Carousel {
  constructor(carouselEl) {
    this.carousel = carouselEl;
    this.track = this.carousel.querySelector('.carousel__track');
    this.prevBtn = this.carousel.querySelector('.carousel__arrow--prev');
    this.nextBtn = this.carousel.querySelector('.carousel__arrow--next');
    if (this.prevBtn && this.nextBtn && this.track) {
      this.prevBtn.addEventListener('click', () => this.scroll(-300));
      this.nextBtn.addEventListener('click', () => this.scroll(300));
    }
  }
  scroll(amount) { this.track.scrollBy({ left: amount, behavior: 'smooth' }); }
}
document.querySelectorAll('[data-carousel]').forEach(el => new Carousel(el));