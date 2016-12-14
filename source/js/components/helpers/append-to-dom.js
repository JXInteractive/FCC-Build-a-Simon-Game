
/* APPEND_TO_DOM is a function that appends an array of elements to DOM elements:
 *****************************************************************************************************************/

const APPEND_TO_DOM = (arr) => { for (var i = 0; i < arr.length; i++) { document.getElementById(arr[i][0]).appendChild(arr[i][1]); } };
