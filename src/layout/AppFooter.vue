<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});
</script>

<template>
    <div class="layout-footer">
        <span class="font-medium mr-2">Dormitory System</span>
        by
        <img :src="logoUrl" alt="Logo" height="25" width="45" class="ml-2" />
    </div>
</template>
<style lang="scss" scoped></style>
