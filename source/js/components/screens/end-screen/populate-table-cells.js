
/* POPULATE_TABLE_CELLS is a function that populate table header (row titles) for feedback at end screen:
 *****************************************************************************************************************/

const POPULATE_TABLE_CELLS = (o) => {
    for (let i = 0; i < allQuestions.length; i++) {
        o.elem.insertRow();
        for (let j = 0; j < 4; j++) o.elem.rows[i].insertCell();

        // Populate table cells with questions, answers and feedback:
        POPULATE_CELLS(o.elem.rows[i].cells, [`${i + 1}. ${allQuestions[i].question}`, allQuestions[i].choices[allQuestions[i].userAnswer],
            allQuestions[i].choices[allQuestions[i].answer], allQuestions[i].correct]);
    }
};
