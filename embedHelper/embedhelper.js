/**
 * embedHelper
 * Copyright (c) 2009 James Padolsey
 * -------------------------------------------------------
 * Dual licensed under the MIT and GPL licenses.
 *    - http://www.opensource.org/licenses/mit-license.php
 *    - http://www.gnu.org/copyleft/gpl.html
 * -------------------------------------------------------
 * Version: 0.1
 */

var embedHelper = (function(){
    
    var SCRIPT = (function(){
        var domScripts = document.getElementsByTagName('script');
        return domScripts[ domScripts.length - 1 ];
    })();
    
    return {
        getConfig: function(defaults) {
            
            /* getConfig() will return the JSON config within
               the SCRIPT element - it can also merge this
               with any defaults specified */
            
            var inner = SCRIPT.innerHTML,
                config = {},
                args = Array.prototype.slice.call(arguments);
                
            try {
                config = (new Function('return ' + inner.replace(/\n|\r/g, '')))();
            } catch(e) { /* Invalid config */ }
            
            args.push(config);
            
            return this.merge.apply(this, args);
        
        },
        merge: function(target, source) {
            
            /* Merges two (or more) objects,
               giving the last one precedence */
            
            if ( typeof target !== 'object' ) { target = {}; }
            
            for (var property in source) {
                
                if ( !source.hasOwnProperty || source.hasOwnProperty(property) ) {
                    
                    var sourceProperty = source[ property ];
                    
                    if ( typeof sourceProperty === 'object' ) {
                        target[ property ] = this.merge( target[ property ], sourceProperty );
                        continue;
                    }
                    
                    target[ property ] = sourceProperty;
                    
                }
                
            }
            
            for (var a = 2, l = arguments.length; a < l; a++) {
                this.merge(target, arguments[a]);
            }
            
            return target;
        },
        getQueryParams: function() {
            
            /* Retrieves any query parameters used in the 'src'
               attribute of the SCRIPT */
            
            var src = SCRIPT.src,
                queryParts,
                qIndex,
                qSplit,
                params = {},
                args = Array.prototype.slice.call(arguments);
                
            if (src.indexOf('?') > -1) {
                
                queryParts = src.split('?')[1].split('&');
                qIndex = queryParts.length;
                
                while (qIndex--) {
                    qSplit = queryParts[qIndex].split('=');
                    params[ qSplit[0] ] = qSplit[1];
                }
                
            }
            
            args.push(params);
            
            return this.merge.apply(this, args);
            
        },
        insert: function(item){
            if (item.nodeName && !item.length) {
                return SCRIPT.parentNode.insertBefore( item, SCRIPT );
            }
            if (typeof item === 'string') {
                var temp = document.createElement('div');
                temp.innerHTML = item;
                item = temp.childNodes;
            }
            for (var i = 0, l = item.length || 0; i < l; ++i) {
                this.insert(item[i]);
            }
            return this;
        },
        scriptRef: SCRIPT
    };
    
})(); 