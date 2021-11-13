import {
  Component,
  Prop,
  h,
  State,
  Event,
  EventEmitter,
  Host,
  Watch,
} from '@stencil/core'

import { ValidatorFn } from '../../global/errorHandler'
import { bem } from '../../global/bem'

const block = 'ncc-input-number'

type InputEvent = Event & {
    target?: HTMLInputElement
}

@Component({
  tag: 'uiw-input-number',
  styleUrl: 'uiw-input-number.scss',
  shadow: true,
})
export class UiwInputNumber {
  @Prop() label: string
  @Prop({ mutable: true }) error: string
  @Prop() hint: string
  @Prop() optionalLabel: string
  @Prop() name: string
  @Prop() placeholder: string = ''
  @Prop() max: number = Number.MAX_SAFE_INTEGER
  @Prop() min: number = Number.MIN_SAFE_INTEGER
  @Prop() step: number = 1
  @Prop({ mutable: true }) value?: number = 0
  @Prop() disabled: boolean = false
  @Prop() validators: ValidatorFn[] = []
  @Prop() required: boolean = false
  @Prop({ mutable: true }) translations?: {
      buttonIncreaseTitle?: string
      buttonDecreaseTitle?: string
      required?: string
      max?: string
      min?: string
  }

  @State() valueString: string
  @State() errorState: string // to prevent internal errors to remove external error
  @State() increaseDisabled: boolean // whether the + button should be disabled
  @State() decreaseDisabled: boolean // whether the - button should be disabled

  @Watch('value')
  valueWatchHandler(newValue?: number) {
      this.updateInputValue(newValue)
  }

  @Watch('error')
  errorWatchHandler(newError: string) {
      this.errorState = newError
  }

  @Event() uiwInputNumberChange: EventEmitter<number>
  @Event() uiwInputNumberInputChange: EventEmitter<number>
  @Event() uiwInputNumberInputFocus: EventEmitter<FocusEvent>
  @Event() uiwInputNumberInputBlur: EventEmitter<FocusEvent>
  @Event() uiwInputNumberDecreaseClick: EventEmitter<number>
  @Event() uiwInputNumberIncreaseClick: EventEmitter<number>

  private inputElementRef: HTMLElement


  constructor() {
      this.valueString = this.toStringNumber(this.value)
      this.errorState = this.error

      if (this.required) {
          this.validators.push((value) => this.validateRequired(value))
      }

      this.validators.push((value) => this.validateMax(value))

      this.validators.push((value) => this.validateMin(value))

      this.updateDisabledStates()
  }

  componentDidLoad() {
      this.updateInputWidth(this.valueString)
  }

  toStringNumber(value?: number): string {
      return value === undefined || isNaN(value) ? '' : value.toString()
  }

  updateDisabledStates() {
      if (this.disabled) {
          this.decreaseDisabled = true
          this.increaseDisabled = true
      } else {
          if (this.value === undefined) {
              this.decreaseDisabled = false
              this.increaseDisabled = false
          } else {
              this.decreaseDisabled = this.min >= this.value
              this.increaseDisabled = this.max <= this.value
          }
      }
  }

  updateInputWidth(value: string) {
      const valueLength = value ? value.length : 1
      this.inputElementRef.style.setProperty(
          '--nccInputNumberInputWidth',
          `${valueLength}ch`
      )
  }

  protectFromNaN(value?: number) {
      return value === undefined || isNaN(value) ? undefined : value
  }

  updateInputValue(value?: number) {
      this.value = this.protectFromNaN(value)
      this.valueString = this.toStringNumber(this.value)
      this.updateInputWidth(this.valueString)
      this.updateDisabledStates()
      this.validateInline(this.value)
  }

  onInputChange(e: InputEvent) {
      this.valueString = e.target.value
      this.value = this.protectFromNaN(parseInt(this.valueString, 10))
      this.updateInputWidth(this.valueString)
      this.updateDisabledStates()
      this.validateInline(this.value)
      this.uiwInputNumberChange.emit(this.value)
      this.uiwInputNumberInputChange.emit(this.value)
  }

  onInputFocus(e: FocusEvent) {
      this.uiwInputNumberInputFocus.emit(e)
  }

