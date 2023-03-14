let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
var apiKey = 'fd438089-3f49-4add-88af-71415773a2cd';
let notFound = document.querySelector('.not_found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loadingg = document.querySelector('.loading');

searchBtn.addEventListener('click',function(e){
e.preventDefault();
audioBox.innerHTML = '';
notFound.innerText = '';
defBox.innerText = '';

// get input data 

let word =  input.value;

//call API get data
if (word === '' ) {
  alert('Word is required');
  return;
}

getData(word);
});

 async function getData(word) {
  loadingg.style.display = 'block';
  // Ajax call .  
 const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
 const data = await response.json();


//  if empty result . 
if (!data.length) {
  loadingg.style.display = 'none';

  notFound.innerText = 'No result found';
  return;
}

// if result is suggestions 
if (typeof data[0] === 'string') {
  loadingg.style.display = 'none';

  let heading = document.createElement('h6');
  heading.innerText = 'Did you mean?';
  notFound.appendChild(heading);
  data.forEach(element => {
    let suggestion = document.createElement('span');
    suggestion.classList.add('suggested');
    suggestion.innerText = element;
    notFound.appendChild(suggestion);
  });

  return;
}


// result found
loadingg.style.display = 'none';
let defination = data[0].shortdef;
defBox.innerText = defination;
console.log(data);

// getting audio
const soundName = data[0].hwi.prs[0].sound.audio;
if (soundName) {
  renderSound(soundName);
}
}

function renderSound(soundName) {
  let subfolder = soundName.charAt[0];
  let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

  let aud = document.createElement('audio');
  aud.src = soundSrc;
  aud.controls = true;
  audioBox.appendChild(aud);

}
// https://media.merriam-webster.com/audio/prons/en/us/mp3/p/pajama02.mp3