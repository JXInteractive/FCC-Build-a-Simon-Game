
/* Variables in which to reference UI elements from DOM:
 *****************************************************************************************************************/

let elem_div_time;
let elem_h2_ques;
let elem_progress_bar;
let elem_ul_ans;
let elem_btn_submit;
let elem_div_feedback;


// allQuestions is an array for storing question set data (populated by a JSON request (QUESTION_SET.LOAD()))
let allQuestions = [];


// Progress values (this may become an object with nested objects later!):
let progress = { questionNumber: 0, questionSelected: false, userScore: 0 };
let question_screen = false;
let s_interval;
let timeCount = { seconds: 0, minutes: 0 };
let ulPadding = true;
