
/* ELEMS_DOM is an object with methods for caching elements from DOM to variables, clearing innerHTML values
   and adding events to elements:
 *****************************************************************************************************************/

const ELEMS_DOM = {

    // Cache DOM elements to variables:
    CACHE: () => {
        elem_h2_ques = document.getElementById('elem-h2-ques');
        elem_ul_ans = document.getElementById('elem-ul-ans');
        elem_progress_bar = document.getElementById('elem-progress-bar');
        elem_div_time = document.getElementById('elem-div-time');
        elem_div_feedback = document.getElementById('elem-div-feedback');
        elem_btn_submit = document.getElementById('elem-btn-submit');
    },

    // Clear innerHTML value of elements:
    CLEAR: () => {
        elem_h2_ques.innerHTML = null;
        elem_ul_ans.innerHTML = null;
    },

    // Add events to elements:
    ADD_EVENTS: () => {
        elem_ul_ans.onclick = (e) => { if (question_screen) e.target.children[0].checked = 1; };
        window.onkeydown = (e) => { if (CHECK_CODE(e) === 13 && elem_btn_submit) elem_btn_submit.click(); };
    }
};
