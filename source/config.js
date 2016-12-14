
/* QUESTION_JSON_SOURCE is the external source (JSON document) in which to source questions and answers:
 *****************************************************************************************************************/

const QUESTION_JSON_SOURCE = 
'https://dl.dropboxusercontent.com/u/7797721/apps/quiz-app/questions.json';

/*  ^^^ YOUR QUESTIONS HERE ^^^^ 
        Just paste in a URL
        to a JSON file!*/


/* LABELS is an object containing UI element values and feedback text — used through the app:
 *****************************************************************************************************************/

const LABELS = {
    UI: {
        ALERT_SELECT_ANSWER: 'Please select an answer to proceed',
        RETRY: `Back to Menu ${SYMBOLS.ICONS.STEP_FORWARD}`,
        RESTART: 'Restart',
        SETTINGS: `${SYMBOLS.ICONS.COG} Settings`,
        START_QUIZ: `${SYMBOLS.ICONS.PLAY_CIRCLE} Start Quiz`,
        SUBMIT: `Submit ${SYMBOLS.ICONS.STEP_FORWARD}`
    },

    TITLE: {
        TITLE_SCREEN_TITLE: 'General Knowledge Quiz',
        TITLE_SCREEN_SUBTITLE: 'By John Martin',
        FOOTER: `John Martin ${ new Date().getFullYear() }`
    },

    FEEDBACK: {
        ALL_DONE: 'All done',
        AMAZING: 'Amazing',
        COMPLETE: 'Complete',
        CORRECT_FEEDBACK: 'Correct',
        FINISHED_IN: 'Finished in',
        TOO_BAD: 'Too bad',
        VERY_GOOD: 'Very good',
        WELL_DONE: 'Well done',
        YOU_CORRECT: 'Correct',
        YOU_FEEBDACK: 'You said',
        YOU_SCORED: 'You scored',
        REVIEW_ANSWERS: 'Review your answers'
    },

    SEGMENTALS: {
        DIVIDER: '/',
        FEEDBACK_POSTFIX: '!',
        PERCENTAGE: '%',
        QUESTION_SHORTHAND: 'Q',
        SECONDS_SHORTHAND: 's',
        SEGMENTAL: ':',
        SECONDS: 'seconds',
        OF: 'of',
    }
};


/* CONFIG is an object in which various settings are determined:
 *****************************************************************************************************************/

const CONFIG = {
    SCORES: {
        range: [
            { low: 95, high: 100, feedback: `${LABELS.FEEDBACK.AMAZING}${LABELS.SEGMENTALS.FEEDBACK_POSTFIX}` },
            { low: 90, high: 94, feedback: `${LABELS.FEEDBACK.WELL_DONE}${LABELS.SEGMENTALS.FEEDBACK_POSTFIX}` },
            { low: 70, high: 89, feedback: `${LABELS.FEEDBACK.VERY_GOOD}${LABELS.SEGMENTALS.FEEDBACK_POSTFIX}` },
            { low: 50, high: 69, feedback: `${LABELS.FEEDBACK.ALL_DONE}${LABELS.SEGMENTALS.FEEDBACK_POSTFIX}` },
            { low: 0, high: 49, feedback: `${LABELS.FEEDBACK.TOO_BAD}${LABELS.SEGMENTALS.FEEDBACK_POSTFIX}` }
        ],
        default: `${LABELS.COMPLETE}${LABELS.SEGMENTALS.FEEDBACK_POSTFIX}`
    },
    ANIMATIONS: { FADES_ENABLED: true }
};
