export class CustomValidator {

	static passwordPatternValidator(password): any {
		if (password.pristine) {
			return null;
		}
		const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
		password.markAsTouched();
		if (PASSWORD_REGEXP.test(password.value)) {
			return null;
		}
		return {
			invalidPassword: true
		};
	}

	static emailValidator(email): any {
		if (email.value === null || email.value === "") return null;
		if (email.pristine) {
			return null;
		}
		const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
		email.markAsTouched();
		if (EMAIL_REGEXP.test(email.value)) {
			return null;
		}
		return {
			invalidEmail: true
		};
	}

	static noWhiteSpaceValidator(string): any {
		if (string.value === null || string.value === "") return null;
		if (string.pristine) return null;
		string.markAsTouched();
		const isWhitespace = (string.value || '').trim().length === 0;
		const isValid = !isWhitespace;
		return isValid ? null : { 'whitespace': true };
	}

	static noQuotesValidator(string): any {
		if (string.value) {
			let isQuateInvalid = false;
			if (string.value.includes('\"') || string.value.includes("\'")) {
				isQuateInvalid = true;
			}
			return isQuateInvalid ? { 'quotes': true } : null;
		}
	}

	static blockSpecialCharacter(string): any {
		if (string.value === null || string.value === "") return null;
		if (string.pristine) return null;
		const ONLY_ALPHA_NUMERIC_REGEX = /^[A-Za-z0-9 ]+$/i;
		string.markAsTouched();
		if (ONLY_ALPHA_NUMERIC_REGEX.test(string.value)) {
			return null;
		}
		return {
			invalidString: true
		}
	}

}
