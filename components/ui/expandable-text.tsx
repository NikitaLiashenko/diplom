import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

interface ExpandableTextProps {
    text: string;
    maxHeight?: number;
    className?: string;
    defaultExpanded?: boolean;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, defaultExpanded = false, maxHeight = 100, className }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <div className="relative w-full">
            {/* Text */}
            <div
                className={cn(
                    "relative overflow-hidden transition-all duration-300",
                    !expanded && "max-h-[100px] after:absolute after:bottom-0 after:left-0 after:w-full after:h-16 after:bg-gradient-to-t after:from-white dark:after:from-black",
                    className
                )}
                style={!expanded ? { maxHeight } : undefined}
            >
                {text}
            </div>

            {/* Read More / Read Less */}
            {!expanded && <Button
                className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                size="icon"
                onClick={() => setExpanded(!expanded)}
                variant="outline"
                tabIndex={-1}
            >
                <Maximize2 />
            </Button>
            }
        </div>
    );
};

export default ExpandableText;