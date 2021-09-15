import { avatar } from "../config/config.ts"

const departments: Array<{
    name: string;
    grades: Array<{
        name: string;
        students: Array<{
            name: string,
            avatar: string,
            stickers: Array<{
                desc: string,
                url: string,
            }>
        }>
    }>
}> = [];
const entryPath = "./static/departments";

for await (const department of Deno.readDir(entryPath)) {
    const grades = [];
    const gradesDir = `${entryPath}/${department.name}`;
    for await (const grade of Deno.readDir(gradesDir)) {
        const students = [];
        const studentsDir = `${gradesDir}/${grade.name}`
        for await (const student of Deno.readDir(studentsDir)) {
            const stickers = [];
            const stickersDir = `${studentsDir}/${student.name}`
            for await (const item of Deno.readDir(stickersDir)) {
                if (item.isDirectory) {
                    const categoryDir = `${stickersDir}/${item.name}`
                    for await (const sticker of Deno.readDir(categoryDir)) {
                        stickers.push({
                            desc: sticker.name.replace(/(.*)\.(.*)/, "$1"),
                            url: `/static/departments/${department.name}/${grade.name}/${student.name}/${item.name}/${sticker.name}`
                                .replaceAll(" ", "%20")
                        });
                    }
                } else {
                    stickers.push({
                        desc: item.name.replace(/(.*)\.(.*)/, "$1"),
                        url: `/static/departments/${department.name}/${grade.name}/${student.name}/${item.name}`
                            .replaceAll(" ", "%20")
                    });
                }
            }
            students.push({
                name: student.name,
                avatar: avatar[student.name] ?? "",
                stickers: stickers
            })
        }
        grades.push({
            name: grade.name,
            students: students
        })
    }
    departments.push({
        name: department.name,
        grades: grades
    })
}

export default departments;
