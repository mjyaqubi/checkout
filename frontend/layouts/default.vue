<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title>
        <NuxtLink to="/">{{ title }}</NuxtLink>
      </v-toolbar-title>
      <v-spacer />
      <v-btn text large to="/cart">
        <v-icon>mdi-cart</v-icon>
        {{ this.$store.getters['cart/cartItemsCount'] }}
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>Checkout &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue } from 'nuxt-property-decorator'

export default class DefaultLayout extends Vue {
  data() {
    return {
      fixed: false,
      title: 'Checkout',
    }
  }
}
</script>
