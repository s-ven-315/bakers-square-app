import React, {useState, useEffect, useRef} from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".CTE--wrapper {\n position: relative;\n white-space: pre-wrap;\n  }\n  .CTE--wrapper:after, .CTE--input, .CTE--text {\n    grid-area: 1 / 2;\n    /* resize: none; */\n    text-align: left;\n    font-size: inherit;\n    font-family: inherit;\n  }\n  .CTE--wrapper:after {\n    content: attr(data-value) ' ';\n    height: 0;\n    visibility: hidden;\n    white-space: pre-wrap;\n  }\n  .CTE--input {\n    margin: 0;\n    padding: 0;\n    border:0;\n    background:none;\n    align-self: baseline;\n    outline: none;\n    box-sizing: border-box;\n  }\n  .CTE--text {\n  }\n";
styleInject(css_248z);



export function ClickToDropdown(props) {
    const [value, setValue] = useState(props.value)
    useEffect(() => setValue(props.value), [props.value])

    const [list, setList] = useState(props.list)
    useEffect(() => setList(props.list), [props.list])

    const [isEditMode, setEditMode] = useState(false)

    const getIntoEditMode = () => {
        setEditMode(true);
    };

    const inputRef = useRef(null)

    useEffect(() => {
        if (isEditMode) {
            inputRef.current &&  inputRef.current.focus()
        }
    }, [isEditMode])

    const getOffEditMode = () => {
        setEditMode(false);

        if (props.endEditing) {
            const idx = list.findIndex(l => l === value)
            props.endEditing(idx);
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        getOffEditMode();
    };

    const inputTag = <Select value={value} onChange={handleChange} onBlur={getOffEditMode} ref={inputRef}>
        {list.map(l => <MenuItem value={l} key={l}>{l}</MenuItem>)}
    </Select>

    const textTag = <div className={classnames("CTE--text", props.textClass)}>{value}</div>

    return /*#__PURE__*/React.createElement("section", {
        "data-value": value,
        className: classnames("CTE--wrapper", props.wrapperClass),
        onClick: getIntoEditMode
    }, isEditMode ? inputTag : textTag);
}
