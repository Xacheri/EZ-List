<template>
  <div>
    <h2>What is EZ List?</h2>
      <p>
        EZ List is a grocery list application designed to make grocery shopping <em class="emphasize">easier</em> and <em class="emphasize">faster</em>. 
      </p>
      <p>
        It does this by organizing your list according to the item’s aisle, and then sorting the aisles to match your preferred path through the store.
      </p>
      <p>
        All information about an item and it’s aisle is provided once by the user. After this, it is infinitely reusable for lists created for that particular store. 
      </p>
    <h2>How do I use EZ List?</h2>
      <p>
        All you have to do is select “Create a New List” on the home page. You will be prompted to select a store.
      </p>
      <p>
        If you haven’t created a Store yet, you will be asked to input aisle names and select their order (don’t worry, you can always rearrange them or add more.)
      </p>
      <p>
        After this, you will be prompted to enter an item. Enter whatever name you want for the item. If it isn’t already saved in our system, you will be prompted to enter in the aisle and approximate price. 
      </p>
      <p>
        Continue adding items and select “Save List” when finished.
      </p>
      <p>
        You can always sign-up/login to save or view your lists later. Just select the cart icon on the list entry on the home page to view a list.
      </p>
  </div>
</template>

<style scoped>
  h2
  {
    color: var(--color-text-secondary);
  }

  p {
    margin: 1rem;
    text-indent: 1rem;
  }

  .emphasize {
    color: var(--color-text-secondary);
    font-style: italic;
  }
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
