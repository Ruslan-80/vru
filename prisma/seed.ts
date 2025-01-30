import { PrismaClient, UserRole } from "@prisma/client";
import { hashSync } from "bcryptjs";
import slugify from "slugify";

const prisma = new PrismaClient();

// Полный список таблиц в порядке удаления
const tables = [
    "CartItem",
    "Cart",
    "Order",
    "ProductAttribute",
    "AttributeValue",
    "Attribute",
    "ProductVariation",
    "MediaFile",
    "Product",
    "Category",
    "VerificationCode",
    "User",
];

async function resetDatabase() {
    // Отключаем проверку внешних ключей
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;

    // Удаляем данные и сбрасываем автоинкремент
    for (const table of tables) {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`${table}\`;`);
    }

    // Включаем проверку внешних ключей
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
}

async function main() {
    // Полный сброс БД
    await resetDatabase();

    // Создаем администратора
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const admin = await prisma.user.create({
        data: {
            fullName: "Admin",
            email: "admin@example.com",
            password: hashSync("admin123", 10),
            role: UserRole.ADMIN,
        },
    });

    // Создаем категории
    const categories = await Promise.all(
        [
            "Вводно-распределительные устройства ВРУ",
            "Щиты автоматического резерва ЩАП",
            "Главные распределительные щиты ГРЩ",
            "Ящики управления РУСМ5000",
        ].map(name =>
            prisma.category.create({
                data: {
                    name,
                    slug: slugify(name, { lower: true, strict: true }),
                    description: `${name} - описание категории`,
                },
            })
        )
    );

    // Данные для товаров
    const productsData = [
        {
            name: "ВРУ1-11-10 УХЛ4",
            category: "Вводно-распределительные устройства ВРУ",
            article: "VRU1-11-10",
            basePrice: 24500,
            manufacturingTime: "5 дней",
            stock: 8,
            attributes: [
                { name: "Напряжение", value: "380В" },
                { name: "Ток", value: "100А" },
                { name: "Защита", value: "IP54" },
            ],
        },
        {
            name: "ВРУ1-12-20 УХЛ4",
            category: "Вводно-распределительные устройства ВРУ",
            article: "VRU1-12-20",
            basePrice: 26500,
            manufacturingTime: "7-10 дней",
            stock: 3,
            attributes: [
                { name: "Напряжение", value: "380В" },
                { name: "Ток", value: "250А" },
                { name: "Защита", value: "IP31" },
            ],
        },
        {
            name: "ЩАП-43-31 УХЛ4 63А",
            category: "Щиты автоматического резерва ЩАП",
            article: "SHAP-43-31",
            basePrice: 41500,
            manufacturingTime: "10 дней",
            stock: 3,
            attributes: [
                { name: "Напряжение", value: "380В" },
                { name: "Ток", value: "63А" },
                { name: "Защита", value: "IP65" },
            ],
        },
        {
            name: "ЩАП-12-31 УХЛ4 16А",
            category: "Щиты автоматического резерва ЩАП",
            article: "SHAP-12-31",
            basePrice: 17825,
            manufacturingTime: "5 дней",
            stock: 4,
            attributes: [
                { name: "Напряжение", value: "220В" },
                { name: "Ток", value: "16А" },
                { name: "Защита", value: "IP31" },
            ],
        },
        {
            name: "Я5110-1874 УХЛ4 ящик управления электродвигателем",
            category: "Ящики управления РУСМ5000",
            article: "Я51110-1874 УХЛ4",
            basePrice: 10316,
            manufacturingTime: "5 дней",
            stock: 4,
            attributes: [
                { name: "Напряжение", value: "380В" },
                { name: "Ток", value: "0,6А" },
                { name: "Защита", value: "IP31" },
            ],
        },
        {
            name: "Я5110-3274 УХЛ4 ящик управления электродвигателем",
            category: "Ящики управления РУСМ5000",
            article: "Я5110-3274 УХЛ4",
            basePrice: 10883,
            manufacturingTime: "5 дней",
            stock: 4,
            attributes: [
                { name: "Напряжение", value: "380В" },
                { name: "Ток", value: "16А" },
                { name: "Защита", value: "IP31" },
            ],
        },
    ];

    // Создаем товары
    for (const productData of productsData) {
        const category = categories.find(c => c.name === productData.category)!;

        const product = await prisma.product.create({
            data: {
                name: productData.name,
                slug: slugify(productData.article, {
                    lower: true,
                    strict: true,
                }),
                article: productData.article,
                categoryId: category.id,
                basePrice: productData.basePrice,
                manufacturingTime: productData.manufacturingTime,
                stock: productData.stock,
                visibility: true,
            },
        });

        // Создаем атрибуты
        for (const attr of productData.attributes) {
            const attributeSlug = slugify(attr.name, {
                lower: true,
                strict: true,
            });

            const attribute = await prisma.attribute.upsert({
                where: { slug: attributeSlug },
                update: {},
                create: {
                    name: attr.name,
                    slug: attributeSlug,
                },
            });

            const value = await prisma.attributeValue.create({
                data: {
                    attributeId: attribute.id,
                    valueString: attr.value,
                    valueNumber: null,
                },
            });

            await prisma.productAttribute.create({
                data: {
                    productId: product.id,
                    attributeId: attribute.id,
                    attributeValueId: value.id,
                },
            });
        }
    }
}

main()
    .catch(e => {
        console.error("Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
