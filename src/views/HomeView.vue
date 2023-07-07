<script setup>
import ListPanel from '../components/ListsPanel.vue'
</script>

<template>
  <main>
    <ListPanel :list="testList"></ListPanel>
  </main>
</template>

<script>
var testList = {
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
</script>
