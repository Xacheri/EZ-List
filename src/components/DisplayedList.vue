<template>
    <h2 class="bronzeText mt-4">This Trip:</h2>
    <div class="container">
        <h2 class="listName text-center display-5">{{ list.listName }}</h2>
        <div v-if="list != {}" class="list mt-2" v-for="aisle in list.list">
            <h2 class="bronzeText">{{ aisle.aisle }}:</h2>
            <div class="d-flex justify-content-between aisleContent" v-for="food in aisle.list">
                <span class="m-2"><input type="checkbox" :name="food.food.replace(/\s+/g, '') +'Name'" :id="food.food.replace(/\s+/g, '') + 'ID'"> {{ food.quantity }}x  {{ food.food }}</span><span class="pricing mt-2">{{ calculatePrice(food.price, food.quantity) }}</span> <br>
            </div> 
        </div>
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

        methods: {
            calculatePrice(price, quantity)
            {
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });

                return formatter.format(price * quantity)
            },
        }
    }
</script>

<style scoped>
    .aisleContent {
        text-indent: 1rem;
    }

    .pricing {
        font-style: italic;
        color: #797979;
    }

    .container {
        border-radius: 15px;
        border: 1px solid black;
        padding: 0.75rem;
        margin-top: 1rem;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }

    .listName{
        color: var(--color-text);
        font-weight: 400;
    }

    .bronzeText {
        color: var(--color-text-secondary);
    }
</style>

