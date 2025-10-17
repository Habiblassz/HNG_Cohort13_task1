const timeElement = document.querySelector('[data-testid="test-user-time"]');

function updateProfileTime() {
	timeElement.textContent = `System timestamp: ${Date.now()}ms`;
}

updateProfileTime();
setInterval(updateProfileTime, 100);

function updateFooterTime() {
	const dayElement = document.querySelector(".day");
	const timeElement = document.querySelector(".time");

	const now = new Date();
	const weekdays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const currentDay = weekdays[now.getDay()];
	const currentTime = now.toString().split(" ")[4];

	dayElement.textContent = currentDay;
	timeElement.textContent = currentTime;
}

updateFooterTime();
setInterval(updateFooterTime, 1000);

// Add hover effects for social links
const socialLinks = document.querySelectorAll(
	'[data-testid^="test-user-social"] a'
);

socialLinks.forEach((link) => {
	link.addEventListener("mouseenter", () => {
		link.style.boxShadow = `0 0 15px ${getRandomNeonColor()}`;
	});

	link.addEventListener("mouseleave", () => {
		link.style.boxShadow = "none";
	});
});

function getRandomNeonColor() {
	const colors = [
		"rgba(15, 240, 252, 0.7)",
		"rgba(255, 44, 237, 0.7)",
		"rgba(15, 252, 151, 0.7)",
	];
	return colors[Math.floor(Math.random() * colors.length)];
}

// Add animation to hobby/dislike items
const listItems = document.querySelectorAll("section li");

listItems.forEach((item, index) => {
	item.style.animationDelay = `${index * 0.1}s`;
	item.style.animation = "fadeIn 0.5s ease-in-out forwards";
	item.style.opacity = "0";
});
