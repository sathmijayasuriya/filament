import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}) {
  return (
    <CheckboxPrimitive.Root
    data-slot="checkbox"
    className={cn(
        "peer h-5 w-5 border border-input rounded-sm transition-all duration-200 data-[state=checked]:bg-orange-400 data-[state=checked]:border-orange-200 data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-ring/50 outline-none disabled:cursor-not-allowed disabled:opacity-50 box-border shrink-0", // Added box-border and shrink-0
        className
    )}
    {...props}
>
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
  );
}

export { Checkbox }
