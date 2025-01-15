const calculator = {
    sum: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => (b !== 0 ? a / b : null),
};

describe("Calculator functions", () => {
    test("adds 1 + 2 to equal 3", () => {
        expect(calculator.sum(1, 2)).toBe(3);
    });

    test("adds negative numbers: -1 + -2 to equal -3", () => {
        expect(calculator.sum(-1, -2)).toBe(-3);
    });

    test("subtracts 3 - 2 to equal 1", () => {
        expect(calculator.sub(3, 2)).toBe(1);
    });

    test("subtracts with negatives: -3 - (-2) to equal -1", () => {
        expect(calculator.sub(-3, -2)).toBe(-1);
    });

    test("multiplies 3 * 2 to equal 6", () => {
        expect(calculator.mul(3, 2)).toBe(6);
    });

    test("multiplies with zero: 3 * 0 to equal 0", () => {
        expect(calculator.mul(3, 0)).toBe(0);
    });

    test("divides 6 / 2 to equal 3", () => {
        expect(calculator.div(6, 2)).toBe(3);
    });

    test("divides by 0 to return null", () => {
        expect(calculator.div(6, 0)).toBeNull();
    });

    test("divides negative numbers: -6 / 3 to equal -2", () => {
        expect(calculator.div(-6, 3)).toBe(-2);
    });

    test("divides floats: 7.5 / 2.5 to equal 3", () => {
        expect(calculator.div(7.5, 2.5)).toBe(3);
    });
});
