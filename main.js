(()=>{"use strict";class e{constructor(e,t,s,r){this._name=e.name,this._link=e.link,this._cardId=e._id,this._owner=e.owner,this._likes=e.likes,this._userId=t,this._templateSelector=s,this._handleCardClick=r.handleCardClick,this._handleCardDelete=r.handleCardDelete,this._handleLikeToggle=r.handleLikeToggle}_getTemplate(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}isLiked(){return this._likes.find((e=>e._id===this._userId))}getLikes(e){this._likes=e,this._likeNbr.textContent=this._likes.length,this.isLiked()?this._coverLikeIcon():this._uncoverLikeIcon()}_coverLikeIcon(){this._likeBtn.classList.add("element__button-like_active")}_uncoverLikeIcon(){this._likeBtn.classList.remove("element__button-like_active")}generateCard(){return this._element=this._getTemplate(),this._picture=this._element.querySelector(".element__image"),this._likeBtn=this._element.querySelector(".element__button-like"),this._deleteBusket=this._element.querySelector(".element__button-delete"),this._likeNbr=this._element.querySelector(".element__like-number"),this._setEventListeners(),this._element.querySelector(".element__title").textContent=this._name,this._picture.src=this._link,this._picture.alt=this._name,this._userId!=this._owner._id&&this._deleteBusket.setAttribute("style","display: none"),this.getLikes(this._likes),this._element}_setEventListeners(){this._likeBtn.addEventListener("click",(()=>{this._handleLikeToggle(this._cardId)})),this._deleteBusket.addEventListener("click",(()=>{this._handleCardDelete(this._cardId)})),this._picture.addEventListener("click",(()=>{this._handleCardClick({name:this._name,link:this._link})}))}deleteClick(){this._element.remove(),this._element=null}}class t{constructor(e,t){this._config=e,this._form=t}_showInputError(e){const t=this._form.querySelector(`.${e.id}-error`);e.classList.add(this._config.inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._config.errorClass)}_hideInputError(e){const t=this._form.querySelector(`.${e.id}-error`);e.classList.remove(this._config.inputErrorClass),t.classList.remove(this._config.errorClass),t.textContent=""}_setEventListeners(){this._inputsList=Array.from(this._form.querySelectorAll(this._config.inputSelector)),this._buttonElement=this._form.querySelector(this._config.submitButtonSelector),this._toggleButtonState(),this._inputsList.forEach((e=>{e.addEventListener("input",(()=>{this._toggleInputError(e),this._toggleButtonState()}))}))}_hasInvalidInput(){return this._inputsList.some((e=>!e.validity.valid))}_toggleInputError(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}activeSubmitButton(){this._buttonElement.classList.remove(this._config.inactiveButtonClass),this._buttonElement.disabled=!1}disabledSubmitButton(){this._buttonElement.classList.add(this._config.inactiveButtonClass),this._buttonElement.disabled=!0}_toggleButtonState(){this._hasInvalidInput()?this.disabledSubmitButton():this.activeSubmitButton()}cleanFormErrors(){this._inputsList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}class s{constructor(e){this._popup=document.querySelector(e)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose=e=>{"Escape"===e.key&&this.close()};setEventListeners(){this._popup.addEventListener("click",(e=>{(e.target.classList.contains("popup__close-button")||e.target===e.currentTarget)&&this.close()}))}}class r extends s{constructor(e,t){super(e),this._handleSubmitForm=t,this._popup=document.querySelector(e),this._popupForm=this._popup.querySelector(".popup__form"),this._inputsList=this._popupForm.querySelectorAll(".popup__input"),this._saveButton=this._popupForm.querySelector(".popup__save-button")}_getInputValues(){return this._formValues={},this._inputsList.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}setInputValues(e){this._inputsList.forEach((t=>{t.value=e[t.name]}))}setEventListeners(){super.setEventListeners(),this._popupForm.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmitForm(this._getInputValues())}))}setLoading(e){this._saveButton.textContent=e?"Сохранение...":"Сохранить"}close(){super.close(),this._popupForm.reset()}}const i=document.querySelector(".profile__avatar-edit"),n=document.querySelector(".popup-avatar__form"),o=document.querySelector(".profile__edit-button"),l=document.querySelector(".profile__add-button"),a=(document.querySelector(".popup__input_value_name"),document.querySelector(".popup__input_value_description"),document.querySelector(".popup__form-profile")),u=document.querySelector(".popup-add-card__form"),c=(document.querySelector(".popup__input_value_title"),document.querySelector(".popup__input_value_link"),document.querySelector(".popup__save-button")),h={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},_=new class{constructor({url:e,headers:t}){this._url=e,this._headers=t}_responseResult(e){if(e.ok)return e.json();Promise.reject(`Ошибка: ${e.status} ${e.statusText}`)}getUserData(){return fetch(`${this._url}users/me`,{method:"GET",headers:this._headers}).then((e=>this._responseResult(e)))}getAllCards(){return fetch(`${this._url}cards`,{method:"GET",headers:this._headers}).then((e=>this._responseResult(e)))}deleteCard(e){return fetch(`${this._url}cards/${e}`,{method:"DELETE",headers:this._headers}).then((e=>this._responseResult(e)))}addNewCard(e){return fetch(`${this._url}cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then((e=>this._responseResult(e)))}addNewProfilePick(e){return fetch(`${this._url}users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>this._responseResult(e)))}addNewUserInfo(e){return fetch(`${this._url}users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then((e=>this._responseResult(e)))}addLike(e){return fetch(`${this._url}cards/${e}/likes`,{method:"PUT",headers:this._headers}).then((e=>this._responseResult(e)))}deleteLike(e){return fetch(`${this._url}cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then((e=>this._responseResult(e)))}}({url:"https://mesto.nomoreparties.co/v1/cohort-54/",headers:{authorization:"e8f18267-2481-4711-ba12-1cc30ee751c6","Content-type":"application/json"}});let d;Promise.all([_.getUserData(),_.getAllCards()]).then((([e,t])=>{d=e._id,g.renderItems(t),p.setUserInfo(e.name,e.about),p.setAvatar(e.avatar)})).catch((e=>{console.log(`Ошибка при добавлении информации с сервера: ${e}`)}));const p=new class{constructor({nameSelector:e,descriptionSelector:t,avatarSelector:s}){this._profileName=document.querySelector(e),this._profileDescription=document.querySelector(t),this._profileAvatar=document.querySelector(s)}getUserInfo(){return{name:this._profileName.textContent,about:this._profileDescription.textContent}}setUserInfo(e,t){this._profileName.textContent=e,this._profileDescription.textContent=t}setAvatar(e){this._profileAvatar.src=e}}({nameSelector:".profile__name",descriptionSelector:".profile__description",avatarSelector:".profile__avatar"}),m=new class extends s{constructor(e){super(e),this.popupOpenPicture=document.querySelector(".popup-picture__image"),this.popupOpenTitle=document.querySelector(".popup-picture__title")}open(e,t){this.popupOpenPicture.src=t,this.popupOpenPicture.alt=e,this.popupOpenTitle.textContent=e,super.open()}}(".popup-picture"),v=new class extends s{constructor(e){super(e),this._form=this._popup.querySelector(".popup__form")}deleteConfirmation(e){this._confirmation=e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._confirmation()}))}}(".popup-confirm"),f=t=>{const s=new e(t,d,".element-template",{handleCardClick:L,handleCardDelete:e=>{console.log(e),v.open(),v.deleteConfirmation((()=>{_.deleteCard(e).then((()=>{console.log(e),s.deleteClick()})).then((()=>{v.close()})).catch((e=>{console.log(`Ошибка при удалении карточки: ${e}`)}))}))},handleLikeToggle:e=>{s.isLiked()?_.deleteLike(e).then((e=>{s.getLikes(e.likes)})).catch((e=>{console.log(`Ошибка при удалении лайка: ${e}`)})):_.addLike(e).then((e=>{s.getLikes(e.likes)})).catch((e=>{console.log(`Ошибка при добавлении лайка: ${e}`)}))}});return s.generateCard()},g=new class{constructor({renderer:e},t){this.renderer=e,this._container=document.querySelector(t)}renderItems(e){this._items=e,this._items.forEach((e=>{this.renderer(e)}))}addCards(e){this._container.append(e)}addItem(e){this._container.prepend(e)}}({renderer:e=>{const t=f(e);g.addCards(t)}},".elements");function L({name:e,link:t}){m.open(e,t)}const k=new r(".popup-add-card",(e=>{console.log("value=",e),k.setLoading(!0),_.addNewCard(e).then((e=>{const t=f(e);g.addItem(t)})).then((()=>{k.close()})).catch((e=>{console.log(`Ошибка при добавлении карточки: ${e}`)})).finally((()=>k.setLoading(!1)))}));l.addEventListener("click",(()=>{y.cleanFormErrors(),y.disabledSubmitButton(),k.open()}));const S=new r(".profile-popup",(e=>{console.log("value=",e),S.setLoading(!0),_.addNewUserInfo(e).then((e=>{p.setUserInfo(e.name,e.about),S.close()})).catch((e=>{console.log(`Ошибка при добавлении информации в профиль: ${e}`)})).finally((()=>S.setLoading(!1)))}));o.addEventListener("click",(()=>{S.setInputValues(p.getUserInfo()),b.disabledSubmitButton(c),b.cleanFormErrors(),S.open()}));const E=new r(".popup-avatar",(e=>{E.setLoading(!0),_.addNewProfilePick(e.avatar).then((e=>{console.log(e.avatar),p.setAvatar(e.avatar)})).then((()=>{E.close()})).catch((e=>{console.log(`Ошибка при добавлении аватара: ${e}`)})).finally((()=>E.setLoading(!1)))}));i.addEventListener("click",(()=>{C.cleanFormErrors(),C.disabledSubmitButton(c),E.open()}));const b=new t(h,a),y=new t(h,u),C=new t(h,n);b.enableValidation(),y.enableValidation(),C.enableValidation(),k.setEventListeners(),S.setEventListeners(),m.setEventListeners(),E.setEventListeners(),v.setEventListeners()})();