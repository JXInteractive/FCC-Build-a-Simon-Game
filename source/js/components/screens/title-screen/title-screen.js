
/* TITLE_SCREEN is an object with methods that programmatically GENERATE and CLEAR title-screen UI elements:
 *****************************************************************************************************************/

const TITLE_SCREEN = {

    // GENERATE:: Programmatically generate title-screen UI elements:

    GENERATE: () => {
        const ELEM_BR_1 = CREATE_ELEMENT({ elem: 'br' });
        const ELEM_BR_2 = CREATE_ELEMENT({ elem: 'br' });
        const ELEM_DIV_OUTER = CREATE_ELEMENT({ elem: 'div', className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12 div-padding-1 x', id: 'elem-div-outer' });
        const ELEM_DIV_OUTER_2 = CREATE_ELEMENT({ elem: 'div', className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12 div-padding-1 x', id: 'elem-div-outer-2' });
        const ELEM_H1_TITLE = CREATE_ELEMENT({ elem: 'h1', className: 'elem-h1-title-screen', id: 'elem-h1-title' });
        const ELEM_H2_TITLE = CREATE_ELEMENT({ elem: 'h2', className: 'elem-h2-title-screen', id: 'elem-h2-subtitle' });
        const ELEM_MID_DIV = CREATE_ELEMENT({ elem: 'div', className: 'elem-mid-div', id: 'elem-mid-div' });
        const ELEM_BTN_TITLE_SCREEN_1 = CREATE_ELEMENT({ elem: 'button', className: 'btn btn-block btn-primary', id: 'elem-btn-title-screen-1' });
        const ELEM_BTN_TITLE_SCREEN_2 = CREATE_ELEMENT({ elem: 'button', className: 'btn btn-block btn-primary', id: 'elem-btn-title-screen-2' });
        const ELEM_FOOTER = CREATE_ELEMENT({ elem: 'footer', className: 'elem-footer text-center', id: 'elem-footer' });
        
        // Append title-screen UI elements as children of the following elements (elements are index zero of following array):
        APPEND_TO_DOM([
            ['elem-div-sub-container', ELEM_BR_1],
            ['elem-div-sub-container', ELEM_BR_2],
            ['elem-div-sub-container', ELEM_DIV_OUTER],
            ['elem-div-outer', ELEM_DIV_OUTER_2],
            ['elem-div-outer-2', ELEM_H1_TITLE],
            ['elem-div-outer-2', ELEM_H2_TITLE],
            ['elem-div-outer-2', ELEM_MID_DIV],
            ['elem-div-outer-2', ELEM_BTN_TITLE_SCREEN_1],
            ['elem-div-outer-2', ELEM_BTN_TITLE_SCREEN_2],
            ['elem-div-outer-2', ELEM_FOOTER]
        ]);
        
        // Assign innerHTML content of newly generated title-screen UI elements:
        document.getElementById('elem-h1-title').innerHTML = `${ LABELS.TITLE.TITLE_SCREEN_TITLE }`;
        document.getElementById('elem-h2-subtitle').innerHTML = `${ LABELS.TITLE.TITLE_SCREEN_SUBTITLE }`;
        document.getElementById('elem-btn-title-screen-1').innerHTML = `${ LABELS.UI.START_QUIZ }`;
        document.getElementById('elem-btn-title-screen-2').innerHTML = `${ LABELS.UI.SETTINGS }`;
        document.getElementById('elem-footer').innerHTML = `${ LABELS.TITLE.FOOTER }`;
        document.getElementById('elem-btn-title-screen-1').onclick = function() { TITLE_SCREEN.CLEAR(1); };
        document.getElementById('elem-btn-title-screen-2').onclick = function() { ALERT_MSG('Settings not available in this version!'); };

        // If fading animations are enabled, apply them to the following title-screen UI elements (passed as FADE_IN arguments):
        if (CONFIG.ANIMATIONS.FADES_ENABLED) FADE_IN([document.getElementById('elem-h1-title'), document.getElementById('elem-h2-subtitle'), document.getElementById('elem-footer')]);
    },

    // CLEAR:: Programmatically clear title-screen UI elements. If a truthy argument is passed, load questions and generate QUESTION_SCREEN UI:

    CLEAR: (GO_TO_QUESTIONS) => {
        RESET.CONTAINER();
        if (GO_TO_QUESTIONS) {
            QUESTION_SCREEN.GENERATE();

            // Reset: Resetting the question set has two parts — clearing the question set array and loading a new one with a function:
            QUESTION_SET.RESET({ arr: allQuestions, src: QUESTION_JSON_SOURCE, func: (response) => { for (let i = 0; i < response.length; i++) { allQuestions.push(response[i]); }
                
                // Update question set so that all questions are marked wrong (with an X symbol) by default and generate a question:
                setTimeout(function() {
                    UPDATE_QUESTIONS_CORRECT_VALUE();
                    GENERATE_QUESTION();
                    TIMER.SET();
                }, 150);
            }});
        }
    }
};
