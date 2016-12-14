
/* CHECK_USER_ANSWERED is a function for determining if the user has selected at least one answer on submit:
 *****************************************************************************************************************/

const CHECK_USER_ANSWERED = () => {
    const LI = document.getElementsByTagName('li');
    
    // Loop through li elements and check if any radio button child elements is checked — if not, user has not selected an answer:
    for (let i = 0; i < LI.length; i++) {
        if (LI[i].children[0].checked) {
            allQuestions[progress.questionNumber].userAnswer = i;
            progress.questionSelected = true;
        }
    }
    return progress.questionSelected;
};
