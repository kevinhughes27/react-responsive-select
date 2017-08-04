import React, { Component } from 'react';
import PropTypes from 'prop-types';
import singleline from 'singleline';
import scrollIntoViewIIHOC from '../lib/scrollIntoViewIIHOC';
import MultiSelectOption from './MultiSelectOption';
const MultiSelectOptionHOC = scrollIntoViewIIHOC(MultiSelectOption);

export default class MultiSelect extends Component {

  render(){
    const {
      altered,
      caretIcon,
      customLabelText,
      disabled,
      isDragging,
      isOptionsPanelOpen,
      multiSelectSelectedIndexes,
      multiSelectSelectedOptions,
      name,
      options,
      nextPotentialSelectionIndex,
      prefix
    } = this.props;

    return (
      <div>
        <div
          role="button"
          tabIndex="0"
          aria-haspopup="true"
          aria-expanded={`${isOptionsPanelOpen}`}
          aria-controls={`rrs-${name}-menu`}
          className={singleline(`
            rrs__select-container
            rrs__select-container--multiselect
            ${(disabled === true) ? 'rrs__select-container--disabled' : ''}
            ${(isOptionsPanelOpen === true) ? 'rrs__options-container--visible' : ''}
            ${altered ? 'rrs__has-changed': ''}
          `)}
        >

          {customLabelText &&
          <div className="rrs__label-container">
            <span
              aria-label={`${prefix ? prefix + ' ' : ''}${[multiSelectSelectedOptions.options.map(v => v.value)].join(' ,')} selected`}
              className="rrs__label"
              id={`rrs-${name}-label`}
            >
              {customLabelText}
            </span>
            {caretIcon && caretIcon}
          </div>
          }

          {!customLabelText &&
          <div className="rrs__label-container">
            <span
              aria-label={`${prefix ? prefix + ' ' : ''}${[multiSelectSelectedOptions.options.map(v => v.value)].join(' ,')} selected`}
              className="rrs__label"
              id={`rrs-${name}-label`}
            >
              <span className='rrs__multiselect__label'>
                <span className='rrs__multiselect__label-text'>{`${prefix ? prefix + ' ' : ''}${multiSelectSelectedOptions.options[0].text}`}</span>
                {multiSelectSelectedOptions.options.length > 1 &&
                <span className='rrs__multiselect__label-badge'>
                  {`+ ${multiSelectSelectedOptions.options.length-1}`}
                </span>
                }
              </span>
            </span>
            {caretIcon && caretIcon}
          </div>
          }

          {name &&
          <input
            type="hidden"
            name={name}
            value={[multiSelectSelectedOptions.options.map(v => v.value)].join(',')}
          />
          }

        </div>

        <ul
          id={`rrs-${name}-menu`}
          aria-labelledby={`rrs-${name}-label`}
          // aria-relevant="additions removals"
          // aria-live="polite"
          // aria-atomic="true"
          role="menu"
          className="rrs__options-container"
          ref={(r) => { if (r) { return this.optionsContainer = r; }}}
        >
          {options.length > 0 &&
            options.map((option, index) => (
              <MultiSelectOptionHOC
                scrollIntoViewScrollPaneRef={() => this.optionsContainer}
                scrollIntoViewElementSelector={'rrs__option--next-selection'}
                key={index}
                index={index}
                option={option}
                isDragging={isDragging}
                isOptionsPanelOpen={isOptionsPanelOpen}
                multiSelectSelectedIndexes={multiSelectSelectedIndexes}
                nextPotentialSelectionIndex={nextPotentialSelectionIndex}
              />
            ))
          }
        </ul>
      </div>
    );
  }
}

MultiSelect.propTypes = {
  altered: PropTypes.bool,
  caretIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  customLabelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.element
  ]),
  disabled: PropTypes.bool,
  multiSelectInitialSelectedIndexes: PropTypes.arrayOf(
    PropTypes.number
  ),
  multiSelectSelectedIndexes: PropTypes.arrayOf(
    PropTypes.number
  ),
  multiSelectSelectedOptions: PropTypes.shape({
    altered: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        text: PropTypes.string,
        value: PropTypes.string,
        markup: PropTypes.object
      })
    )
  }),
  isDragging: PropTypes.bool,
  isOptionsPanelOpen: PropTypes.bool,
  name: PropTypes.string,
  nextPotentialSelectionIndex: PropTypes.number,
  onSubmit: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  prefix: PropTypes.string
};
