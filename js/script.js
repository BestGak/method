const HMTLELEMENT = document.querySelector("html");
const BURGER = document.querySelector('.burger');
document.addEventListener("DOMContentLoaded", function () {
	heightSwitch();
	openMobMenu();
	killPreload();
	heartAnimation();
	scrollHeader();
	playVideo();
	fullSwiperSlider();
	horizontalScroll();
	addScrollToDownArrow();
	firstSlider();
});



// const firstSlider = () => {
//   console.clear();

//   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//   const sections = document.querySelectorAll(".panel");

//   const scrolling = {
//     enabled: true,
//     events: "scroll,wheel,touchmove,pointermove".split(","),
//     prevent: e => e.preventDefault(),
//     disable() {
//       if (scrolling.enabled) {
//         scrolling.enabled = false;
//         window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
//         scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
//       }
//     },
//     enable() {
//       if (!scrolling.enabled) {
//         scrolling.enabled = true;
//         window.removeEventListener("scroll", gsap.ticker.tick);
//         scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
//       }
//     }
//   };

//   function goToSection(section, anims = []) {
//     if (scrolling.enabled) { 
//       scrolling.disable();
//       gsap.to(window, {
//         scrollTo: {y: section, autoKill: false},
//         onComplete: scrolling.enable,
//         duration: 2
//       });

//       // Restart all animations
//       anims.forEach(anim => anim && anim.restart());
//     }
//   }

//   sections.forEach((section, i) => {
//     const rightElement = section.querySelector(".right");
//     const leftElement = section.querySelector(".left");

//     const anims = [];

//     if (rightElement) {
//       const rightAnim = gsap.fromTo(rightElement, 
//         { yPercent: -100 }, 
//         { yPercent: 0, duration: 1, paused: true }
//       );
//       anims.push(rightAnim);
//     }

//     if (leftElement) {
//       const leftAnim = gsap.fromTo(leftElement, 
//         { yPercent: 100 }, 
//         { yPercent: 0, duration: 1, paused: true }
//       );
//       anims.push(leftAnim);
//     }

//     ScrollTrigger.create({
//       trigger: section,
//       start: "top bottom-=1",
//       end: "bottom top+=1",
//       onEnter: () => goToSection(section, anims),
//       onEnterBack: () => goToSection(section, anims)
//     });
//   });

//   // Додаємо обробник для посилань з якорями
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//       e.preventDefault();
      
//       const targetId = this.getAttribute('href').substring(1);
//       const targetElement = document.getElementById(targetId);
      
//       if (targetElement) {
//         scrolling.disable();
//         gsap.to(window, {
//           scrollTo: {y: targetElement, autoKill: false},
//           onComplete: scrolling.enable,
//           duration: 2
//         });
//       }
//     });
//   });
// window.addEventListener('scroll', () => {
// 	lastScrollY = window.scrollY;
// });
// }; // працює
// const firstSlider = () => {
//   console.clear();

//   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//   const sections = document.querySelectorAll(".panel");
//   let lastScrollY = window.scrollY;

//   const scrolling = {
//     enabled: true,
//     events: "scroll,wheel,touchmove,pointermove".split(","),
//     prevent: e => e.preventDefault(),
//     disable() {
//       if (scrolling.enabled) {
//         scrolling.enabled = false;
//         window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
//         scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
//       }
//     },
//     enable() {
//       if (!scrolling.enabled) {
//         scrolling.enabled = true;
//         window.removeEventListener("scroll", gsap.ticker.tick);
//         scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
//       }
//     }
//   };

//   function goToSection(section, anims = [], direction) {
//     if (scrolling.enabled) { 
//       scrolling.disable();
//       gsap.to(window, {
//         scrollTo: {y: section, autoKill: false},
//         onComplete: scrolling.enable,
//         duration: 2
//       });

//       anims.forEach(anim => {
//         if (anim) {
//           anim.yPercent = direction === 'down' ? -100 : 100;
//           anim.restart();
//         }
//       });
//     }
//   }

//   sections.forEach((section, i) => {
//     const rightElement = section.querySelector(".right");
//     const leftElement = section.querySelector(".left");

//     const anims = [];

