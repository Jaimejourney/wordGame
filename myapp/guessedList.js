const guessedList = {
    guessedList: function(list) {
        return`<ul>` + list.map(user => `
                <li>${user}</li>`).join('')+
            `</ul>`;
    }
};
module.exports = guessedList;