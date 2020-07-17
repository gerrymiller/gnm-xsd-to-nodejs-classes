/**
 * @module gnm-xsd-to-nodejs-classes - generates one or more node.js class files based on an XML schema (XSD)
 */

'use strict';

const { exec } = require('child_process');
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
    , types  = require('./dataTypes')
/**
 * Exceptions
 */
    , exceptions  = require('./exceptions');    



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
                throw new exceptions.Exception("Cannot specify both schemaURL and schemaFile");
            }
            xmlString = fs.readFileSync(options.schemaFile, {encoding:'utf8', flag:'r'});
        }

        if(util.isEmptyString(xmlString)) {
            throw new exceptions.Exception("Must specify either schemaURL or schemaFile");
        }

        let ns = options.namespaces || {};
        ns.xs = CONST.XML_SCHEMA_NS;

        let doc = new dom().parseFromString(xmlString);

        let schema = {},
            schemaNode,
            result = executeXPathLookup(options, doc, "/xs:schema");
        while(schemaNode = result.iterateNext()) {
            processNode(options, schema, schemaNode);
        }

        console.log(JSON.stringify(schema, null, 2));

        return true;
    }
}

function processNode(options, obj, xmlNode, ignoreAttrs) {
    addAllAttributes(options, obj, xmlNode, ignoreAttrs);

    let preProcessor,
        postProcessor,
        nextIgnoreAttrs,
        node,
        objContext,
        objKey,
        result = executeXPathLookup(options, xmlNode, "child::*");

    while(node = result.iterateNext()) {
        let processorFunc = processors[node.localName];
        if(processorFunc) {
            preProcessor = processorFunc["pre"];
            postProcessor = processorFunc["post"];
            nextIgnoreAttrs = processorFunc["ignoreAttrs"];
        }

        if(preProcessor) {
            objKey = preProcessor(options, obj, node);
            objContext = {};
        }
        else {
            objContext = obj;
        }

        processNode(options, objContext, node, nextIgnoreAttrs);

        if(postProcessor)
            postProcessor(options, objContext, node);

        if(!util.isEmptyString(objKey)) {
            obj[objKey] = objContext;
        }
    }
}

let processors = {
    /**
     * pre          :   pre-processor (returns an objContext)
     * post         :   post-processor
     * ignoreAttrs  :   attributes to ignore
     */
    "element" : {
        "pre" : (options, obj, node) => {
            let name = node.getAttribute("name") || node.getAttribute("ref");
            return name;
        },
        "ignoreAttrs" : [
            "name",
            "ref"
        ]
    },
    "complexType" : {
        "pre" : (options, obj, node) => {
            return "type";
        }
    },
    "extension" : {
        "pre" : (options, obj, node) => {
            // I don't think this works here
            obj["base"] = node.getAttribute("base");
            return "properties";
        },
        "ignoreAttrs" : [
            "base"
        ]
    },
    "attribute" : {
        "pre" : (options, obj, node) => {
            let name = node.getAttribute("ref") || node.getAttribute("name");
            return name;
        },
        "ignoreAttrs" : [
            "name",
            "ref"
        ]
    }
}

function addAllAttributes(options, obj, doc, exceptions) {
    let result = executeXPathLookup(options, doc, "attribute::*");
    let node;
    while(node = result.iterateNext()) {
        if(!exceptions 
            || !Array.isArray(exceptions) 
            || !exceptions.includes(node.localName)) {

                obj[node.localName] = node.nodeValue;
        }
    }
}

function executeXPathLookup(options, doc, query) {
    let ns = options.namespaces || {};
    ns.xs = CONST.XML_SCHEMA_NS;

    return xpath.evaluate(
        query,
        doc,
        {
            lookupNamespaceURI: (prefix) => {
                return ns[prefix] || null;
            }
        },
        xpath.XPathResult.ANY_TYPE,
        null
    );
}