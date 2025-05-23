import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "./utils"

const Label = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "label"
  return <Comp ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
})

Label.displayName = "Label"

export { Label }
