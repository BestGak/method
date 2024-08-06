const HMTLELEMENT = document.querySelector("html");
const BURGER = document.querySelector('.burger');
const WINDOWWIDTH = window.innerWidth;
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
        duration: 1,
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

// const firstSlider = () => {
// 	if (WINDOWWIDTH > 640) {
// 		console.clear();

// 		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 		const sections = document.querySelectorAll(".panel");
// 		let lastScrollY = window.scrollY;
// 		let isScrolling = false;

// 		const scrolling = {
// 			enabled: true,
// 			events: "scroll,wheel,touchmove,pointermove".split(","),
// 			prevent: e => e.preventDefault(),
// 			disable() {
// 				if (scrolling.enabled) {
// 					scrolling.enabled = false;
// 					window.addEventListener("scroll", gsap.ticker.tick, { passive: true });
// 					scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, { passive: false }));
// 				}
// 			},
// 			enable() {
// 				if (!scrolling.enabled) {
// 					scrolling.enabled = true;
// 					window.removeEventListener("scroll", gsap.ticker.tick);
// 					scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
// 				}
// 			}
// 		};

// 		function resetAnimations(anims) {
// 			anims.forEach(anim => {
// 				if (anim.down) anim.down.pause(0).progress(0);
// 				if (anim.up) anim.up.pause(0).progress(0);
// 			});
// 		}

// 		function goToSection(section, anims = [], direction) {
// 			if (scrolling.enabled && !isScrolling) {
// 				scrolling.disable();
// 				isScrolling = true;

// 				anims.forEach(anim => {
// 					if (anim) {
// 						anim.restart();
// 					}
// 				});

// 				gsap.to(window, {
// 					scrollTo: { y: section, autoKill: false },
// 					onComplete: () => {
// 						scrolling.enable();
// 						isScrolling = false;
// 					},
// 					duration: 1
// 				});
// 			}
// 		}

// 		sections.forEach((section, i) => {
// 			const rightElement = section.querySelector(".right");
// 			const leftElement = section.querySelector(".left");

// 			const anims = [];

// 			if (rightElement) {
// 				const rightAnimDown = gsap.fromTo(rightElement,
// 					{ yPercent: -100 , autoAlpha: 0},
// 					{ yPercent: 0, duration: .8, paused: true, autoAlpha: 1 }
// 				);
// 				const rightAnimUp = gsap.fromTo(rightElement,
// 					{ yPercent: 100, autoAlpha: 0 },
// 					{ yPercent: 0, duration: .8, paused: true, autoAlpha: 1 }
// 				);
// 				anims.push({ down: rightAnimDown, up: rightAnimUp });
// 			}

// 			if (leftElement) {
// 				const leftAnimDown = gsap.fromTo(leftElement,
// 					{ yPercent: 100, autoAlpha: 0 },
// 					{ yPercent: 0, duration: .8, paused: true, autoAlpha: 1 }
// 				);
// 				const leftAnimUp = gsap.fromTo(leftElement,
// 					{ yPercent: -100, autoAlpha: 0 },
// 					{ yPercent: 0, duration: .8, paused: true, autoAlpha: 1 }
// 				);
// 				anims.push({ down: leftAnimDown, up: leftAnimUp });
// 			}

// 			ScrollTrigger.create({
// 				trigger: section,
// 				// start: "top bottom-=10%",
// 				// end: "bottom top+=1",
// 				start: "20% bottom-=10%",
// 				end: "80% top+=1",
// 				markers: true,
// 				onEnter: () => {
// 					const direction = window.scrollY > lastScrollY ? 'down' : 'up';
// 					const directionAnims = anims.map(anim => anim[direction]);
// 					resetAnimations(anims);
// 					goToSection(section, directionAnims, direction);
// 				},
// 				onEnterBack: () => {
// 					const direction = window.scrollY > lastScrollY ? 'down' : 'up';
// 					const directionAnims = anims.map(anim => anim[direction]);
// 					resetAnimations(anims);
// 					goToSection(section, directionAnims, direction);
// 				}
// 			});
// 		});

// 		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
// 			anchor.addEventListener('click', function (e) {
// 				e.preventDefault();

// 				const targetId = this.getAttribute('href').substring(1);
// 				const targetElement = document.getElementById(targetId);

// 				if (targetElement) {
// 					scrolling.disable();
// 					gsap.to(window, {
// 						scrollTo: { y: targetElement, autoKill: false },
// 						onComplete: scrolling.enable,
// 						duration: 2
// 					});
// 				}
// 			});
// 		});

// 		window.addEventListener('scroll', () => {
// 			lastScrollY = window.scrollY;
// 		});
// 	}
// }; //вроде тоже более менее







// const firstSlider = () => {
// 	if (WINDOWWIDTH > 640) {
// 		console.clear();

// 		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 		const sections = document.querySelectorAll(".panel");
// 		let lastScrollY = window.scrollY;
// 		let isScrolling = false;
// 		let debounceTimer;

