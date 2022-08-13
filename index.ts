// Import stylesheets
import './style.css';

const form: HTMLFormElement = document.querySelector('#defineform');

form.onsubmit = () => {
  const formData = new FormData(form);
  // https://api.dictionaryapi.dev/api/v2/entries/en/hello

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);
  return false; // prevent reload
};