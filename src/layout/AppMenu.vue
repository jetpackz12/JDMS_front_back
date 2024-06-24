<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Menu',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' },
            { label: 'Rooms', icon: 'pi pi-fw pi-building', to: '/rooms' },
            { label: 'Tenants', icon: 'pi pi-fw pi-users', to: '/tenants' },
            { label: 'Guests', icon: 'pi pi-fw pi-users', to: '/guests' },
            { label: 'Water Billing Payment', icon: 'pi pi-fw pi-cloud', to: '/waterBillingPayment' },
            { label: 'Electricity Billing Payment', icon: 'pi pi-fw pi-bolt', to: '/electricityBillingPayment' },
            { label: 'Tenant Billing Payment', icon: 'pi pi-fw pi-users', to: '/tenantBillingPayment' },
            { label: 'Reports', icon: 'pi pi-fw pi-book', to: '/reports' }
        ]
    },
    {
        label: 'User Settings',
        items: [
            { label: 'Change Password', icon: 'pi pi-fw pi-user-edit', to: '/changePassword' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
