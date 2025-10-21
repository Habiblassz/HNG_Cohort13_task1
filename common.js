class CommonUtils {
	static init() {
		this.updateFooterTime();
		this.setupNavigation();
		this.setupSmoothScrolling();
	}

	static updateFooterTime() {
		const dayElement = document.querySelector(".day");
		const timeElement = document.querySelector(".time");

		if (dayElement && timeElement) {
			const updateTime = () => {
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
				const currentTime = now.toUTCString().split(" ")[4];

				dayElement.textContent = currentDay;
				timeElement.textContent = currentTime;
			};

			updateTime();
			setInterval(updateTime, 1000);
		}
	}

	static setupNavigation() {
		const navLinks = document.querySelectorAll(".main-nav a");
		navLinks.forEach((link) => {
			link.addEventListener("focus", () => {
				link.style.outline = `2px solid var(--neon-blue)`;
				link.style.outlineOffset = "2px";
			});
			link.addEventListener("blur", () => {
				link.style.outline = "none";
			});
		});
	}

	static setupSmoothScrolling() {
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener("click", function (e) {
				e.preventDefault();
				const target = document.querySelector(this.getAttribute("href"));
				if (target) {
					target.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			});
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	CommonUtils.init();
});
