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

//! Створення нового поста

async function createPost(title, body) {
  try {
    const comments = [];
    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, comments }),
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

//! Оновлення поста

async function updatePost(id, newTitle, NewContent) {
  try {
    const postResponse = await fetch(`http://localhost:3000/posts/${id}`);
    const post = await postResponse.json();
    const comments = [...post.comments];
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        body: NewContent,
        comments: comments,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.save-btn').forEach(button => {
    button.addEventListener('click', e => {
      const btnId = e.currentTarget.dataset.id;
      const form = e.target.closest('.change-form');
      const titleInput = form.querySelector('#title-input');
      const contentInput = form.querySelector('#main-input');
      const title = titleInput.value;
      const content = contentInput.value;

      updatePost(btnId, title, content);
    });
  });
});

//! Видалення поста

async function deletePost(id) {
  try {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', e => {
  document.querySelectorAll('.deletePostButton').forEach(button => {
    button.addEventListener('click', e => {
      const btnId = e.target.dataset.id;
      deletePost(btnId);
    });
  });
});

//! Додавання коментаря до поста

async function createComment(postId, comment) {
  try {
    const postResponse = await fetch(`http://localhost:3000/posts/${postId}`);
    const post = await postResponse.json();
    const updatedComments = [...post.comments, comment];
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comments: updatedComments }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error creating comment:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-success').forEach(button => {
    button.addEventListener('click', e => {
      const formId = e.target.dataset.id;
      const form = e.target.closest('.createCommentForm');
      const inputValue = form.querySelector('input').value;

      createComment(formId, inputValue);
      console.log(`Button clicked for form with data-id: ${formId}`);
      console.log('Input value:', inputValue);
    });
  });
});
