import React from "react";
import { TextFieldProps } from "./text-field.props";
import { ErrorMessage, FieldHookConfig, useField } from "formik";

const TextField = ({ ...props }: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className="inline-block w-full">
      <label
        className={`inline-block w-full ${
          meta.touched && meta.error && "rounded-md border-2 border-red-500"
        }`}
      >
        <input className="input" {...props} {...field} />
      </label>
      <p className="text-red-500">
        <ErrorMessage name={field.name} />
      </p>
    </div>
  );
};

export default TextField;
