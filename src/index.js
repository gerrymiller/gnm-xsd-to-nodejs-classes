/**
 * @module gnm-xsd-to-nodejs-classes - generates one or more node.js class files based on an XML schema (XSD)
 */

'use strict';

/**
 * Reference to the CONSTANTS module
 */
const CONST = require('./const')
/**
 * Used for XPath queries into the XML XSD schema file
 */
    , xpath = require('xpath')
/**
 * Required to parse XML DOC of the XSD
 */
    , dom   = require('xmldom').DOMParser
/**
 * Utilities module
 */
    , util   = require('./util');


/**
 * @typedef {Object} processSchema~options
 * @property {string} schemaURL - optional URL to the XSD (cannot be specified with schemaFile - one must be specified)
 * @property {string} schemaFile - optional Filename of the XSD (cannot be specified with schemaURL - one must be specified)
 */

module.exports = {
    /**
     * Processes one or more XSD files to generate node.js classes
     * @param {processSchema~options} options - configures how the processSchema function operates
     * @returns {Promise} - a Promise that will resolve to a boolean indicating success
     */
    processSchema : async function( options ) {
        // Read the XML schema from either a URL or specified file 
        let xmlStr;

        if(options.hasOwnProperty('schemaURL') && !util.isEmptyString(options.schemaURL)) {
            // TODO: read schema from URL
        }

        if(options.hasOwnProperty('schemaFile') && !util.isEmptyString(options.schemaFile)) {
            if(!util.isEmptyString(xmlStr)) {                
                throw "Cannot specify both schemaURL and schemaFile";
            }
            // TODO: read schema from File
        }

        if(util.isEmptyString(xmlStr)) {
            throw "Must specify either schemaURL or schemaFile";
        }

        const expr = xpath.useNamespaces({
            "xs": CONST.XML_SCHEMA_NS
        });

        let doc = new dom().parseFromString(xmlString);

        return true;
    }
}