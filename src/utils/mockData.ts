const generateRandomDisciplineData = () => {
    const disciplineCode = Math.random().toString(36).substring(7);
    const name = "Random Discipline Name";
    const hoursLK = Math.floor(Math.random() * 10).toString();
    const hoursPZ = Math.floor(Math.random() * 10).toString();
    const hoursLR = Math.floor(Math.random() * 10).toString();
    const hoursKP = Math.floor(Math.random() * 10).toString();
    const hoursDiplom = Math.floor(Math.random() * 10).toString();
    const teachingLoadid = Math.random().toString(36).substring(7);

    return {
        disciplineCode,
        name,
        hoursLK,
        hoursPZ,
        hoursLR,
        hoursKP,
        hoursDiplom,
        teachingLoadid
    };
};

const generateRandomTeacherData = () => {
    const teacherCode = Math.random().toString(36).substring(7);
    const name = "Random Teacher Name";
    const surname = "Random Teacher Surname";
    const patronymic = "Random Teacher Patronymic";
    const birthday = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
    const position = "Random Position";
    const academicDegree = "Random Academic Degree";
    const academicTitle = "Random Academic Title";
    const occupiedRate = Math.random().toString();
    const employmentContract = "Random Employment Contract";
    const professionalDevelopment = "Random Professional Development";
    const jobDescription = Math.random() < 0.5;
    const email = "random@example.com";
    const phone = "1234567890";
    const publishing = generateRandomPublishingActivityData();
    const teachingLoad = generateRandomTeachingLoadData();

    return {
        teacherCode,
        name,
        surname,
        patronymic,
        birthday,
        position,
        academicDegree,
        academicTitle,
        occupiedRate,
        employmentContract,
        professionalDevelopment,
        jobDescription,
        email,
        phone
    };
};

const generateRandomPublishingActivityData = () => {
    const editionCode = Math.random().toString(36).substring(7);
    const editionName = "Random Edition Name";
    const autorCode = Math.random().toString(36).substring(7);
    const editionDate = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
    const confirmed = Math.random() < 0.5;
    const teachersTeacherCode = Math.random().toString(36).substring(7);

    return {
        editionCode,
        editionName,
        autorCode,
        editionDate,
        confirmed,
        teachersTeacherCode
    };
};

const generateRandomTeachingLoadData = () => {
    const id = Math.random().toString(36).substring(7);
    const schoolYear = "Random School Year";
    const instructorCode = Math.random().toString(36).substring(7);
    const hoursSum = Math.floor(Math.random() * 50).toString();
    const teachersTeacherCode = Math.random().toString(36).substring(7);
    const disciplines = generateRandomDisciplineData();

    return {
        id,
        schoolYear,
        instructorCode,
        hoursSum,
        teachersTeacherCode,
    };
};

export {generateRandomDisciplineData, generateRandomTeacherData, generateRandomPublishingActivityData, generateRandomTeachingLoadData}