/**validates the login input fields
 * @author Mohamed Wael
 * @namespace validateLogin
 * @param {string} values 
 * @returns {string} - the return error message
 */

export default function validateLogin(values) {
    let errors = {};
//email 
    //the string to be more than zero characters 
    // the string to be an email
    if (!values.email) {
    }else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid";
    }
//password
    //more than 12 characters
    if (!values.password) {
        errors.password = " password is required";
    }else if (values.password.length < 3) {
        errors.password = "password needs to be more than 3 characters";
    }
    return errors;
}