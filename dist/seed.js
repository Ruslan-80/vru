"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// prisma/seed.ts
var import_client = require("@prisma/client");
var import_bcryptjs = require("bcryptjs");
var import_slugify = __toESM(require("slugify"));
var prisma = new import_client.PrismaClient();
var tables = [
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
  "User"
];
async function resetDatabase() {
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`${table}\`;`);
  }
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
}
async function main() {
  await resetDatabase();
  const admin = await prisma.user.create({
    data: {
      fullName: "Admin",
      email: "admin@example.com",
      password: (0, import_bcryptjs.hashSync)("admin123", 10),
      role: import_client.UserRole.ADMIN
    }
  });
  const categories = await Promise.all(
    ["\u0412\u0420\u0423", "\u0429\u0410\u041F"].map(
      (name) => prisma.category.create({
        data: {
          name,
          slug: (0, import_slugify.default)(name, { lower: true, strict: true }),
          description: `${name} - \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438`
        }
      })
    )
  );
  const productsData = [
    {
      name: "\u0412\u0420\u04231-11-10 \u0423\u0425\u041B4",
      category: "\u0412\u0420\u0423",
      article: "VRU1-11-10",
      basePrice: 245e4,
      manufacturingTime: "5 \u0434\u043D\u0435\u0439",
      stock: 8,
      attributes: [
        { name: "\u041D\u0430\u043F\u0440\u044F\u0436\u0435\u043D\u0438\u0435", value: "380\u0412" },
        { name: "\u0422\u043E\u043A", value: "100\u0410" },
        { name: "\u0417\u0430\u0449\u0438\u0442\u0430", value: "IP54" }
      ]
    },
    {
      name: "\u0412\u0420\u04231-12-20 \u0423\u0425\u041B4",
      category: "\u0412\u0420\u0423",
      article: "VRU1-12-20",
      basePrice: 265e4,
      manufacturingTime: "7-10 \u0434\u043D\u0435\u0439",
      stock: 3,
      attributes: [
        { name: "\u041D\u0430\u043F\u0440\u044F\u0436\u0435\u043D\u0438\u0435", value: "380\u0412" },
        { name: "\u0422\u043E\u043A", value: "250\u0410" },
        { name: "\u0417\u0430\u0449\u0438\u0442\u0430", value: "IP31" }
      ]
    },
    {
      name: "\u0429\u0410\u041F-43-31 \u0423\u0425\u041B4 63\u0410",
      category: "\u0429\u0410\u041F",
      article: "SHAP-43-31",
      basePrice: 415e4,
      manufacturingTime: "10 \u0434\u043D\u0435\u0439",
      stock: 3,
      attributes: [
        { name: "\u041D\u0430\u043F\u0440\u044F\u0436\u0435\u043D\u0438\u0435", value: "380\u0412" },
        { name: "\u0422\u043E\u043A", value: "63\u0410" },
        { name: "\u0417\u0430\u0449\u0438\u0442\u0430", value: "IP65" }
      ]
    },
    {
      name: "\u0429\u0410\u041F-12-31 \u0423\u0425\u041B4 16\u0410",
      category: "\u0429\u0410\u041F",
      article: "SHAP-12-31",
      basePrice: 1782500,
      manufacturingTime: "5 \u0434\u043D\u0435\u0439",
      stock: 4,
      attributes: [
        { name: "\u041D\u0430\u043F\u0440\u044F\u0436\u0435\u043D\u0438\u0435", value: "220\u0412" },
        { name: "\u0422\u043E\u043A", value: "16\u0410" },
        { name: "\u0417\u0430\u0449\u0438\u0442\u0430", value: "IP31" }
      ]
    }
  ];
  for (const productData of productsData) {
    const category = categories.find((c) => c.name === productData.category);
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        slug: (0, import_slugify.default)(productData.article, {
          lower: true,
          strict: true
        }),
        article: productData.article,
        categoryId: category.id,
        basePrice: productData.basePrice,
        manufacturingTime: productData.manufacturingTime,
        stock: productData.stock,
        visibility: true
      }
    });
    for (const attr of productData.attributes) {
      const attributeSlug = (0, import_slugify.default)(attr.name, {
        lower: true,
        strict: true
      });
      const attribute = await prisma.attribute.upsert({
        where: { slug: attributeSlug },
        update: {},
        create: {
          name: attr.name,
          slug: attributeSlug
        }
      });
      const value = await prisma.attributeValue.create({
        data: {
          attributeId: attribute.id,
          valueString: attr.value,
          valueNumber: null
        }
      });
      await prisma.productAttribute.create({
        data: {
          productId: product.id,
          attributeId: attribute.id,
          attributeValueId: value.id
        }
      });
    }
  }
}
main().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
