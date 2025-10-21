class ContactForm {
	constructor() {
		this.form = document.getElementById("contactForm");
		this.successMessage = document.querySelector(
			'[data-testid="test-contact-success"]'
		);
		this.submitButton = document.querySelector(
			'[data-testid="test-contact-submit"]'
		);

		this.fields = {
			name: document.querySelector('[data-testid="test-contact-name"]'),
			email: document.querySelector('[data-testid="test-contact-email"]'),
			subject: document.querySelector('[data-testid="test-contact-subject"]'),
			message: document.querySelector('[data-testid="test-contact-message"]'),
		};

		this.errorElements = {
			name: document.querySelector('[data-testid="test-contact-error-name"]'),
			email: document.querySelector('[data-testid="test-contact-error-email"]'),
			subject: document.querySelector(
				'[data-testid="test-contact-error-subject"]'
			),
			message: document.querySelector(
				'[data-testid="test-contact-error-message"]'
			),
		};

		this.isSubmitting = false;
		this.init();
	}

	init() {
		this.form.addEventListener("submit", this.handleSubmit.bind(this));

		Object.values(this.fields).forEach((field) => {
			field.addEventListener("blur", this.validateField.bind(this));
			field.addEventListener("input", this.clearFieldError.bind(this));
		});

		this.form.addEventListener(
			"keydown",
			this.handleKeyboardNavigation.bind(this)
		);

		this.hideAllErrors();
		this.hideSuccessMessage();
	}

	hideAllErrors() {
		Object.values(this.errorElements).forEach((errorElement) => {
			errorElement.hidden = true;
			errorElement.textContent = "";
		});
	}

	hideSuccessMessage() {
		this.successMessage.hidden = true;
	}

	showSuccessMessage() {
		this.successMessage.hidden = false;
		this.successMessage.setAttribute("tabindex", "-1");
		this.successMessage.focus();
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.isSubmitting) return;

		this.isSubmitting = true;
		this.submitButton.disabled = true;
		this.submitButton.textContent = "Transmitting...";

		let isFormValid = true;

		Object.keys(this.fields).forEach((fieldName) => {
			const isValid = this.validateField({ target: this.fields[fieldName] });
			if (!isValid) {
				isFormValid = false;
			}
		});

		if (isFormValid) {
			setTimeout(() => {
				this.showSuccessMessage();
				this.form.reset();
				this.hideAllErrors();

				setTimeout(() => {
					this.submitButton.disabled = false;
					this.submitButton.textContent = "Transmit Message";
					this.isSubmitting = false;

					setTimeout(() => {
						this.hideSuccessMessage();
					}, 5000);
				}, 1000);
			}, 1000);
		} else {
			const firstInvalidField = Object.values(this.fields).find(
				(field) => field.getAttribute("aria-invalid") === "true"
			);
			if (firstInvalidField) {
				firstInvalidField.focus();
			}

			this.submitButton.disabled = false;
			this.submitButton.textContent = "Transmit Message";
			this.isSubmitting = false;
		}
	}

	validateField(e) {
		const field = e.target;
		const fieldName = Object.keys(this.fields).find(
			(key) => this.fields[key] === field
		);
		const errorElement = this.errorElements[fieldName];
		const value = field.value.trim();

		let isValid = true;
		let errorMessage = "";

		this.clearFieldError(e);

		switch (fieldName) {
			case "name":
				if (!value) {
					errorMessage = "Full name is required";
					isValid = false;
				} else if (value.length < 2) {
					errorMessage = "Name must be at least 2 characters long";
					isValid = false;
				}
				break;

			case "email":
				if (!value) {
					errorMessage = "Email address is required";
					isValid = false;
				} else if (!this.isValidEmail(value)) {
					errorMessage =
						"Please enter a valid email address (name@example.com)";
					isValid = false;
				}
				break;

			case "subject":
				if (!value) {
					errorMessage = "Subject is required";
					isValid = false;
				} else if (value.length < 3) {
					errorMessage = "Subject must be at least 3 characters long";
					isValid = false;
				}
				break;

			case "message":
				if (!value) {
					errorMessage = "Message is required";
					isValid = false;
				} else if (value.length < 10) {
					errorMessage = "Message must be at least 10 characters long";
					isValid = false;
				}
				break;
		}

		if (!isValid) {
			field.setAttribute("aria-invalid", "true");
			errorElement.textContent = errorMessage;
			errorElement.hidden = false;
		} else {
			field.setAttribute("aria-invalid", "false");
			errorElement.hidden = true;
		}

		return isValid;
	}

	clearFieldError(e) {
		const field = e.target;
		const fieldName = Object.keys(this.fields).find(
			(key) => this.fields[key] === field
		);
		const errorElement = this.errorElements[fieldName];

		errorElement.textContent = "";
		errorElement.hidden = true;
		field.setAttribute("aria-invalid", "false");
	}

	isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	handleKeyboardNavigation(e) {
		if (
			e.key === "Enter" &&
			e.target.tagName !== "TEXTAREA" &&
			e.target.type !== "submit"
		) {
			e.preventDefault();
			const formElements = Array.from(this.form.elements);
			const currentIndex = formElements.indexOf(e.target);
			if (currentIndex < formElements.length - 1) {
				formElements[currentIndex + 1].focus();
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new ContactForm();
});
