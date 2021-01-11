<template>
      
      <div id="tierlist-container" class="tierlist-div">
        <h1>Tier list maker - {{ listName }}</h1>
        <div class="list-group sort ui-sortable row">
          <input type="text" value="S" class="tier1 level">
        </div>
        <div class="list-group sort ui-sortable row">
          <input type="text" value="A" class="tier2 level">
        </div>
        <div class="list-group sort ui-sortable row">
          <input type="text" value="B" class="tier3 level">
        </div>
        <div class="list-group sort ui-sortable row">
          <input type="text" value="C" class="tier4 level">
        </div>
        <div class="list-group sort ui-sortable row">
          <input type="text" value="D" class="tier5 level">
        </div>
        <div class="list-group sort ui-sortable row">
          <input type="text" value="E" class="tier6 level">
        </div>
        <div class="list-group sort ui-sortable row last">
          <input type="text" value="F" class="tier7 level">
        </div>

        <div id="char4 row" class="sort ui-sortable sortable-characters">
          <img v-for="image in images"
              :key="image.name"
              :alt="image.name"
              :src="image.src"
            >
        </div>
        <button @click="computeListData">Ok</button>
      </div>
</template>

<script>
    import Sortable from 'sortablejs'

    export default {
      name: 'SortableList',
      props: [
        'listData',
        'images'
      ],
      data() {
        return {
          project: 'default',
          listName: 'List',
          list: {},
        }
      },
      mounted: function () {
        // Simple list
        // const tierList = document.getElementById('tierlist-container')

        // this.list = new Sortable(tierList, {
        //   group: 'tierlist', // set both lists to same group
        //   animation: 500,
        // })

        let rows = document.getElementsByClassName('sort');
        // console.log(rows)
        let i = 1
        Array.from(rows).forEach(row => {
          console.log(row.dataset)
          new Sortable(row, {
            name: `tier-${i}`,
            filter: ".level",
            group: 'tierlist', // set both lists to same group
            animation: 500,
            onEnd: this.listOnDragEnd,
            store: {
              /**
               * Get the order of elements. Called once during initialization.
               * @param   {Sortable}  sortable
               * @returns {Array}
               */
              get: this.getSortableData,

              /**
               * Save the order of elements. Called onEnd (when the item is dropped).
               * @param {Sortable}  sortable
               */
              set: this.storeSortableData 
            }
          })
          i++
        })
        //this.images = this.$store.state.localStorage.list;
      },
      methods: {
        test: function(e){
          console.log(e)
        },
        listOnDragEnd: function ( /**Event*/ evt) {
        // console.log(evt)
          // console.log(this.list)
          // var itemEl = evt.item;  // dragged HTMLElement
          // console.log(evt.to.closest('.list-group').getElementsByTagName('input')[0])
          evt.to; // target list
          evt.from; // previous list
          evt.oldIndex; // element's old index within old parent
          evt.newIndex; // element's new index within new parent
          evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
          evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
          evt.clone // the clone element
          evt.pullMode; // when item is in another sortable: `"clone"` if cloning, `true` if moving
        },
        computeListData: function (evt) {
          console.log(evt)
          console.log(this.list)
        },
        getSortableData: function(sortable){
          // console.log(this.listData)
          console.log(this.listData[sortable.options.name])
          return this.listData[sortable.options.name] ? this.listData[sortable.options.name] : [];
        },
        storeSortableData: function (sortable) {
          // console.log(sortable.options.name)
          var order = sortable.toArray()
          this.list[sortable.options.name] = order
          // console.log(sortable.el.getAttribute('data-set'))
          // console.log(order)
          //localStorage.setItem(sortable.options.group.name, order.join('|'))
        }
      }
    }
</script>

<style scoped lang="scss">
  .ui-sortable {
    flex-direction: row;
  }
</style>
