
/* (  ) POPULATE_CELLS is a function for populating table cells on the results table of the end-screen:
 *****************************************************************************************************************/

const POPULATE_CELLS = (cellArr, valArr) => { for (let i = 0; i < cellArr.length; i++) cellArr[i].innerHTML = valArr[i]; };

