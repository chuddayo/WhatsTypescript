// https://api.dictionaryapi.dev/api/v2/entries/en/hello

// Import stylesheets
//import './style.css';

const dictionaryURL: string = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const form: HTMLFormElement = document.querySelector('#defineform');
const wordheader = document.getElementById('wordheader');
const definitionlead = document.getElementById('maindef');

form.onsubmit = () => {
  const formData = new FormData(form!);
  const text = formData.get('defineword') as string;
  console.log(text);

  wordheader!.innerHTML = text;
  
  definitionlead!.innerHTML = '';
  getDefinition(text).then(result => {
    result.forEach(subresult => {
      for (var i = 0; i < subresult.meanings.length; i++) {
        definitionlead!.innerHTML += `<p>${subresult.meanings[i].partOfSpeech}</p>`;
        for (var j = 0; j < subresult.meanings[i].definitions.length; j++) {
          definitionlead!.innerHTML += `<li>${subresult.meanings[i].definitions[j].definition}</li>`;
        }
        definitionlead!.innerHTML += `<br>`;
      }
    })
  })

  return false; // prevent reload
};

async function getDefinition(text: string) {
  try {
    const response = await fetch(dictionaryURL + text, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('result is: ', JSON.stringify(result, null, 4));

    const parsed = JSON.parse(JSON.stringify(result));

    return parsed;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}