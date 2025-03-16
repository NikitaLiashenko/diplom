import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormWarningProps {
  message?: string | React.ReactNode;
}

export const FormWarning = ({
  message,
}: FormWarningProps) => {
  if (!message) return null;

  return (
    <div className="bg-orange-400/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-orange-400">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <div>{message}</div>
    </div>
  );
};