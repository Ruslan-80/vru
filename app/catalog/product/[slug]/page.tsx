import { Container, ProductCardOne } from "@/components/shared";
import axios from "axios";

interface ProductPageProps {
    params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;

    if (!slug) {
        return (
            <Container>
                <h1 className="text-2xl text-center mt-10">
                    Товар не найден (не передан slug)
                </h1>
            </Container>
        );
    }

    try {
        const response = await axios.get(
            `http://localhost:3000/api/products/${slug}`
        );
        const product = response.data;

        if (!product) {
            return (
                <Container>
                    <h1 className="text-2xl text-center mt-10">
                        Товар не найден
                    </h1>
                </Container>
            );
        }

        return (
            <Container className="mt-10">
                <div className="flex-1">
                    <div className="flex flex-col gap-16">
                        <ProductCardOne
                            id={product.id}
                            slug={product.slug}
                            article={product.article}
                            description={product.description}
                            manufacturingTime={product.manufacturingTime}
                            stock={product.stock}
                            name={product.name}
                            basePrice={product.basePrice}
                            attributes={product.attributes}
                            imageUrl="/images/vru1.png"
                        />
                    </div>
                </div>
            </Container>
        );
    } catch (error) {
        console.error("Error fetching product:", error);
        return (
            <Container>
                <h1 className="text-2xl text-center mt-10">
                    Произошла ошибка при загрузке товара
                </h1>
            </Container>
        );
    }
}
