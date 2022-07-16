type Sticker = {
    desc: string;
    url: string;
}
type Student = {
    name: string;
    stickers: Array<Sticker>;
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
            const stickers: Sticker[] = [];
            const stickersDir = `${studentsDir}/${student.name}`;
            for await (const item of Deno.readDir(stickersDir)) {
                if (item.isDirectory) {
                    const categoryDir = `${stickersDir}/${item.name}`;
                    for await (const sticker of Deno.readDir(categoryDir)) {
                        stickers.push({
                            desc: sticker.name.replace(/(.*)\.(.*)/, "$1"),
                            url: `/static/departments/${department.name}/${grade.name}/${student.name}/${item.name}/${sticker.name}`
                                .replaceAll(" ", "%20"),
                        });
                    }
                } else {
                    stickers.push({
                        desc: item.name.replace(/(.*)\.(.*)/, "$1"),
                        url: `/static/departments/${department.name}/${grade.name}/${student.name}/${item.name}`
                            .replaceAll(" ", "%20"),
                    });
                }
            }
            students.push({
                name: student.name,
                stickers: stickers,
            });
        }
        grades.push({
            name: grade.name,
            students: students,
        });
    }
    departments.push({
        name: department.name,
        grades: grades,
    });
}

export default departments;
