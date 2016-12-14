
/* DETERMINE_WHICH_SCREEN is a function that redirects the app to either the question screen or end screen
   — depending on the boolean value of the 'question_screen':
 *****************************************************************************************************************/

const DETERMINE_WHICH_SCREEN = () => {
    if (progress.questionNumber >= allQuestions.length) {
        question_screen = false;
        GENERATE_END_SCREEN();
    } else { 
        question_screen = true;
        GENERATE_QUESTION(); 
     }
};