  onInputBlur(e: FocusEvent) {
      this.uiwInputNumberInputBlur.emit(e)
  }

  onButtonDecreaseClick() {
      this.onButtonClick(-1)
      this.uiwInputNumberDecreaseClick.emit(this.value)
  }

  onButtonIncreaseClick() {
      this.onButtonClick(1)
      this.uiwInputNumberIncreaseClick.emit(this.value)
  }

  onButtonClick(direction: number) {
      this.value = Math.min(
          Math.max(
              this.value === undefined || isNaN(this.value)
                  ? 0
                  : this.value + this.step * direction,
              this.min
          ),
          this.max
      )
      this.valueString = this.toStringNumber(this.value)
      this.updateInputWidth(this.valueString)
      this.updateDisabledStates()
      this.validateInline(this.value)
      this.uiwInputNumberChange.emit(this.value)

  }

  validateRequired(value?: string) {
      return value === undefined || value === ''
          ? this.translations?.required || 'Value is required'
          : null
  }

  validateMax(value?: string) {
      if (value) {
          return parseInt(value, 10) > this.max
              ? this.translations?.max || `The maximum value is ${this.max}.`
              : null
      } else {
          return null
      }
  }

  validateMin(value?: string) {
      if (value) {
          return parseInt(value, 10) < this.min
              ? this.translations?.min || `The minimum value is ${this.min}.`
              : null
      } else {
          return null
      }
  }

  validateInline(value?: number) {
      if (this.validators.length) {
          this.errorState =
              this.error ||
              this.validators
                  .map((validator) => validator(this.toStringNumber(value)))
                  .find((v) => v) ||
              ''
      }
  }

  render() {
      return (
          <Host
              class={bem(block, {
                  error: this.errorState,
                  disabled: this.disabled,
              })}
          >
              {(this.label || this.optionalLabel) && (
                  <div class={block + '__header'}>
                      {this.label && (
                          <label class={block + '__header__label'}>
                              {this.label}
                          </label>
                      )}
                      {this.optionalLabel && (
                          <div class={block + '__header__optional-label'}>
                              {this.optionalLabel}
                          </div>
                      )}
                  </div>
              )}

              <div class={block + '__field-container'}>
                  <button
                      class={block + '__field-container__button'}
                      title={
                          this.translations?.buttonDecreaseTitle ||
                          `Decrease by ${this.step}.`
                      }
                      disabled={this.decreaseDisabled || this.disabled}
                      onClick={() => this.onButtonDecreaseClick()}
                      type="button"
                  >
                      -
                      <custom-icon
                          name="minus"
                          color="current-color"
                      ></custom-icon>
                  </button>
                  <input
                      ref={(el) => (this.inputElementRef = el as HTMLElement)}
                      class={block + '__field-container__input'}
                      type="number"
                      placeholder={this.placeholder}
                      disabled={this.disabled}
                      max={this.max}
                      min={this.min}
                      value={this.value}
                      onInput={(e) => this.onInputChange(e as InputEvent)}
                      onFocus={(e) => this.onInputFocus(e)}
                      onBlur={(e) => this.onInputBlur(e)}
                  />
                  <button
                      class={block + '__field-container__button'}
                      title={
                          this.translations?.buttonIncreaseTitle ||
                          `Increase by ${this.step}.`
                      }
                      onClick={() => this.onButtonIncreaseClick()}
                      disabled={this.increaseDisabled || this.disabled}
                      type="button"
                  >
                      +
                      <custom-icon
                          name="plus"
                          color="current-color"
                      ></custom-icon>
                  </button>
              </div>

              {(this.hint || this.errorState) && (
                  <div class={block + '__footer'}>
                      {this.hint && (
                          <div class={block + '__footer__hint'}>
                              {this.hint}
                          </div>
                      )}
                      {this.errorState && (
                          <div class={block + '__footer__error'}>
                              <custom-icon
                                  aria-hidden="true"
                                  class={block + '__footer__error__icon'}
                                  name="exclamation_mark"
                                  color="current-color"
                              ></custom-icon>
                              <span class={block + '__footer__error__text'}>
                                  {this.errorState}
                              </span>
                          </div>
                      )}
                  </div>
              )}
          </Host>
      )
  }
}
