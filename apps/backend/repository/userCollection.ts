import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";

const USERS_COLLECTION = "USERS";

export const updateUser = async (id: string, data: Partial<User>) => {
  await db.collection(USERS_COLLECTION).doc(id).update(data);
};

export const fetchUser = async (id: string) => {
  const doc = await db.collection(USERS_COLLECTION).doc(id).get();
  return doc.exists ? (doc.data() as User) : null;
};
