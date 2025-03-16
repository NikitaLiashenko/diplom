import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface EditableFieldProps extends HTMLAttributes<HTMLDivElement> {
    editMode: boolean;
    label?: string;
    value?: string;
    name: string;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    control: Control<any, any>;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    formItem: (field: any) => React.ReactNode;
}

const EditableField = ({ editMode, label, value, name, control, formItem, className }: EditableFieldProps) => {
    if (editMode) {
        return (
            <FormField control={control} name={name} render={({ field }) => (
                <FormItem className='mb-6'>
                    {label && <FormLabel>{label}</FormLabel>}
                    {formItem(field)}
                    <FormMessage />
                </FormItem>
            )} />
        )
    }
    if (value) {
        return (
            <div className={cn("flex justify-between items-center p-2", className)}>
                {label && <Label className="text-gray-700 font-medium">{label}</Label>}
                <span className="text-gray-900 font-semibold">{value}</span>
            </div>
        );
    }
    return null;
}

export default EditableField;