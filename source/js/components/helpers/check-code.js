
/* CHECK_CODE is a function that provides IE fallback for key(press/down) event:
 *****************************************************************************************************************/

const CHECK_CODE = (e) => {
    e = e || window.event;
    return (e.keyCode || e.which);
};
