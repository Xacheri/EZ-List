<script setup>
import DisplayedList from '../components/DisplayedList.vue';
import ListPanel from '../components/ListsPanel.vue';
import { isProxy, toRaw } from 'vue';
</script>

<template>
    <main>
        <ListPanel @listSelected='selectList' :lists="testLists"></ListPanel>
        <DisplayedList v-if="!(emptylist)" :list="listToDisplay"></DisplayedList>
    </main>
</template>

<script>
export default {
    data() {
        return {
            emptylist: true,
            listToDisplay: {},
            testLists: [
                {
                    listName: "Test 1",
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
                },
                {
                    listName: "Test 2",
                    list: [
                        {
                            aisle: "DEFAULT_NAME_6",
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
                            aisle: "DEFAULT_NAME_7",
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
                },
                {
                    listName: "Test 3",
                    list: [
                        {
                            aisle: "DEFAULT_NAME_9",
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
                            aisle: "DEFAULT_NAME_8",
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
            ],

        }
    },
    methods:{
        selectList(list)
        {
            this.emptylist = false;
            this.listToDisplay = toRaw(list);
        }
    }

}
</script>

