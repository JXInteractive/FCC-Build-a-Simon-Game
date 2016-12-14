
/* GENERATE_QUESTION is a function for looping through, appending and populating the current question screen:
 *****************************************************************************************************************/

const GENERATE_QUESTION = () => {
    question_screen = true;
    UPDATE_PERCENTAGE_BAR();
    
    // If fading animations are enabled, apply them to the following title-screen UI elements (passed as FADE_IN arguments):
    if (CONFIG.ANIMATIONS.FADES_ENABLED) FADE_IN([elem_h2_ques, elem_ul_ans]);

    // Clear innerHTML values of DOM elements and (re)cache them to variables:
    ELEMS_DOM.CLEAR();
    ELEMS_DOM.CACHE();
    ELEMS_DOM.ADD_EVENTS();

    progress.questionSelected = false;

    // Loop through answers for current question and append them as list items to UL element:
    for (let i = 0; i < allQuestions[progress.questionNumber].choices.length; i++) {
        let li = CREATE_ELEMENT({ elem: 'li' });
        elem_ul_ans.appendChild(li);
        li.appendChild(CREATE_ELEMENT({ elem: 'input', type: 'radio', name: 'radio' }));
        li.appendChild(document.createTextNode(allQuestions[progress.questionNumber].choices[i]));
    }
    
    // Set the innerHTML value of the HUD and question:
    elem_h2_ques.innerHTML = `${progress.questionNumber + 1}. ${allQuestions[progress.questionNumber].question}`;
    elem_div_feedback.innerHTML = `${LABELS.SEGMENTALS.QUESTION_SHORTHAND}${progress.questionNumber + 1} ${LABELS.SEGMENTALS.OF} ${allQuestions.length}`;
};
