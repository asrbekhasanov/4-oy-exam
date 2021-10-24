const elUserList = document.querySelector('.main__left__list');
const elPostsList = document.querySelector('.main__center__list');
const elCommentsList = document.querySelector('.main__right__list');
const elUsersTemplate = document.querySelector('.users__template').content;
const elPostsTemplate = document.querySelector('.posts__template').content;
const elCommentsTemplate = document.querySelector(
	'.comments__template',
).content;

let users = [];
let posts = [];
let comments = [];

function renderUsers(arr, node) {
	node.innerHTML = null;

	const usersFragment = document.createDocumentFragment();

	arr.forEach((row) => {
		const clonedUsersTemplate = elUsersTemplate.cloneNode(true);

		clonedUsersTemplate.querySelector('.user__fullname').textContent = row.name;

		clonedUsersTemplate.querySelector('.user__name').textContent =
			'@' + row.username;
		clonedUsersTemplate.querySelector('.user__company__name').textContent =
			row.company.name;
		clonedUsersTemplate.querySelector('.user__company__phrase').textContent =
			row.company.catchPhrase;
		clonedUsersTemplate.querySelector('.user__company__bs').textContent =
			row.company.bs;
		clonedUsersTemplate.querySelector('.user__data__item').dataset.userId =
			row.id;
		// clonedUsersTemplate.querySelector(
		// 	'.user__location__button',
		// ).dataset.userId = row.id;

		usersFragment.appendChild(clonedUsersTemplate);
	});

	node.appendChild(usersFragment);
}

function renderPosts(arr, node) {
	node.innerHTML = null;

	const postsFragment = document.createDocumentFragment();

	arr.forEach((row) => {
		const clonedPostsTemplate = elPostsTemplate.cloneNode(true);

		clonedPostsTemplate.querySelector('.posts__heading').textContent =
			row.title;
		clonedPostsTemplate.querySelector('.posts__text').textContent = row.body;
		clonedPostsTemplate.querySelector('.post__data__item').dataset.postId =
			row.id;
		clonedPostsTemplate.querySelector('.post__data__item').dataset.userId =
			row.userId;
		postsFragment.appendChild(clonedPostsTemplate);
	});

	node.appendChild(postsFragment);
}

function renderComments(arr, node) {
	node.innerHTML = null;

	const commentsFragment = document.createDocumentFragment();

	arr.forEach((row) => {
		const clonedCommentsTemplate = elCommentsTemplate.cloneNode(true);

		clonedCommentsTemplate.querySelector('.comments__heading').textContent =
			row.name;
		clonedCommentsTemplate.querySelector('.comments__text').textContent =
			row.body;
		clonedCommentsTemplate.querySelector(
			'.comments__data__item',
		).dataset.commentsId = row.id;
		clonedCommentsTemplate.querySelector(
			'.comments__data__item',
		).dataset.postId = row.postId;
		clonedCommentsTemplate.querySelector('.user__email').textContent =
			row.email;
		clonedCommentsTemplate.querySelector('.user__email').href =
			'mailto:' + row.email;
		commentsFragment.appendChild(clonedCommentsTemplate);
	});

	node.appendChild(commentsFragment);
}

async function getUserData() {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');

	const data = await res.json();

	renderUsers(data, elUserList);

	users = data;
}

async function getPostsData() {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts');

	const data = await res.json();

	renderPosts(data, elPostsList);

	posts = data;
}

async function getCommentsData() {
	const res = await fetch('https://jsonplaceholder.typicode.com/comments');

	const data = await res.json();

	renderComments(data, elCommentsList);

	comments = data;
}

elUserList.addEventListener('click', function (evt) {
	if (evt.target.matches('.user__data__item')) {
		const userId = evt.target.dataset.userId;

		const foundPost = posts.filter((post) => post.userId == userId);

		elPostsList.innerHTML = null;
		elCommentsList.innerHTML = null;

		renderPosts(foundPost, elPostsList);
	}
});

elPostsList.addEventListener('click', function (evt) {
	if (evt.target.matches('.post__data__item')) {
		const postId = evt.target.dataset.postId;

		const foundComment = comments.filter((comment) => comment.postId == postId);

		renderComments(foundComment, elCommentsList);
	}
});
// elUsersTemplate.addEventListener('click', function (evt) {
// 	if (evt.target.matches('.user__location__button')) {
// 		const btnId = evt.target.dataset.userId;

// 		const foundButton = users.filter((user) => user.userId == btnId);
// 		console.log(foundButton);

// 		// renderComments(foundButton, elCommentsList);
// 	}
// });

getUserData();
getPostsData();
getCommentsData();
