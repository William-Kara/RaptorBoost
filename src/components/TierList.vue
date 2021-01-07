<template>
      
      <div class="tierlist-div">
        <h1>TIER LIST MAKER - {{ listName }}</h1>
        <div class="list-group row">
          <input type="text" value="S" class="tier1 level">
          <div class="tier sort ui-sortable"></div>
        </div>
        <div class="list-group row ">
          <input type="text" value="A" class="tier2 level">
          <div class="tier sort ui-sortable"></div>
        </div>
        <div class="list-group row">
          <input type="text" value="B" class="tier3 level">
          <div class="tier sort ui-sortable"></div>
        </div>
        <div class="list-group row">
          <input type="text" value="C" class="tier4 level">
          <div class="tier sort ui-sortable"></div>
        </div>
        <div class="list-group row">
          <input type="text" value="D" class="tier5 level">
          <div class="tier sort ui-sortable"></div>
        </div>
        <div class="list-group row">
          <input type="text" value="E" class="tier6 level">
          <div class="tier sort ui-sortable"></div>
        </div>
        <div class="list-group row last">
          <input type="text" value="F" class="tier7 level">
          <div class="tier sort ui-sortable"></div>
        </div>

        <div id="char4 row" class="sort ui-sortable sortable-characters">
          <img v-for="image in Object.keys(images)"
              v-bind:key="images[image].name"
              :alt="image"
              :src="images[image]">
          <img src='../assets/img/champs/Aatrox.png'>
          <img src='../assets/img/champs/Ahri.png'>
          <img src='../assets/img/champs/Darius.png'>
          <img src='../assets/img/champs/Katarina.png'>
        </div>
      </div>
</template>

<script>
    import Sortable from 'sortablejs'

    export default {
        data() {
            return {
                project: 'default',
                listName: 'List',
                images: {},
            }
        },
        mounted: function () {
            // Simple list
            let rows = document.getElementsByClassName('sort');
            Array.from(rows).forEach(row => {
                new Sortable(row, {
                    group: 'shared', // set both lists to same group
                    animation: 500
                });
            });
            //this.images = this.$store.state.localStorage.list;
        },
    }
</script>
