import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import {dbFirebase} from "../config/firebase.js"
import Product from "../models/productModel.js"

// CREATE
export const createPurchaseService = async (purchaseData) => {
    // 1. Validaciones iniciales
    if(!purchaseData.items || !Array.isArray(purchaseData.items) || purchaseData.items.length === 0 ){
        const error = new Error("Items array is required and must not be empty")
        error.statusCode = 400
        throw error
    }

    let totalAmount = 0;
    const processedItems = [];

    // 2. Validar stock y comprobar precios puros en MongoDB
    for (const item of purchaseData.items) {
        // En lugar de confiar en el Frontend, buscamos la verdad en la Base de Datos
        const product = await Product.findById(item.productId);
        
        if (!product) {
            const error = new Error(`Product with ID ${item.productId} not found`);
            error.statusCode = 404;
            throw error;
        }

        // Chequear stock disponible
        if (product.quantity < item.quantity) {
            const error = new Error(`Not enough stock for product ${product.name}. Available: ${product.quantity}`);
            error.statusCode = 400;
            throw error;
        }

        // Calcular precio en el servidor asumiendo formula (precio * profitRate)
        const currentPrice = Number((product.price * product.profitRate).toFixed(2));
        
        totalAmount += currentPrice * item.quantity; // Sumamos al gran total
        console.log(purchaseData.userId)
        processedItems.push({
            productId: item.productId,
            name: product.name,           // Info auxiliar para el ticket en Firebase
            quantity: item.quantity,
            price: currentPrice,
            userId: purchaseData.userId        // Unitario final calculado en servidor
        });
    }

    // 3. Restar stock en tiempo real en MongoDB tras la aprobación
    for (const item of processedItems) {
        await Product.findOneAndUpdate(
            { _id: item.productId },
            { $inc: { quantity: -item.quantity } } // Sustracción asíncrona
        );
    }

    // 4. Armar ticket y guardar a la pasarela de Firebase limpio y blindado
    const purchaseDataWithTimeStamp = {
        ...purchaseData,
        items: processedItems, // Pisamos (sobrescribimos) cualquier ítem falso del Frontend
        totalAmount: Number(totalAmount.toFixed(2)), // Pisamos totales calculados
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