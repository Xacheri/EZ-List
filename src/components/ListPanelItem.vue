<template>
    <div>
        <h2>{{ list.aisle }}</h2>
        <div class="list" v-for="item in list.list">
            {{ item.quantity }} {{ item.food }} 
        </div>
        <hr>
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
                    aisle: "DEFAULT_NAME",
                    list: [
                                {
                                    food: "Test Food 1",
                                    quantity: 1,
                                    price: 0.99
                                },
                                {
                                    food: "Test Food 2",
                                    quantity: 3,
                                    price: 7.99
                                }
                            ]
                }
            }
        }
    }
</script>
<style scoped>
    .list {
        margin: 1rem;
    }

    hr {
        border: 1px solid black;
    }
</style>