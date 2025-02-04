import React from 'react';
import { Input } from 'antd';
import { Field, ErrorMessage } from 'formik';
const InputForm = (props) => {
    const { title, label, as = "input", type } = props
    return (
        <div style={{ marginBottom: '16px' }}>
            <label htmlFor={title} style={{ fontWeight: 'bold' }}>
                {label}
            </label>
            <Field name={title}>
                {({ field }) =>
                    as === "textarea" ? (
                        <Input.TextArea {...field} id={title} />
                    ) :
                        (<Input type={type} {...field} id={title} />)
                }
            </Field>
            <ErrorMessage name={title} component="div" render={(msg) => <div style={{ color: 'red', marginTop: '4px' }}>{msg}</div>} />
        </div>
    );
};

export default InputForm;