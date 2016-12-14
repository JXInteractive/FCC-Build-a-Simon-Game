
/* GENERATE_FEEDBACK_MESSAGE determines which feedback message to show depending on user score:
 *****************************************************************************************************************/

const GENERATE_FEEDBACK_MESSAGE = (percent) => {
    let feedbackMsg = null;

    // Switch statement sets feedbackMsg (variable this function will return) to a feedback message depending on user score:
    switch (true) {
        case (percent >= CONFIG.SCORES.range[0].low && percent <= CONFIG.SCORES.range[0].high):
            feedbackMsg = CONFIG.SCORES.range[0].feedback;
            break;
        case (percent >= CONFIG.SCORES.range[1].low && percent <= CONFIG.SCORES.range[1].high):
            feedbackMsg = CONFIG.SCORES.range[1].feedback;
            break;
        case (percent >= CONFIG.SCORES.range[2].low && percent <= CONFIG.SCORES.range[2].high):
            feedbackMsg = CONFIG.SCORES.range[2].feedback;
            break;
        case (percent >= CONFIG.SCORES.range[3].low && percent <= CONFIG.SCORES.range[3].high):
            feedbackMsg = CONFIG.SCORES.range[3].feedback;
            break;
        case (percent >= CONFIG.SCORES.range[4].low && percent <= CONFIG.SCORES.range[4].high):
            feedbackMsg = CONFIG.SCORES.range[4].feedback;
            break;
        default:
            feedbackMsg = CONFIG.SCORES.default;
            break;
    }
    return feedbackMsg;
};
