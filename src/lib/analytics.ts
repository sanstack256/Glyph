import {
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { db } from "./firebase";

export async function trackGenerate() {
  await updateDoc(
    doc(db, "analytics", "global"),
    {
      generateCount: increment(1),
    }
  );
}