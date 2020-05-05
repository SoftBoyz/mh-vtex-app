import { IDatabaseTypes } from "../Types"

export default class ShoppingCart {
  static INSTANCE: ShoppingCart | null = null

  static getInstance() {
    if (ShoppingCart.INSTANCE == null) ShoppingCart.INSTANCE = new ShoppingCart()
    return ShoppingCart.INSTANCE
  }

  _productsList: IDatabaseTypes['Products'][] = []
  _originStore: string = ''

  getProducts() {
    return this._productsList
  }

  addProduct(product: IDatabaseTypes['Products']) {
    this._productsList.push(product)
  } 

  removeProduct(index: number) {
    if (this._productsList.length == 1) this._productsList = []
    else this._productsList = this._productsList.splice(index, 1)
  }

  setOriginStore(uid: string) {
    this._originStore = uid
  }

  getOriginStore(): string {
    return this._originStore
  }
}