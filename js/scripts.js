// Tallies score and switches to next page.
function buttonClicked(button) {
    // Finds what page button belongs to
    let page = button.parentElement.parentElement;
    // Keeps answers locked up
    let answers = ["Q1a", "Q2a", "Q3c", "Q3d"];

    // If not the start or end page, calculate tally.
    if (page.id != 'start') {
        // Stores all answers so can relay faults to user after.
        buttonClicked.answers.push({
            question: page.id,
            answer: button.id
        })

        // If correct answer, increase tally.
        if (answers.includes(button.id)) {
            buttonClicked.score++;
        }
    }

    // Switches to the next page.
    page.style.display = 'none';
    page.nextElementSibling.style.display = 'block';
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });

    // If it is the last page, tell user their total score.
    if (page.id == 'Q3') {
        document.getElementById('finish').querySelector('h4').textContent = `Congratulations! You scored ${buttonClicked.score} out of 3.`;

        // Shows user info about the questions
        for (answer of buttonClicked.answers) {
            let id = answer.answer + 'Info';
            document.getElementById(id).style.display = 'block';
        }
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
          });

        // Unlocks the society page.
        console.log(buttonClicked.score);
        if (buttonClicked.score == 3) {
            document.getElementById("society").classList.remove("disabled");
            document.querySelector("#unlock-society").style.display = 'block';
        }
    }
}
buttonClicked.score = 0;
buttonClicked.answers = [];

function accordionOpened(accordion) {
    var acc_id = accordion.getAttribute('href');
    if (document.querySelector(acc_id).classList.contains('show') == false) {
        setTimeout(function () {
            window.scroll({
                top: 5000,
                left: 0,
                behavior: 'smooth'
            });
        }, 200);
    }
}

function commencePopup(link) {
    // If society page is actually disabled
    if (link.querySelector(".nav-link").classList.contains("disabled")) {
        var modal = new bootstrap.Modal(document.getElementById('societyPopup'), {});
        modal.show();
    }
}
