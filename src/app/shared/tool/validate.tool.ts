// It is still in experiment.
export function validate(a, b, condition): boolean {
    switch (condition) {
        case '>':
            return a > b;
        case '>=':
            return (a > b || a == b);
        case '==':
            return a == b;
        case '===':
            return a === b;
        case '!=':
            return a != b;
        case '!==':
            return a !== b;
        case '<':
            return a < b;
        case '<=':
            return (a < b || a == b);
        case '&&':
            return a && b;
        case '||':
            return a || b;
        case 'indexOf': // for array
            return a.indexOf(b) > -1;
        default:
            return true;
    }
}