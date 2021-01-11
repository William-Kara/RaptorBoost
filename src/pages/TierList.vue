<template>
  <SortableList 
    :images="images"
    :listData="list"
  />
</template>

<script>
    import SortableList from '../components/SortableList'

    export default {
      components: {
        SortableList
      },
      data() {
        return {
          images: [{
              name: 'aatrox',
              src: require('@/assets/img/champs/Aatrox.png')
            },
            {
              name: 'Ahri',
              src: require('@/assets/img/champs/Ahri.png')
            },
            {
              name: 'Darius',
              src: require('@/assets/img/champs/Darius.png')
            },
            {
              name: 'Katarina',
              src: require('@/assets/img/champs/Katarina.png')
            },
          ],
          list: {
            "tier-6": ["1us", "3nt"],
            "tier-7": ["3w4", "1ut", "3uy"],
            "tier-8": ["3zg","1us",]
          }
        }
      },
      mounted: function () {
      }
    }
</script>
