<script setup>
import ListPanelItem from './ListPanelItem.vue'
</script>

<template>
    <h2>Your Lists:</h2>
    <div id="panel">
        <div class="list"><img class="me-3" src="..\assets\plus.svg">Create a new List</div>
        <ListPanelItem @listSelected="emitList" v-for="item in lists" :list="item"></ListPanelItem>
    </div>


</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        lists: {
            type: Array,
            default: [{},{}]
        }
    },
    methods: {
        emitList(list)
        {
            this.$emit('listSelected', list);
        }
    },
    emits: ['listSelected']
}
</script>

<style scoped>
h2 {
    color: var(--color-text-secondary);
}

#panel {
    border-radius: 30px;
    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.list {
    margin: 1rem;
}

hr {
    border: 1px solid black;
}
</style>