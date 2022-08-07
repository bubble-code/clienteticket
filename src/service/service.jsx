import { db } from './firebase';
import { collection, getDoc, getDocs, onSnapshot, doc, query, where, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'


class DataService {
  _collectionName = "Checklist";
  _pathSalones = "salones/Madrid/Salones";
  _pathTipoAverias = "salones/Madrid/TiposAverias";
  _pathAverias = "salones/Madrid/Averias";
  _pathAveriasCerradas = "salones/Madrid/AveriasCerradas";
  _pathIsInicioTec = "salones/Madrid/Tecnicos";
  _pathComunidades = "/salones";
  _pathJobs = "jobs";


  // **********************************Add a new machine to hall****************************************************
  async addMachine({ comunidad, salon, data }) {
    const { plaza, noMaquina, permiso, denominacion, observacion } = data;
    const collectionn = doc(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Maquinas`, plaza);
    await setDoc(collectionn, { noMaquina, permiso, denominacion, observacion });
  }


  async getMaquinas({ salon, comunidad }) {
    const path = `${this._pathComunidades}/${comunidad}/Salones/${salon}/Maquinas`;
    const collectionn = collection(db, path);
    return await getDocs(query(collectionn));
  }
  // **********************************Add a new machine to hall****************************************************
  // ************************Tickets*************************************************************************
  async getTipostAverias() {
    const collectionn = collection(db, this._pathTipoAverias);
    return await getDocs(query(collectionn));
  }
  async newTicket({ ticket, comunidad }) {
    const { maquina, tipoAveria, prioridad, estadoMaquina, taquillero, cantDinero, detallesTicket, currentDate, currenTime, user } = ticket;
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Averias`);
    return await addDoc(collectionn, { maquina, tipoAveria, prioridad, estadoMaquina, taquillero, cantDinero, detallesTicket, currentDate, currenTime, user, state: 'Abierto' });
  };
  async getListaAverias({ salon, comunidad }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Averias`);
    const querySnapShot = query(collectionn, where('user', '==', salon));
    const result = await getDocs(querySnapShot);
    return result.docs;
  }
  async getTicketById({ ticket }) {
    const result = await getDoc(doc(db, this._pathAverias, ticket))
    return result.data();
  }
  async closeTicket({ ticket, comment }) {
    const date = new Date();
    const closeTime = (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    const closetDate = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
    const collectionn = collection(db, this._pathAveriasCerradas);
    const result = await this.getTicketById({ ticket });
    await addDoc(collectionn, { ...result, comment, closeTime, closetDate });
    await deleteDoc(doc(db, this._pathAverias, ticket))
  }
  async aplazarTicket({ ticket, comment }) {
    const date = new Date();
    const aplazarTime = (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    const aplazarDate = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
    const dataCurrentTicket = await this.getTicketById({ ticket });
    const ticketRef = doc(db, this._pathAverias, ticket);
    await setDoc(ticketRef, { ...dataCurrentTicket, commentAplazar: comment, aplazarTime, aplazarDate, state: 'En Proceso' });
  }
  async getTicketCloseByHall({ hall }) {
    const collectionn = collection(db, this._pathAveriasCerradas);
    const querySnapShot = query(collectionn, where('user', '==', hall));
    const result = await getDocs(querySnapShot);
    return result.docs;
  }
  async getCantTicketOpen() {
    const collectionn = collection(db, this._pathAverias);
    const querySnapShot = query(collectionn, where('state', '==', 'Abierto'));
    const result = await getDocs(querySnapShot);
    return result.docs.length;
  }
  async getCantTicketStandBy({ comunidad, hall }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Averias`);
    const querySnapShot = query(collectionn, where('user', '==', hall), where('state', '==', "En Proceso"));
    const result = await getDocs(querySnapShot);
    return result.docs.length;
  }
  async getCantTicketCloseToday({ comunidad, hall }) {
    const date = new Date();
    const closetDate = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
    // console.log(closetDate);
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/AveriasCerradas`);
    const querySnapShot = query(collectionn, where('user', '==', hall), where('closetDate', '==', closetDate));
    // const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot);
    return result.docs.length;
  }
  async getHallWithTicketOpen({ comunidad }) {
    const arrayHallWhitFauls = []
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Averias`);
    const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot);
    result.docs.forEach(doc => {
      const hall = doc.data().user;
      if (arrayHallWhitFauls[hall]) {
        arrayHallWhitFauls[hall] += 1;
      } else {
        arrayHallWhitFauls[hall] = 1;
      }
    })
    return arrayHallWhitFauls;
  }
  async getListTicketByComunidad({ comunidad }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Averias`);
    const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot);
    return result.docs;
  }
  // ************************Tickets*************************************************************************

  // *****************************************Tecnicos***********************************************************
  async getListTecnicosByComu({ comunidad }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Tecnicos`);
    const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot)
    return result.docs;
  }
  async getStateInicioTecnico({ comunidad, tec }) {
    const result = await getDoc(doc(db, `${this._pathComunidades}/${comunidad}/Tecnicos`, tec))
    return result.data().isInicio;
  }
  async setIniciarJornada({ tec, comunidad, place }) {
    await updateDoc(doc(db, `${this._pathComunidades}/${comunidad}/Tecnicos`, tec), { isInicio: true })
    const date = new Date();
    const currenTime = (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    const currentDate = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
    const inicoRef = doc(db, `${this._pathComunidades}/${comunidad}/Tecnicos/${tec}/Inicio`, currentDate)
    await setDoc(inicoRef, { hora: currenTime, lugar: place })
  }
  async setFinalizarJornada({ comunidad, tec }) {
    await setDoc(doc(db, `${this._pathComunidades}/${comunidad}/Tecnicos`, tec), { isInicio: false })
    const date = new Date();
    const currenTime = (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    const currentDate = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
    const inicoRef = doc(db, `${this._pathIsInicioTec}/${tec}/Cierre`, currentDate)
    await setDoc(inicoRef, { hora: currenTime })
  }
  async getTimeStartTec({ tec }) {
    const date = new Date();
    const dateInicio = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
    // const collectionn = collection(db, `${this._pathIsInicioTec}/${tec}/Inicio`);
    const result = await getDoc(doc(db, `${this._pathIsInicioTec}/${tec}/Inicio`, dateInicio));
    // console.log(result.data());
    return result.data()?.hora ?? '00:00:00';
  }
  async getJobsTecnicos({ comunidad }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/jobs`);
    const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot);
    return result.docs;
  }
  // ******************************************Tecnicos***********************************************************
  async getListHall({ comunidad }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Salones`);
    // const collectionn = collection(db, this._pathSalones);
    const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot);
    return result.docs;
  }

  async getListComunidad() {
    const collectionn = collection(db, this._pathComunidades);
    const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot);
    return result.docs;
  }

  // metodos para el manejo de los horarios de los tecnicos   

  async getPartialRecaudacion({ comunidad, mes, queryData, startDay = 1 }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Horario/${mes}/${queryData}`);
    const querySnapShot = query(collectionn);
    const tempResult = await getDocs(querySnapShot);
    const result = tempResult.docs.filter(doc => doc.id >= startDay);
    return result;
  }
  // ***🍕*******************************Metodos para los Objetivos***********************************************************
  // Actualizar Objetivos
  async updateObjetivo({ comunidad, salon, objetivo, periodo }) {
    const objetivosRef = doc(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}`);
    await updateDoc(objetivosRef, { objetivo: objetivo });
  }

  async getObjetivosBySalon({ comunidad, salon, periodo }) {
    const collectionn = doc(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}`);
    const result = await getDoc(collectionn);
    return result.data();
  }
  async getObjetivosTotalAlcanzadosBySalon({ comunidad, salon, periodo, mes }) {
    let result = 0;
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}/${mes}`);
    const querySnapShot = query(collectionn);
    const arrayDocs = await getDocs(querySnapShot);
    arrayDocs.forEach(doc => {
      result += doc.data().value;
    })
    return result;
  }
  async getObjetivosLastDayByAlcanzadosBySalon({ comunidad, salon, periodo, mes }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}/${mes}`);
    const querySnapShot = query(collectionn);
    const arrayDocs = await getDocs(querySnapShot);
    const sortDiarios = arrayDocs.docs?.sort((a, b) => b.id - a.id)
    const totalDiario = sortDiarios[0]?.data().value;
    const diaa = sortDiarios[0]?.id;
    return { totalDiario, diaa };
  }
  async getObjetivosByDayAlcanzadosBySalon({ comunidad, salon, periodo, mes }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}/${mes}`);
    const querySnapShot = query(collectionn);
    const arrayDocs = await getDocs(querySnapShot);
    // const aa = arrayDocs.docs.sort((a, b) => b.id - a.id)
    return arrayDocs.docs;
  }
  // **********************************Metodos para los Objetivos***********************************************************
  // **********************************facturacion***********************************************************
  async postFacturacionBySalon({ comunidad, salon, periodo, dia, mes, value }) {
    const converValue = Number(value);
    const docRef = doc(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}/${mes}`, `${dia}`);
    await setDoc(docRef, { value: converValue });
    // return result.data();
  }
  // **********************************Mapas***********************************************************
  async getLocationsHall({ comunidad }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Salones`);
    const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot);
    const locations = [];
    result.docs.forEach(doc => {
      const { _lat, _long } = doc.data().location;
      locations[doc.id] = { _lat, _long };
    })
    return locations;
  }
  async getLocationComunidad({ comunidad }) {
    const collectionn = doc(db, `${this._pathComunidades}/${comunidad}`);
    const result = await getDoc(collectionn);
    const { _lat, _long } = result.data().center;
    return { _lat, _long };
  }
}
export default new DataService();