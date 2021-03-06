# Exam 1

* start from the up-to-date master branch (`git checkout master; git pull origin master`)
* Create a feature branch named 'exam1' (`git checkout -b exam1`)
* modify the `questions.md` file to have the answers required
* Add a `server.js`, a `words.js` and any other files necessary to create the multiple page web application below
* add, commit, and push the branch to github
* Create a PR to merge to master
* Be sure to include the TA and I as reviewers.  
* Due by 11:59pm Sun Feb 10

## Goal and Requirements

* Did you remember the above requirement about `questions.md`?

The application will be a game to guess a word.

The User will enter a word, and the page will do one of:
* Say the word is not one of the permitted words and allow them to enter a new word
* Display that the user has guessed the word and allow them to start a new game
* Say how many letters the word has in common with the word they are trying to guess, without regard to position or case-sensitivity  (See "Examples" below)

## Requirements

### Visuals
* The game will display the list of previously guessed words for this word, as well as their number of "matching" letters
* The game will display the number of accepted guesses made (turns taken, not counting invalid words)
* The game will display the list of valid words to guess
  * This list will be scrollable if it cannot fit in the space available
* The game will show effort to make it visually attractive and usable.

### Logic
* The game will use a `words.js` that exports an array of valid words.  The game will work if this file is replaced by a different list of words.  All words in any version of the file will be the same length as the other words in that file.
* The game will not care about case-sensitivity.  The game will call a letter a match, even if the letter is in a different position in the word (see "Examples" below)
* The server will console.log the current secret word at the start of the game.  The client should never know the secret word until it is guessed.
* The server does NOT have to worry about multiple players - as long as the game works consistently for one user the requirements are met (See Extra Credit below)
* The game must be runnable via: `npm install` and then `node server.js` and then going to `http://localhost:3000`

### Extra Credit
* The server should work for multiple players, each playing their own games that may last different durations and are not impacted by other players.  No information should be sent to the clients that allow them to learn the secret words they are trying to guess outside of guessing.
* If you do this, be sure to mention the extra credit attempt on your PR.

### Examples

If `words.js` has the words "TEA, EAT, TEE, PEA, PET, APE" and the game selects TEA as the secret word then:
* TREE will give a warning about an invalid word, not increment the turn counter and allow a new guess
* ATE will give a warning about an invalid word, not increment the turn counter and allow a new guess
* PET will respond with 2 matches and increment the turn counter then allow a new guess
* TEE will respond with 2 matches and increment the turn counter then allow a new guess
* tee will respond with 2 matches and increment the turn counter then allow a new guess
* EAT will respond with 3 matches and increment the turn counter then allow a new guess
* TEA will respond that they have won the game in however many turns and allow them to start a new game with a new randomly selected word from the list

## Allowances
* You may create your HTML as you see fit, but it must be fundamentally semantically valid and other best practices from class
* You may create the CSS as you see fit but you must follow the best practices given in class
* You may add icons and background images but there is no requirement to do so

## Restrictions
* You must add additional JS files (server-side ONLY) that you write to uphold the idea of separation of concerns
* You must use the correct HTTP methods (GET for loading pages, POST for adding content)
* Reloading a page should not trigger a POST
* Do not use external JS other than express itself
* Do not use external CSS libraries
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* You may NOT use client-side/browser-side Javascript
* Do not have any files in your PR except for the exam (no files from other assignments, for example)
* Do not use var
* Do not use alert
* Do not use terrible variable names
* Do not have console.log messages or commented out code
* Do not use cookies
* You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  * I and the TA must be able to read it easily

