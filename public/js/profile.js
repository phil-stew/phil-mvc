const newFormHandler = async (event) => {
  event.preventDefault();

  //const reply = document.querySelector('#blog-name').value.trim();
  //const needed_funding = document.querySelector('#blog-funding').value.trim();
  const reply = document.querySelector('#blog-desc').value.trim();

  if (reply ) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ reply }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);
