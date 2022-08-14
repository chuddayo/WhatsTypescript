// https://api.dictionaryapi.dev/api/v2/entries/en/hello


// Import stylesheets
//import './style.css';


const dictionaryURL: string = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const form: HTMLFormElement = document.querySelector('#defineform');

form.onsubmit = () => {
  const formData = new FormData(form!);

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);

  getDefinition(text);

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

    const result = (await response.json());

    console.log('result is: ', JSON.stringify(result, null, 4));

    return result;
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

