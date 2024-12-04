import {
    TopBar,
    Container,
    Filters,
    ProductsGroupList,
} from "@/components/shared";

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <h1 style={{ fontSize: "35px" }} className=" font-extrabold">
                    Home
                </h1>
            </Container>
            <TopBar />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    {/* Фильтрация */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    {/* Список товаров */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="ВРУ-1"
                                items={[
                                    {
                                        id: 1,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 3,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 4,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 5,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 6,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                ]}
                                categoryId={1}
                            />
                            <ProductsGroupList
                                title="ВРУ-3"
                                items={[
                                    {
                                        id: 7,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 8,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 9,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 10,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 11,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 12,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg",
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                ]}
                                categoryId={2}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
