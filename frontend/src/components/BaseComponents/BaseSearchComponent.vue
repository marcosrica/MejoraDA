<script setup lang="ts">

</script>

<template>
    <div class="Wrapper">
        <div class="Search CristalDiv">
            <div class="SearchIcon"/>
            <input type="search" class="InputField" placeholder="Search…" />
        </div>
        <div class="Filters CristalDiv">
            <div class="FilterIcon"/>
        </div>
    </div>
</template>

<style>
    .Wrapper {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        
        box-sizing: border-box;
        gap: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .CristalDiv {
        height: 100%;

        /*background: #0669dbab;*/
        background: var(--primary-glass);

        border-radius: 50px;
        
        backdrop-filter: blur(2px);
        background-image:
            radial-gradient(120% 80% at 15% -10%, rgba(255,255,255,.55), transparent 55%),
            radial-gradient(90% 70% at 95% 110%, rgba(0,200,255,.14), transparent 60%);
    }

    .Search {
        flex: 1;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .Filters {
        aspect-ratio: 1;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .FilterIcon {
        aspect-ratio: 1;
        height: 80%;
        background-color: white;
        mask: url('/Filter.svg') center / contain no-repeat;
    }

    .SearchIcon {
        margin-left: 10px;
        margin-right: 10px;
        aspect-ratio: 1;
        height: 80%;
        background-color: white;
        mask: url('/Search.svg') center / contain no-repeat;
    }

    .InputField { width: 16px; height: 16px; flex: none; }
    
    .InputField {
        all: unset;
        
        display: block;          
        box-sizing: border-box;  
        flex: 1;
        min-width: 0;            
        font: inherit;           
        color: inherit;
        caret-color: currentColor;
        
        color: white;
    }
    
    .InputField::placeholder { color: #888; }
    
    .InputField:focus-visible { outline: none; }

    input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
        display: none;
    }
</style>