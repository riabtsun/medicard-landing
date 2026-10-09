const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuButton.addEventListener('click', () => {
	const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
	menuButton.setAttribute('aria-expanded', String(!isOpen));
	mobileNav.classList.toggle('open', !isOpen);
});

mobileNav.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		menuButton.setAttribute('aria-expanded', 'false');
		mobileNav.classList.remove('open');
	});
});

const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
	const updateBackToTopVisibility = () => {
		backToTopButton.classList.toggle('is-visible', window.scrollY > 300);
	};

	window.addEventListener('scroll', updateBackToTopVisibility, {
		passive: true,
	});
	backToTopButton.addEventListener('click', () =>
		window.scrollTo({ top: 0, behavior: 'smooth' }),
	);
	updateBackToTopVisibility();
}

const partnerTrack = document.querySelector('.partners-grid');
const partnerButtons = document.querySelectorAll('.partners-nav button');

partnerButtons[0] &&
	partnerButtons[0].addEventListener('click', () =>
		partnerTrack.scrollBy({ left: -280, behavior: 'smooth' }),
	);
partnerButtons[1] &&
	partnerButtons[1].addEventListener('click', () =>
		partnerTrack.scrollBy({ left: 280, behavior: 'smooth' }),
	);
