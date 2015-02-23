module.exports = {
    /**
     * Normalizes a collection of elements into a native array of elements.
     *
     * @param   {HTMLElement|Array|NodeList|String}     elements    One or more HTMLElements or a CSS selector
     * @return  {HTMLElement}                                       An array of HTMLElements
     */
    'toElementArray' : function(elements) {
        if(typeof elements === 'string') {
            return this.toElementArray(document.querySelector(elements));
        } else if(elements instanceof HTMLElement) {
            return [elements];
        } else {
            return ((elements !== null) && elements.length)
                ? Array.prototype.slice.call(elements)
                : [];
        }
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