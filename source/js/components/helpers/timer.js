
/* TIMER is an object with methods for setting and clearing a time interval that outputs the timer UI element:
 *****************************************************************************************************************/

const TIMER = {

    // Set a timer interval and and update elem_div_time's innerHTML to correspond with it:
    SET: () => { s_interval = setInterval(() => { elem_div_time.innerHTML = `${timeCount.seconds++}${LABELS.SEGMENTALS.SECONDS_SHORTHAND}`; }, 1000); },
    
    // Clear timer interval (stop timer):
    CLEAR: () => { if (s_interval) clearInterval(s_interval); }
};
