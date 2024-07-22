import React, { useId, forwardRef } from 'react';

function Input({ type = "text", placeholder = "", className = "", name = "", label="", ...props }, ref) {
    const id = useId();
    return (
        <>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
                    ref={ref}
                    {...props}
                />
            </div>
        </>
    );
}

export default forwardRef(Input);
