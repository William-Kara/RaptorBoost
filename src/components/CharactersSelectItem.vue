<template>
  <div class="char-select-item" @click="selectedChar">
    <label :for="character.name">{{ character.name }}</label>
    <LazyImage :imgAlt="character.name" :imgSrc="character.image" :class="{'checked' : checked}"/>
  </div>
</template>

<script>
    import LazyImage from './LazyImage'
    
    export default {
      name: "CharactersSelectItem",
      components: {
          LazyImage
      },
      data: () => {
        return {
          checked: false
        }
      },
      props: [
        'character',
        'disabled',
        'selected'
      ],
      created: function () {
        this.checked = this.selected
        console.log(this.disabled)
      },
      methods: {
        selectedChar : function () {
          if(this.checked){
            this.checked = false
            this.$emit('selected:char', this.character.name)
          } else if(!this.disabled && !this.checked){
            this.checked = !this.checked
            this.$emit('selected:char', this.character.name)
          } else {
            console.log('element disabled')
          }
        },
      }
    }
</script>

<style>
.char-select-item{
  width: 150px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  cursor: pointer;
}

.char-select-item .lazyImage {
  opacity: 0.5;
}

.char-select-item .lazyImage.checked {
  opacity: 1;
}

/*.char-select-item input[type="checkbox"]{
  display: block;
}*/
</style>