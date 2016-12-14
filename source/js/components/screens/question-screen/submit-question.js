
/* SUBMIT_QUESTION is a function for dealing with actions to take upon a user clicking submit on each question:
 *****************************************************************************************************************/

const SUBMIT_QUESTION = () => {
    let selected = CHECK_USER_ANSWERED(), isItCorrect = parseInt(allQuestions[progress.questionNumber].userAnswer) === allQuestions[progress.questionNumber].answer;

    // If user has selected an answer and it is correct, increment score and register answer as correct:
    if (selected) {
        if (isItCorrect) {
            progress.userScore++;
            allQuestions[progress.questionNumber].correct = SYMBOLS.GRADING.RIGHT;
        }
        progress.questionNumber++;
        DETERMINE_WHICH_SCREEN();
    } else {
        // If user has not selected an answer, but submits question, alert them of the error:
        ALERT_MSG(LABELS.UI.ALERT_SELECT_ANSWER);
    }
};
