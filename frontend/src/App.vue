<script setup lang="ts">
    import { onMounted } from 'vue';
    import startCheck from './Utilities/TokenExpiringChecker';
    
    onMounted(() => {
        startCheck();
    });
</script>

<template>
    <router-view />
</template>

<style>
    html, body {
        margin: 0;
        padding: 0;
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Helvetica,
            Arial,
            sans-serif;
    }
</style>