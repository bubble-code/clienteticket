export const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const dayOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

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

// Function to get the first and end day of the week,tha take the current date as parameter
function obtenerInicioYFinSemana(fecha) {
    const ff = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    console.log(ff);
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - fecha.getDay() + 1).getDate();
    // inicio: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - fecha.getDay() + 1).getDate(),
    // fin: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 7 - fecha.getDay()).getDate(),
}

export const headerDiasTableHorario = ({ semana, fecha }) => {
    const date = new Date(fecha);
    let result = obtenerInicioYFinSemana(date);
    const month = ((date.getMonth() + 1) % 2) === 0 ? 31 : 30;
    const columns = [
        {
            title: `Semana ${semana}`,
            dataIndex: 'semana',
            key: 'semana',
            render: (text) => <div onclick={() => { console.log('click') }} >{text}</div>

        }];
    for (let i = 0; i < 7; i++, result++) {
        if (result > month) result = 1;
        columns.push({
            title: `${dayOfWeek[i]} ${result}`,
            dataIndex: 'name',
            key: 'name',
        })
        // if (result > month) result = 0;
    }

    return columns;
}

const getDaysOfWeek = () => {
    const date = new Date();
    const days = [];
    for (let i = 1; i <= 7; i++) {
        const day = new Date(date);
        day.setDate(date.getDate() - date.getDay() + i);
        days.push(day);
    }
    console.log(days);
    return days;
};