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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_src_define_property_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/src/_define_property.mjs */ \"./node_modules/@swc/helpers/src/_define_property.mjs\");\n/* harmony import */ var _swc_helpers_src_object_spread_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/src/_object_spread.mjs */ \"./node_modules/@swc/helpers/src/_object_spread.mjs\");\n/* harmony import */ var _swc_helpers_src_object_spread_props_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/src/_object_spread_props.mjs */ \"./node_modules/@swc/helpers/src/_object_spread_props.mjs\");\n/* harmony import */ var _swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/src/_sliced_to_array.mjs */ \"./node_modules/@swc/helpers/src/_sliced_to_array.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Navbar */ \"./components/Navbar.js\");\n/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap/Form */ \"./node_modules/react-bootstrap/esm/Form.js\");\n/* harmony import */ var _styles_create_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/create.module.css */ \"./styles/create.module.css\");\n/* harmony import */ var _styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap/Button */ \"./node_modules/react-bootstrap/esm/Button.js\");\n\n\n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nvar Create = function() {\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        name: \"\",\n        email: \"\"\n    }), query = ref[0], setQuery = ref[1];\n    // Update inputs value\n    var handleParam = function() {\n        return function(e) {\n            var name = e.target.name;\n            var value = e.target.value;\n            setQuery(function(prevState) {\n                return (0,_swc_helpers_src_object_spread_props_mjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"])((0,_swc_helpers_src_object_spread_mjs__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({}, prevState), (0,_swc_helpers_src_define_property_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"])({}, name, value));\n            });\n        };\n    };\n    // Form Submit function\n    var formSubmit = function(e) {\n        e.preventDefault();\n        var formData = new FormData();\n        Object.entries(query).forEach(function(param) {\n            var _param = (0,_swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(param, 2), key = _param[0], value = _param[1];\n            formData.append(key, value);\n        });\n        fetch(\"https://getform.io/{your-form-endpoint}\", {\n            method: \"POST\",\n            body: formData\n        }).then(function() {\n            return setQuery({\n                name: \"\",\n                email: \"\",\n                message: \"\"\n            });\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().Create),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        children: \"Create New Item\"\n                    }, void 0, false, {\n                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                        lineNumber: 38,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                        className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().form),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Label, {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                            className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().Name),\n                                            children: \"Name\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                            lineNumber: 42,\n                                            columnNumber: 15\n                                        }, _this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 41,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Control, {\n                                        type: \"Name\",\n                                        placeholder: \"Enter Name\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 44,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 40,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Label, {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                            className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().h1name),\n                                            children: \"External Link\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                            lineNumber: 48,\n                                            columnNumber: 15\n                                        }, _this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 47,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                                        className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().h6name),\n                                        children: \"Yogi's MarketPlace will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 50,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Control, {\n                                        as: \"textarea\",\n                                        placeholder: \"https://yoursite.io/item/123\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 55,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 46,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Label, {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                            className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().h1name),\n                                            children: \"Description\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                            lineNumber: 63,\n                                            columnNumber: 15\n                                        }, _this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 62,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                                        className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().h6name),\n                                        children: \"The description will be included on the item's detail page underneath its image. Markdown syntax is supported.\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 65,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Control, {\n                                        as: \"textarea\",\n                                        placeholder: \"Provide Detailed Discription of Your Item\",\n                                        rows: 4\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 69,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 61,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Group, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Label, {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                            className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().h1name),\n                                            children: \"Supply\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                            lineNumber: 78,\n                                            columnNumber: 15\n                                        }, _this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 77,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                                        className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().h6name),\n                                        children: \"The number of items that can be minted. No gas cost to you!\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 80,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Control, {\n                                        as: \"textarea\",\n                                        placeholder: \"Total Supply \"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                        lineNumber: 83,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 76,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_8__[\"default\"].Group, {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                            className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().h1name),\n                                            children: \"BlockChian\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                            lineNumber: 88,\n                                            columnNumber: 15\n                                        }, _this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                                            className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().chain),\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                    value: \"female\",\n                                                    children: \"Ethereum\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                                    lineNumber: 90,\n                                                    columnNumber: 17\n                                                }, _this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                    value: \"female\",\n                                                    children: \"Arbitrum\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                                    lineNumber: 91,\n                                                    columnNumber: 17\n                                                }, _this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                    value: \"male\",\n                                                    children: \"Avalanche\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                                    lineNumber: 92,\n                                                    columnNumber: 17\n                                                }, _this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                    value: \"other\",\n                                                    children: \"Klaytn\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                                    lineNumber: 93,\n                                                    columnNumber: 17\n                                                }, _this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                    value: \"other\",\n                                                    children: \"Polygon\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                                    lineNumber: 94,\n                                                    columnNumber: 17\n                                                }, _this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                    value: \"other\",\n                                                    children: \"Solana\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                                    lineNumber: 95,\n                                                    columnNumber: 17\n                                                }, _this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                            lineNumber: 89,\n                                            columnNumber: 15\n                                        }, _this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                    lineNumber: 87,\n                                    columnNumber: 13\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                                lineNumber: 86,\n                                columnNumber: 11\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                        lineNumber: 39,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                        className: (_styles_create_module_css__WEBPACK_IMPORTED_MODULE_7___default().primary),\n                        children: \"Primary\"\n                    }, void 0, false, {\n                        fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                        lineNumber: 100,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/manojazad/Desktop/Nextjs/MarketplaceDemo/Frontend/pages/Create.js\",\n                lineNumber: 37,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true);\n};\n_s(Create, \"6GWqYn1f5rZLgm7UyfEBOFKw5fs=\");\n_c = Create;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Create);\nvar _c;\n$RefreshReg$(_c, \"Create\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLE9BQU87OERBQUMsU0FBTzs7Ozs7eURBQVM7OERBQ3RDLDhEQUFDa0MsUUFBTTtvREFBQ2xDLEtBQUssRUFBQyxPQUFPOzhEQUFDLFFBQU07Ozs7O3lEQUFTOzs7Ozs7aURBQzlCOzs7Ozs7eUNBQ0w7Ozs7O3FDQUNLOzs7Ozs7NkJBQ1I7a0NBQ1AsOERBQUNULDhEQUFNO3dCQUFDMEIsU0FBUyxFQUFFM0IsMEVBQWE7a0NBQUUsU0FBTzs7Ozs7NkJBQVM7Ozs7OztxQkFDOUM7O29CQUNMLENBQ0g7QUFDSixDQUFDO0dBakdLRSxNQUFNO0FBQU5BLEtBQUFBLE1BQU07QUFtR1osK0RBQWVBLE1BQU0sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9DcmVhdGUuanM/NzEwNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBOYXZiYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvTmF2YmFyXCI7XG5pbXBvcnQgRm9ybSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwL0Zvcm1cIjtcbmltcG9ydCBzdHlsZSBmcm9tIFwiLi4vc3R5bGVzL2NyZWF0ZS5tb2R1bGUuY3NzXCI7XG5pbXBvcnQgQnV0dG9uIGZyb20gXCJyZWFjdC1ib290c3RyYXAvQnV0dG9uXCI7XG5cbmNvbnN0IENyZWF0ZSA9ICgpID0+IHtcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZSh7XG4gICAgbmFtZTogXCJcIixcbiAgICBlbWFpbDogXCJcIixcbiAgfSk7XG5cbiAgLy8gVXBkYXRlIGlucHV0cyB2YWx1ZVxuICBjb25zdCBoYW5kbGVQYXJhbSA9ICgpID0+IChlKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGUudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICBzZXRRdWVyeSgocHJldlN0YXRlKSA9PiAoe1xuICAgICAgLi4ucHJldlN0YXRlLFxuICAgICAgW25hbWVdOiB2YWx1ZSxcbiAgICB9KSk7XG4gIH07XG4gIC8vIEZvcm0gU3VibWl0IGZ1bmN0aW9uXG4gIGNvbnN0IGZvcm1TdWJtaXQgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIE9iamVjdC5lbnRyaWVzKHF1ZXJ5KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICB9KTtcbiAgICBmZXRjaChcImh0dHBzOi8vZ2V0Zm9ybS5pby97eW91ci1mb3JtLWVuZHBvaW50fVwiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgfSkudGhlbigoKSA9PiBzZXRRdWVyeSh7IG5hbWU6IFwiXCIsIGVtYWlsOiBcIlwiLCBtZXNzYWdlOiBcIlwiIH0pKTtcbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPE5hdmJhciAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlLkNyZWF0ZX0+XG4gICAgICAgIDxoMT5DcmVhdGUgTmV3IEl0ZW08L2gxPlxuICAgICAgICA8Rm9ybSBjbGFzc05hbWU9e3N0eWxlLmZvcm19PlxuICAgICAgICAgIDxGb3JtLkdyb3VwPlxuICAgICAgICAgICAgPEZvcm0uTGFiZWw+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9e3N0eWxlLk5hbWV9Pk5hbWU8L2gzPlxuICAgICAgICAgICAgPC9Gb3JtLkxhYmVsPlxuICAgICAgICAgICAgPEZvcm0uQ29udHJvbCB0eXBlPVwiTmFtZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgTmFtZVwiIC8+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuICAgICAgICAgIDxGb3JtLkdyb3VwPlxuICAgICAgICAgICAgPEZvcm0uTGFiZWw+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9e3N0eWxlLmgxbmFtZX0+RXh0ZXJuYWwgTGluazwvaDM+XG4gICAgICAgICAgICA8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8aDYgY2xhc3NOYW1lPXtzdHlsZS5oNm5hbWV9PlxuICAgICAgICAgICAgICBZb2dpJ3MgTWFya2V0UGxhY2Ugd2lsbCBpbmNsdWRlIGEgbGluayB0byB0aGlzIFVSTCBvbiB0aGlzIGl0ZW0nc1xuICAgICAgICAgICAgICBkZXRhaWwgcGFnZSwgc28gdGhhdCB1c2VycyBjYW4gY2xpY2sgdG8gbGVhcm4gbW9yZSBhYm91dCBpdC4gWW91XG4gICAgICAgICAgICAgIGFyZSB3ZWxjb21lIHRvIGxpbmsgdG8geW91ciBvd24gd2VicGFnZSB3aXRoIG1vcmUgZGV0YWlscy5cbiAgICAgICAgICAgIDwvaDY+XG4gICAgICAgICAgICA8Rm9ybS5Db250cm9sXG4gICAgICAgICAgICAgIGFzPVwidGV4dGFyZWFcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImh0dHBzOi8veW91cnNpdGUuaW8vaXRlbS8xMjNcIlxuICAgICAgICAgICAgICAvLyByb3dzPXszfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG4gICAgICAgICAgPEZvcm0uR3JvdXA+XG4gICAgICAgICAgICA8Rm9ybS5MYWJlbD5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT17c3R5bGUuaDFuYW1lfT5EZXNjcmlwdGlvbjwvaDM+XG4gICAgICAgICAgICA8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8aDYgY2xhc3NOYW1lPXtzdHlsZS5oNm5hbWV9PlxuICAgICAgICAgICAgICBUaGUgZGVzY3JpcHRpb24gd2lsbCBiZSBpbmNsdWRlZCBvbiB0aGUgaXRlbSdzIGRldGFpbCBwYWdlXG4gICAgICAgICAgICAgIHVuZGVybmVhdGggaXRzIGltYWdlLiBNYXJrZG93biBzeW50YXggaXMgc3VwcG9ydGVkLlxuICAgICAgICAgICAgPC9oNj5cbiAgICAgICAgICAgIDxGb3JtLkNvbnRyb2xcbiAgICAgICAgICAgICAgYXM9XCJ0ZXh0YXJlYVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUHJvdmlkZSBEZXRhaWxlZCBEaXNjcmlwdGlvbiBvZiBZb3VyIEl0ZW1cIlxuICAgICAgICAgICAgICByb3dzPXs0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0Zvcm0uR3JvdXA+XG5cbiAgICAgICAgICA8Rm9ybS5Hcm91cD5cbiAgICAgICAgICAgIDxGb3JtLkxhYmVsPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPXtzdHlsZS5oMW5hbWV9PlN1cHBseTwvaDM+XG4gICAgICAgICAgICA8L0Zvcm0uTGFiZWw+XG4gICAgICAgICAgICA8aDYgY2xhc3NOYW1lPXtzdHlsZS5oNm5hbWV9PlxuICAgICAgICAgICAgICBUaGUgbnVtYmVyIG9mIGl0ZW1zIHRoYXQgY2FuIGJlIG1pbnRlZC4gTm8gZ2FzIGNvc3QgdG8geW91IVxuICAgICAgICAgICAgPC9oNj5cbiAgICAgICAgICAgIDxGb3JtLkNvbnRyb2wgYXM9XCJ0ZXh0YXJlYVwiIHBsYWNlaG9sZGVyPVwiVG90YWwgU3VwcGx5IFwiIC8+XG4gICAgICAgICAgPC9Gb3JtLkdyb3VwPlxuXG4gICAgICAgICAgPEZvcm0uR3JvdXA+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPXtzdHlsZS5oMW5hbWV9PkJsb2NrQ2hpYW48L2gxPlxuICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT17c3R5bGUuY2hhaW59PlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJmZW1hbGVcIj5FdGhlcmV1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJmZW1hbGVcIj5BcmJpdHJ1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtYWxlXCI+QXZhbGFuY2hlPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm90aGVyXCI+S2xheXRuPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm90aGVyXCI+UG9seWdvbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJvdGhlclwiPlNvbGFuYTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvRm9ybS5Hcm91cD5cbiAgICAgICAgPC9Gb3JtPlxuICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT17c3R5bGUucHJpbWFyeX0+UHJpbWFyeTwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDcmVhdGU7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIk5hdmJhciIsIkZvcm0iLCJzdHlsZSIsIkJ1dHRvbiIsIkNyZWF0ZSIsIm5hbWUiLCJlbWFpbCIsInF1ZXJ5Iiwic2V0UXVlcnkiLCJoYW5kbGVQYXJhbSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInByZXZTdGF0ZSIsImZvcm1TdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImtleSIsImFwcGVuZCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJtZXNzYWdlIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJmb3JtIiwiR3JvdXAiLCJMYWJlbCIsImgzIiwiTmFtZSIsIkNvbnRyb2wiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJoMW5hbWUiLCJoNiIsImg2bmFtZSIsImFzIiwicm93cyIsInNlbGVjdCIsImNoYWluIiwib3B0aW9uIiwicHJpbWFyeSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/Create.js\n"));

/***/ })

});