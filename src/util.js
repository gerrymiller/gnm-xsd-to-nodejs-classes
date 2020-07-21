/**
 * @module util - a set of utilities used throughout the project
 */

'use strict';

module.exports = {
    /**
     * Returns true if the passed in parameter isn't a non-empty String
     * @param {String} x - a (presumably) non-empty String
     * @returns {Boolean} - true if the passed in parameter is anything but a non-empty String
     */
    isEmptyString : (x) => {
        return (
            (typeof x != 'string')
                        ||
            (x == null)
                        ||
            (x == false)  //same as: !x
                        ||
            (x.length == 0)
                        ||
            (x == "")
                        ||
            (x.replace(/\s/g,"") == "")
                        ||
            (!/[^\s]/.test(x))
                        ||
            (/^\s*$/.test(x))
        );
    },

    /**
     * Returns a string with the XML namespace stripped off
     * @param {String} x - a (presumably) non-empty String
     * @returns {String} - x without any XML namespace prefix
     */
    stripXMLNamespace : (x) => {
        return x.substr(x.lastIndexOf(":") + 1);
    },

    /**
     * Counts the number of XML siblings of a given set of node types
     * @param {String} node - an XML node
     * @param {number || array of numbers} types - a set of nodetypes to filter on
     * @returns {number} - the total number of siblings matching the specified types, inclusive of node
     */
    countSiblingNodes : (node, types) => {
        let count = 0;

        for(let i = 0; i < node.parentNode.childNodes.length; i++) {
            if((Array.isArray(types) 
                && types.includes(node.parentNode.childNodes[i].nodeType))
                || node.parentNode.childNodes[i].nodeType === types) {

                    count++;
            }
        }

        return count;
    }
};