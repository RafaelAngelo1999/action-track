import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../repository/DbInstance";
import ToastService from "@/config/ToastService";

const userCollectionRef = collection(db, "statusActionCard");

const getAllStatusActionCards = async () => {
  try {
    const querySnapshot = await getDocs(userCollectionRef);
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return usersData;
  } catch (error) {
    ToastService.error("Erro ao obter usuários: " + error);
    throw error;
  }
};

const addStatusActionCard = async (user: any) => {
  try {
    const docRef = await addDoc(userCollectionRef, user);
    ToastService.success("Usuário adicionado com ID: " + docRef.id);
    return docRef.id;
  } catch (error) {
    ToastService.error("Erro ao adicionar usuário: " + error);
    throw error;
  }
};

const updateStatusActionCard = async (
  id: any,
  updatedStatusActionCard: any
) => {
  try {
    const userDoc = doc(userCollectionRef, id);
    await updateDoc(userDoc, updatedStatusActionCard);
    ToastService.success("Usuário atualizado com ID: " + id);
  } catch (error) {
    ToastService.error("Erro ao atualizar usuário: " + error);
    throw error;
  }
};

const deleteStatusActionCard = async (id: any) => {
  try {
    const userDoc = doc(userCollectionRef, id);
    await deleteDoc(userDoc);
    ToastService.success("Usuário deletado com ID: " + id);
  } catch (error) {
    ToastService.error("Erro ao deletar usuário: " + error);

    throw error;
  }
};

export {
  getAllStatusActionCards,
  addStatusActionCard,
  updateStatusActionCard,
  deleteStatusActionCard,
};
