export const removingWhiteSpaces = (value: string) => value.split(' ').join('');

export const addingWhiteSpaces = (value: string) => {
    const onlyDigitsAndWhiteSpaces = /[^0-9\s]/;
    if (onlyDigitsAndWhiteSpaces.test(value)) {
        return value;
    }

    value = String(value);
    value = removingWhiteSpaces(value);
    let reversedValues = value.split('').reverse();
    reversedValues.length > 3 && reversedValues.splice(3, 0, ' ');
    reversedValues.length > 7 && reversedValues.splice(7, 0, ' ');
    reversedValues.length > 11 && reversedValues.splice(11, 0, ' ');
    reversedValues.length > 15 && reversedValues.splice(15, 0, ' ');
    reversedValues.length > 19 && reversedValues.splice(19, 0, ' ');
    value = reversedValues.reverse().join('');
    return value;
}
