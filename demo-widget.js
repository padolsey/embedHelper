/* EMBEDHELPER */
/**
 * Copyright (c) 2009 James Padolsey
 * -------------------------------------------------------
 * Dual licensed under the MIT and GPL licenses.
 *    - http://www.opensource.org/licenses/mit-license.php
 *    - http://www.gnu.org/copyleft/gpl.html
 */
var embedHelper=(function(){var a=(function(){var b=document.getElementsByTagName("script");return b[b.length-1]})();return{getConfig:function(g){var b=a.innerHTML,d={},c=Array.prototype.slice.call(arguments);try{d=(new Function("return "+b.replace(/\n|\r/g,"")))()}catch(f){}c.push(d);return this.merge.apply(this,c)},merge:function(g,f){if(typeof g!=="object"){g={}}for(var e in f){if(!f.hasOwnProperty||f.hasOwnProperty(e)){var b=f[e];if(typeof b==="object"){g[e]=this.merge(g[e],b);continue}g[e]=b}}for(var d=2,c=arguments.length;d<c;d++){this.merge(g,arguments[d])}return g},getQueryParams:function(){var g=a.src,c,d,f,e={},b=Array.prototype.slice.call(arguments);if(g.indexOf("?")>-1){c=g.split("?")[1].split("&");d=c.length;while(d--){f=c[d].split("=");e[f[0]]=f[1]}}b.push(e);return this.merge.apply(this,b)},insert:function(e){if(e.nodeName&&!e.length){return a.parentNode.insertBefore(e,a)}if(typeof e==="string"){var c=document.createElement("div");c.innerHTML=e;e=c.childNodes}for(var d=0,b=e.length||0;d<b;++d){this.insert(e[d])}return this},scriptRef:a}})();
/* ----------- */

/* Widget code */

(function(){
    
    var userOptions = embedHelper.getConfig({
        /* Defaults */
        borderColor: '#000',
        width: 300,
        height: 500,
        id: 'widget_123'
    });
    
    var div = document.createElement('div');
    div.id = userOptions.id;
    div.style.width = userOptions.width + 'px';
    div.style.height = userOptions.height + 'px';
    div.style.border = '3px solid ' + userOptions.borderColor;
    div.innerHTML = 'Example 3<sup>rd</sup> party widget!';
    
    embedHelper.insert(div);
    
})();

