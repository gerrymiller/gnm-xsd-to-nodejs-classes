'use strict';

class Exception {
    constructor(errString) {
        this._errString = errString;
    }

    get errString() {
        return this._errString;
    }

    set errString(errString) {
        this._errString = errString;
    }

    toString() {
        return this._errString;
    }
}