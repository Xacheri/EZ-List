<script setup>
import ListPanelItem from './ListPanelItem.vue'
</script>

<template>
    <h2>Your Lists:</h2>
    <div id="panel">
        <div class="list"><img class="me-3" src="..\assets\plus.svg">Create a new List</div>
        <hr>
        <ListPanelItem v-for="item in testList.list" :list="item"></ListPanelItem>
    </div>
</template>

<script>
export default {
    data() {
        return {
            testList: {
                listName: "Test",
                list: [
                    {
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
                    },
                    {
                        aisle: "DEFAULT_NAME_2",
                        list: [
                            {
                                food: "Test Food 3",
                                quantity: 90,
                                price: 0.99
                            },
                            {
                                food: "Test Food 4",
                                quantity: 100,
                                price: 7.99
                            }
                        ]
                    }
                ]
            }
        }
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    }
}
</script>

<style scoped>
h2 {
    color: var(--color-text-secondary);
}

#panel {
    border-radius: 30px;
    border: 1px solid black;
}

.list {
    margin: 1rem;
}

hr {
    border: 1px solid black;
}
</style>