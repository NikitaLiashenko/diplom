import { Button as ShadButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import React from "react"

export interface LoadingButtonProps extends React.ComponentProps<typeof ShadButton> {
    isLoading?: boolean
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
    ({ className, variant, size, isLoading = false, children, disabled, ...props }, ref) => {
        return (
            <ShadButton
                ref={ref}
                variant={variant}
                size={size}
                className={cn("relative", className)}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading ? (
                    <span className="flex items-center gap-1">
                        {children}
                        <Loader2 className="w-5 h-5 animate-spin" />
                    </span>
                ) : (
                    children
                )}
            </ShadButton>
        )
    }
)
LoadingButton.displayName = "LoadingButton"

export { LoadingButton }
