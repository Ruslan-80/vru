import { PrismaClient, UserRole, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

async function up() {
    // Создаем двух пользователей с разными ролями
    const user1 = await prisma.user.create({
        data: {
            fullName: "Иван Иванов",
            email: "ivan@example.com",
            password: hashSync("password123", 10), // Хешируем пароль
            role: UserRole.USER,
            verified: new Date(),
        },
    });

    const user2 = await prisma.user.create({
        data: {
            fullName: "Админ Админов",
            email: "admin@example.com",
            password: hashSync("adminpass123", 10), // Хешируем пароль
            role: UserRole.ADMIN,
            verified: new Date(),
        },
    });

    console.log("Пользователи успешно добавлены:");
    console.log({ user1, user2 });
    // Создаем две категории
    const category1 = await prisma.category.create({
        data: {
            name: "Вводно-распределительные устройства (ВРУ)",
            slug: "vru",
            description: "Категория для ВРУ",
        },
    });

    const category2 = await prisma.category.create({
        data: {
            name: "Щиты автоматического ввода резерва (АВР)",
            slug: "avr",
            description: "Категория для АВР",
        },
    });

    // Создаем 4 товара, привязанных к категориям
    const product1 = await prisma.product.create({
        data: {
            categoryId: category1.id,
            article: "VRU-1-11-10",
            name: "Вводно-распределительное устройство ВРУ-1-11-10",
            slug: "vru-1-11-10",
            description: "ВРУ для распределения электроэнергии",
            basePrice: new Prisma.Decimal(109877),
            manufacturingTime: "10 дней",
            stock: 3,
            visibility: true,
        },
    });

    const product2 = await prisma.product.create({
        data: {
            categoryId: category1.id,
            article: "VRU-2-21-20",
            name: "Вводно-распределительное устройство ВРУ-2-21-20",
            slug: "vru-2-21-20",
            description: "ВРУ с повышенной защитой",
            basePrice: new Prisma.Decimal(125000),
            manufacturingTime: "12 дней",
            stock: 5,
            visibility: true,
        },
    });

    const product3 = await prisma.product.create({
        data: {
            categoryId: category2.id,
            article: "AVR-1-AVR",
            name: "Щит АВР 100А",
            slug: "avr-1-avr",
            description: "Щит автоматического ввода резерва 100А",
            basePrice: new Prisma.Decimal(89000),
            manufacturingTime: "7 дней",
            stock: 2,
            visibility: true,
        },
    });

    const product4 = await prisma.product.create({
        data: {
            categoryId: category2.id,
            article: "AVR-2-AVR",
            name: "Щит АВР 250А",
            slug: "avr-2-avr",
            description: "Щит автоматического ввода резерва 250А",
            basePrice: new Prisma.Decimal(150000),
            manufacturingTime: "15 дней",
            stock: 4,
            visibility: true,
        },
    });
    console.log("Категории и товары успешно добавлены!");
    console.log({ product1, product2, product3, product4 });
}

async function down() {
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0`);

    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`VerificationCode\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`CartItem\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`Cart\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`Order\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`ProductAttribute\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`ProductVariation\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`AttributeValue\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`Attribute\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`MediaFile\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`Product\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`Category\``);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`User\``);

    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1`);

    console.log("Все таблицы очищены!");
}
async function main() {
    try {
        await down();
        await up();
    } catch (error) {
        console.error(error);
    }
}
main().then(async () => {
    await prisma.$disconnect();
});
