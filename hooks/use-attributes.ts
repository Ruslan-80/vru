import { Api } from "@/services/api-client";
import { Attribute } from "@/types/attribute";
import React from "react";

export const useAttributes = () => {
    const [attributes, setAttributes] = React.useState<Attribute[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchAttributes() {
            try {
                setLoading(true);
                const attributes = await Api.attributes.getAll();
                setAttributes(
                    attributes.map(attribute => ({
                        id: attribute.id,
                        name: attribute.name,
                        slug: attribute.slug,
                        values: attribute.values,
                    }))
                );
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchAttributes();
    }, []);
    return {
        attributes,
        loading,
    };
};
