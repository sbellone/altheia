# Altheia
A very simple async data validator.


# Introduction
After searching for a long time a simple data validator that allow async validation, I decided to implement one. Heavily inspired from Joi, it aim at being very lightweight, simple to use and obvioulsy allow us to check anything from standard schema to very custom ones.

It aim to be used in models Validation (i.e: for API)


# Example
```javascript
const Alt = require('Alt');

const hasError = await Alt({
    login: Alt.string().min(3).not('admin'),
    email: Alt.string().email().custom((value) => searchDBForAnOccurence())
    eyes: Alt.number().integer().positive().max(2)
}).options({
    required: true,
    unknown: false
}).validate({
    login: 'leela',
    email: 'captain@planetexpress.earth',
    eyes: 1
});

console.log(hasError); // false
```
