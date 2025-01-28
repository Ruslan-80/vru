import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RangeSlider } from "@/components/shared";

export function PriceFilter({
    onPriceChange,
}: {
    onPriceChange: (range: [number, number]) => void;
}) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);

    const handleInputChange = (type: "min" | "max", value: number) => {
        if (type === "min") {
            setMinPrice(value);
            onPriceChange([value, maxPrice]);
        } else {
            setMaxPrice(value);
            onPriceChange([minPrice, value]);
        }
    };

    const handleSliderChange = (values: number[]) => {
        if (values.length === 2) {
            const [min, max] = values;
            setMinPrice(min);
            setMaxPrice(max);
            onPriceChange([min, max]);
        }
    };

    return (
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="mb-3 font-bold">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
                <Input
                    type="number"
                    placeholder="0"
                    min={0}
                    value={minPrice}
                    onChange={e =>
                        handleInputChange("min", Number(e.target.value))
                    }
                />
                <Input
                    type="number"
                    placeholder="5000"
                    min={0}
                    value={maxPrice}
                    onChange={e =>
                        handleInputChange("max", Number(e.target.value))
                    }
                />
            </div>
            <RangeSlider
                min={0}
                max={5000}
                step={10}
                value={[minPrice, maxPrice]}
                onValueChange={handleSliderChange} // Исправлено для совместимости типов
            />
        </div>
    );
}
