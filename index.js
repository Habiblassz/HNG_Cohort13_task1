// Profile-specific functionality
class ProfilePage {
	constructor() {
		this.timeElement = document.querySelector('[data-testid="test-user-time"]');
		this.init();
	}

	init() {
		this.updateProfileTime();
		this.setupHoverEffects();
		this.setupAnimations();
	}

	updateProfileTime() {
		if (this.timeElement) {
			const updateTime = () => {
				this.timeElement.textContent = `System timestamp: ${Date.now()}ms`;
			};
			updateTime();
			setInterval(updateTime, 100);
		}
	}

	setupHoverEffects() {
		const socialLinks = document.querySelectorAll(
			'[data-testid^="test-user-social"] a'
		);

		socialLinks.forEach((link) => {
			link.addEventListener("mouseenter", () => {
				link.style.boxShadow = `0 0 15px ${this.getRandomNeonColor()}`;
			});

			link.addEventListener("mouseleave", () => {
				link.style.boxShadow = "none";
			});
		});
	}

	setupAnimations() {
		const listItems = document.querySelectorAll("section li");

		listItems.forEach((item, index) => {
			item.style.animationDelay = `${index * 0.1}s`;
			item.style.animation = "fadeIn 0.5s ease-in-out forwards";
			item.style.opacity = "0";
		});
	}

	getRandomNeonColor() {
		const colors = [
			"rgba(15, 240, 252, 0.7)",
			"rgba(255, 44, 237, 0.7)",
			"rgba(15, 252, 151, 0.7)",
		];
		return colors[Math.floor(Math.random() * colors.length)];
	}
}

// Initialize profile page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	new ProfilePage();
});
