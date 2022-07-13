import { db } from './firebase';
import { collection, getDoc, getDocs, onSnapshot, doc, query, where, addDoc, setDoc, deleteDoc } from 'firebase/firestore'


class DataService {
  _collectionName = "Checklist";
  _pathSalones = "salones/Madrid/Salones";
  _pathTipoAverias = "salones/Madrid/TiposAverias";
  _pathAverias = "salones/Madrid/Averias";
  _pathAveriasCerradas = "salones/Madrid/AveriasCerradas";
  _pathIsInicioTec = "salones/Madrid/Tecnicos";
  _pathComunidades = "/salones";

  async getMaquinas1(salon) {
    const collectionn = collection(db, "salones/Madrid/Averias")
    const querySnapshot = await getDocs(query(collectionn));
    querySnapshot.docs.map(doc => console.log(doc.id))
  }
  async getMaquinas(salon) {
    const path = `${this._pathSalones}/${salon}/Maquinas`;
    const collectionn = collection(db, path);
    return await getDocs(query(collectionn));
  }
  async getTipostAverias() {
    const collectionn = collection(db, this._pathTipoAverias);
    return await getDocs(query(collectionn));
  }
  async newTicket(ticket) {
    const { maquina, tipoAveria, prioridad, estadoMaquina, taquillero, cantDinero, detallesTicket, currentDate, currenTime, user } = ticket;
    const collectionn = collection(db, this._pathAverias);
    return await addDoc(collectionn, { maquina, tipoAveria, prioridad, estadoMaquina, taquillero, cantDinero, detallesTicket, currentDate, currenTime, user, state: 'Abierto' });
  } id
  async getListaAverias(salon) {
    const collectionn = collection(db, this._pathAverias);
    const querySnapShot = query(collectionn, where('user', '==', salon));
    const result = await getDocs(querySnapShot);
    result.docs.map(doc => console.log(doc.data()));
    return result.docs;
  }
  async getListTicketTecnico({ comunidad }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Tecnicos`);
    const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot)
    // console.log(result.docs);
    return result.docs;
  }
  async getStateInicioTecnico({ tec }) {
    const result = await getDoc(doc(db, this._pathIsInicioTec, tec))
    return result.data().isInicio;
  }
  async setIniciarJornada({ tec }) {
    await setDoc(doc(db, this._pathIsInicioTec, tec), { isInicio: true })
    const date = new Date();
    const currenTime = (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    const currentDate = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
    const inicoRef = doc(db, `${this._pathIsInicioTec}/${tec}/Inicio`, currentDate)
    await setDoc(inicoRef, { hora: currenTime })
  }
  async setFinalizarJornada({ tec }) {
    await setDoc(doc(db, this._pathIsInicioTec, tec), { isInicio: false })
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
    console.log(result.data());
    return result.data()?.hora ?? '00:00:00';
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
  async getCantTicketStandBy() {
    const collectionn = collection(db, this._pathAverias);
    const querySnapShot = query(collectionn, where('state', '==', 'En Proceso'));
    const result = await getDocs(querySnapShot);
    return result.docs.length;
  }
  async getCantTicketCloseToday() {
    const date = new Date();
    const closetDate = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
    // console.log(closetDate);
    const collectionn = collection(db, this._pathAveriasCerradas);
    const querySnapShot = query(collectionn, where('closetDate', '==', closetDate));
    const result = await getDocs(querySnapShot);
    return result.docs.length;
  }
  async getHallWithTicketOpen() {
    const arrayHallWhitFauls = []
    const collectionn = collection(db, this._pathAverias);
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
  async getLocationsHall() {
    const collectionn = collection(db, this._pathSalones);
    const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot);
    const locations = [];
    result.docs.forEach(doc => {
      const { _lat, _long } = doc.data().location;
      locations[doc.id] = { _lat, _long };
    })
    return locations;
  }
  async getListHall() {
    const collectionn = collection(db, this._pathSalones);
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

  /**
   * It gets the objectives of a classroom by community, classroom and period.
   */
  async getObjetivosBySalon({ comunidad, salon, periodo }) {
    const collectionn = doc(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}`);
    const result = await getDoc(collectionn);
    return result.data();
  }
  async getObjetivosTotalAlcanzadosBySalon({ comunidad, salon, periodo }) {
    let result = 0;
    // const arraCollections = await collectionGroup(getDoc(doc(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}`)));
    // console.log(arraCollections.get());
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}/7`);
    const querySnapShot = query(collectionn);
    const arrayDocs = await getDocs(querySnapShot);
    arrayDocs.forEach(doc => {
      result += doc.data().value;
    })
    return result;
  }
  async getObjetivosLastDayByAlcanzadosBySalon({ comunidad, salon, periodo, dia }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}/7`);
    const querySnapShot = query(collectionn);
    const arrayDocs = await getDocs(querySnapShot);
    const aa = arrayDocs.docs.sort((a, b) => b.id - a.id)
    return aa[0];
  }
  async getObjetivosByDayAlcanzadosBySalon({ comunidad, salon, periodo, dia }) {
    const collectionn = collection(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Objetivos/${periodo}/7`);
    const querySnapShot = query(collectionn);
    const arrayDocs = await getDocs(querySnapShot);
    // const aa = arrayDocs.docs.sort((a, b) => b.id - a.id)
    return arrayDocs.docs;
  }
}
export default new DataService();