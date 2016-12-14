
/* QUESTION_SET is an object with methods that load JSON data from an external source and call a function.
   There's also functions for clearing and loading JSON data from the array the data will be stored in.
 *****************************************************************************************************************/

const QUESTION_SET = {

    // LOAD:: Send a request to an external JSON file. If successful, call a function within argument object:

    LOAD: (o) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(this.response);

                // Function within argument object will write the question set (retrieved data) to an array:
                o.func(response);
            }
        };
        xhttp.open('GET', o.src, true);
        xhttp.send();
    },

    // CLEAR:: Clear the array of the question set (retrived data):

    CLEAR: () => { allQuestions = []; },

    // RESET:: Reset the question set (retrived data) array:

    RESET: (o) => {
        QUESTION_SET.CLEAR();
        QUESTION_SET.LOAD(o);
    }
};
