
/* FADE_IN is a function that sets elements' opacity to zero and fades to full opacity:
 *****************************************************************************************************************/

const FADE_IN = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        HIDE(arr[i]);
        FADE({ element: arr[i], fadeType: 'fadeIn', fadeSpeed: 0.02 });
    }
};
