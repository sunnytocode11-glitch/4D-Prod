(function() {
	"use strict";

	// Preloader
	const preloader = document.getElementById("preloader");
	if (preloader) {
		window.addEventListener("load", () => {
			preloader.classList.add("hidden");
		});
	}

	// Navbar Sticky
	const navbar = document.getElementById("navbar");
    if (navbar) {
		document.addEventListener("DOMContentLoaded", () => {
			const navbar = document.querySelector('#navbar');
			window.addEventListener('scroll', () => {
				if (window.scrollY >= 120) {
					navbar.classList.add('navbar-sticky');
				} else {
					navbar.classList.remove('navbar-sticky');
				}
			});
		});
	}

	// Search Box
	const searchBtn = document.getElementById("searchBtn");
	const searchBox = document.getElementById("searchBox");
	if (searchBtn && searchBox) {
		searchBtn.addEventListener("click", () => {
			searchBtn.classList.toggle("active");
			searchBox.classList.toggle("active");
		});
	}

	// Responsive Menu Toggle Button
	const navbarBurgerToggle = document.getElementById("navbarBurgerToggle");
	if (navbarBurgerToggle) {
		const menu = document.querySelector(".responsive-menu");
		const closeBtn = menu.querySelector("button");
		const backdrop = document.querySelector(".backdrop");
		// Open menu
		navbarBurgerToggle.addEventListener("click", () => {
			menu.classList.add("show");
			backdrop.classList.add("show");
		});
		// Close menu function
		function closeMenu() {
			menu.classList.remove("show");
			backdrop.classList.remove("show");
		}
		closeBtn.addEventListener("click", closeMenu);
		backdrop.addEventListener("click", closeMenu);
	}

	// Responsive Menu Accordion
	const responsiveMenuAccordion = document.getElementById("responsiveMenuAccordion");
	if (responsiveMenuAccordion) {
		const allAccordions = responsiveMenuAccordion.querySelectorAll(".accordion");
		allAccordions.forEach((accordion) => {
			const toggles = accordion.querySelectorAll(":scope > .accordion-item > .accordion-toggle");
			// 1. OPEN default panels where toggle has .show
			toggles.forEach((toggle) => {
				const panel = toggle.nextElementSibling;
				if (toggle.classList.contains("show")) {
					panel.classList.add("show");
				}
			});
			// 2. Handle click events
			toggles.forEach((toggle) => {
				toggle.addEventListener("click", () => {
					const panel = toggle.nextElementSibling;
					// Close siblings on the same level
					toggles.forEach((other) => {
						if (other !== toggle) {
							other.classList.remove("show");
							const otherPanel = other.nextElementSibling;
							otherPanel.classList.remove("show");
						}
					});
					// Toggle clicked item
					toggle.classList.toggle("show");
					// Toggle its panel
					panel.classList.toggle("show");
				});
			});

		});
	}

	// ScrollCue
	if (typeof scrollCue !== "undefined") {
		scrollCue.init();
	}

	// Swiper Slider
	if (typeof Swiper !== "undefined") {

		// Testimonials Slider
		var swiper = new Swiper(".testimonialsSwiper", {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 25,
			effect: "fade",
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: ".testimonials-button-next",
				prevEl: ".testimonials-button-prev"
			}
		});
		var swiper = new Swiper(".testimonialsSwiper2", {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 25,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: ".testimonials2-button-next",
				prevEl: ".testimonials2-button-prev"
			},
			breakpoints: {
				768: {
					slidesPerView: 2
				}
			}
		});

		// Feedback Slider
		var swiper = new Swiper(".feedbackSwiper", {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 25,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: ".feedback-button-next",
				prevEl: ".feedback-button-prev"
			},
			breakpoints: {
				768: {
					slidesPerView: 2
				},
				1200: {
					slidesPerView: 3
				}
			}
		});

		// Insights Slider
		var swiper = new Swiper(".insightsSwiper", {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 25,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: ".insights-button-next",
				prevEl: ".insights-button-prev"
			},
			breakpoints: {
				768: {
					slidesPerView: 2
				},
				992: {
					slidesPerView: 3
				},
				1200: {
					slidesPerView: 4
				}
			}
		});
		var swiper = new Swiper(".insightsSwiper2", {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 25,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: ".insights2-button-next",
				prevEl: ".insights2-button-prev"
			},
			breakpoints: {
				768: {
					slidesPerView: 1
				},
				992: {
					slidesPerView: 2
				},
				1200: {
					slidesPerView: 3
				}
			}
		});

	}

	// Background Parallax
	const bgParallax = document.getElementById("bgParallax");
	if (bgParallax) {
		function updateZoom() {
			const rect = bgParallax.getBoundingClientRect();
			const vh = window.innerHeight;
			// Only animate when the element is visible
			const inView = rect.bottom > 0 && rect.top < vh;
			if (inView) {
				// progress: 0 at bottom of screen → 1 at top of screen
				const progress = 1 - (rect.top / vh);
				// Zoom OUT (from 1.15 → 1.0)
				const maxScale = 1.15;  // starting scale
				const minScale = 1.0;   // ending scale
				// Reverse mapping: start big, end normal
				const scale = maxScale - (maxScale - minScale) * progress;
				bgParallax.style.transform = `scale(${scale})`;
			}
			requestAnimationFrame(updateZoom);
		}
		requestAnimationFrame(updateZoom);
	}

	// FAQ Accordion
	const accordion = document.getElementById("faqAccordion");
	if (accordion) {
		const items = accordion.querySelectorAll(".faq-accordion-item");
		items.forEach(item => {
			const toggle = item.querySelector(".faq-accordion-toggle");
			toggle.addEventListener("click", () => {
				// Close all items
				items.forEach(i => {
					i.classList.remove("active");
					i.querySelector(".faq-accordion-panel").classList.add("hidden");
				});
				// Open the clicked item
				item.classList.add("active");
				item.querySelector(".faq-accordion-panel").classList.remove("hidden");
			});
		});
	}

	// Dark/Light Toggle
	const getSwitchToggleID = document.getElementById('lightDarkToggle');
	if (getSwitchToggleID) {
		const switchToggle = document.getElementById('lightDarkToggle');
		const body = document.body; 
		const icon = switchToggle.querySelector("i");
		// Load saved theme
		const savedTheme = localStorage.getItem("segura_template");
		if (savedTheme) {
			body.classList.add(savedTheme);
			// update icon on load
			if (savedTheme === "dark") {
				icon.className = "ri-sun-fill";   // show sun when dark
			} else {
				icon.className = "ri-moon-fill";  // show moon when light
			}
		}
		// Toggle click
		switchToggle.addEventListener("click", () => {
			if (body.classList.contains("dark")) {
				// Switch to light
				body.classList.remove("dark");
				body.classList.add("light");
				localStorage.setItem("segura_template", "light");
				// Icon for light mode
				icon.className = "ri-moon-fill";
			} else {
				// Switch to dark
				body.classList.remove("light");
				body.classList.add("dark");
				localStorage.setItem("segura_template", "dark");
				// Icon for dark mode
				icon.className = "ri-sun-fill";
			}
		});
	}

	// LTR/RTL Toggle
	const rtlToggleBtn = document.getElementById("ltrRtlToggle");
	if (rtlToggleBtn) {
		const htmlTag = document.documentElement;
		const icon = rtlToggleBtn.querySelector("i");
		// Load direction from storage
		const savedDirection = localStorage.getItem("textDirection") || "ltr";
		htmlTag.setAttribute("dir", savedDirection);
		// Set correct icon on load
		if (savedDirection === "rtl") {
			icon.className = "ri-english-input";
		} else {
			icon.className = "ri-translate";
		}
		// Toggle direction on click
		rtlToggleBtn.addEventListener("click", () => {
			const current = htmlTag.getAttribute("dir");
			const newDir = current === "ltr" ? "rtl" : "ltr";
			// Update direction
			htmlTag.setAttribute("dir", newDir);
			localStorage.setItem("textDirection", newDir);
			// Swap icon
			if (newDir === "rtl") {
				icon.className = "ri-english-input"; // RTL icon
			} else {
				icon.className = "ri-translate"; // LTR icon
			}
		});
	}

	// Back to Top
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
        const backToTopBtn = document.getElementById("backToTopBtn");
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
})();