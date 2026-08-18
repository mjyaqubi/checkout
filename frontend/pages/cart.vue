<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <h1>Cart</h1>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th style="min-width: 90%" class="text-left">Name</th>
            <th class="text-left">Price/Unit</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>
              <v-btn text @click="increaseQuantity(item.id)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              {{ item.quantity }}
              <v-btn text @click="decreaseQuantity(item.id)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </td>
            <td>{{ item.price * item.quantity }}</td>
          </tr>
          <tr>
            <td colspan="4" class="text-right">Total:</td>
            <td class="text-left">{{ total }}</td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td class="text-right">
              <v-text-field
                v-model="promotionCode"
                label="Promotion code"
                hide-details="auto"
              ></v-text-field>
            </td>
            <td>
              <v-btn @click="applyPromotion()">Apply</v-btn>
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-right">Discount:</td>
            <td class="text-left">{{ discount }}</td>
          </tr>
          <tr>
            <td colspan="4" class="text-right">Total (after discount):</td>
            <td class="text-left">{{ payable }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import {
  CartActionTypes,
  CartGetterTypes,
  CartItem,
  Product,
  namespace,
} from '../store/cart'

@Component({
  name: 'CartPage',
})
export default class CartPage extends Vue {
  promotionCode: string = ''
  cartItems: CartItem[] = []
  total: number = 0
  discount: number = 0
  payable: number = 0

  public created() {
    this.refresh()
  }

  refresh() {
    this.cartItems = []
    this.cartItems =
      this.$store.getters[`${namespace}/${CartGetterTypes.CART_ITEMS}`]
    this.total = 0
    this.cartItems.forEach((element) => {
      if (element.quantity > 0) {
        this.total += element.price * element.quantity
      }
    })
    this.discount =
      this.$store.getters[`${namespace}/${CartGetterTypes.CART_DISCOUNT}`]
    this.payable = this.total - this.discount
  }

  addToCart(item: Product) {
    this.$store.dispatch(`${namespace}/${CartActionTypes.ADD_TO_CART}`, item)
    this.refresh()
  }

  removeFromCart(id: string) {
    this.$store.dispatch(`${namespace}/${CartActionTypes.REMOVE_FROM_CART}`, id)
    this.refresh()
  }

  increaseQuantity(id: string) {
    this.$store.dispatch(
      `${namespace}/${CartActionTypes.INCREASE_QUANTITY}`,
      id
    )
    this.refresh()
  }

  decreaseQuantity(id: string) {
    this.$store.dispatch(
      `${namespace}/${CartActionTypes.DECREASE_QUANTITY}`,
      id
    )
    this.refresh()
  }

  applyPromotion() {
    this.$store.dispatch(
      `${namespace}/${CartActionTypes.APPLY_PROMOTION}`,
      this.promotionCode
    )
    this.refresh()
  }
}
</script>