// 		const scrolling = {
// 			enabled: true,
// 			events: "scroll,wheel,touchmove,pointermove".split(","),
// 			prevent: e => e.preventDefault(),
// 			disable() {
// 				if (scrolling.enabled) {
// 					scrolling.enabled = false;
// 					window.addEventListener("scroll", gsap.ticker.tick, { passive: true });
// 					scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, { passive: false }));
// 				}
// 			},
// 			enable() {
// 				if (!scrolling.enabled) {
// 					scrolling.enabled = true;
// 					window.removeEventListener("scroll", gsap.ticker.tick);
// 					scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
// 				}
// 			}
// 		};

// 		function resetAnimations(anims) {
// 			anims.forEach(anim => {
// 				if (anim.down) anim.down.pause(0).progress(0);
// 				if (anim.up) anim.up.pause(0).progress(0);
// 			});
// 		}

// 		function goToSection(section, anims = [], direction) {
// 			if (scrolling.enabled && !isScrolling) {
// 				scrolling.disable();
// 				isScrolling = true;

// 				anims.forEach(anim => {
// 					if (anim) {
// 						anim.restart();
// 					}
// 				});

// 				gsap.to(window, {
// 					scrollTo: { y: section, autoKill: false },
// 					onComplete: () => {
// 						scrolling.enable();
// 						isScrolling = false;
// 					},
// 					duration: 2
// 				});
// 			}
// 		}

// 		function handleScroll() {
// 			clearTimeout(debounceTimer);
// 			debounceTimer = setTimeout(() => {
// 				lastScrollY = window.scrollY;
// 			}, 100);
// 		}

// 		sections.forEach((section, i) => {
// 			const rightElement = section.querySelector(".right");
// 			const leftElement = section.querySelector(".left");

// 			const anims = [];

// 			if (rightElement) {
// 				const rightAnimDown = gsap.fromTo(rightElement,
// 					{ yPercent: -100, autoAlpha: 0 },
// 					{ yPercent: 0, duration: 1.5, paused: true, autoAlpha: 1 }
// 				);
// 				const rightAnimUp = gsap.fromTo(rightElement,
// 					{ yPercent: 100, autoAlpha: 0 },
// 					{ yPercent: 0, duration: 1.5, paused: true, autoAlpha: 1 }
// 				);
// 				anims.push({ down: rightAnimDown, up: rightAnimUp });
// 			}

// 			if (leftElement) {
// 				const leftAnimDown = gsap.fromTo(leftElement,
// 					{ yPercent: 100, autoAlpha: 0 },
// 					{ yPercent: 0, duration: 1.5, paused: true, autoAlpha: 1 }
// 				);
// 				const leftAnimUp = gsap.fromTo(leftElement,
// 					{ yPercent: -100, autoAlpha: 0 },
// 					{ yPercent: 0, duration: 1.5, paused: true, autoAlpha: 1 }
// 				);
// 				anims.push({ down: leftAnimDown, up: leftAnimUp });
// 			}

// 			ScrollTrigger.create({
// 				trigger: section,
// 				start: i === 0 ? "top top+=50" : "top bottom-=1", // Додатковий простір для першого слайда
// 				end: "bottom top+=1",
// 				onEnter: () => {
// 					const direction = window.scrollY > lastScrollY ? 'down' : 'up';
// 					const directionAnims = anims.map(anim => anim[direction]);
// 					resetAnimations(anims);
// 					goToSection(section, directionAnims, direction);
// 				},
// 				onEnterBack: () => {
// 					const direction = window.scrollY > lastScrollY ? 'down' : 'up';
// 					const directionAnims = anims.map(anim => anim[direction]);
// 					resetAnimations(anims);
// 					goToSection(section, directionAnims, direction);
// 				}
// 			});
// 		});

// 		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
// 			anchor.addEventListener('click', function (e) {
// 				e.preventDefault();

// 				const targetId = this.getAttribute('href').substring(1);
// 				const targetElement = document.getElementById(targetId);

// 				if (targetElement) {
// 					scrolling.disable();
// 					gsap.to(window, {
// 						scrollTo: { y: targetElement, autoKill: false },
// 						onComplete: scrolling.enable,
// 						duration: 2
// 					});
// 				}
// 			});
// 		});

// 		window.addEventListener('scroll', handleScroll);
// 	}
// }; //блимає але працює



