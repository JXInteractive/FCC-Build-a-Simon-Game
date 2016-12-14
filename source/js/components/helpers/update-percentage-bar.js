
/* UPDATE_PERCENTAGE_BAR is a function that update the value (width) of the percentage bar :
 *****************************************************************************************************************/

const UPDATE_PERCENTAGE_BAR = (end) => {
    let increment = 0;

    // If the game has ended, increment the questionNumber by 1:
    if (end) increment +=1;

    // Calculate the game progress as a percentage and impute to progress bar element width:
    let percentageComplete = ((progress.questionNumber + increment) / allQuestions.length) * 100;
    elem_progress_bar.style.width = `${percentageComplete}${LABELS.SEGMENTALS.PERCENTAGE}`;
};
