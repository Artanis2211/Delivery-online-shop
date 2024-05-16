// ! ==========Modules===================================================================================================================================

import * as isMobile from './modules/burger'

//! =============================================================================================================================================

// !Swiper
new Swiper('.container-swiper', {
	//? Arrow
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	// ? Bullet
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
		autoHeight: true,
	},
	// ? Navigation hash
	hashNavigation: {
		watchState: true,
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	slidesPerView: 1,
	watchOverflow: true,
	spaceBetween: 30,
	freeMode: true,
	speed: 800,
	loop: true,
	autoplay: {
		delay: 3000,
		stopOnLastSlide: false,
		disableOnInteraction: false,
	},
})

// ! ScrollTop

// 1. Waiting for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
	// 2. Smooth scrolling to the top of the page
	document.getElementById('scroll-top').addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})

	// 3. Fading in/out the scroll-to-top button
	const scrollTopButton = document.getElementById('scroll-top')
	scrollTopButton.style.display = 'none'

	window.addEventListener('scroll', function () {
		if (window.scrollY > 800) {
			scrollTopButton.style.display = 'block'
		} else {
			scrollTopButton.style.display = 'none'
		}
	})
	//  ========HeaderScroll=====================================================================================================================================

	const headerScroll = document.querySelector('.header')

	window.addEventListener('scroll', () => {
		if (window.scrollY > 800) {
			headerScroll.classList.add('header-scroll')
		} else {
			headerScroll.classList.remove('header-scroll')
		}
	})

	setTimeout(function removeAnimate() {
		headerScroll.removeAttribute('data-aos', 'fade-down')
	}, 1500)

	// ! CheckBox

	// const checkBox = document.querySelector('.form__box')

	// checkBox.addEventListener('click', el => {
	// 	const checkBoxTarget = el.target
	// 	if (checkBoxTarget.closest('.form__box')) {
	// 		checkBox.classList.toggle('_active-checkbox')
	// 	} else if (!checkBoxTarget.closest) {
	// 		checkBox.classList.remove('_active-checkbox')
	// 	}
	// })

	const iconArrow = document.querySelector('.icon__arrow')
	const descText = document.querySelector('.description__text')

	iconArrow.addEventListener('click', e => {
		const arrowTarget = e.target
		if (arrowTarget.closest('.icon__arrow')) {
			descText.classList.toggle('_active-text')
			iconArrow.classList.toggle('_active-arrow')
		} else if (!arrowTarget.closest('.icon__arrow')) {
			descText.classList.remove('_active-text')
			iconArrow.classList.remove('_active-arrow')
		}
	})
	//! Footer
	const iconArrowFooter = document.querySelector('.icon-arrow__footer')

	iconArrowFooter.addEventListener('click', e => {
		const footerArrowTarget = e.target
		if (footerArrowTarget.closest('.item-location__footer')) {
			iconArrowFooter.classList.toggle('_active-arrow__footer')
		} else if (!footerArrowTarget.closest('.item-location__footer')) {
			iconArrowFooter.classList.remove('_active-arrow__footer')
		}
	})

	AOS.init()
})
