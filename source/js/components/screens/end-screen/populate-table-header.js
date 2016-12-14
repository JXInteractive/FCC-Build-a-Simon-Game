
/* POPULATE_TABLE_HEADER is a function for populating the cells (innerHTML values) of the results table header:
 *****************************************************************************************************************/

const POPULATE_TABLE_HEADER = (row) => {
    row.cells[0].innerHTML = null;
    row.cells[1].innerHTML = `${LABELS.FEEDBACK.YOU_FEEBDACK}${LABELS.SEGMENTALS.SEGMENTAL}`;
    row.cells[2].innerHTML = `${LABELS.FEEDBACK.YOU_CORRECT}${LABELS.SEGMENTALS.SEGMENTAL}`;
    row.cells[3].innerHTML = null;
    row.cells[3].style.textAlign = 'center';
};
