<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { LoginForm } from "~/features/auth";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  title: "Вход в систему",
  layout: "auth",
});

const authStore = useAuthStore();

onMounted(() => {
  if (authStore.isAuthenticated) {
    navigateTo("/");
  }
});
</script>
