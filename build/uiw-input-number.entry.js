import { r as registerInstance, e as createEvent, h, f as Host } from './index-4f92bb90.js';

const bem = (base, ...modifiers) => {
  // "base" is either just a "block", or a "block__element" string
  let out = base;
  for (const modifier of modifiers) {
    if (typeof modifier === 'string') {
      if (modifier)
        out += ` ${base}--${modifier}`;
      continue;
    }
    const modifierArray = Array.isArray(modifier)
      ? modifier
      : Object.keys(modifier).filter((k) => modifier[k]);
    for (const modifier of modifierArray) {
      if (modifier)
        out += ` ${base}--${modifier}`;
    }
  }
  return out;
};
const joinClasses = (...classes) => {
  let out = '';
  for (const cssClass of classes) {
    if (!cssClass)
      continue;
    const classArray = typeof cssClass === 'string' ? [cssClass] : cssClass;
    for (const cssClass of classArray) {
      if (cssClass)
        out += ` ${cssClass}`;
    }
  }
  return out.trim();
};
const bemFromBlock = (block) => (element, ...modifiers) => bem(`${block}__${element}`, ...modifiers);

const uiwInputNumberCss = ".ncc-input-number__header{display:flex;flex-flow:row;justify-content:space-between;margin-bottom:4px;font-size:0.875rem;line-height:1.25rem;font-weight:400}.ncc-input-number--error .ncc-input-number__header__label{color:#e70404}.ncc-input-number__header__optional-label{color:#5a575c}.ncc-input-number__field-container{align-items:center;display:flex;padding:4px 0}.ncc-input-number__field-container__button{align-items:center;background:transparent;border:1px solid #00005e;border-radius:50%;box-shadow:0 0 0 2px transparent;color:#00005e;cursor:pointer;display:inline-flex;flex:0 0 auto;height:32px;justify-content:center;margin:0;outline:0;padding:0;transition:background-color 400ms cubic-bezier(0.075, 0.82, 0.165, 1), box-shadow 400ms cubic-bezier(0.075, 0.82, 0.165, 1);width:32px}.ncc-input-number__field-container__button:focus{box-shadow:0 0 0 2px #aed5ff}@media (hover: hover) and (pointer: fine){.ncc-input-number__field-container__button:hover{background-color:#dcedff}}.ncc-input-number__field-container__button:disabled{background-color:transparent;box-shadow:0 0 0 4px transparent;border-color:#c9c7c7;color:#c9c7c7;pointer-events:none}.ncc-input-number__field-container__input{background-color:transparent;border:0;flex:0 1 auto;font-family:inherit;min-width:0;padding:0 12px;outline:0;text-align:center;-webkit-appearance:none;width:var(--nccInputNumberInputWidth);font-size:1.125rem;line-height:1.625rem;font-weight:600;-moz-appearance:textfield}.ncc-input-number__field-container__input::-ms-clear{display:none}.ncc-input-number__field-container__input::-webkit-outer-spin-button,.ncc-input-number__field-container__input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.ncc-input-number__field-container__input::placeholder{color:#5a575c}.ncc-input-number__field-container__input:disabled{color:#8b8a8d;pointer-events:none}.ncc-input-number__footer{display:flex;flex-flow:column;font-size:0.875rem;line-height:1.25rem;font-weight:400}.ncc-input-number__footer__hint{margin-top:4px;color:#5a575c}.ncc-input-number__footer__error{align-items:center;color:#e70404;display:flex;margin-top:4px}.ncc-input-number__footer__error__icon{margin-right:8px}@media (prefers-color-scheme: dark){.ncc-enable-dark-mode .ncc-input-number__header__label{color:white}.ncc-enable-dark-mode .ncc-input-number--error .ncc-input-number__header__label{color:#fc6161}.ncc-enable-dark-mode .ncc-input-number__header__optional-label{color:#c9c7c7}.ncc-enable-dark-mode .ncc-input-number__field-container__button{color:#83b8ed;border-color:#83b8ed}.ncc-enable-dark-mode .ncc-input-number__field-container__button:focus{box-shadow:0 0 0 2px #dcedff}}@media (prefers-color-scheme: dark) and (hover: hover) and (pointer: fine){.ncc-enable-dark-mode .ncc-input-number__field-container__button:hover{background-color:#383838}}@media (prefers-color-scheme: dark){.ncc-enable-dark-mode .ncc-input-number__field-container__button:disabled{background-color:transparent;border-color:#5a575c;box-shadow:0 0 0 4px transparent;color:#5a575c}}@media (prefers-color-scheme: dark){.ncc-enable-dark-mode .ncc-input-number__field-container__input{color:white}.ncc-enable-dark-mode .ncc-input-number__field-container__input:disabled{color:#5a575c}}@media (prefers-color-scheme: dark){.ncc-enable-dark-mode .ncc-input-number__footer__error{color:#fc6161}}@media (prefers-color-scheme: dark){.ncc-enable-dark-mode .ncc-input-number__footer__hint{color:#c9c7c7}}.ncc-enforce-dark-mode .ncc-input-number__header__label{color:white}.ncc-enforce-dark-mode .ncc-input-number--error .ncc-input-number__header__label{color:#fc6161}.ncc-enforce-dark-mode .ncc-input-number__header__optional-label{color:#c9c7c7}.ncc-enforce-dark-mode .ncc-input-number__field-container__button{color:#83b8ed;border-color:#83b8ed}.ncc-enforce-dark-mode .ncc-input-number__field-container__button:focus{box-shadow:0 0 0 2px #dcedff}@media (hover: hover) and (pointer: fine){.ncc-enforce-dark-mode .ncc-input-number__field-container__button:hover{background-color:#383838}}.ncc-enforce-dark-mode .ncc-input-number__field-container__button:disabled{background-color:transparent;border-color:#5a575c;box-shadow:0 0 0 4px transparent;color:#5a575c}.ncc-enforce-dark-mode .ncc-input-number__field-container__input{color:white}.ncc-enforce-dark-mode .ncc-input-number__field-container__input:disabled{color:#5a575c}.ncc-enforce-dark-mode .ncc-input-number__footer__error{color:#fc6161}.ncc-enforce-dark-mode .ncc-input-number__footer__hint{color:#c9c7c7}";

