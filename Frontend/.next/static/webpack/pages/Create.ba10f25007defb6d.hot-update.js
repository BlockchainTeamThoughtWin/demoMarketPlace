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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/src/_sliced_to_array.mjs */ \"./node_modules/@swc/helpers/src/_sliced_to_array.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Navbar */ \"./components/Navbar.js\");\n/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap/Form */ \"./node_modules/react-bootstrap/esm/Form.js\");\n/* harmony import */ var _styles_create_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/create.module.css */ \"./styles/create.module.css\");\n/* harmony import */ var _styles_create_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_create_module_css__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nvar Create = function() {\n    _s();\n    var ref = (0,_swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(react__WEBPACK_IMPORTED_MODULE_1___default().useState(false), 2), dragActive = ref[0], setDragActive = ref[1];\n    // ref\n    var inputRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);\n    // handle drag events\n    var handleDrag = function handleDrag(e) {\n        e.preventDefault();\n        e.stopPropagation();\n        if (e.type === \"dragenter\" || e.type === \"dragover\") {\n            setDragActive(true);\n        } else if (e.type === \"dragleave\") {\n            setDragActive(false);\n        }\n    };\n    // triggers when file is dropped\n    var handleDrop = function handleDrop(e) {\n        e.preventDefault();\n        e.stopPropagation();\n        // setDragActive(false);\n        if (e.dataTransfer.files && e.dataTransfer.files[0]) {\n        // handleFiles(e.dataTransfer.files);\n        }\n    };\n    // triggers when file is selected with click\n    var handleChange = function handleChange(e) {\n        e.preventDefault();\n        if (e.target.files && e.target.files[0]) {\n        // handleFiles(e.target.files);\n        }\n    };\n    // triggers the input when the button is clicked\n    var onButtonClick = function() {\n        inputRef.current.click();\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                lineNumber: 48,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_4___default().Create),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        children: \"Create New Item\"\n                    }, void 0, false, {\n                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_4___default().form),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Label, {\n                                        children: \"Name\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 54,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Control, {\n                                        type: \"Name\",\n                                        placeholder: \"Enter Name\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 55,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 53,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Label, {\n                                        children: \"External Link\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 58,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                                        children: \"Yogi's MarketPlace will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 59,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Control, {\n                                        as: \"textarea\",\n                                        placeholder: \"https://yoursite.io/item/123\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 64,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 57,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Label, {\n                                        children: \"Description\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 71,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                                        children: \"The description will be included on the item's detail page underneath its image. Markdown syntax is supported.\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 72,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Control, {\n                                        as: \"textarea\",\n                                        placeholder: \"Provide Detailed Discription of Your Item\",\n                                        rows: 4\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 76,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 70,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Label, {\n                                        children: \"Collection\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 84,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                                        children: \"This is the collection where your item will appear.\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 85,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Control, {}, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 86,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 83,\n                                columnNumber: 11\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true);\n};\n_s(Create, \"q8lZwOPeaGjJCupdpVSFIxAae3c=\");\n_c = Create;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Create);\nvar _c;\n$RefreshReg$(_c, \"Create\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUU7a0RBQUMsZ0hBR0o7Ozs7OzZDQUFLO2tEQUNMLDhEQUFDOUIsb0VBQVk7d0NBQ1grQixFQUFFLEVBQUMsVUFBVTt3Q0FDYkYsV0FBVyxFQUFDLDJDQUEyQzt3Q0FDdkRHLElBQUksRUFBRSxDQUFDOzs7Ozs2Q0FDUDs7Ozs7O3FDQUNTOzBDQUViLDhEQUFDaEMsa0VBQVU7O2tEQUNULDhEQUFDQSxrRUFBVTtrREFBQyxZQUFVOzs7Ozs2Q0FBYTtrREFDbkMsOERBQUM4QixJQUFFO2tEQUFDLHFEQUFtRDs7Ozs7NkNBQUs7a0RBQzVELDhEQUFDOUIsb0VBQVk7Ozs7NkNBQUc7Ozs7OztxQ0FDTDs7Ozs7OzZCQUNSOzs7Ozs7cUJBQ0g7O29CQUNMLENBQ0g7QUFDSixDQUFDO0dBckZLRyxNQUFNO0FBQU5BLEtBQUFBLE1BQU07QUF1RlosK0RBQWVBLE1BQU0sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9DcmVhdGUuanM/NzEwNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTmF2YmFyIGZyb20gXCIuLi9jb21wb25lbnRzL05hdmJhclwiO1xuaW1wb3J0IEZvcm0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcC9Gb3JtXCI7XG5pbXBvcnQgc3R5bGUgZnJvbSBcIi4uL3N0eWxlcy9jcmVhdGUubW9kdWxlLmNzc1wiO1xuaW1wb3J0IERyb3Bkb3duIGZyb20gXCJyZWFjdC1ib290c3RyYXAvRHJvcGRvd25cIjtcblxuY29uc3QgQ3JlYXRlID0gKCkgPT4ge1xuICBjb25zdCBbZHJhZ0FjdGl2ZSwgc2V0RHJhZ0FjdGl2ZV0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIC8vIHJlZlxuICBjb25zdCBpbnB1dFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcblxuICAvLyBoYW5kbGUgZHJhZyBldmVudHNcbiAgY29uc3QgaGFuZGxlRHJhZyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKGUudHlwZSA9PT0gXCJkcmFnZW50ZXJcIiB8fCBlLnR5cGUgPT09IFwiZHJhZ292ZXJcIikge1xuICAgICAgc2V0RHJhZ0FjdGl2ZSh0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gXCJkcmFnbGVhdmVcIikge1xuICAgICAgc2V0RHJhZ0FjdGl2ZShmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIHRyaWdnZXJzIHdoZW4gZmlsZSBpcyBkcm9wcGVkXG4gIGNvbnN0IGhhbmRsZURyb3AgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIC8vIHNldERyYWdBY3RpdmUoZmFsc2UpO1xuICAgIGlmIChlLmRhdGFUcmFuc2Zlci5maWxlcyAmJiBlLmRhdGFUcmFuc2Zlci5maWxlc1swXSkge1xuICAgICAgLy8gaGFuZGxlRmlsZXMoZS5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuICAgIH1cbiAgfTtcblxuICAvLyB0cmlnZ2VycyB3aGVuIGZpbGUgaXMgc2VsZWN0ZWQgd2l0aCBjbGlja1xuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoZS50YXJnZXQuZmlsZXMgJiYgZS50YXJnZXQuZmlsZXNbMF0pIHtcbiAgICAgIC8vIGhhbmRsZUZpbGVzKGUudGFyZ2V0LmZpbGVzKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gdHJpZ2dlcnMgdGhlIGlucHV0IHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkXG4gIGNvbnN0IG9uQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgaW5wdXRSZWYuY3VycmVudC5jbGljaygpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxOYXZiYXIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZS5DcmVhdGV9PlxuICAgICAgICA8aDE+Q3JlYXRlIE5ldyBJdGVtPC9oMT5cblxuICAgICAgICA8Rm9ybSBjbGFzc05hbWU9e3N0eWxlLmZvcm19PlxuICAgICAgICAgIDxGb3JtLkdyb3VwPlxuICAgICAgICAgICAgPEZvcm0uTGFiZWw+TmFtZTwvRm9ybS5MYWJlbD5cbiAgICAgICAgICAgIDxGb3JtLkNvbnRyb2wgdHlwZT1cIk5hbWVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIE5hbWVcIiAvPlxuICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgICA8Rm9ybS5Hcm91cD5cbiAgICAgICAgICAgIDxGb3JtLkxhYmVsPkV4dGVybmFsIExpbms8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8aDY+XG4gICAgICAgICAgICAgIFlvZ2kncyBNYXJrZXRQbGFjZSB3aWxsIGluY2x1ZGUgYSBsaW5rIHRvIHRoaXMgVVJMIG9uIHRoaXMgaXRlbSdzXG4gICAgICAgICAgICAgIGRldGFpbCBwYWdlLCBzbyB0aGF0IHVzZXJzIGNhbiBjbGljayB0byBsZWFybiBtb3JlIGFib3V0IGl0LiBZb3VcbiAgICAgICAgICAgICAgYXJlIHdlbGNvbWUgdG8gbGluayB0byB5b3VyIG93biB3ZWJwYWdlIHdpdGggbW9yZSBkZXRhaWxzLlxuICAgICAgICAgICAgPC9oNj5cbiAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgYXM9XCJ0ZXh0YXJlYVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly95b3Vyc2l0ZS5pby9pdGVtLzEyM1wiXG4gICAgICAgICAgICAgIC8vIHJvd3M9ezN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgICA8Rm9ybS5Hcm91cD5cbiAgICAgICAgICAgIDxGb3JtLkxhYmVsPkRlc2NyaXB0aW9uPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgPGg2PlxuICAgICAgICAgICAgICBUaGUgZGVzY3JpcHRpb24gd2lsbCBiZSBpbmNsdWRlZCBvbiB0aGUgaXRlbSdzIGRldGFpbCBwYWdlXG4gICAgICAgICAgICAgIHVuZGVybmVhdGggaXRzIGltYWdlLiBNYXJrZG93biBzeW50YXggaXMgc3VwcG9ydGVkLlxuICAgICAgICAgICAgPC9oNj5cbiAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgYXM9XCJ0ZXh0YXJlYVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUHJvdmlkZSBEZXRhaWxlZCBEaXNjcmlwdGlvbiBvZiBZb3VyIEl0ZW1cIlxuICAgICAgICAgICAgICByb3dzPXs0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG5cbiAgICAgICAgICA8Rm9ybS5Hcm91cD5cbiAgICAgICAgICAgIDxGb3JtLkxhYmVsPkNvbGxlY3Rpb248L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8aDY+VGhpcyBpcyB0aGUgY29sbGVjdGlvbiB3aGVyZSB5b3VyIGl0ZW0gd2lsbCBhcHBlYXIuPC9oNj5cbiAgICAgICAgICAgIDxGb3JtLkNvbnRyb2wgLz5cbiAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgIDwvRm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiTmF2YmFyIiwiRm9ybSIsInN0eWxlIiwiRHJvcGRvd24iLCJDcmVhdGUiLCJ1c2VTdGF0ZSIsImRyYWdBY3RpdmUiLCJzZXREcmFnQWN0aXZlIiwiaW5wdXRSZWYiLCJ1c2VSZWYiLCJoYW5kbGVEcmFnIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwidHlwZSIsImhhbmRsZURyb3AiLCJkYXRhVHJhbnNmZXIiLCJmaWxlcyIsImhhbmRsZUNoYW5nZSIsInRhcmdldCIsIm9uQnV0dG9uQ2xpY2siLCJjdXJyZW50IiwiY2xpY2siLCJkaXYiLCJjbGFzc05hbWUiLCJoMSIsImZvcm0iLCJHcm91cCIsIkxhYmVsIiwiQ29udHJvbCIsInBsYWNlaG9sZGVyIiwiaDYiLCJhcyIsInJvd3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/Create.js\n"));

/***/ })

});