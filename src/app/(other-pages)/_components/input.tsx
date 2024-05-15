"use client";

import { cn } from "@/lib/utils";
import { FC, forwardRef } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
}

const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ type, placeholder, className, ...props }, ref) => {
    return (
      <input
        required={false}
        {...props}
        type={type}
        placeholder={placeholder}
        className={cn(
          "border border-[#6f4e37] rounded-lg px-4 py-2 w-full focus:outline-none focus-visible:outline-none",
          className
        )}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
