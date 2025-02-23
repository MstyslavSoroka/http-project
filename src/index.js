import template from './posts.handlebars';

import posts from './db.json';

const list = document.getElementById('postsContainer');

const title = document.getElementById('titleInput');
const body = document.getElementById('contentInput');
const form = document.getElementById('createPostForm');

async function getPosts() {
  try {
    // const response = await fetch('http://localhost:3000/posts');
    // const json = await response.json();
    // console.log(json);
    const layout = template(posts);
    list.innerHTML = `${layout}`;
  } catch (error) {
    console.error(error);
  }
}

getPosts();

// Створення нового поста

async function createPost(title, body) {
  try {
    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  createPost(title.value, body.value);
});

// Оновлення поста

async function updatePost(id, title, content) {
  try {
  } catch (error) {
    console.error(error);
  }
}

// Видалення поста

async function deletePost(id) {
  try {
  } catch (error) {
    console.error(error);
  }
}

// Додавання коментаря до поста

async function createComment(postId, comment) {
  try {
  } catch (error) {
    console.error(error);
  }
}

// Оновлення відображення постів на сторінці

function renderPosts(posts) {}

// Обробник події для створення поста

// document.getElementById('createPostForm').addEventListener('submit', cb);

// // Обробник події для редагування поста

// document.addEventListener('click', cb);

// // Обробник події для видалення поста

// document.addEventListener('click', cb);

// // Обробник події для додавання коментаря

// document.addEventListener('submit', cb);

// // Запуск додатку

// async function startApp() {
//   const posts = await getPosts();

//   renderPosts(posts);
// }

// startApp();
