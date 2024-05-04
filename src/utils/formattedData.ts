export const formattedDate = (dateArg: Date) => {
    console.log('unformattedDate: ', dateArg);
    const date = new Date(dateArg);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    const formattedDate = `${day}/${month}/${year}`;

    console.log('formattedDate: ', formattedDate, day, month, year);

    return formattedDate;
}