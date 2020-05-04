import { fbRef } from "../../../services/firebase-conf";

export const fetchStores = async () => {
  const stores = await fbRef.ref("stores").once("value");
  return stores.val();
};
