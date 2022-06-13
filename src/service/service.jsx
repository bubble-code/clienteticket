import { db } from './firebase';
import { collection, getDoc, getDocs, onSnapshot, doc, query, where, addDoc, setDoc } from 'firebase/firestore'


class DataService {
  _collectionName = "Checklist";
  _pathSalones = "salones/Madrid/Salones";
  _pathTipoAverias = "salones/Madrid/TiposAverias";
  _pathAverias = "salones/Madrid/Averias";
  async getMaquinas1(salon) {
    const collectionn = collection(db, "salones/Madrid/Averias")
    // onSnapshot(collectionn, (snapShot) => console.log(snapShot))
    const querySnapshot = await getDocs(query(collectionn));
    querySnapshot.docs.map(doc => console.log(doc.id))
    // const result = await getDoc(doc(db, 'salones', "Madrid"))
    // console.log(result.ref.path)
    // console.log(querySnapshot.docs[0].id);
    // console.log({ querySnapshot });
    // querySnapshot.docs.map(doc => { console.log(doc) });
    // console.log(querySnapshot.docs.values());
    // return list;
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
    const { maquina, tipoAveria, prioridad, estadoMaquina, taquillero, isDinero, cantDinero, detallesTicket, currentDate, currenTime, user } = ticket;
    const dataRef = doc(db, this._pathAverias, maquina);
    return await setDoc(dataRef, { maquina, tipoAveria, prioridad, estadoMaquina, taquillero, isDinero, cantDinero, detallesTicket, currentDate, currenTime, user });
  }
  async getListaAverias(salon) {
    const collectionn = collection(db, this._pathAverias);
    const querySnapShot = query(collectionn, where('user', '==', salon));
    const result = await getDocs(querySnapShot);
    result.docs.map(doc => console.log(doc.data()));
    return result.docs;
  }
  async getListTicketTecnico() {
    const collectionn = collection(db, this._pathAverias);
    const querySnapShot = query(collectionn);
    const result = await getDocs(querySnapShot)
    return result.docs;
  }
}

export default new DataService();