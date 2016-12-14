
/* RESET is an object with methods for reseting HUD and container values:
 *****************************************************************************************************************/

const RESET = {

    // Reset HUD values (heads-up display and user progress values):
    HUD_VALUES: () => {
        progress = { questionNumber: 0, questionSelected: false, userScore: 0 };
        timeCount = { seconds: 0, minutes: 0 };
        question_screen = false;
    },

    // Reset container by setting its innerHTML to null:
    CONTAINER: () => { document.getElementById('elem-div-sub-container').innerHTML = null; }
};
