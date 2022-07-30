//Start moment
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '32ba330acfmsh07360fad9d46082p14f649jsn18d89deaeab6',
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
	}
};



// fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=5', options1)
// 	.then(response => response.json())
// 	.then(response => {
//     const entered_word = response[Math.round(Math.random() * 5)]
//         fetch(`https://wordsapiv1.p.rapidapi.com/words/${entered_word}/typeOf`, options2)
//           .then(response => response.json())
//           .then(response => console.log(response,'Resp')) // return {word,typeOf}
//           .catch(err => console.error(err));

//   })
// 	.catch(err => console.error(err));

const start_page = document.getElementById('start') 
start_page.innerHTML += `<div id = "game_start">
                                <input type="submit" id="start_button" value="New game">
                              </div>`

let exampleWord = {word:'something',typeOf:['something','smth']};
let exampleWord2 = {word:'cSharp',typeOf:['CSharp','smth']};
let chances = 7;
let score = 0; 
let inputedTrue = {};
let wordValues = {};
let wordInp = ''
startNewGame();

function startNewGame(){  
 
  const startButton = document.getElementById("start_button");
    fetch(`https://random-word-api.herokuapp.com/word`)
      .then(response => response.json())
      .then(response => {
      try {
        wordInp = response[0]
      }
      catch(err){}
    })     
    startButton.addEventListener("click",function() {
      start_page.innerHTML = `
      <div id="game"></div>  
      <div id="wrongChar"></div>`
      startButton.remove();
      const game = document.getElementById("game");3
      game.innerHTML = `
      <div id="question"></div>
      <div id="hint"></div>`
      startGame({word:wordInp,typeOf:['something']})
      document.getElementById('enteredWord').onclick = openWord;
})
}
//Equal function
function isEqual(object1, object2) {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);

  if (props1.length !== props2.length) {
    return false;
  }

  for (let i = 0; i < props1.length; ++i) {
    const prop = props1[i];

    if (object1[prop] !== object2[prop]) {
      return false;
    }
  }

  return true;
}
//Function for NewGame and EndGame
function startPoint(score,bool) { 
wordValues = {};

 if (!bool) {
   start_page.innerHTML = `
     <h1>Your score is ${score}</h1>
        <div id="game"></div>  
        <div id="wrongChar"></div>
     <div id = "game_start">
        <input type="submit" id="start_button" value="New game">
     </div>`
     console.log(start_page)
   score = 0; 
   startNewGame()
  }
 else {
  start_page.innerHTML = `
  <h1>Your score is ${score}</h1>
     <div id="game"></div>  
     <div id="wrongChar"></div>
     <div id = "game_start">
     <input type="submit" id="start_button" value="Continue">
  </div>`
   startNewGame()
  }  
  
}
                   
//Getting word and create boxes,input and submit button
function startGame(wordObj) {
  let word = wordObj.word
  console.log(word)
  wordObj.typeOf.length ? document.getElementById("hint").innerText = `  
  Hint:It's about "${wordObj.typeOf[0]}"` : document.getElementById("hint").innerText = ``

      for (let i = 0; i < word.length; i++) {
          if (!wordValues[word[i].toLowerCase()]) {
            wordValues[word[i].toLowerCase()] = 1;
          }
      }

  word =  word.split('')
  const question = document.getElementById('question');
  const parent_element = document.createElement("div");
  parent_element.setAttribute("id","parent_id");

      for (let i = 0 ; i < word.length; i++) {
        const child =  document.createElement("div");
        child.setAttribute(`class`,`box${i}`)
        child.innerHTML = ` 
                  <span>${" "}</span>`;
        parent_element.appendChild(child);         
      }

  question.innerHTML = `<div>
        <div id="word_part"></div>
        <div id="chances">Chances:${chances}</div>
        </div>
        <div class="game_input">
            <div>
                <input type="text" id="input" maxlength="1" placeholder="Enter value">
                <button id="enteredWord" type="submit">Enter</button>
            </div>
        </div>
  `
  question.appendChild(parent_element);
}


function openWord() {
 let flag = false;
//  console.log(openword.word)
 let entered_char = input.value.toLowerCase();
let word = wordInp;  
  for (let i = 0; i < word.length; i++) {
        if (entered_char == word[i]) {  
                if (!inputedTrue[input.value]) {
                score += 10;
                inputedTrue[input.value] = 1;
                // }else if(inputedTrue[input.value] = 1){
                //   flag = true ;
                //   continue;
                // }
                }
          let child = document.getElementsByClassName(`box${i}`)[0]
          try{
          child.className = "correct-answer"
          child.innerHTML =`<span>${word[i]}</span>` 
          }catch(err){}
          flag = true;
        }
  }

  if (isEqual(inputedTrue,wordValues)) {
    console.log('ended')
    inputedTrue = {};
    score += 100;
    return startPoint(score,true)
  }

  if(!flag){
    const wrong = document.getElementById('wrongChar')
    wrongWord(wrong,input.value)
    chances --;
    const allChances = document.getElementById('chances');
    allChances.innerHTML = `Chances:${chances}`

      if (!chances) {
        chances = 7;
          return startPoint(score,false);  
        }

  }
  input.value = ''   
}

function wrongWord(elem,char) {
  elem.innerHTML = `<p>There is no letter ${char}</p>`  
  setTimeout(()=>{
  elem.innerHTML = ` `
  }, 2000)    
}




