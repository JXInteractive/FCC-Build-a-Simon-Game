
/* QUESTION_SCREEN is an object with methods that programmatically GENERATES question-screen UI elements:
 *****************************************************************************************************************/

const QUESTION_SCREEN = {

    // QA_SECTION:: Programmatically generate question-screen QA (question and answer) elements:

    QA_SECTION: () => {
        const ELEM_QA_DIV = CREATE_ELEMENT({ elem: 'div', className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12 div-padding-1 x', id: 'elem-q-div' }); 
        const ELEM_QA_DIV_SUB = CREATE_ELEMENT({ elem: 'div', className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12 div-padding-1 x', id: 'elem-q-div-sub' });
        const ELEM_UL_ANS = CREATE_ELEMENT({ elem: 'ul', className: 'elem-ul-ans', id: 'elem-ul-ans' });
        const ELEM_SUBMIT_BTN = CREATE_ELEMENT({ elem: 'button', className: 'btn btn-block btn-primary', id: 'elem-btn-submit' });
        
        // Append question-screen QA elements as children of the following elements (elements are index zero of following array):
        APPEND_TO_DOM([['elem-div-sub-container', ELEM_QA_DIV], ['elem-q-div', ELEM_QA_DIV_SUB], ['elem-q-div-sub', ELEM_UL_ANS]]);
        APPEND_TO_DOM([['elem-q-div-sub', ELEM_SUBMIT_BTN]]);
        
        // Cache newly-created "submit" button to the "elem_btn_submit" variable, assign innerHTML and a click event:
        elem_btn_submit = document.getElementById('elem-btn-submit');
        elem_btn_submit.innerHTML = LABELS.UI.SUBMIT;
        elem_btn_submit.onclick = function () { SUBMIT_QUESTION(); };
    },

    // PAGE_HEADER:: Programmatically generate question-screen PAGE_HEADER (HUD and title) elements:

    PAGE_HEADER: (QA) => {
        const ELEM_P_HEADER = CREATE_ELEMENT({ elem: 'div', className: 'elem-page-header', id: 'elem-p-header' });
        const ELEM_P_HEADER_SUB1 = CREATE_ELEMENT({ elem: 'div', className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12 div-padding-1 elem-container-border', id: 'elem-p-header-sub1' });
        const ELEM_P_HEADER_SUB1_A = CREATE_ELEMENT({ elem: 'div', className: 'col-lg-6 col-md-6 col-sm-6 col-xs-6 div-padding-1 elem-container-border', id: 'elem-p-header-sub1a' });
        const ELEM_P_HEADER_SUB1_B = CREATE_ELEMENT({ elem: 'div', className: 'col-lg-6 col-md-6 col-sm-6 col-xs-6 div-padding-1 elem-container-border elem-timer', id: 'elem-p-header-sub1b' });
        const ELEM_P_HEADER_SUB1_A_SUB = CREATE_ELEMENT({ elem: 'div', className: 'elem-hud-text', id: 'elem-div-feedback' });
        const ELEM_P_HEADER_SUB1_B_SUB = CREATE_ELEMENT({ elem: 'div', className: 'elem-hud-text elem-timer', id: 'elem-div-time' });
        const ELEM_P_HEADER_HR = CREATE_ELEMENT({ elem: 'hr' });
        const ELEM_DIV_PROGRESS = CREATE_ELEMENT({ elem: 'div', className: 'progress', id: 'elem-div-progress' });
        const ELEM_DIV_PROGRESS_SUB = CREATE_ELEMENT({ elem: 'div', id: 'elem-progress-bar', className: 'progress-bar progress-bar-success', role: 'progressbar', ariaValuenow: "0", ariaValueMin: "0", ariaValueMax: "100", style: "width: 0%" });
        const ELEM_P_HEADER_H2 = CREATE_ELEMENT({ elem: 'h2', id: 'elem-h2-ques' });
        
        // Append question-screen QA elements as children of the following elements (elements are index zero of following array):
        APPEND_TO_DOM([
            ['elem-div-sub-container', ELEM_P_HEADER],
            ['elem-p-header', ELEM_P_HEADER_SUB1],
            ['elem-p-header-sub1', ELEM_P_HEADER_SUB1_A],
            ['elem-p-header-sub1', ELEM_P_HEADER_SUB1_B],
            ['elem-p-header-sub1a', ELEM_P_HEADER_SUB1_A_SUB],
            ['elem-p-header-sub1b', ELEM_P_HEADER_SUB1_B_SUB],
            ['elem-p-header', ELEM_P_HEADER_HR],
            ['elem-p-header', ELEM_DIV_PROGRESS],
            ['elem-div-progress', ELEM_DIV_PROGRESS_SUB],
            ['elem-p-header', ELEM_P_HEADER_H2]
        ]);

        // Assign "question_screen" variable to true to let us know this is a question screen and not a title screen or end screen:
        question_screen = true;

        // If PAGE_HEADER function receives a truthy argument, then generate QA_SECTION:
        if (QA) QUESTION_SCREEN.QA_SECTION();

        // If DOM elements haven't been cached to variables, do this now:
        if (!elem_h2_ques || !elem_ul_ans) ELEMS_DOM.CACHE();

        // Add DOM events now that question-screen UI elements have been generated and appended:
        ELEMS_DOM.ADD_EVENTS();
    },

    // GENERATE:: Programmatically generate question-screen UI elements:

    GENERATE: () => { QUESTION_SCREEN.PAGE_HEADER(1); }
};
