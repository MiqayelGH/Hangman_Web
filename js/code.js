const startPage = document.getElementById('start') 
startPage.innerHTML += `<div id = "game_start">
                                <input type="submit" id="start_button" value="New game">
                         </div>`
let chances = 7;
let score = 0; 
let inputedTrue = {};
let wordValues = {};
let wordObj = ''
startNewGame();

function startNewGame(){  
    const startButton = document.getElementById("start_button");
    fetch(`https://random-words-api.vercel.app/word/verb`)
    .then(response => response.json())
    .then(response => {
          fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${response[0].word}`)
          .then(response => response.json())
          .then(response => {
        try {
          wordObj = response[0]
        }
        catch(err){}
      })})    
      startButton.addEventListener("click",function() {
        startPage.innerHTML = `
        <div id="game"></div>  
        <div id="wrong-letter"></div>`
        startButton.remove();
        const game = document.getElementById("game");3
        game.innerHTML = `
        <div id="question"></div>
        <div id="hint"></div>`
        startGame(wordObj)
        document.getElementById('enteredWord').onclick = openWord;
  })
  }

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
 //function which called when game ended or started again
function startPoint(score,bool) { 
  wordValues = {};

  if (!bool) {
    startPage.innerHTML = `
      <h1>Your score is ${score}</h1>
          <div id="game"></div>  
          <div id="wrong-letter"></div>
      <div id="game_start">
          <input type="submit" id="start_button" value="New game">
      </div>`
    score = 0; 
    startNewGame()
    }
  else {
    startPage.innerHTML = `
    <h1>Your score is ${score}</h1>
        <div id="game"></div>  
        <div id="wrong-letter"></div>
    <div id="game_start">
        <input type="submit" id="start_button" value="Continue">
    </div>`
    startNewGame()
    }  
    
}
                   
//getting word and create letter boxes,input and submit button
function startGame(wordObj) {
    let word = wordObj.word
    let description = wordObj.meanings[0].definitions[0].definition;
    description.length ? document.getElementById("hint").innerText = `  
    Hint:It's about "${description}"` : document.getElementById("hint").innerText = ``

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

 //this function called when user enter letter
  function openWord() {
      let flag = false;
      let entered_char = input.value.toLowerCase();
      let word = wordObj.word
      for (let i = 0; i < word.length; i++) {
            if (entered_char == word[i]) {  
                    if (!inputedTrue[input.value]) {
                    score += 10;
                    inputedTrue[input.value] = 1;
                    }
              let child = document.getElementsByClassName(`box${i}`)[0]
            try {
              child.className = "correct-answer"
              child.innerHTML =`<span>${word[i]}</span>` 
            } catch(err) {};
        flag = true;
        }
    }

    if (isEqual(inputedTrue,wordValues)) {
      inputedTrue = {};
      score += 100;
      return startPoint(score,true)
    }

    if(!flag){
      const wrong = document.getElementById('wrong-letter')
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
//function called in openWord when user enter wrong letter
function wrongWord(elem,char) {
    elem.innerHTML = `<p>There is no letter ${char}</p>`  
    setTimeout(()=>{
    elem.innerHTML = ` `
    }, 2000)    
}




