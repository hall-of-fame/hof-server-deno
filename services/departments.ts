import avatars from "./avatars.ts";

type Sticker = {
    desc: string;
    url: string;
}
type Category = {
    name: string;
    stickers: Array<Sticker>;
}
type Student = {
    name: string;
    avatar: string;
    categories: Array<Category>;
};
type Grade = {
    name: string;
    students: Array<Student>;
};
type Department = {
    name: string;
    grades: Array<Grade>;
}

const departments: Array<Department> = [];
const entryPath = "./static/departments";

for await (const department of Deno.readDir(entryPath)) {
    const grades: Grade[] = [];
    const gradesDir = `${entryPath}/${department.name}`;
    for await (const grade of Deno.readDir(gradesDir)) {
        const students: Student[] = [];
        const studentsDir = `${gradesDir}/${grade.name}`;
        for await (const student of Deno.readDir(studentsDir)) {
            const categories: Category[] = [{ name: "Default", stickers: [] }];
            const stickersDir = `${studentsDir}/${student.name}`;
            for await (const item of Deno.readDir(stickersDir)) {
                if (item.isDirectory) {
                    const categoryDir = `${stickersDir}/${item.name}`;
                    const stickers: Sticker[] = [];
                    for await (const sticker of Deno.readDir(categoryDir)) {
                        stickers.push({
                            desc: sticker.name.replace(/(.*)\.(.*)/, "$1"),
                            url: `/static/departments/${department.name}/${grade.name}/${student.name}/${item.name}/${sticker.name}`
                                .replaceAll(" ", "%20"),
                        });
                    }
                    categories.push({ name: item.name, stickers });
                } else {
                    categories[0].stickers.push({
                        desc: item.name.replace(/(.*)\.(.*)/, "$1"),
                        url: `/static/departments/${department.name}/${grade.name}/${student.name}/${item.name}`
                            .replaceAll(" ", "%20"),
                    });
                }
            }
            students.push({
                name: student.name,
                avatar: avatars[student.name],
                categories,
            });
        }
        grades.push({
            name: grade.name,
            students,
        });
    }
    departments.push({
        name: department.name,
        grades,
    });
}

export default departments;
