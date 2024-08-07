import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FieldValues } from "react-hook-form";

import { Path } from "react-hook-form";

type RenderFormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  title: string;
  control: Control<T>;
  className?: string;
  placeholder?: string;
  inputClassName?: string;
  labelClassName?: string;
  inputType?: "text" | "password" | "email" | "number" | "file";
  type: "input" | "select" | "textarea" | "radio" | "checkbox" | "text-editor";
};

const RenderFormField = <T extends FieldValues>({
  name,
  title,
  control,
  className,
  inputClassName,
  placeholder,
  labelClassName,
  inputType,
  type = "input",
}: RenderFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          <FormLabel className={cn(labelClassName)}> {title} </FormLabel>
          <FormControl>
            {(() => {
              switch (type) {
                case "input":
                  return (
                    <Input
                      {...field}
                      className={cn(inputClassName)}
                      type={inputType ?? "text"}
                      step={inputType === "number" ? 0.01 : undefined}
                      min={inputType === "number" ? 0 : undefined}
                      placeholder={placeholder ?? ""}
                    />
                  );

                default:
                  return null;
              }
            })()}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RenderFormField;
