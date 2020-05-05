const message = document.querySelector(".message");
const game = {};
const output = document.querySelector(".que");
const nx = document.querySelector(".next");
let hi = document.getElementById("buttons");
nx.addEventListener("click", createQuestion);
let el = document.getElementById('last');
// el.innerHTML = "Here are some points to consider 1. Joseph farms Goats 2. Nakivale was Kuja Kuja/s first location 3. Freddo is the short name of Frederick Wabwire4. Kuja Kuja has 2 partners 5. Hersi grew up in England";

function welcomeMessage() {
    document.getElementById("welcome").style.display = "block";
    document.getElementById("quizBox").style.display = "none";

    document.getElementById("start").addEventListener("click", function() {
        document.getElementById("quizBox").style.display = "block";
        document.getElementById("welcome").style.display = "none";
        document.getElementById("buttons").style.display = "none";
    });
}

// function replayGame() {
//     document.getElementById("quizBox").style.display = "block";
//     document.getElementById("welcome").style.display = "none";
//     document.getElementById("buttons").style.display = "none";
// }

const url =
    // "https://script.google.com/macros/s/AKfycbwx_LHSShjlyzjMz3od6bWgId2JK8qHI6UJtNU7I_xdaUhOLE9Y/exec ";

    "https://script.google.com/a/labs.ws/macros/s/AKfycbxENkp3sSxP-6-TwOcRqVR0WFBD-3Hn8G9d8Wsr/exec";
fetch(url)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data.data);
        game.total = data.data.length; // json data for game
        game.val = 0; //question we are on
        game.score = 0;
        game.arr = data.data;

        data.data.forEach(function(el) {});
        createQuestion();
    });

function createQuestion() {
    nx.style.display = "none";
    if (game.val + 1 > game.total) {
        output.textContent = "GAME OVER !";
        message.textContent =
            "Thanks for your time and Congratulations for finishing the game, your score is " +
            game.score +
            " out of " +
            game.total;
        el.style.display = "block";
        hi.style.display = "block";

    } else {
        message.textContent =
            "Question #" + (game.val + 1) + " out of " + game.total;
        output.innerHTML = "";

        let q = game.arr[game.val];
        console.log(q);
        const main = document.createElement("div");
        main.textContent = q.question;
        main.classList.add("question");
        output.appendChild(main);
        arrayRandom(q.options);
        q.options.forEach(function(el) {
            console.log(el);
            let span = document.createElement("span");
            span.textContent = el;
            span.classList.add("answer");
            span.classList.add("btn");
            output.appendChild(span);
            span.ans = q.answer;
            span.addEventListener("click", checker);
        });
    }
}

function arrayRandom(arr) {
    arr.sort(function() {
        return 0.5 - Math.random();
    });
}

function checker(e) {
    //console.log(e.target.ans);
    //console.log(this.ans);
    const selAns = document.querySelectorAll(".answer");
    selAns.forEach(function(ele) {
        ele.classList.remove("answer");
        ele.style.color = "#008080";
        ele.removeEventListener("click", checker);
    });
    let sel = e.target;
    console.log(sel.textContent);
    if (sel.textContent == sel.ans) {

        sel.style.color = "green";
        nx.textContent = "Correct - click to move to the next questions";
        game.score++;
    } else {
        sel.style.color = "red";

        nx.textContent = "Wrong - click to move to the next questions";
    }
    game.val++;
    nx.style.display = "block";
}