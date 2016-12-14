
/* ALERT_MSG is a function that acts as a workaround for a recurring alert error:
 *****************************************************************************************************************/

const ALERT_MSG = (msg) => { eval(`alert('${msg}')`); };
