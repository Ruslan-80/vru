"use client";
import { cn } from "@/lib/utils";
import {
    FilterCheckbox,
    RangeSlider,
    CheckboxFiltersGroup,
} from "@/components/shared";
import { Input } from "../ui/input";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn("", className)}>
            <h2 className="mb-5 font-bold">Фильтрация</h2>
            {/* Верхние чекбоксы */}
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1" />
                <FilterCheckbox text="Новинки" value="2" />
            </div>
            {/* Цена */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="mb-3 font-bold">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        defaultValue={0}
                    />
                    <Input
                        type="number"
                        placeholder="1000"
                        min={100}
                        max={1000}
                        defaultValue={100}
                    />
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
            </div>
            <CheckboxFiltersGroup
                title="Ингридиенты"
                className="mt-5"
                limit={5}
                defaultItems={[
                    { text: "Сырный соус", value: "1" },
                    { text: "Моццарелла", value: "2" },
                    { text: "Чеснок", value: "3" },
                    { text: "Соленные огурчики", value: "4" },
                    { text: "Помидоры", value: "5" },
                    { text: "Красный лук", value: "6" },
                ]}
                items={[
                    { text: "Сырный соус", value: "1" },
                    { text: "Моццарелла", value: "2" },
                    { text: "Чеснок", value: "3" },
                    { text: "Соленные огурчики", value: "4" },
                    { text: "Помидоры", value: "5" },
                    { text: "Красный лук", value: "6" },
                    { text: "Сырный соус", value: "7" },
                    { text: "Моццарелла", value: "8" },
                    { text: "Чеснок", value: "9" },
                    { text: "Соленные огурчики", value: "10" },
                    { text: "Помидоры", value: "11" },
                    { text: "Красный лук", value: "12" },
                ]}
            />
        </div>
    );
};
