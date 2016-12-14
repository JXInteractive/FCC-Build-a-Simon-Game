
/* CREATE_ELEMENT is a function for creating an element:
 *****************************************************************************************************************/

const CREATE_ELEMENT = (o) => {
	let elem = document.createElement(o.elem);
    if (o.id) elem.id = o.id;
    if (o.type) elem.type = o.type;
    if (o.name) elem.name = o.name;
    if (o.role) elem.role = o.role;
    if (o.ariaValuenow) elem['aria-valuenow'] = o.ariaValuenow;
    if (o.ariaValueMin) elem['aria-valuemin'] = o.ariaValueMin;
    if (o.ariaValueMax) elem['aria-valuemax'] = o.ariaValueMax;
    if (o.className) elem.className = o.className;
    if (o.style) elem.style = o.style;
    return elem;
};
