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

  let parsedResponse = getDefinition(text);
  wordheader!.innerHTML = text;
  //definitionlead!.innerHTML = getPrimaryDefinition(parsedResponse);

  definitionlead!.innerHTML = '';
    fetchWordDefinitions(text)
        .then(defintions => {
            defintions.forEach(d => {
              definitionlead!.innerHTML += `<p>${d}</p>`;
            });
        })
        .catch(_ => {
          definitionlead!.innerHTML += `<p class="lead">Error: Unable to find any defintions for ${text}.</p>`;
        });

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
    console.log(parsed[0].meanings.flatMap(m => m.definitions));
    // console.log(parsed[0].meanings.flatMap(m => m.definitions).flatMap(d => d.definition));

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

async function getPrimaryDefinition(allDefinitions) {
  return allDefinitions[0].meanings.flatMap(m => m.definitions).flatMap(d => d.definition);
}

// kris' code
const fetchWordDefinitions = async (text: string) => {
  const response = await fetch(dictionaryURL + text);
  const json = await response.json();
  return json[0].meanings
      .flatMap(m => m.definitions)
      .flatMap(d => d.definition);
};
