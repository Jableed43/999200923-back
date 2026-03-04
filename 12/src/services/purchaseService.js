import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import {dbFirebase} from "../config/firebase.js"
// id: string,
// userId: string,
// items: [
// {	productId: string,
// 	quantity: number,
// 	price: number
//  }
// ],
// totalAmount: number (precio total de la compra),
// purchaseDate: Date,
// status: string (enum: COMPLETED, CANCELED, PENDING)

// CREATE
export const createPurchaseService = async (purchaseData) => {
    // validaciones
    // Validar que los items existan, sea un array y no este vacio
    if(!purchaseData.items || !Array.isArray(purchaseData.items) || purchaseData.items.length === 0 ){
        throw new Error("Items array is required and must not be empty")
    }

    // crear un objeto con los datos de la compra
    const purchaseDataWithTimeStamp = {
        ...purchaseData,
        purchaseDate: new Date(),
        status: "COMPLETED"
    }

    const docRef = await addDoc(collection(dbFirebase, "purchases"), purchaseDataWithTimeStamp)

    return {
        id: docRef.id,
        ...purchaseDataWithTimeStamp
    }
}

// GET
export const getAllPurchasesService = async () => {
    // 1. Creamos una consulta ordenada desde el origen (Firebase)
    // Esto reemplaza tu bloque de .sort() comentado
    const purchasesRef = collection(dbFirebase, "purchases");
    const q = query(purchasesRef, orderBy("purchaseDate", "desc"));

    const querySnapshot = await getDocs(q);
    const purchases = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        purchases.push({
            id: doc.id,
            ...data,
            // 2. Convertimos el Timestamp a un objeto Date de JS aquí mismo
            // Si purchaseDate existe, usamos toDate(), si no, queda como null
            purchaseDate: data.purchaseDate?.toDate ? data.purchaseDate.toDate() : data.purchaseDate
        });
    });

    return purchases; // Si está vacío, devolverá [] automáticamente por la inicialización
}

//get by user
export const getPurchasesByUserService = async (userId) => {
    try {
        const q = query(
            collection(dbFirebase, "purchases"),
            where("userId", "==", userId),
            orderBy("purchaseDate", "desc")
        );

        const querySnapshot = await getDocs(q);
        
        // Mapeamos los datos y convertimos la fecha de una vez
        const purchases = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convertimos el Timestamp a Date de JS para que sea útil en el front
            purchaseDate: doc.data().purchaseDate?.toDate ? doc.data().purchaseDate.toDate() : doc.data().purchaseDate
        }));

        return purchases;

    } catch (error) {
        return [];
    }
}

// get by id
export const getPurchaseByIdService = async (purchaseId) => {
    // crear referenciaal documento especifico
    const docRef = doc(dbFirebase, "purchases", purchaseId)

    // obtener snapshot del documento
    const docSnap = await getDoc(docRef)

    if(!docSnap.exists()){
        const error = new Error("Purchase not found")
        error.statusCode = 404
        throw error
    }

    return {
        ...docSnap.data(),
        id: docSnap.id,
        purchaseDate: docSnap.data().purchaseDate?.toDate ? docSnap.data().purchaseDate.toDate() : docSnap.data().purchaseDate
    }
}