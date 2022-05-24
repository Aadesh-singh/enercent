/**
 * 
 * @param {string} placeholder field name
 * @returns string
 */
const emptyMsg = (placeholder) => {
  return `${placeholder}  field cannot be empty`
};

const requiredMsg = (placeholder) => {
  return `${placeholder}  is required`
};

module.exports = { emptyMsg, requiredMsg };
