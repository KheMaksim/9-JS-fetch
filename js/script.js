const messageList = document.querySelector('#message-container');
const messageForm = document.querySelector('form');
const messageInput = document.querySelector('#message');
const userName = document.querySelector('.user__name');
const preloader = document.querySelector('#preloader');
const overlay = document.querySelector('.info__overlay');
const alertWindow = document.querySelector('.info');
const followBtn = document.querySelector('.user__follow');
const editBtn = document.querySelector('.user__edit');

let lastMessageDate = new Date();
preloader.style.display = 'block';

const getUser = async function () {
	preloader.style.display = 'block';
	try {
		const response = await fetch(`http://146.185.154.90:8000/blog/khe_max@mail.ru/profile`);
		const user = await response.json();
		userName.innerHTML = `${user.firstName} ${user.lastName}`;
		preloader.style.display = 'none';
	} catch (error) {
		preloader.style.display = 'none';
		myAlert('Failed to get a user name.');
		console.error(error);
	}
}

const getMessages = async function () {
	request(`http://146.185.154.90:8000/blog/khe_max@mail.ru/posts`);
}

const sendMessage = async function () {
	preloader.style.display = 'block';
	const authorName = document.querySelector('.user__name');
	const message = messageInput.value;
	const author = authorName.textContent;
	const messageData = {
		message,
		author,
	};
	postRequest(messageData, 'http://146.185.154.90:8000/blog/khe_max@mail.ru/posts')
}

const editUser = async function (nameInput, surnameInput) {
	const firstName = nameInput.value;
	const lastName = surnameInput.value;
	const messageData = {
		firstName,
		lastName,
	};
	postRequest(messageData, 'http://146.185.154.90:8000/blog/khe_max@mail.ru/profile');
}

const subscribe = async function (input) {
	const email = input.value
	const emailData = {
		email,
	};
	postRequest(emailData, 'http://146.185.154.90:8000/blog/khe_max@mail.ru/subscribe');
}

const unsubscribe = async function () {
	const email = '';
	const emailData = {
		email,
	};
	postRequest(emailData, 'http://146.185.154.90:8000/blog/khe_max@mail.ru/subscribe/delete');
}

getUser();
preloader.style.display = 'block';
getMessages();

const intervalId = setInterval(() => {
	getMessages();
}, 2000);

messageForm.addEventListener('submit', e => {
	e.preventDefault();
	sendMessage();
});

editBtn.addEventListener('click', e => {
	e.preventDefault();
	alertWindow.innerHTML = '';
	modal();
	editModal();
	alertWindow.style.display = 'flex';
	const form = document.querySelector('#edit__form');
	const closeEdit = document.querySelector('#close');
	form.addEventListener('submit', e => {
		const nameInput = document.querySelector('#firstName');
		const surnameInput = document.querySelector('#secondName');
		e.preventDefault();
		editUser(nameInput, surnameInput);
		getUser();
		close();
	});
	closeEdit.addEventListener('click', e => {
		e.preventDefault();
		close();
	});
});

followBtn.addEventListener('click', e => {
	e.preventDefault();
	alertWindow.innerHTML = '';
	modal();
	followModal();
	alertWindow.style.display = 'flex';
	const form = document.querySelector('#follow__form');
	const closeFollow = document.querySelector('#close');
	form.addEventListener('submit', e => {
		const emailInput = document.querySelector('#email');
		e.preventDefault();
		subscribe(emailInput);
		close();
	});
	closeFollow.addEventListener('click', e => {
		e.preventDefault();
		close();
	});
});