import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: "John Doe",
                email: "FtX3f@example.com",
                password: hashSync("111111", 10),
                verified: new Date(),
                role: "USER",
            },
            {
                fullName: "Admin Test",
                email: "AbVd5@example.com",
                password: hashSync("111111", 10),
                verified: new Date(),
                role: "ADMIN",
            },
        ],
    });
}
async function down() {
    // Отключаем проверку внешних ключей
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0`);

    // Очищаем таблицу и сбрасываем автоинкремент
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`User\``);

    // Включаем проверку внешних ключей обратно
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1`);
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