//     if (rightElement) {
//       const rightAnimDown = gsap.fromTo(rightElement, 
//         { yPercent: -100 }, 
//         { yPercent: 0, duration: 1, paused: true }
//       );
//       const rightAnimUp = gsap.fromTo(rightElement, 
//         { yPercent: 100 }, 
//         { yPercent: 0, duration: 1, paused: true }
//       );
//       anims.push({ down: rightAnimDown, up: rightAnimUp });
//     }

//     if (leftElement) {
//       const leftAnimDown = gsap.fromTo(leftElement, 
//         { yPercent: 100 }, 
//         { yPercent: 0, duration: 1, paused: true }
//       );
//       const leftAnimUp = gsap.fromTo(leftElement, 
//         { yPercent: -100 }, 
//         { yPercent: 0, duration: 1, paused: true }
//       );
//       anims.push({ down: leftAnimDown, up: leftAnimUp });
//     }

//     ScrollTrigger.create({
//       trigger: section,
//       start: "top bottom-=1",
//       end: "bottom top+=1",
//       onEnter: () => {
//         const direction = window.scrollY > lastScrollY ? 'down' : 'up';
//         const directionAnims = anims.map(anim => anim[direction]);
//         goToSection(section, directionAnims, direction);
//       },
//       onEnterBack: () => {
//         const direction = window.scrollY > lastScrollY ? 'down' : 'up';
//         const directionAnims = anims.map(anim => anim[direction]);
//         goToSection(section, directionAnims, direction);
//       }
//     });
//   });

//   // Додаємо обробник для посилань з якорями
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//       e.preventDefault();
      
//       const targetId = this.getAttribute('href').substring(1);
//       const targetElement = document.getElementById(targetId);
      
//       if (targetElement) {
//         scrolling.disable();
//         gsap.to(window, {
//           scrollTo: {y: targetElement, autoKill: false},
//           onComplete: scrolling.enable,
//           duration: 2
//         });
//       }
//     });
//   });

//   // Update the lastScrollY position
//   window.addEventListener('scroll', () => {
//     lastScrollY = window.scrollY;
//   });
// }; // працюэ

// const firstSlider = () => {
//   console.clear();

//   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//   const sections = document.querySelectorAll(".panel");
//   let lastScrollY = window.scrollY;

//   const scrolling = {
//     enabled: true,
//     events: "scroll,wheel,touchmove,pointermove".split(","),
//     prevent: e => e.preventDefault(),
//     disable() {
//       if (scrolling.enabled) {
//         scrolling.enabled = false;
//         window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
//         scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
//       }
//     },
//     enable() {
//       if (!scrolling.enabled) {
//         scrolling.enabled = true;
//         window.removeEventListener("scroll", gsap.ticker.tick);
//         scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
//       }
//     }
//   };

//   function goToSection(section, anims = [], direction) {
//     if (scrolling.enabled) { 
//       scrolling.disable();
//       gsap.to(window, {
//         scrollTo: {y: section, autoKill: false},
//         onComplete: () => {
//           scrolling.enable();
//           anims.forEach(anim => {
//             if (anim) {
//               anim.yPercent = direction === 'down' ? -100 : 100;
//               anim.restart();
//             }
//           });
//         },
//         duration: 1,
//       });
//     }
//   }

//   sections.forEach((section, i) => {
//     const rightElement = section.querySelector(".right");
//     const leftElement = section.querySelector(".left");

//     const anims = [];

//     if (rightElement) {
//       const rightAnimDown = gsap.fromTo(rightElement, 
//         { yPercent: -100 }, 
//         { yPercent: 0, duration: .5, paused: true }
//       );
//       const rightAnimUp = gsap.fromTo(rightElement, 
//         { yPercent: 100 }, 
//         { yPercent: 0, duration: .5, paused: true }
//       );
//       anims.push({ down: rightAnimDown, up: rightAnimUp });
//     }

//     if (leftElement) {
//       const leftAnimDown = gsap.fromTo(leftElement, 
//         { yPercent: 100 }, 
//         { yPercent: 0, duration: .5, paused: true }
//       );
//       const leftAnimUp = gsap.fromTo(leftElement, 
//         { yPercent: -100 }, 
//         { yPercent: 0, duration: .5, paused: true }
//       );
//       anims.push({ down: leftAnimDown, up: leftAnimUp });
//     }

