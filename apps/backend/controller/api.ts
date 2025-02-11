import { Request, Response } from "express";
import { updateUser, fetchUser } from "../repository/userCollection";
import admin from "firebase-admin";
import { db } from "../config/firebaseConfig";

export const updateUserData = async (req: Request, res: Response) => {
  const { id, ...data } = req.body;
  if (!id) res.status(400).json({ message: "User ID is required" });

  // check is user owner
  const user = (req as any).user;
  if (user.uid !== id) {
    res.status(403).json({
      message: "Unauthorized: You are not allowed to update this user",
    });
    return;
  }

  try {
    await updateUser(id, data);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const fetchUserData = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "User ID is required" });
    return;
  }
  try {
    const user = await fetchUser(id);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.send(user);
    return;
  } catch (error) {
    res.status(500).send({ message: "Error fetching user", error });
    return;
  }
};

export const createUserData = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Simpan data pengguna ke Firestore
    await db.collection("USERS").doc(userRecord.uid).set({
      name,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res
      .status(201)
      .json({ uid: userRecord.uid, message: "User created successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
