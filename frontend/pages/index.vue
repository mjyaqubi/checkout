<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <h1>Products</h1>
      </v-col>
    </v-row>

    <v-item-group>
      <v-container>
        <v-row>
          <v-col v-for="product in products" :key="product.id" cols="12" md="4">
            <v-item>
              <v-card>
                <v-card-title>{{ product.name }}</v-card-title>
                <v-card-text></v-card-text>
                <v-card-actions class="d-flex justify-space-between">
                  <v-btn
                    color="deep-purple lighten-2"
                    text
                    @click="addToCart(product)"
                  >
                    Add to cart
                  </v-btn>
                  <span>${{ product.price }}</span>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import { CartActionTypes, CartItem } from '../store/cart'

@Component({
  name: 'HomePage',
})
export default class HomePage extends Vue {
  cartItems: CartItem[] = []

  asyncData() {
    return axios.get('http://localhost:3001/api/products').then((res) => {
      return { products: res.data }
    })
  }

  public created() {
    this.cartItems = this.$store.getters['cart/items']
  }

  addToCart(product: any) {
    this.$store.dispatch(`cart/${CartActionTypes.ADD_TO_CART}`, product)
  }
}
</script>