//     ScrollTrigger.create({
//       trigger: section,
//       start: "top bottom-=1",
//       end: "bottom top+=1",
//       onEnter: () => {
//         const direction = window.scrollY > lastScrollY ? 'down' : 'up';
//         const directionAnims = anims.map(anim => anim[direction]);
//         goToSection(section, directionAnims, direction);
//       },
//       onEnterBack: () => {
//         const direction = window.scrollY > lastScrollY ? 'down' : 'up';
//         const directionAnims = anims.map(anim => anim[direction]);
//         goToSection(section, directionAnims, direction);
//       }
//     });
//   });

//   // Додаємо обробник для посилань з якорями
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//       e.preventDefault();
      
//       const targetId = this.getAttribute('href').substring(1);
//       const targetElement = document.getElementById(targetId);
      
//       if (targetElement) {
//         scrolling.disable();
//         gsap.to(window, {
//           scrollTo: {y: targetElement, autoKill: false},
//           onComplete: scrolling.enable,
//           duration: 2
//         });
//       }
//     });
//   });

//   // Update the lastScrollY position
//   window.addEventListener('scroll', () => {
//     lastScrollY = window.scrollY;
//   });
// };//працьє


const firstSlider = () => {
  console.clear();

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const sections = document.querySelectorAll(".panel");
  let lastScrollY = window.scrollY;

  const scrolling = {
    enabled: true,
    events: "scroll,wheel,touchmove,pointermove".split(","),
    prevent: e => e.preventDefault(),
    disable() {
      if (scrolling.enabled) {
        scrolling.enabled = false;
        window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
        scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
      }
    },
    enable() {
      if (!scrolling.enabled) {
        scrolling.enabled = true;
        window.removeEventListener("scroll", gsap.ticker.tick);
        scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
      }
    }
  };

  function resetAnimations(anims) {
    anims.forEach(anim => {
      if (anim.down) anim.down.pause(0).progress(0);
      if (anim.up) anim.up.pause(0).progress(0);
    });
  }

  function goToSection(section, anims = [], direction) {
    if (scrolling.enabled) { 
      scrolling.disable();
      gsap.to(window, {
        scrollTo: {y: section, autoKill: false},
        onComplete: () => {
          scrolling.enable();
          anims.forEach(anim => {
            if (anim) {
              anim.restart();
            }
          });
        },
        duration: .5,
      });
    }
  }

  sections.forEach((section, i) => {
    const rightElement = section.querySelector(".right");
    const leftElement = section.querySelector(".left");

    const anims = [];

    if (rightElement) {
      const rightAnimDown = gsap.fromTo(rightElement, 
        { yPercent: -100 }, 
        { yPercent: 0, duration: 0.5, paused: true }
      );
      const rightAnimUp = gsap.fromTo(rightElement, 
        { yPercent: 100 }, 
        { yPercent: 0, duration: 0.5, paused: true }
      );
      anims.push({ down: rightAnimDown, up: rightAnimUp });
    }

    if (leftElement) {
      const leftAnimDown = gsap.fromTo(leftElement, 
        { yPercent: 100 }, 
        { yPercent: 0, duration: 0.5, paused: true }
      );
      const leftAnimUp = gsap.fromTo(leftElement, 
        { yPercent: -100 }, 
        { yPercent: 0, duration: 0.5, paused: true }
      );
      anims.push({ down: leftAnimDown, up: leftAnimUp });
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom-=1",
      end: "bottom top+=1",
      onEnter: () => {
        const direction = window.scrollY > lastScrollY ? 'down' : 'up';
        const directionAnims = anims.map(anim => anim[direction]);
        resetAnimations(anims); // Reset animations before starting
        goToSection(section, directionAnims, direction);
      },
      onEnterBack: () => {
        const direction = window.scrollY > lastScrollY ? 'down' : 'up';
        const directionAnims = anims.map(anim => anim[direction]);
        resetAnimations(anims); // Reset animations before starting
        goToSection(section, directionAnims, direction);
      }
    });
  });

  // Додаємо обробник для посилань з якорями
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        scrolling.disable();
        gsap.to(window, {
          scrollTo: {y: targetElement, autoKill: false},
          onComplete: scrolling.enable,
          duration: 2
        });
      }
    });
  });

  // Update the lastScrollY position
  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
  });
};


