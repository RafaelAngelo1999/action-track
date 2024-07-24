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

const userCollectionRef = collection(db, "responsible");

const getAllResponsibles = async () => {
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

const addResponsible = async (user: any) => {
  try {
    const docRef = await addDoc(userCollectionRef, user);
    ToastService.success("Usuário adicionado com ID: " + docRef.id);
    return docRef.id;
  } catch (error) {
    ToastService.error("Erro ao adicionar usuário: " + error);
    throw error;
  }
};

const updateResponsible = async (id: any, updatedResponsible: any) => {
  try {
    const userDoc = doc(userCollectionRef, id);
    await updateDoc(userDoc, updatedResponsible);
    ToastService.success("Usuário atualizado com ID: " + id);
  } catch (error) {
    ToastService.error("Erro ao atualizar usuário: " + error);
    throw error;
  }
};

const deleteResponsible = async (id: any) => {
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
  getAllResponsibles,
  addResponsible,
  updateResponsible,
  deleteResponsible,
};
