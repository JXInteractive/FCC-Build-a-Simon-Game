
/* UPDATE_QUESTIONS_CORRECT_VALUE is a function that marks all questions wrong (with X symbol) by default:
 *****************************************************************************************************************/

const UPDATE_QUESTIONS_CORRECT_VALUE = () => { for (let i = 0; i < allQuestions.length; i++) allQuestions[i].correct = SYMBOLS.GRADING.WRONG; };
