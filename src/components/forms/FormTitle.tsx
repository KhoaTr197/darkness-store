import React from "react";

export interface FormTitleProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}
/**
 * @component
 * @description
 * Renders a form title with children rendered inside it.
 *
 * @param {string} id - ID for the form title.
 * @param {string} className - Class name for the form title.
 * @param {ReactNode} children - Children elements to render inside the form title.
 * @returns {React.ReactNode} - Rendered form title.
 */
const FormTitle = ({
  id,
  className,
  children,
}: FormTitleProps) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
};

export default FormTitle;
