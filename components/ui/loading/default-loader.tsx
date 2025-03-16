import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

const DefaultLoader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn("text-gray-500 w-full flex justify-center p-4", className)} {...props}>
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        );
    }
);

DefaultLoader.displayName = "DefaultLoader";

export default DefaultLoader;