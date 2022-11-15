"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/Create",{

/***/ "./pages/Create.js":
/*!*************************!*\
  !*** ./pages/Create.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/src/_sliced_to_array.mjs */ \"./node_modules/@swc/helpers/src/_sliced_to_array.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Navbar */ \"./components/Navbar.js\");\n/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap/Form */ \"./node_modules/react-bootstrap/esm/Form.js\");\n/* harmony import */ var _styles_create_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/create.module.css */ \"./styles/create.module.css\");\n/* harmony import */ var _styles_create_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_create_module_css__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\nvar Create = function() {\n    _s();\n    var ref = (0,_swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(react__WEBPACK_IMPORTED_MODULE_1___default().useState(false), 2), dragActive = ref[0], setDragActive = ref[1];\n    // ref\n    var inputRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);\n    // handle drag events\n    var handleDrag = function handleDrag(e) {\n        e.preventDefault();\n        e.stopPropagation();\n        if (e.type === \"dragenter\" || e.type === \"dragover\") {\n            setDragActive(true);\n        } else if (e.type === \"dragleave\") {\n            setDragActive(false);\n        }\n    };\n    // triggers when file is dropped\n    var handleDrop = function handleDrop(e) {\n        e.preventDefault();\n        e.stopPropagation();\n        // setDragActive(false);\n        if (e.dataTransfer.files && e.dataTransfer.files[0]) {\n        // handleFiles(e.dataTransfer.files);\n        }\n    };\n    // triggers when file is selected with click\n    var handleChange = function handleChange(e) {\n        e.preventDefault();\n        if (e.target.files && e.target.files[0]) {\n        // handleFiles(e.target.files);\n        }\n    };\n    // triggers the input when the button is clicked\n    var onButtonClick = function() {\n        inputRef.current.click();\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_4___default().Create),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        children: \"Create New Item\"\n                    }, void 0, false, {\n                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                        lineNumber: 49,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_4___default().form),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Label, {\n                                        children: \"Name\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 53,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Control, {\n                                        type: \"Name\",\n                                        placeholder: \"Enter Name\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 54,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 52,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Label, {\n                                        children: \"External Link\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 57,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                                        children: \"Yogi's MarketPlace will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 58,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Control, {\n                                        as: \"textarea\",\n                                        placeholder: \"https://yoursite.io/item/123\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 63,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 56,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Label, {\n                                        children: \"Description\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 70,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                                        children: \"Yogi's MarketPlace will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 71,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Control, {\n                                        as: \"textarea\",\n                                        placeholder: \"https://yoursite.io/item/123\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 76,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 69,\n                                columnNumber: 11\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                lineNumber: 48,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true);\n};\n_s(Create, \"q8lZwOPeaGjJCupdpVSFIxAae3c=\");\n_c = Create;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Create);\nvar _c;\n$RefreshReg$(_c, \"Create\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLCtMQUlKOzs7Ozs2Q0FBSztrREFDTCw4REFBQzdCLG9FQUFZO3dDQUNYOEIsRUFBRSxFQUFDLFVBQVU7d0NBQ2JGLFdBQVcsRUFBQyw4QkFBOEI7Ozs7OzZDQUUxQzs7Ozs7O3FDQUNTOzs7Ozs7NkJBQ1I7Ozs7OztxQkFDSDs7b0JBQ0wsQ0FDSDtBQUNKLENBQUM7R0FoRksxQixNQUFNO0FBQU5BLEtBQUFBLE1BQU07QUFrRlosK0RBQWVBLE1BQU0sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9DcmVhdGUuanM/NzEwNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTmF2YmFyIGZyb20gXCIuLi9jb21wb25lbnRzL05hdmJhclwiO1xuaW1wb3J0IEZvcm0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcC9Gb3JtXCI7XG5pbXBvcnQgc3R5bGUgZnJvbSBcIi4uL3N0eWxlcy9jcmVhdGUubW9kdWxlLmNzc1wiO1xuXG5jb25zdCBDcmVhdGUgPSAoKSA9PiB7XG4gIGNvbnN0IFtkcmFnQWN0aXZlLCBzZXREcmFnQWN0aXZlXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgLy8gcmVmXG4gIGNvbnN0IGlucHV0UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuXG4gIC8vIGhhbmRsZSBkcmFnIGV2ZW50c1xuICBjb25zdCBoYW5kbGVEcmFnID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZS50eXBlID09PSBcImRyYWdlbnRlclwiIHx8IGUudHlwZSA9PT0gXCJkcmFnb3ZlclwiKSB7XG4gICAgICBzZXREcmFnQWN0aXZlKHRydWUpO1xuICAgIH0gZWxzZSBpZiAoZS50eXBlID09PSBcImRyYWdsZWF2ZVwiKSB7XG4gICAgICBzZXREcmFnQWN0aXZlKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gdHJpZ2dlcnMgd2hlbiBmaWxlIGlzIGRyb3BwZWRcbiAgY29uc3QgaGFuZGxlRHJvcCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgLy8gc2V0RHJhZ0FjdGl2ZShmYWxzZSk7XG4gICAgaWYgKGUuZGF0YVRyYW5zZmVyLmZpbGVzICYmIGUuZGF0YVRyYW5zZmVyLmZpbGVzWzBdKSB7XG4gICAgICAvLyBoYW5kbGVGaWxlcyhlLmRhdGFUcmFuc2Zlci5maWxlcyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIHRyaWdnZXJzIHdoZW4gZmlsZSBpcyBzZWxlY3RlZCB3aXRoIGNsaWNrXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChlLnRhcmdldC5maWxlcyAmJiBlLnRhcmdldC5maWxlc1swXSkge1xuICAgICAgLy8gaGFuZGxlRmlsZXMoZS50YXJnZXQuZmlsZXMpO1xuICAgIH1cbiAgfTtcblxuICAvLyB0cmlnZ2VycyB0aGUgaW5wdXQgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWRcbiAgY29uc3Qgb25CdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBpbnB1dFJlZi5jdXJyZW50LmNsaWNrKCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPE5hdmJhciAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlLkNyZWF0ZX0+XG4gICAgICAgIDxoMT5DcmVhdGUgTmV3IEl0ZW08L2gxPlxuXG4gICAgICAgIDxGb3JtIGNsYXNzTmFtZT17c3R5bGUuZm9ybX0+XG4gICAgICAgICAgPEZvcm0uR3JvdXA+XG4gICAgICAgICAgICA8Rm9ybS5MYWJlbD5OYW1lPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgPEZvcm0uQ29udHJvbCB0eXBlPVwiTmFtZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgTmFtZVwiIC8+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgIDxGb3JtLkdyb3VwPlxuICAgICAgICAgICAgPEZvcm0uTGFiZWw+RXh0ZXJuYWwgTGluazwvRm9ybS5MYWJlbD5cbiAgICAgICAgICAgIDxoNj5cbiAgICAgICAgICAgICAgWW9naSdzIE1hcmtldFBsYWNlIHdpbGwgaW5jbHVkZSBhIGxpbmsgdG8gdGhpcyBVUkwgb24gdGhpcyBpdGVtJ3NcbiAgICAgICAgICAgICAgZGV0YWlsIHBhZ2UsIHNvIHRoYXQgdXNlcnMgY2FuIGNsaWNrIHRvIGxlYXJuIG1vcmUgYWJvdXQgaXQuIFlvdVxuICAgICAgICAgICAgICBhcmUgd2VsY29tZSB0byBsaW5rIHRvIHlvdXIgb3duIHdlYnBhZ2Ugd2l0aCBtb3JlIGRldGFpbHMuXG4gICAgICAgICAgICA8L2g2PlxuICAgICAgICAgICAgPEZvcm0uQ29udHJvbFxuICAgICAgICAgICAgICBhcz1cInRleHRhcmVhXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJodHRwczovL3lvdXJzaXRlLmlvL2l0ZW0vMTIzXCJcbiAgICAgICAgICAgICAgLy8gcm93cz17M31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgIDxGb3JtLkdyb3VwPlxuICAgICAgICAgICAgPEZvcm0uTGFiZWw+RGVzY3JpcHRpb248L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8aDY+XG4gICAgICAgICAgICAgIFlvZ2kncyBNYXJrZXRQbGFjZSB3aWxsIGluY2x1ZGUgYSBsaW5rIHRvIHRoaXMgVVJMIG9uIHRoaXMgaXRlbSdzXG4gICAgICAgICAgICAgIGRldGFpbCBwYWdlLCBzbyB0aGF0IHVzZXJzIGNhbiBjbGljayB0byBsZWFybiBtb3JlIGFib3V0IGl0LiBZb3VcbiAgICAgICAgICAgICAgYXJlIHdlbGNvbWUgdG8gbGluayB0byB5b3VyIG93biB3ZWJwYWdlIHdpdGggbW9yZSBkZXRhaWxzLlxuICAgICAgICAgICAgPC9oNj5cbiAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgYXM9XCJ0ZXh0YXJlYVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly95b3Vyc2l0ZS5pby9pdGVtLzEyM1wiXG4gICAgICAgICAgICAgIC8vIHJvd3M9ezN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgPC9Gb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDcmVhdGU7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJOYXZiYXIiLCJGb3JtIiwic3R5bGUiLCJDcmVhdGUiLCJ1c2VTdGF0ZSIsImRyYWdBY3RpdmUiLCJzZXREcmFnQWN0aXZlIiwiaW5wdXRSZWYiLCJ1c2VSZWYiLCJoYW5kbGVEcmFnIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwidHlwZSIsImhhbmRsZURyb3AiLCJkYXRhVHJhbnNmZXIiLCJmaWxlcyIsImhhbmRsZUNoYW5nZSIsInRhcmdldCIsIm9uQnV0dG9uQ2xpY2siLCJjdXJyZW50IiwiY2xpY2siLCJkaXYiLCJjbGFzc05hbWUiLCJoMSIsImZvcm0iLCJHcm91cCIsIkxhYmVsIiwiQ29udHJvbCIsInBsYWNlaG9sZGVyIiwiaDYiLCJhcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/Create.js\n"));

/***/ })

});