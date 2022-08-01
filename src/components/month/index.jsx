export const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const dayOfWeek = ['Dom', 'Lun', 'Mar', 'Miér', 'Jue', 'Vie', 'Sáb',];

export const cntWeek = () => {
    const date = new Date();
    const year = date.getFullYear();
    const mes = date.getMonth();
    const primerdia = ((new Date(year, mes, 1).getDay() - 1) % 7 + 7) % 7;
    const dias = new Date(year, mes + 1, 0).getDate() - 7 + primerdia;
    return Math.ceil(dias / 7) + 1;
}

export const numberWeek = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));

    return Math.ceil(days / 7);
}