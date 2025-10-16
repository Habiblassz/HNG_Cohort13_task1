setInterval(() => {
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
}, 1000);