const block = 'ncc-input-number';
let UiwInputNumber = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.nwccInputNumberChange = createEvent(this, "nwccInputNumberChange", 7);
    this.nwccInputNumberInputChange = createEvent(this, "nwccInputNumberInputChange", 7);
    this.nwccInputNumberInputFocus = createEvent(this, "nwccInputNumberInputFocus", 7);
    this.nwccInputNumberInputBlur = createEvent(this, "nwccInputNumberInputBlur", 7);
    this.nwccInputNumberDecreaseClick = createEvent(this, "nwccInputNumberDecreaseClick", 7);
    this.nwccInputNumberIncreaseClick = createEvent(this, "nwccInputNumberIncreaseClick", 7);
    this.placeholder = '';
    this.max = Number.MAX_SAFE_INTEGER;
    this.min = Number.MIN_SAFE_INTEGER;
    this.step = 1;
    this.value = 0;
    this.disabled = false;
    this.validators = [];
    this.required = false;
    this.valueString = this.toStringNumber(this.value);
    this.errorState = this.error;
    if (this.required) {
      this.validators.push((value) => this.validateRequired(value));
    }
    this.validators.push((value) => this.validateMax(value));
    this.validators.push((value) => this.validateMin(value));
    this.updateDisabledStates();
  }
  valueWatchHandler(newValue) {
    this.updateInputValue(newValue);
  }
  errorWatchHandler(newError) {
    this.errorState = newError;
  }
  componentDidLoad() {
    this.updateInputWidth(this.valueString);
  }
  toStringNumber(value) {
    return value === undefined || isNaN(value) ? '' : value.toString();
  }
  updateDisabledStates() {
    if (this.disabled) {
      this.decreaseDisabled = true;
      this.increaseDisabled = true;
    }
    else {
      if (this.value === undefined) {
        this.decreaseDisabled = false;
        this.increaseDisabled = false;
      }
      else {
        this.decreaseDisabled = this.min >= this.value;
        this.increaseDisabled = this.max <= this.value;
      }
    }
  }
  updateInputWidth(value) {
    const valueLength = value ? value.length : 1;
    this.inputElementRef.style.setProperty('--nccInputNumberInputWidth', `${valueLength}ch`);
  }
  protectFromNaN(value) {
    return value === undefined || isNaN(value) ? undefined : value;
  }
  updateInputValue(value) {
    this.value = this.protectFromNaN(value);
    this.valueString = this.toStringNumber(this.value);
    this.updateInputWidth(this.valueString);
    this.updateDisabledStates();
    this.validateInline(this.value);
  }
  onInputChange(e) {
    this.valueString = e.target.value;
    this.value = this.protectFromNaN(parseInt(this.valueString, 10));
    this.updateInputWidth(this.valueString);
    this.updateDisabledStates();
    this.validateInline(this.value);
    this.nwccInputNumberChange.emit(this.value);
    this.nwccInputNumberInputChange.emit(this.value);
  }
  onInputFocus(e) {
    this.nwccInputNumberInputFocus.emit(e);
  }
  onInputBlur(e) {
    this.nwccInputNumberInputBlur.emit(e);
  }
  onButtonDecreaseClick() {
    this.onButtonClick(-1);
    this.nwccInputNumberDecreaseClick.emit(this.value);
  }
  onButtonIncreaseClick() {
    this.onButtonClick(1);
    this.nwccInputNumberIncreaseClick.emit(this.value);
  }
  onButtonClick(direction) {
    this.value = Math.min(Math.max(this.value === undefined || isNaN(this.value)
      ? 0
      : this.value + this.step * direction, this.min), this.max);
    this.valueString = this.toStringNumber(this.value);
    this.updateInputWidth(this.valueString);
    this.updateDisabledStates();
    this.validateInline(this.value);
    this.nwccInputNumberChange.emit(this.value);
  }
  validateRequired(value) {
    var _a;
    return value === undefined || value === ''
      ? ((_a = this.translations) === null || _a === void 0 ? void 0 : _a.required) || 'Value is required'
      : null;
  }
  validateMax(value) {
    var _a;
    if (value) {
      return parseInt(value, 10) > this.max
        ? ((_a = this.translations) === null || _a === void 0 ? void 0 : _a.max) || `The maximum value is ${this.max}.`
        : null;
    }
    else {
      return null;
    }
  }
  validateMin(value) {
    var _a;
    if (value) {
      return parseInt(value, 10) < this.min
        ? ((_a = this.translations) === null || _a === void 0 ? void 0 : _a.min) || `The minimum value is ${this.min}.`
        : null;
    }
    else {
      return null;
    }
  }
  validateInline(value) {
    if (this.validators.length) {
      this.errorState =
        this.error ||
          this.validators
            .map((validator) => validator(this.toStringNumber(value)))
            .find((v) => v) ||
          '';
    }
  }
  render() {
    var _a, _b;
    return (h(Host, { class: bem(block, {
        error: this.errorState,
        disabled: this.disabled,
      }) }, (this.label || this.optionalLabel) && (h("div", { class: block + '__header' }, this.label && (h("label", { class: block + '__header__label' }, this.label)), this.optionalLabel && (h("div", { class: block + '__header__optional-label' }, this.optionalLabel)))), h("div", { class: block + '__field-container' }, h("button", { class: block + '__field-container__button', title: ((_a = this.translations) === null || _a === void 0 ? void 0 : _a.buttonDecreaseTitle) ||
        `Decrease by ${this.step}.`, disabled: this.decreaseDisabled || this.disabled, onClick: () => this.onButtonDecreaseClick(), type: "button" }, "-", h("custom-icon", { name: "minus", color: "current-color" })), h("input", { ref: (el) => (this.inputElementRef = el), class: block + '__field-container__input', type: "number", placeholder: this.placeholder, disabled: this.disabled, max: this.max, min: this.min, value: this.value, onInput: (e) => this.onInputChange(e), onFocus: (e) => this.onInputFocus(e), onBlur: (e) => this.onInputBlur(e) }), h("button", { class: block + '__field-container__button', title: ((_b = this.translations) === null || _b === void 0 ? void 0 : _b.buttonIncreaseTitle) ||
        `Increase by ${this.step}.`, onClick: () => this.onButtonIncreaseClick(), disabled: this.increaseDisabled || this.disabled, type: "button" }, "+", h("custom-icon", { name: "plus", color: "current-color" }))), (this.hint || this.errorState) && (h("div", { class: block + '__footer' }, this.hint && (h("div", { class: block + '__footer__hint' }, this.hint)), this.errorState && (h("div", { class: block + '__footer__error' }, h("custom-icon", { "aria-hidden": "true", class: block + '__footer__error__icon', name: "exclamation_mark", color: "current-color" }), h("span", { class: block + '__footer__error__text' }, this.errorState)))))));
  }
  static get watchers() { return {
    "value": ["valueWatchHandler"],
    "error": ["errorWatchHandler"]
  }; }
};
UiwInputNumber.style = uiwInputNumberCss;

export { UiwInputNumber as uiw_input_number };
