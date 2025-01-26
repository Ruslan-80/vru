import { Api } from "@/services/api-client";
import { Attribute } from "@prisma/client";
import React from "react";

type AttributeItem = Pick<Attribute, "id" | "name">;

interface ReturnProps {
    attributes: AttributeItem[];
}
export const useFilterAttributes = (): ReturnProps => {
    const [attributes, setAttributes] = React.useState<
        ReturnProps["attributes"]
    >([]);

    React.useEffect(() => {
        async function fetchAttributes() {
            try {
                const attributes = await Api.attributes.getAll();
                setAttributes(
                    attributes.map(attribute => ({
                        id: attribute.id,
                        name: attribute.name,
                    }))
                );
            } catch (error) {
                console.log(error);
            }
        }
        fetchAttributes();
    }, []);

    return { attributes };
};
