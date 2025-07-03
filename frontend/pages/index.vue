<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Order Service</h1>
        <p class="text-xl text-gray-600 mb-12">Система управления заказами</p>
        <div class="space-x-4">
          <NuxtLink
            to="/login"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Войти в систему
          </NuxtLink>

          <NuxtLink
            to="/register"
            class="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Регистрация
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Order Service - Главная",
  meta: [
    {
      name: "description",
      content: "Система управления заказами и складскими запасами",
    },
  ],
});
</script>
