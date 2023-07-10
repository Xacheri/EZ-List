<template>
    <hr class="m-1">
    <div class="ms-3 mb-1 d-flex justify-content-between align-items-center">
        <h2 class="h5">{{ list.listName }}</h2><span><img src="src\assets\shopping-cart-outline.svg" alt="" width="30" @click="$emit('listSelected', list)"><img class="m-2" src="src\assets\trash.svg" alt="" width="25"></span>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        props: {
            list: {
                type: Object,
                default: {
                }
            }
        },
        emits: ['listSelected']
    }
</script>
<style scoped>
    .list {
        margin: 1rem;
    }

    hr {
        border: 1px solid black;
    }

    img {
        transform: scaleX(-1);
    }
</style>