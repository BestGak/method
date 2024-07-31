const HMTLELEMENT = document.querySelector("html");
const BURGER = document.querySelector('.burger');
document.addEventListener("DOMContentLoaded", function () {
	openMobMenu();
	killPreload();
	heartAnimation();
	scrollHeader();
	playVideo();
	fullSwiperSlider();
	horizontalScroll();
	addScrollToDownArrow();
});



const killPreload = () =>{

	const preloadWrap = document.querySelector('.preload');
	if(preloadWrap){
		const preloadSwitch = document.querySelector('.preload-switch');
		const animateLetters = document.querySelectorAll('.animate-logo svg:not([class])');
		const animeCircle = document.querySelector('.anime-circle');
		const animeCirclePath = animeCircle.querySelector('path');
		preloadWrap.addEventListener('click', ()=>{
			preloadWrap.style.animationName = 'removeOpacityPreload';
		preloadSwitch.style.animationName = 'changeSwitchPadding';
		HMTLELEMENT.style.overflow = "visible";
		function animateCharacters(){
			animateLetters.forEach(ch => ch.style.animationName = 'animateLetters')
			animeCirclePath.style.fill = "#00E600";
		}
		setTimeout(() => animateCharacters(), 100);
		setTimeout(() => BURGER.style.animationName = 'burgerOpacity', 1500);
		setTimeout(() => preloadWrap.style.display = "none", 1000);
	});
}
}

const openMobMenu = () =>{
	const mobileMenu = document.querySelector(".header-nav");
	
	if(BURGER){
		BURGER.addEventListener('click', () =>{
			HMTLELEMENT.classList.toggle('header-active');
			const navLinks = document.querySelectorAll("nav a");
			navLinks.forEach((link) => {
				link.addEventListener("click", () => {
					HMTLELEMENT.classList.remove("header-active");
				});
			});
		})
	}
	
}
const scrollHeader = () =>{
	const scrollHeader = document.querySelector('.scroll-header');
	if(scrollHeader){
		window.addEventListener("scroll", function () {
			let lastScrollTop = 0;
			const headerLogo = document.querySelector('.hidden-logo')
			const windowInnerWidth = window.innerWidth;
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		
				if (scrollTop > lastScrollTop) {
					if (scrollTop > 100) {
						scrollHeader.classList.add("fixed-header-nav");
						scrollHeader.style.animationName = "smoothScroll";
						setTimeout(() => headerLogo.style.display = 'block', 100);
						setTimeout(() => headerLogo.style.animationName = 'burgerOpacity', 500);
					}
				} else if (scrollTop <= 0) {
					scrollHeader.classList.remove("fixed-header-nav");
					scrollHeader.style.animationName = "removeSmoothScroll";
					setTimeout(() => headerLogo.style.animationName = 'removeBurgerOpacity', 300);
					setTimeout(() => headerLogo.style.display = 'none', 500);
				}
				lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
			}
		)
	}

};

const playVideo = () =>{
	const startVideoBtns = document.querySelectorAll('.start-video');
	const videos = document.querySelectorAll('video');

	startVideoBtns.forEach((startBtn) => {
			startBtn.addEventListener('click', () => {
				
					const btnData = startBtn.getAttribute('data-btn');
					videos.forEach((video) => {
							const videoData = video.getAttribute('data-video');
							const videoPosterAtribute = video.getAttribute('poster');

							if (btnData === videoData) {
									if (video.paused) {
											video.play();
											video.removeAttribute('poster');
											startBtn.classList.add('play');
									} else {
											video.pause();
											video.setAttribute('poster', `${videoPosterAtribute}`);
											startBtn.classList.remove('play');
									}
							}
					});
			});
	});
};


const horizontalScroll = () => {
  const process = document.querySelector('.process');
  if (process) {
    gsap.registerPlugin(ScrollTrigger);
    let sections = gsap.utils.toArray('.process__item');
		const slidesPerRow = 3;
		const sectionsCount = sections.length;
    if (sections.length > 3) {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function() {
         
					process.style.width = `calc(100% * ${sectionsCount})`;
          sections.forEach(item => item.style.width = `33vw`);
          
          gsap.to(sections, {
            xPercent: -100 * (sectionsCount - slidesPerRow),
            ease: "none",
            scrollTrigger: {
              trigger: process,
              scrub: 1,
              pin: true,
              end: () => `+=${(sectionsCount - slidesPerRow) * window.innerWidth / slidesPerRow}`,
            }
          });
        },
        "(max-width: 767px)": function() {
					process.style.width = `calc(100% * ${sectionsCount})`;
          sections.forEach(item => item.style.width = `100%`);
          gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: process,
              scrub: 1,
              pin: true,
              end: () => "+=" + process.offsetWidth,
            }
          });
        }
      });
    }
  }
};


