import React, { Component } from 'react'
import'./OptionsDisplay.css'

/**
 * OptionsDisplay
 * displays the option selected for the given variant.
 * So far, this doesn't allow us to select the variant but that's a planned functionality
 * in the future
 */
export default class OptionsDisplay extends Component {
    render () {
        // Temporary obect to show the structure of OptionsDisplay
        const options = this.props.options.map((option) => {
            return {
                name: option.name,
                selected: option.selected,
                values: option.values
            }
        })

        const selectedOptions = options.map((option) => {
            return (
                <div className="SelectedOption" key={option.name}>
                    <span className="SelectedOption-name">{option.name}: </span>
                    <span className="SelectedOption-selected">{option.selected}</span>
                </div>
            )
        })

        return (
            <div className="OptionsDisplay">
                <h4>Options</h4>
                {selectedOptions}
            </div>
        )
    }
}