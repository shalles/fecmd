class Calc {
    constructor() {
        console.log('Calc constructor');
    }
    add(a, b) {
        return a + b;
    }
}

module.exports = Calc;

// usage
// var c = new Calc();
// console.log(c.add(1, 2));