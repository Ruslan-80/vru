import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { Attribute } from "@prisma/client";

export const getAll = async (): Promise<Attribute[]> => {
    const response = await axiosInstance.get<{ attributes: Attribute[] }>(
        ApiRoutes.ATTRIBUTES
    );

    return response.data.attributes;
};
