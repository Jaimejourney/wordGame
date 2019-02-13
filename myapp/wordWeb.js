const guessedList = require(`./guessedList`);
const wordList = require(`./wordList`);
const cheerio = require('cheerio');


const wordWeb = {
    wordWeb: function(word,wordlist,varifiedWord,list,picAddress) {
        console.log(varifiedWord);
        var object = {};
        object['word'] = word;
        object['wordlist'] = wordlist;
        object['varifiedWord'] = varifiedWord;
        object['list']=list;
        object['picAddress'] = picAddress;
        var json = JSON.stringify(object);
        let len = list.length;
        return`
        <!DOCTYPE html>
<html>
<head>
    <title>Word Game</title>
    <link href="stylesheets/word.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <div class="wrapping">
        <div class="word">
            <div class = "wordTitle">Guessed List</div>
            ${guessedList.guessedList(list)}
        </div>
        <div class = "guessed">
            <div class = "wordTitle">Word List</div>
            ${wordList.wordList(wordlist)}
        </div>
        <div class="guess">
            <div class="subtitle">Word Game</div>
            <form action = "/submit" method = "POST">
            <input class="input" name = "text" type="text" value="Guess the word" onfocus="if (value =='Guess the word'){value =''}"onblur="if (value ==''){value='Guess the word'}"/>
            <input type="hidden" name = "json" id="rakuGridJsonData" value='${json}'/>
            <div class = "buttonArea">
                <button type = "submit" class = "button">That's it</button> 
                </form>
                <form action = "/clear" method = "POST">
                <button class = "button">New Game</button>
                </form>
            </div>
                  ${wordWeb.result(word,wordlist,varifiedWord)}    
            <div class = "timesArea">
                You have tried ${len} times
            </div>
        </div>
    </div>
    ${wordWeb.photoArea(word,wordlist,picAddress,varifiedWord)}
        <script src="javascripts/dist/blurify.js"></script>
<script>
    (function () {
        new blurify({
            images: document.querySelectorAll('.blurify'),
            blur: 16,
            mode: 'auto',
        });
        // blurify(6, document.querySelectorAll('.blurify'));
    })();
</script>
</body>

</html>
        `;
    },

    result:function(word,wordlist,varifiedWord){
        if(wordWeb.isInList(word,wordlist)){
            if(wordWeb.numOfDiffs(word,varifiedWord) === word.length){
                return`<div class = "answerArea">
                Congratulations! You have got the right answer!
                </div>`;
            }else{
                return `
                <div class = "answerArea">
                You have ${wordWeb.numOfDiffs(word,varifiedWord)} right
                </div>`; 
            }
        }else{
            return ` <div class = "answerArea">You got the wrong word</div>`;
        }
    },

    photoArea:function(word,wordlist,picAddress,varifiedWord){
        if(wordWeb.isInList(word,wordlist) && wordWeb.numOfDiffs(word,varifiedWord) === word.length){
                return`<div class = "photo">
                <img src=${picAddress} alt="" class="avatar">
                </div>`;
            }else{
                return `
                <div class = "photo">
        <img data-src=${picAddress}  alt="" class="blurify avatar">
        </div>`; 
            }
    },
    addList,
    numOfDiffs,
    isInList
};


function addList(word,list,wordlist){
    if(isInList(word,wordlist)){
        list.push(word);
    }
}

function newGame(){
    // random1 = Math.floor(Math.random()*(examples.exampleList.length));
    // random2 = Math.floor(Math.random()*(examples.exampleList.length));
    // picAddress = "images/pigu" + random2 + ".jpg";
    // varifiedWord = examples.exampleList[random1];
    // console.log(picAddress);
}


function numOfDiffs(word,varifiedWord){
    let num = 0;
    word = word.toLowerCase();
    varifiedWord1 = varifiedWord.toString().toLowerCase();
    words = word.split("");
    varifiedWords = varifiedWord1.split("");
    const visited = [];
    for (let index = 0; index < word.length; index++) {
        visited.push(false);
    }

    for(var i=0;i<word.length;i++){
        for(var j=0;j<word.length;j++){
            if(words[i] === varifiedWords[j] && !visited[j] ){
                visited[j] = true;
                num++;
                break;
            }
        }
    }
    return num;
}

function isInList(word,wordlist){
    wordUp = word.toUpperCase();
    wordLo = word.toLowerCase();
    if(wordlist.includes(wordUp) || wordlist.includes(wordUp)){
        return true;
    }else{
        return false;
    }
}

module.exports = wordWeb;