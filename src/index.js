/**
 * @module gnm-xsd-to-nodejs-classes - generates one or more node.js class files based on an XML schema (XSD)
 */

'use strict';

const { start } = require('repl');

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
    , util   = require('./util')
/**
 * For reading an XSD file
 */
    , fs     = require('fs')
/**
 * XSD data types
 */
    , types  = require('./dataTypes');
;


/**
 * @typedef {Object} processSchema~options
 * @property {string} schemaURL - optional URL to the XSD (cannot be specified with schemaFile - one must be specified)
 * @property {string} schemaFile - optional Filename of the XSD (cannot be specified with schemaURL - one must be specified)
 * @property {Object} namespaces - optional Object containing additional namespaces with prefixes to be expected in the XSD
 */

module.exports = {
    /**
     * Processes one or more XSD files to generate node.js classes
     * @param {processSchema~options} options - configures how the processSchema function operates
     * @returns {Promise} - a Promise that will resolve to a boolean indicating success
     */
    processSchema : async function( options ) {
        // Read the XML schema from either a URL or specified file 
        let xmlString;

        if(!util.isEmptyString(options['schemaURL'])) {
            // TODO: read schema from URL
        }

        if(!util.isEmptyString(options['schemaFile'])) {
            if(!util.isEmptyString(xmlString)) {
                throw "Cannot specify both schemaURL and schemaFile";
            }
            xmlString = fs.readFileSync(options.schemaFile, {encoding:'utf8', flag:'r'});
        }

        if(util.isEmptyString(xmlString)) {
            throw "Must specify either schemaURL or schemaFile";
        }

        let ns = options.namespaces || {};
        ns.xs = CONST.XML_SCHEMA_NS;

        let doc = new dom().parseFromString(xmlString);
        let result = xpath.evaluate(
            "/xs:schema/xs:element",
            doc,
            {
                lookupNamespaceURI: (prefix) => {
                    return ns[prefix] || null;
                }
            },
            xpath.XPathResult.ANY_TYPE,
            null
        );

        let classes = {};
        let node = result.iterateNext();
        while(node) {
            // Get the node's "name" attribute
            let name = node.getAttribute("name");
            let type = util.stripXMLNamespace(node.getAttribute("type"));
            if(util.isEmptyString(type)) {
                // TODO: iterate over complex type and create an object (recursive)
                type = parseComplexType(node, []);
            }
            classes[name] = {
                "type" : type
            };

            // See if it has a "type" attribute

            node = result.iterateNext();
        }

        console.log(classes);

        return true;
    }
}

function parseComplexType(startingNode, arr) {
    // TODO: make iterative and use XPath
    for(let i = 0; i < startingNode.childNodes.length; i++) {
        let node = startingNode.childNodes[i];
        if("complexType" === node.localName) {
            for(let j = 0; j < node.childNodes.length; j++) {
                let seqNode = node.childNodes[j];
                if("sequence" === seqNode.localName) {
                    for(let k = 0; k < seqNode.childNodes.length; k++) {
                        let element = seqNode.childNodes[k];
                        if("element" === element.localName) {
                            let ref = element.getAttribute("ref");
                            if(!util.isEmptyString(ref)) {
                                arr.push(ref);
                            }
                        }
                    }
                }
            }
        }
    }
    return arr;
}