import { transliterate as tr, slugify } from "transliteration";
// import slugify from "slugify";

function createSlug(text: string) {
    // Транслитерируем кириллицу в латиницу
    const transliterated = tr(text);
    // Создаем слаг
    const slug = slugify(transliterated, {
        lowercase: true,
        separator: "-",
    });

    return slug;
}

export default createSlug;
