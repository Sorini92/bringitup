import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if(!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        this.slides.forEach((slide, i) => {
            if(slide.tagName == "BUTTON" && i < 7) {
                this.container.insertBefore(this.slides[7], this.slides[i]);
                console.log(i);
            } 
        });

        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();        
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            this.slides.forEach((slide, i) => {
                if(slide.tagName == "BUTTON" && i > this.slides.length - 2) {
                    this.container.appendChild(this.slides[this.slides.length - 3]);
                } 
            });

            let active = this.slides[this.slides.length - 1];
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            let paused = setInterval(() => this.nextSlide(), 5000);

            this.slides.forEach(slide => {
                slide.addEventListener('mouseenter', () => {
                    clearInterval(paused);
                });
                slide.addEventListener('mouseleave', () => {
                    paused = setInterval(() => this.nextSlide(), 5000);
                });
            });

            this.prev.addEventListener('mouseenter', () => {
                clearInterval(paused);
            });
            this.prev.addEventListener('mouseleave', () => {
                paused = setInterval(() => this.nextSlide(), 5000);
            });

            this.next.addEventListener('mouseenter', () => {
                clearInterval(paused);
            });
            this.next.addEventListener('mouseleave', () => {
                paused = setInterval(() => this.nextSlide(), 5000);
            });
        }
    }
}