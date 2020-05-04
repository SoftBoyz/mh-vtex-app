import { fbRef } from "../../../services/firebase-conf";

export const fetchProducts = async () => {
  const products = await fbRef.ref("products").once("value");
  return products.val();
};
