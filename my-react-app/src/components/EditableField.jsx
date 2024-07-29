import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/EditableField.css';
// EditableField is a functional component that displays a field with an edit button.
// The field can be edited by clicking the edit button, which reveals an input field for editing.
function EditableField({ label, initialValue, onSave, hint, validation, unit, options, shouldAppendUnit, isMultiSelect }) {
    // State variables for managing editing state and value
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [errorMessage, setErrorMessage] = useState(null);
    // controls how values without units are stored and displayed
    const [valueWithoutUnit, setValueWithoutUnit] = useState(
        typeof initialValue === 'string' ? initialValue.replace(unit, '') : initialValue
    );

    // Handle checkbox change for multi-select fields
    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setValueWithoutUnit(prevValue =>
            prevValue.includes(value)
                ? prevValue.filter(val => val !== value)
                : [...prevValue, value]
        );
    };
    // Handle save button click
    const handleSave = () => {
        const error = validation ? validation(valueWithoutUnit) : null;
        setErrorMessage(error);
        if (!error) {
            onSave(valueWithoutUnit);
            if (shouldAppendUnit && typeof valueWithoutUnit === 'string') { // Only append unit if shouldAppendUnit is true and valueWithoutUnit is a string
                setValue(valueWithoutUnit + unit);
            } else {
                setValue(valueWithoutUnit);
            }
            setIsEditing(false);
        }
    };
    const handleCancel = () => {
        setValue(initialValue);
        setIsEditing(false);
    };

    if (isEditing) {
        if (options) {
            if (isMultiSelect) {
                // If options and isMultiSelect are provided, render a group of checkboxes
                return (
                    <div className='fieldContainer'>
                        <label className='fieldLabel'>
                            {label}:
                        </label>
                        {options.map(option => (
                            <div key={option} className='fieldCheckbox'>
                                <input
                                    type="checkbox"
                                    id={option}
                                    value={option}
                                    checked={valueWithoutUnit.includes(option)}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor={option}>{option}</label>
                            </div>
                        ))}
                        <div>
                            <button id='saveButton' onClick={handleSave}>Save</button>
                            <button id='cancelButton' onClick={handleCancel}>Cancel</button>
                        </div>
                        {errorMessage && <p className='error'>{errorMessage}</p>}
                    </div>
                );
            }
            else {
                // If options are provided but isMultiSelect is not, render a select element
                return (
                    <div className='fieldContainer'>
                        <label className='fieldLabel'>
                            {label}:
                            <select className='fieldSelect' value={valueWithoutUnit} onChange={e => setValueWithoutUnit(e.target.value)}>
                                {options.map(option => <option key={option} value={option}>{option}</option>)}
                            </select>
                        </label>
                        <div>
                            <button id='saveButton' onClick={handleSave}>Save</button>
                            <button id='cancelButton' onClick={handleCancel}>Cancel</button>
                        </div>
                        {errorMessage && <p className='error'>{errorMessage}</p>}
                    </div>
                );
            }
        }
        else {
            return (
                <div className='fieldContainer'>
                    <label className='fieldLabel'>
                        {label}:
                        <input type="text" className='fieldValue editable' value={valueWithoutUnit} onChange={e => setValueWithoutUnit(e.target.value)} placeholder={hint} />
                    </label>
                    <div>
                        <button id='saveButton' onClick={handleSave}>Save</button>
                        <button id='cancelButton' onClick={handleCancel}>Cancel</button>
                    </div>
                    {errorMessage && <p className='error'>{errorMessage}</p>}
                </div>
            );
        }
    } else {
        return (
            <div className='fieldContainer'>
                <p className='fieldLabel'>{label}:</p>
                <div className='fieldDisplay'>
                    <div className='fieldValue'>
                        {Array.isArray(value) ? value.map((val, i) => <div key={i}>{val}</div>) : value || hint}
                    </div>
                    <button id='editButton' onClick={() => { setIsEditing(true); setValueWithoutUnit(typeof value === 'string' ? value.replace(unit, '') : value); }}>Edit</button>
                </div>
            </div>
        );
    }

}

EditableField.propTypes = {
    validation: PropTypes.func,
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired, // Allow both string and array for initialValue
    onSave: PropTypes.func.isRequired,
    hint: PropTypes.string,
    unit: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    shouldAppendUnit: PropTypes.bool,
    isMultiSelect: PropTypes.bool,
};


export default EditableField;