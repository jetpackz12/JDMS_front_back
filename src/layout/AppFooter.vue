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
        <i class="pi pi-building"></i>
        <span class="mr-2">JetDorm</span>
        &copy;
        <span class="font-medium ml-2">Dormitory System</span>
    </div>
</template>
<style lang="scss" scoped></style>
