<template>
  <div class="max-w-md mx-auto space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900">Вход в систему</h2>
      <p class="mt-2 text-sm text-gray-600">Войдите в свой аккаунт</p>
    </div>

    <UForm
      ref="form"
      :schema="loginSchema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Email" name="email">
        <UInput
          v-model="state.email"
          type="email"
          placeholder="your@email.com"
          icon="i-heroicons-envelope"
        />
      </UFormGroup>

      <UFormGroup label="Пароль" name="password">
        <UInput
          v-model="state.password"
          type="password"
          placeholder="Введите пароль"
          icon="i-heroicons-lock-closed"
        />
      </UFormGroup>

      <UButton type="submit" block :loading="loading" :disabled="!canSubmit">
        {{ loading ? "Входим..." : "Войти" }}
      </UButton>
    </UForm>

    <div class="text-center">
      <p class="text-sm text-gray-600">
        Нет аккаунта?
        <NuxtLink to="/register" class="text-blue-600 hover:text-blue-500">
          Зарегистрируйтесь
        </NuxtLink>
      </p>
    </div>

    <div v-if="error" class="mt-4">
      <UAlert
        color="error"
        variant="soft"
        :title="error"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid' }"
        @close="error = null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { loginSchema, type LoginFormData } from "../lib/validation";

const state = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref<string | null>(null);

const authStore = useAuthStore();

const canSubmit = computed(() => {
  return state.email.length > 0 && state.password.length > 0;
});

const onSubmit = async (event: { data: LoginFormData }) => {
  loading.value = true;
  error.value = null;

  try {
    await authStore.login({
      email: event.data.email,
      password: event.data.password,
    });

    await navigateTo("/");
  } catch (err: any) {
    error.value = err.message || "Ошибка при входе";
  } finally {
    loading.value = false;
  }
};
</script>
