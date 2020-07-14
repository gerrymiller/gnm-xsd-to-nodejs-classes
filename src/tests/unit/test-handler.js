'use strict';

const { expect } = require('chai')
    , CONST =  require('../../const')
    , app   =  require('../../index');

describe('Test the entire library', async () => {
    const currentNodeEnv = process.env.NODE_ENV;

    before( async () => {
        process.env.NODE_TEST = CONST.NODE_TEST;
    });

    after( async () => {
        process.env.NODE_TEST = currentNodeEnv;
    });

    beforeEach( async () => {

    });

    afterEach( async () => {

    });

    it('reads an xsd', async () => {
        app.processSchema({
            schemaFile: `${__dirname}/test.xsd`
        });
    });
});