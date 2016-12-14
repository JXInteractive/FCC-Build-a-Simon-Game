
/* GENERATE_END_SCREEN is a function for creating, appending and populating end-screen UI elements:
 *****************************************************************************************************************/

const GENERATE_END_SCREEN = () => {
    const PERCENTAGE_FINAL = parseInt(progress.userScore/allQuestions.length * 100);
    const ELEM_BTN_RETRY = CREATE_ELEMENT({ elem: 'button', className: 'btn btn-block btn-primary', id: 'elem-btn-retry' });

    // Set question_screen to false since this is an end screen:
    question_screen = false;
    TIMER.CLEAR();
    TOGGLE_UL_PADDING();
    UPDATE_PERCENTAGE_BAR();

    // Set the innerHTML values of various UI elements — user feedback in this case:
    elem_h2_ques.innerHTML = `${LABELS.FEEDBACK.WELL_DONE}`;
    elem_ul_ans.innerHTML = `${LABELS.FEEDBACK.REVIEW_ANSWERS}${LABELS.SEGMENTALS.SEGMENTAL}`;
    elem_div_feedback.innerHTML = `${LABELS.FEEDBACK.FINISHED_IN} ${timeCount.seconds} ${LABELS.SEGMENTALS.SECONDS}`;
    elem_div_time.innerHTML = null;
    elem_h2_ques.innerHTML = `${LABELS.FEEDBACK.YOU_SCORED} ${progress.userScore} ${LABELS.SEGMENTALS.DIVIDER} ${allQuestions.length} (${PERCENTAGE_FINAL}${LABELS.SEGMENTALS.PERCENTAGE}). ${GENERATE_FEEDBACK_MESSAGE(PERCENTAGE_FINAL)}<hr>`;
    
    // Remove submit button (to be replaced with retry button):
    elem_btn_submit.parentNode.removeChild(elem_btn_submit);
    
    GENERATE_RESULTS_TABLE();

    // Append retry button to DOM, set an innerHTML value and attach a click event:
    elem_ul_ans.appendChild(ELEM_BTN_RETRY);
    document.getElementById('elem-btn-retry').innerHTML = `${LABELS.UI.RETRY}`;
    document.getElementById('elem-btn-retry').onclick = function() {
        RESET.CONTAINER();
        RESET.HUD_VALUES();
        TITLE_SCREEN.GENERATE();
        TOGGLE_UL_PADDING();
    }
};