const killPreload = () =>{

	const preloadWrap = document.querySelector('.preload');
	if(preloadWrap){
		const preloadSwitch = document.querySelector('.preload-switch');
		const logoWrap = document.querySelector('.animate-logo');
		const animateLetters = document.querySelectorAll('.animate-logo svg:not([class])');
		const animeCircle = document.querySelector('.anime-circle');
		const animeCirclePath = animeCircle.querySelector('path');
		preloadWrap.addEventListener('click', ()=>{
			preloadWrap.style.animationName = 'removeOpacityPreload';
		preloadSwitch.style.animationName = 'changeSwitchPadding';
		HMTLELEMENT.classList.add('addscroll');
		function animateCharacters(){
			logoWrap.style.animationName = 'animateLogoWrap'
			animateLetters.forEach(ch => ch.style.animationName = 'animateLetters')
			animeCirclePath.style.fill = "#00E600";
		}
		setTimeout(() => animateCharacters(), 270);
		setTimeout(() => BURGER.style.animationName = 'burgerOpacity', 1500);
		setTimeout(() => preloadWrap.style.display = "none", 1000);
	});
}
}
const heightSwitch = () =>{
	const whiteCircle = document.querySelector('.white-circle');
	if (!whiteCircle) return;
	const svgWhiteCircle = document.querySelector('.anime-circle');
	const svgWhiteCircleWidth = svgWhiteCircle.getBoundingClientRect().width;
	const windowWidth = window.innerWidth;
    if (windowWidth <= 640) {
			console.log(svgWhiteCircleWidth);
			whiteCircle.style.width = `${svgWhiteCircleWidth}px`;
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




// $(document).ready(function () {
// 	$('#pagepiling').pagepiling({
// 			menu: null,
// 			direction: 'vertical',
// 			verticalCentered: true,
// 			sectionsColor: [],
// 			anchors: [],
// 			scrollingSpeed: 700,
// 			easing: 'swing',
// 			loopBottom: false,
// 			loopTop: false,
// 			css3: true,
// 			navigation: {
// 					'textColor': '#000',
// 					'bulletsColor': '#000',
// 					'position': 'right',
// 					'tooltips': ['section1', 'section2', 'section3', 'section4']
// 			},
// 			normalScrollElements: '.content',
// 			normalScrollElementTouchThreshold: 5,
// 			touchSensitivity: 5,
// 			keyboardScrolling: true,
// 			sectionSelector: '.section',
// 			animateAnchor: false,

// 			onLeave: function (index, nextIndex, direction) {

// 					if (nextIndex === 4 && direction === 'down') {
// 							$('html').addClass('normal-scroll'); 

// 							// Проверка на мобильное устройство
// 							if ($(window).width() <= 767) {
// 									setTimeout(function () {
// 											window.scrollBy({
// 													top: window.innerHeight * 0.5,
// 													behavior: 'smooth'
// 											});
// 									}, 200);
// 							}
// 					}

					
// 					if (nextIndex === 3 && direction === 'up') {
// 							$('html').removeClass('normal-scroll');
// 					}
// 			},
// 			afterLoad: function (anchorLink, index) { },
// 			afterRender: function () {
// 					$.fn.pagepiling.moveTo(1);
// 			}
// 	});
// });



const scrollToTop = () => {
setTimeout(() => {
	window.scrollTo({
	top: 0,
	behavior: 'smooth'
	});
}, 100); 
};

window.addEventListener('load', scrollToTop);


const addScrollToDownArrow = () => {
	const downArrows = document.querySelectorAll('.down-arrow');

	downArrows.forEach(arrow => {
	  arrow.addEventListener('click', () => {
		window.scrollBy({
		  top: window.innerHeight * 0.4,
		  behavior: 'smooth'
		});
	  });
	});
  };
  