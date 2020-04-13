// State Variables
let currentQuestion = 0;
let numQuestions = 0;
let correctAnswers = 0;

let correctionCount = 0;
let questions;

// Completion Messages
let badMessages = ["Yikes", "Uhhh...", "Never seen the show?"];
let decentMessages = ["Not bad", "Decent", "Solid"];
let goodMessages = ["Impressive!", "Good work!", "Wow!"];
let perfectMessages = ["Perfect!", "You're an expert!", "You're a pro!"];

// Reveal first question only originally
$( document ).ready(function() {
    // Load questions
    $.getJSON("data.json", function(data) {
        $('header h1').text(data.title);
        questions = data.questions;
        for (let i in data.questions) {
            let q = questions[i];
            $('.main').append(`
                <div class="quiz" id="${i}">
                <div class="question-section">
                    <h2>${q.question_name}</h2>
                </div>
                <ul class="answer-list">
                    <li class="answer">
                        <label>
                            <input type="radio" name="question" value="${q.answers[0].value}"/>
                            <img src="${q.answers[0].img_url}" />
                            <h3>${q.answers[0].text}</h3>
                        </label>
                    </li>
                    <li class="answer">
                        <label>
                            <input type="radio" name="question" value="${q.answers[1].value}"/>
                            <img src="${q.answers[1].img_url}" />
                            <h3>${q.answers[1].text}</h3>
                        </label>
                    </li>
                    <li class="answer">
                        <label>
                            <input type="radio" name="question" value="${q.answers[2].value}"/>
                            <img src="${q.answers[2].img_url}" />
                            <h3>${q.answers[2].text}</h3>   
                        </label>
                    </li>
                    <li class="answer">
                        <label>
                            <input type="radio" name="question" value="${q.answers[3].value}"/>
                            <img src="${q.answers[3].img_url}" />
                            <h3>${q.answers[3].text}</h3>   
                        </label>
                    </li>
                </ul>
            </div>`
            );
        }
        numQuestions = questions.length;
        $('#0').show();
        $('#next').show();
    });

    
});


$('#next').on('click', function(e) {
    let answer = $(`input[name='question']:checked`).val();
    let name = $(`input[name='question']:checked ~ h3`).text();
    if (answer == undefined) {
        alert("You must answer the question before moving on!");
    } else {
        // Check answer
        if (answer == 'correct') {
            correctAnswers += 1;
        } else {
            $('.corrections').append(
                `<li class="correction">
                    <span id="q">${questions[currentQuestion].question_name}</span> <span id="wrong">${name}</span> <span id="right">${questions[currentQuestion].answer_text}</span>
                </li>`
            );
        }
        // If we're about to display final question, hide next button & reveal submit
        if (currentQuestion + 1 == numQuestions - 1) {
            $('#next').hide();
            $('#submit').show();
        }
        // hide current question
        $(`#${currentQuestion}`).hide();
        // Clear selection
        
        $('input[name=question]:checked').prop('checked', false);
        
        // reveal next question
        currentQuestion += 1;
        $(`#${currentQuestion}`).show();
    }
});

$('#submit').on('click', function(e) {
    let answer = $(`input[name='question']:checked`).val();
    let name = $(`input[name='question']:checked ~ h3`).text();
    if (answer == undefined) {
        alert("Please answer the final question!");
    } else {
        // Check answer
        if (answer == 'correct') {
            correctAnswers += 1;
        } else {
            $('.corrections').append(
                `<li class="correction">
                    <span id="q">${questions[currentQuestion].question_name}</span> <span id="wrong">${name}</span> <span id="right">${questions[currentQuestion].answer_text}</span>
                </li>`
            );
            correctionCount += 1;
        }

        // Generate 'corrections'
        if (correctionCount == 0) {
            $('#errors').hide();
        }
        console.log(`Correction Count: ${correctionCount}`);

        // Hide final question & reveal scoreboard
        $(`#${currentQuestion}`).hide();
        $('#submit').hide();
        $('.scoreboard').css('display', 'flex');
        $('#score').text(`${correctAnswers}/${numQuestions}`);
        // Determine appropriate message
        let r = getRandomInt(3);
        let message = "";
        let imagePath = "";
        
        switch (correctAnswers) {
            case 10:
                message = perfectMessages[r];
                imagePath = "images/perfect.jpg";
                break;
            case 9:
                message = goodMessages[r];
                imagePath = "images/good.jpg";
                break;
            case 8:
                message = goodMessages[r];
                imagePath = "images/good.jpg";
                break;
            case 7:
                message = decentMessages[r];
                imagePath = "images/decent.jpg";
                break;
            case 6:
                message = decentMessages[r];
                imagePath = "images/decent.jpg";
                break;
            case 5:
                message = decentMessages[r];
                imagePath = "images/decent.jpg";
                break;
            case 4:
                message = badMessages[r];
                imagePath = "images/bad.jpg";
                break;
            case 3:
                message = badMessages[r];
                imagePath = "images/bad.jpg";
                break;
            case 2:
                message = badMessages[r];
                imagePath = "images/bad.jpg";
                break;
            case 1:
                message = badMessages[r];
                imagePath = "images/bad.jpg";
                break;
            case 0:
                message = badMessages[r];
                imagePath = "images/bad.jpg";
                break;
                
        }
        // Set photo
        $('#final-image').append(
            `<img id="result-image" src="${imagePath}" alt=""></img>`
        );
        // set message
        $('#message').text(message);
    }
});


// Helper functions
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