const heartAnimation = () =>{
const heartWrap = document.querySelector('.heart');
	if(heartWrap){
		const customOrder = [0, 2, 4, 7, 9, 11, 12, 13, 10, 8, 6, 3, 1, 5];
		const heartOptions = {
				root: null,
				rootMargin: "0px",
				threshold: .2, 
		};
		const heartCallback = function (entries) {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							const target = entry.target;
							const imgs = [...document.querySelectorAll('.heart-img')];
							const index = imgs.indexOf(target);
									const orderIndex = customOrder.indexOf(index);
									
									if (orderIndex >= 0) {
											const delay = orderIndex * 0.1;	
											target.style.animationDelay = `${delay}s`;
											target.style.animationName = 'heartAnimation';
											target.classList.add('animate');
									}
					}
			});
	};
	
	const heartObserver = new IntersectionObserver(heartCallback, heartOptions);
	
	document.querySelectorAll('.heart-img').forEach(img => {
			heartObserver.observe(img);
	});

}
}
const fullSwiperSlider = () =>{
	const fullSliderInit = document.querySelector('.fullSlider');
	
	if(fullSliderInit){
	
		const fullSlider = new Swiper(".fullSlider", {
     
      watchSlidesProgress: true,
			pagination: {
        el: ".fullSlider-pagination",
				clickable: true,
				type: 'bullets',
      },
				mousewheel: {
					releaseOnEdges: true,
					forceToAxis: true
				},
    });
   
	}
}

$(document).ready(function () {
	$('#pagepiling').pagepiling({
			menu: null,
			direction: 'vertical',
			verticalCentered: true,
			sectionsColor: [],
			anchors: [],
			scrollingSpeed: 700,
			easing: 'swing',
			loopBottom: false,
			loopTop: false,
			css3: true,
			navigation: {
					'textColor': '#000',
					'bulletsColor': '#000',
					'position': 'right',
					'tooltips': ['section1', 'section2', 'section3', 'section4']
			},
			normalScrollElements: '.content',
			normalScrollElementTouchThreshold: 5,
			touchSensitivity: 5,
			keyboardScrolling: true,
			sectionSelector: '.section',
			animateAnchor: false,

			// Обработка событий
			onLeave: function (index, nextIndex, direction) {

					// Проверяем, если мы достигли последней секции
					if (nextIndex === 4 && direction === 'down') {
							$('html').addClass('normal-scroll'); 

							// Проверка на мобильное устройство
							if ($(window).width() <= 767) {
									setTimeout(function () {
											window.scrollBy({
													top: window.innerHeight * 0.5,
													behavior: 'smooth'
											});
									}, 200);
							}
					}

					// Удаляем класс, если мы возвращаемся на предыдущую секцию
					if (nextIndex === 3 && direction === 'up') {
							$('html').removeClass('normal-scroll');
					}
			},
			afterLoad: function (anchorLink, index) { },
			afterRender: function () {
					$.fn.pagepiling.moveTo(1);
			}
	});
});


// Функция для прокрутки страницы вверх
const scrollToTop = () => {
setTimeout(() => {
	window.scrollTo({
	top: 0,
	behavior: 'smooth'
	});
}, 100); // Задержка 100 мс
};

window.addEventListener('load', scrollToTop);


// Стрелочная функция для обработки кликов по элементам с классом .down-arrow
const addScrollToDownArrow = () => {
	// Получаем все элементы с классом .down-arrow
	const downArrows = document.querySelectorAll('.down-arrow');
  
	// Добавляем обработчик события на каждый элемент
	downArrows.forEach(arrow => {
	  arrow.addEventListener('click', () => {
		// Плавная прокрутка вниз на 40vh
		window.scrollBy({
		  top: window.innerHeight * 0.4,
		  behavior: 'smooth'
		});
	  });
	});
  };
  
  // Вызов функции для добавления обработчиков
  addScrollToDownArrow();
  