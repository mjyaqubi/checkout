<template>
  <div class="VueToNuxtLogo">
    <svg
      width="245"
      height="180"
      viewBox="0 0 245 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M122.5 0L245 180H0L122.5 0Z" fill="#00DC82" />
    </svg>
  </div>
</template>

<style scoped>
.VueToNuxtLogo {
  display: inline-block;
  animation: turn 2s linear infinite;
  transform: rotateX(0deg);
}

@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}
</style>
