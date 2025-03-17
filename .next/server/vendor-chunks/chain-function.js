"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/chain-function";
exports.ids = ["vendor-chunks/chain-function"];
exports.modules = {

/***/ "(ssr)/./node_modules/chain-function/index.js":
/*!**********************************************!*\
  !*** ./node_modules/chain-function/index.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\nmodule.exports = function chain() {\n    var len = arguments.length;\n    var args = [];\n    for(var i = 0; i < len; i++)args[i] = arguments[i];\n    args = args.filter(function(fn) {\n        return fn != null;\n    });\n    if (args.length === 0) return undefined;\n    if (args.length === 1) return args[0];\n    return args.reduce(function(current, next) {\n        return function chainedFunction() {\n            current.apply(this, arguments);\n            next.apply(this, arguments);\n        };\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvY2hhaW4tZnVuY3Rpb24vaW5kZXguanMiLCJtYXBwaW5ncyI6IjtBQUNBQSxPQUFPQyxPQUFPLEdBQUcsU0FBU0M7SUFDeEIsSUFBSUMsTUFBTUMsVUFBVUMsTUFBTTtJQUMxQixJQUFJQyxPQUFPLEVBQUU7SUFFYixJQUFLLElBQUlDLElBQUksR0FBR0EsSUFBSUosS0FBS0ksSUFDdkJELElBQUksQ0FBQ0MsRUFBRSxHQUFHSCxTQUFTLENBQUNHLEVBQUU7SUFFeEJELE9BQU9BLEtBQUtFLE1BQU0sQ0FBQyxTQUFTQyxFQUFFO1FBQUcsT0FBT0EsTUFBTTtJQUFLO0lBRW5ELElBQUlILEtBQUtELE1BQU0sS0FBSyxHQUFHLE9BQU9LO0lBQzlCLElBQUlKLEtBQUtELE1BQU0sS0FBSyxHQUFHLE9BQU9DLElBQUksQ0FBQyxFQUFFO0lBRXJDLE9BQU9BLEtBQUtLLE1BQU0sQ0FBQyxTQUFTQyxPQUFPLEVBQUVDLElBQUk7UUFDdkMsT0FBTyxTQUFTQztZQUNkRixRQUFRRyxLQUFLLENBQUMsSUFBSSxFQUFFWDtZQUNwQlMsS0FBS0UsS0FBSyxDQUFDLElBQUksRUFBRVg7UUFDbkI7SUFDRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9nLWJyZWVkZXItYXBwLy4vbm9kZV9tb2R1bGVzL2NoYWluLWZ1bmN0aW9uL2luZGV4LmpzP2NhODEiXSwic291cmNlc0NvbnRlbnQiOlsiXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNoYWluKCl7XG4gIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gIHZhciBhcmdzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldXG5cbiAgYXJncyA9IGFyZ3MuZmlsdGVyKGZ1bmN0aW9uKGZuKXsgcmV0dXJuIGZuICE9IG51bGwgfSlcblxuICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSByZXR1cm4gYXJnc1swXVxuXG4gIHJldHVybiBhcmdzLnJlZHVjZShmdW5jdGlvbihjdXJyZW50LCBuZXh0KXtcbiAgICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xuICAgICAgY3VycmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgbmV4dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pXG59XG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImNoYWluIiwibGVuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJncyIsImkiLCJmaWx0ZXIiLCJmbiIsInVuZGVmaW5lZCIsInJlZHVjZSIsImN1cnJlbnQiLCJuZXh0IiwiY2hhaW5lZEZ1bmN0aW9uIiwiYXBwbHkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/chain-function/index.js\n");

/***/ })

};
;