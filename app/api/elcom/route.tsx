import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await axios.get(
            `https://b2b.el-com.ru/api/v1/product?per-page=20&page=1`,
            {
                headers: {
                    Authorization: "Bearer kOEWuGGrPjVPeb0Q__ZG3OuBe2Fcfsrx",
                    "Content-Type": "application/json",
                },
            }
        );
        const items = response.data.items;

        const filteredProducts = items.map((item: any) => ({
            id: item.article,
            name: item.name,
            brand: item.brand.name,
            article: item.manufacturerCode,
            contractPrice: item.contractPrice,
            defaultPrice: item.defaultPrice,
            stocks: item.stocks[0].amount,
            image: item.image["60"],
        }));
        return NextResponse.json({ data: filteredProducts }, { status: 200 });
    } catch (error) {
        console.error("Ошибка при запросе:", error);
        return NextResponse.json(
            { error: "Не удалось получить данные" },
            { status: 500 }
        );
    }
}