const killPreload = () => {
	const preloadWrap = document.querySelector('.preload');
	if (preloadWrap) {
		const logoWrap = document.querySelector('.animate-logo');
		const animeCircle = document.querySelector('.anime-circle');

		const handlePreloadRemoval = () => {
			preloadWrap.classList.add('remove');
			document.documentElement.classList.add('addscroll');
			logoWrap.classList.add('animate');
			setTimeout(() => BURGER.style.animationName = 'burgerOpacity', 1500);
			setTimeout(() => preloadWrap.style.display = "none", 1000);
		};

		// Handle click event for both large and small screens
		preloadWrap.addEventListener('click', handlePreloadRemoval);

		if (window.innerWidth <= 767) { // For mobile devices
			const switchElement = document.querySelector('.preload-switch');
			const circleElement = document.querySelector('.white-circle');
			let startX = 0;
			let currentX = 0;
			let isSwiping = false;
			const switchWidth = switchElement.offsetWidth;
			const circleWidth = circleElement.offsetWidth;

			const handleTouchStart = (event) => {
				startX = event.touches[0].clientX;
				isSwiping = true;
			};

			const handleTouchMove = (event) => {
				if (!isSwiping) return;
				currentX = event.touches[0].clientX;
				const deltaX = currentX - startX;
				const newLeft = Math.min(Math.max(0, deltaX), switchWidth - circleWidth);
				circleElement.style.transform = `translateX(${newLeft}px)`;
			};

			const handleTouchEnd = () => {
				if (!isSwiping) return;
				isSwiping = false;
				if (currentX - startX > switchWidth / 2) {
					handlePreloadRemoval();
				} else {
					circleElement.style.transform = `translateX(0px)`;
				}
			};

			switchElement.addEventListener('touchstart', handleTouchStart);
			switchElement.addEventListener('touchmove', handleTouchMove);
			switchElement.addEventListener('touchend', handleTouchEnd);
		}
	}
};

// const killPreload = () => {
// 	const preloadWrap = document.querySelector('.preload');
// 	if (preloadWrap) {
// 			const logoWrap = document.querySelector('.animate-logo');
// 			const animeCircle = document.querySelector('.anime-circle');

// 			const handleLargeScreenClick = () => {
// 					preloadWrap.classList.add('remove');
// 					document.documentElement.classList.add('addscroll');
// 					logoWrap.classList.add('animate');
// 					setTimeout(() => BURGER.style.animationName = 'burgerOpacity', 1500);
// 					setTimeout(() => preloadWrap.style.display = "none", 1000);
// 			};

// 			const handleSmallScreenTouch = () => {
// 					document.querySelector('html').classList.add('preloader');
// 					const switchElement = document.querySelector('.preload-switch');
// 					const circleElement = document.querySelector('.white-circle');
// 					let startX = 0;
// 					let currentX = 0;
// 					let isSwiping = false;
// 					const switchWidth = switchElement.offsetWidth;
// 					const circleWidth = circleElement.offsetWidth;

// 					const handleTouchStart = (event) => {
// 							startX = event.touches[0].clientX;
// 							isSwiping = true;
// 					};

// 					const handleTouchMove = (event) => {
// 							if (!isSwiping) return;
// 							currentX = event.touches[0].clientX;
// 							const deltaX = currentX - startX;
// 							const newLeft = Math.min(Math.max(0, deltaX), switchWidth - circleWidth);
// 							circleElement.style.transform = `translateX(${newLeft}px)`;
// 					};

// 					const handleTouchEnd = () => {
// 							if (!isSwiping) return;
// 							isSwiping = false;
// 							if (currentX - startX > switchWidth / 2) {
// 									preloadWrap.classList.add('remove');
// 									document.documentElement.classList.add('addscroll');
// 									logoWrap.classList.add('animate');
// 									setTimeout(() => BURGER.style.animationName = 'burgerOpacity', 1500);
// 									setTimeout(() => preloadWrap.style.display = "none", 1000);
// 							} else {
// 									circleElement.style.transform = `translateX(0px)`;
// 							}
// 					};

// 					switchElement.addEventListener('touchstart', handleTouchStart);
// 					switchElement.addEventListener('touchmove', handleTouchMove);
// 					switchElement.addEventListener('touchend', handleTouchEnd);
// 			};

// 			if (window.innerWidth > 767) {
// 					preloadWrap.addEventListener('click', handleLargeScreenClick);
// 			} else {
// 					handleSmallScreenTouch();
// 			}
// 	}
// };


const heightSwitch = () =>{
	const whiteCircle = document.querySelector('.white-circle');
	if(!whiteCircle) return;
		const svgWhiteCircle = document.querySelector('.anime-circle');
	const svgWhiteCircleWidth = svgWhiteCircle.getBoundingClientRect().width;
    if (WINDOWWIDTH <= 768) {
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



const scrollHeader = () => {
  const scrollHeader = document.querySelector('.header');
  if (scrollHeader) {
    let lastScrollTop = 0;
    const headerLogo = document.querySelector('.hidden-logo');
    let inactivityTimer;

    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        scrollHeader.classList.add("fixed-header-nav-half");
        scrollHeader.classList.remove("fixed-header-nav");
      }, 10000); // 10 seconds
    }

    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        scrollHeader.classList.remove("fixed-header-nav");
        scrollHeader.classList.add("fixed-header-nav-half");
        BURGER.style.animationName = 'removeBurgerOpacity';
        resetInactivityTimer(); // Reset timer on scroll
      } else if (scrollTop < lastScrollTop) {
        // Scrolling up
        scrollHeader.classList.add("fixed-header-nav");
        BURGER.style.animationName = 'burgerOpacity';
        scrollHeader.classList.remove("fixed-header-nav-half");
        resetInactivityTimer(); // Reset timer on scroll
      }

      lastScrollTop = scrollTop;
    });

    resetInactivityTimer();

    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("touchmove", resetInactivityTimer);
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
        "(min-width: 1024px)": function() {
         
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
        "(max-width: 1023px)": function() {
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
  