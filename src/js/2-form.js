import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
  const formData = { email, message };
  saveToLS(STORAGE_KEY, formData);
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key) {
  const savedData = localStorage.getItem(key);
  try {
    return JSON.parse(savedData);
  } catch (error) {
    console.error('Get state error: ', error);
  }
}

function initPage() {
  const savedData = getFromLS(STORAGE_KEY);
  refs.form.elements.email.value = savedData?.email || '';
  refs.form.elements.message.value = savedData?.message || '';
}
initPage();

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  formData.email = refs.form.elements.email.value;
  formData.message = refs.form.elements.message.value;
  if (
    formData.email === '' ||
    formData.message === ''
  ) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
});
