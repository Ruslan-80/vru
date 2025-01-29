import { Checkbox } from "../ui/checkbox";

export interface FilterCheckboxProps {
    value?: string;
    name: string;
    values: any[];
    slug?: string;
    selectedValues?: Set<string>;
    endAdornment?: React.ReactNode;
    onCheckedChange?: (value: boolean) => void;
    checked?: boolean;
    onClickCheckbox?: (value: string) => void;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
    name,
    values,
    slug,
    endAdornment,
    onClickCheckbox,
    selectedValues,
}) => {
    return (
        <div key={slug} className="flex items-center space-x-2">
            <div className="flex-1 mb-5">
                <div className="mb-2">{name}</div>
                {values.map(value => (
                    <div
                        key={value.id}
                        className="flex items-center gap-2 mb-2"
                    >
                        <Checkbox
                            checked={selectedValues?.has(value.valueString)}
                            value={value.valueString}
                            className="rounded-[8px] w-6 h-6"
                            id={`checkbox-${String(value.valueString)}-${String(
                                name
                            )}`}
                            onCheckedChange={() =>
                                onClickCheckbox?.(value.valueString)
                            }
                        />
                        <label
                            htmlFor={`checkbox-${String(
                                value.valueString
                            )}-${String(name)}`}
                            className="leading-none cursor-pointer flex-1"
                        >
                            {value.valueString}
                        </label>
                        {endAdornment}
                    </div>
                ))}
            </div>
        </div>
    );
};
