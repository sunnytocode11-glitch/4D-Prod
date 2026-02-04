(function() {
	"use strict";

	// Register GSAP plugins once
	gsap.registerPlugin(ScrollTrigger, SplitText);

	// Video scroll scale (small -> big)
	function initVideoScrollScale() {
		const videoWrapper = document.querySelector(".video-wrapper");
		if (!videoWrapper) return; // stop if not found
		gsap.fromTo(
			videoWrapper,
			{ scale: 0.4 },
			{
				scale: 1,
				ease: "none",
				scrollTrigger: {
					trigger: ".video-section",
					start: "top bottom",
					end: "center center",
					scrub: true,
				}
			}
		);
	}

	// Banner hover parallax (shapes move bottom -> top, right -> left)
	function initBannerHoverParallax() {
		const banner = document.querySelector(".banner-section");
		if (!banner) return;
		banner.addEventListener("mousemove", (e) => {
			const rect = banner.getBoundingClientRect();
			const relX = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5 (left → right)
			const relY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
			// bottom → top (negative)
			gsap.to(".shape-left", {
				y: relY * -60,
				duration: 0.4,
				ease: "power2.out"
			});
			gsap.to(".shape-right", {
				y: relY * -90,
				duration: 0.4,
				ease: "power2.out"
			});
			// right → left (horizontal)
			gsap.to(".shape-bottom", {
				x: relX * -60,
				duration: 0.45,
				ease: "power2.out"
			});
		});
		banner.addEventListener("mouseleave", () => {
			gsap.to([".shape-left", ".shape-right"], {
				x: 0,
				y: 0,
				duration: 0.5,
				ease: "power2.out"
			});
		});
	}

	// Split text animation
	function initSplitTextAnimation() {
		const targets = gsap.utils.toArray(".text-animation, .text_animation");
		targets.forEach((el) => {
			// Split into lines (you can add "words, chars" if needed)
			const split = new SplitText(el, { type: "lines" });
			// Add some depth for the 3D rotation
			gsap.set(el, { perspective: 600 });
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: el,
					start: "top 85%",          // a bit earlier for smoother reveal
					end: "bottom 60%",
					scrub: false,
					markers: false,
					toggleActions: "play none none reverse", 
					// use "play none none none" if you don't want reverse
				}
			});
			tl.from(split.lines, {
				opacity: 0,
				y: 25,
				rotationX: -60,
				transformOrigin: "top center",
				duration: 1.1,
				ease: "power3.out",
				stagger: 0.08
			});
		});
	}

	// Ukiyo.js Parallax
	let parallax = null;
	if (typeof Ukiyo !== "undefined") {
		parallax = new Ukiyo(".ukiyo", {
			externalRAF: true,
		});
	}

	// Lenis smooth scroll
	const lenis = new Lenis({
		duration: 0.75,
		smoothWheel: true,
		smoothTouch: false,
	});

	// Master RAF loop
	function raf(time) {
		// Only animate Ukiyo if it exists
		if (parallax) {
			parallax.animate();
		}
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
	
	// Init everything after DOM is ready
	document.addEventListener("DOMContentLoaded", () => {
		initVideoScrollScale();
		initBannerHoverParallax();
		initSplitTextAnimation();
	});
    
})();