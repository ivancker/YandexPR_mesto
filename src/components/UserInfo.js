export default class UserInfo {
	constructor({ nameSelector, descriptionSelector, avatarSelector }) {
		this._profileName = document.querySelector(nameSelector);
		this._profileDescription = document.querySelector(descriptionSelector);
		this._profileAvatar = document.querySelector(avatarSelector);
	}

	getUserInfo() {
		return {
			name: this._profileName.textContent,
			about: this._profileDescription.textContent
		}
	}

	setUserInfo(name, about) {
		this._profileName.textContent = name;
		this._profileDescription.textContent = about;
	}

	setAvatar(avatar) {
		this._profileAvatar.src = avatar;
	}
}