/**
 * helper function,
 * validating the input fields,
 * in order to check for required, patterns, etc.
 *
 * @param value value of nameInput
 * @param type type of validation ('required', ...)
 * @returns boolean
 */
export function validateRequiredInput(value, type) {
    switch (type) {
        case 'required':
            return (value.length === 0) ? false : true
        default:
            return true
    }
}
