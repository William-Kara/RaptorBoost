<template>
    <img class="lazyImage" :src="link" :alt="imgAlt" />
</template>

<script>
    import firebase from "firebase/app"
    import "firebase/storage"
    const storage = firebase.storage()
    import placeholder from "../assets/img/random_char.png" 

    export default {
      name: "LazyImage",
      data: () => {
        return {
          link: placeholder,
        }
      },
      props: [
        'imgAlt',
        'imgSrc'
      ],
      created: function () {
        this.getImage()
      },
      methods: {
        getImage: async function() {
          try {
            const url = await storage.ref(this.imgSrc).getDownloadURL()
            this.link = url
          } catch(error) {
            console.log(error)
          }
        }
      }
    }
</script>