export const required = (value) => {
    return value ? undefined : "Field is required"
};
export const passwordsMatch = (value, allValues) => {
    return value === allValues.password ? undefined : 'Passwords do not match'
};
export const validEmail = (value) => {
    return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? undefined
        : 'Invalid email'
};
export const minLength = (minLength) => (value) => {
    return value.length >= minLength ? undefined : `Minimal length is ${minLength}`
};
export const maxLength = (maxLength) => (value) => {
    return value.length <= maxLength ? undefined : `Maximal length is ${maxLength}`
};