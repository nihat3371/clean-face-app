import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export async function addAnalysis(userId, analysis) {
  const docRef = await addDoc(collection(db, "analyses"), {
    ...analysis,
    userId,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function getAnalyses(userId) {
  const q = query(
    collection(db, "analyses"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
