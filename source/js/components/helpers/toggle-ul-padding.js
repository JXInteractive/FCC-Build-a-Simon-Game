
/* TOGGLE_UL_PADDING is a function that toggles the left padding (paddingLeft) or UL elements:
 *****************************************************************************************************************/

const TOGGLE_UL_PADDING = () => {
    let ul = document.getElementsByTagName('ul');
    
    // If ulPadding is has a truthy value, remove padding from left — if falsy, set padding from left to 40:
    if (ulPadding) for (let i = 0; i < ul.length; i++) ul[i].style.paddingLeft = 0;
    else for (let j = 0; j < ul.length; j++) ul[j].style.paddingLeft = 40;

    // Toggle the boolean value of ulPadding (if currently truthy, make false — if currently falsy, make true):
    ulPadding = !ulPadding;
};
