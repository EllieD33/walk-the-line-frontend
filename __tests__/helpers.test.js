import { capitaliseFirstLetter } from "../src/utils/helpers";

describe('capitaliseFirstLetter', () => {
    test('should return empty string if pass an empty string', () => {
        expect(capitaliseFirstLetter('')).toBe('');
    });
    test('should return captialised letter when passed single lowercase letter', () => {
        expect(capitaliseFirstLetter('a')).toBe('A');
    });
    test('should return string with first letter captialised', () => {
        expect(capitaliseFirstLetter('hello')).toBe('Hello');
    });
    test('should handle string where first letter is already captialised', () => {
        expect(capitaliseFirstLetter('Hello')).toBe('Hello');
    });
});