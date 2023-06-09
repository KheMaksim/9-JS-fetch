const addFn = (firstParent, secondParent, value, pend) => {
	firstParent.append(value);
	if (pend === 'prepend') secondParent.prepend(firstParent);
	else secondParent.append(firstParent);
}

const request = async (url) => {
	try {
		const response = await fetch(url);
		const messages = await response.json();
		messageList.innerHTML = '';
		messages.forEach(message => {
			showInfo(message)
		});
	} catch (error) {
		clearInterval(intervalId);
		myAlert('Failed to get a message history, try again.');
		console.error(error);
	}
	preloader.style.display = 'none';
}

const postRequest = async function (data, url) {
	const encodedMessageData = new URLSearchParams(data);
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: encodedMessageData,
		});
		if (response.ok) messageInput.value = '';
		else {
			myAlert('Failed to send your  message');
			throw new Error('Failed to send your  message');
		}
		preloader.style.display = 'none';
	} catch (error) {
		myAlert('Failed to send your message.');
		console.error(error);
		preloader.style.display = 'none';
	}
}

const showInfo = (data) => {
	const date = new Date(data.datetime);
	const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
	const paragraph = document.createElement('p')
	const span = document.createElement('span');
	paragraph.className = 'message__paragraph';
	span.className = 'message__user';
	addFn(span, paragraph, `${data.user.firstName} ${data.user.lastName}`, 'append');
	addFn(paragraph, messageList, ` (${formattedDate}): ${data.message}`, 'prepend');
	lastMessageDate = date;
}

const modal = () => {
	overlay.style.display = 'block';
	alertWindow.style.display = 'flex'
}
const close = () => {
	overlay.style.display = 'none';
	alertWindow.style.display = 'none'
}

const editModal = () => {
	const form = document.createElement('form');
	const label = document.createElement('label');
	const nameInput = document.createElement('input');
	const surnameInput = document.createElement('input');
	const button = document.createElement('button');
	const closeButton = document.createElement('button');
	label.className = 'info__label';
	form.setAttribute('id', 'edit__form');
	label.setAttribute('for', 'firstname');
	label.append('Введите ваши данные');
	nameInput.required = true;
	nameInput.className = 'info__input';
	nameInput.setAttribute('id', 'firstName');
	nameInput.setAttribute('placeholder', 'Имя');
	surnameInput.required = true;
	surnameInput.className = 'info__input';
	surnameInput.setAttribute('id', 'secondName');
	surnameInput.setAttribute('placeholder', 'Фамилия');
	button.className = 'info__button button';
	button.innerHTML = 'Отправить';
	closeButton.className = 'info__button button';
	closeButton.setAttribute('id', 'close');
	closeButton.innerHTML = 'Закрыть';
	form.append(label);
	form.append(nameInput);
	form.append(surnameInput);
	form.append(button);
	form.append(closeButton);
	alertWindow.append(form);
}

const followModal = () => {
	const form = document.createElement('form');
	const label = document.createElement('label');
	const emailInput = document.createElement('input');
	const button = document.createElement('button');
	const closeButton = document.createElement('button');
	form.setAttribute('id', 'follow__form');
	label.className = 'info__label';
	label.setAttribute('for', 'email');
	label.append('Введите ваши данные');
	emailInput.className = 'info__input';
	emailInput.setAttribute('id', 'email');
	emailInput.setAttribute('placeholder', 'E-mail');
	button.className = 'info__button button';
	button.innerHTML = 'Отправить';
	closeButton.className = 'info__button button';
	closeButton.setAttribute('id', 'close');
	closeButton.innerHTML = 'Закрыть';
	form.append(label);
	form.append(emailInput);
	form.append(button);
	form.append(closeButton);
	alertWindow.append(form);
}