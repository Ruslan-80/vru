import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    switch (req.method) {
        case "PUT":
            // Обновление категории
            try {
                const { name, parentId } = req.body;
                const updatedCategory = await prisma.category.update({
                    where: { id: Number(id) },
                    data: { name, parentId },
                });
                res.status(200).json(updatedCategory);
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    error: "Ошибка при обновлении категории",
                });
            }
            break;
        case "DELETE":
            // Удаление категории
            try {
                await prisma.category.delete({
                    where: { id: Number(id) },
                });
                res.status(204).end();
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    error: "Ошибка при удалении категории",
                });
            }
            break;
        default:
            res.setHeader("Allow", ["PUT", "DELETE"]);
            res.status(405).end(`Метод ${req.method} не разрешён`);
            break;
    }
}
