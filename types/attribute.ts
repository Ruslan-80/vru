// types/attribute.ts
export type AttributeValue = {
    id: number;
    valueString: string;
    valueNumber?: number | null;
};

export type Attribute = {
    id: number;
    name: string;
    slug: string; // Добавляем обязательное поле slug
    values: AttributeValue[];
};
