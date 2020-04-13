// State Variables
let currentQuestion = 0;
let numQuestions = 0;
let correctAnswers = 0;

let corrections = [];
let questions;

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
            
        }

        // Generate 'corrections'
        if (corrections.length == 0) {
            $('#errors').hide();
        }


        // Hide final question & reveal scoreboard
        $(`#${currentQuestion}`).hide();
        $('#submit').hide();
        $('.scoreboard').css('display', 'flex');
        $('#score').text(`${correctAnswers}/${numQuestions}`);
    }
});


