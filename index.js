module.exports = {
    /**
     * Normalizes a collection of elements into a native array of elements.
     *
     * @param   {HTMLElement|Array|NodeList|String}     elements    One or more HTMLElements or a CSS/xpath selector
     * @param   {Boolean}                               isXpath     Evaluate the elements selector as xpath
     * @return  {HTMLElement}                                       An array of HTMLElements
     */
    'toElementArray' : function(elements, isXpath) {
        if(typeof elements === 'string') {
            if (!isXpath) {
                return this.toElementArray(document.querySelectorAll(elements));
            }

            var nodes = [],
                iterator = document.evaluate(elements, document.body),
                node = iterator.iterateNext();

            while (node) {
              nodes.push(node);
              node = iterator.iterateNext();
            }

            return this.toElementArray(nodes);
        } else if(elements instanceof HTMLElement) {
            return [elements];
        } else {
            if (elements === null || !elements.length) {
                return [];
            }

            return Array.prototype.slice.call(elements);
        }
    },

    /**
     * Finds ancestor elements of a given node.
     *
     * @param   {HTMLElement}   element     An HTMLElement
     * @param   {Integer|Null}  limit       The number of ancestor elements to return, or NULL to return all
     * @return  {Array}         The ancestor node, or null if no common ancestor could be found
     */
    'getAncestry' : function(element, limit) {
        var ancestry = [];

        while((element = element.parentElement) && (!limit || (ancestry.length < limit))) {
            ancestry.push(element);
        }

        return ancestry;
    },

    /**
     * Given a list of nodes, finds the common ancestor element.
     *
     * @param   {HTMLElement|Array|NodeList|String}     elements    One or more HTMLElements or a CSS selector
     * @return  {HTMLElement|Null}                                  The ancestor node, or null if no common ancestor could be found
     */
    'getCommonAncestor' : function(elements) {
        elements = this.toElementArray(elements);

        var first = elements[0],
            rest  = elements.slice(1);

        while(first) {
            if(rest.every(function(other) {
                return first.contains(other);
            })) {
                return first;
            }

            first = first.parentElement;
        }

        return null;
    }
};
