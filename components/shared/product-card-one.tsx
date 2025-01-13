import Link from "next/link";
import { Heart, BarChart2, ShoppingCart } from "lucide-react";
import { Button, Badge } from "../ui";
import { Card, CardContent, CardFooter } from "../ui/card";

interface Props {
    id: number;
    slug: string;
    article: string;
    name: string;
    description: any;
    manufacturingTime: string;
    basePrice: any;
    stock: number;
    attributes: {
        name: string;
        value: number | string;
    }[];
    imageUrl: string;
    className?: string;
}

export const ProductCardOne: React.FC<Props> = ({
    id,
    article,
    slug,
    name,
    description,
    manufacturingTime,
    stock,
    basePrice,
    attributes,
    imageUrl,
}) => {
    return (
        <Card className="w-full max-w-[1280px] overflow-hidden transition-all duration-300 hover:shadow-lg">
            <Link href={`/catalog/product/${slug}`} className="group">
                <CardContent className="p-0" key={id}>
                    <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-2/5 h-[300px] md:h-[550px]">
                            <img
                                src={imageUrl}
                                alt={name}
                                className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
                            />
                            <Badge className="absolute top-4 left-4 bg-green-500">
                                Новинка
                            </Badge>
                        </div>
                        <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold tracking-tight max-w-[500px]">
                                        {name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        артикул: {article}
                                    </p>
                                </div>
                                <p className="text-muted-foreground mb-6">
                                    {description}
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {attributes.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col"
                                        >
                                            <span className="text-sm font-medium">
                                                {item.name}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-3xl font-bold">
                                        {Number(basePrice).toLocaleString(
                                            "en-US",
                                            {
                                                style: "currency",
                                                currency: "RUB",
                                            }
                                        )}
                                    </span>
                                    {stock > 0 ? (
                                        <Badge
                                            variant="outline"
                                            className="bg-green-100 text-green-800"
                                        >
                                            На складе: {stock}
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className="bg-red-100 text-red-800"
                                        >
                                            Out of Stock
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Срок изготовления: {manufacturingTime}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-muted p-6">
                    <div className="flex space-x-4">
                        <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <BarChart2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button className="w-1/2">
                        <ShoppingCart className="mr-2 h-4 w-4" /> В корзину
                    </Button>
                </CardFooter>
            </Link>
        </Card>
    );
};
