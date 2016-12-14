
/* GENERATE_RESULTS_TABLE is a function for creating, appending and populating the results table at the end-screen:
 *****************************************************************************************************************/

const GENERATE_RESULTS_TABLE = () => {
    const ELEM_TABLE_CONTAINER = CREATE_ELEMENT({ elem: 'div', id: 'table-container', className: 'table-results-container'});
    const ELEM_TABLE = CREATE_ELEMENT({ elem: 'table', className: 'table-results-container' });
    const ELEM_ANSWERS_DIV = CREATE_ELEMENT({ elem: 'div', id: 'answers-div', className: 'elem-answers-div' });
    
    // Populate table header (column titles):
    POPULATE_TABLE_CELLS({ elem: ELEM_TABLE });
    ELEM_TABLE.insertRow(0);
    for (let k = 0; k < 4; k++) ELEM_TABLE.rows[0].insertCell();
    POPULATE_TABLE_HEADER(ELEM_TABLE.rows[0]);
    
    // Append data to elements:
    elem_ul_ans.appendChild(ELEM_ANSWERS_DIV);
    ELEM_ANSWERS_DIV.appendChild(ELEM_TABLE_CONTAINER);
    ELEM_TABLE_CONTAINER.appendChild(ELEM_TABLE);
};
