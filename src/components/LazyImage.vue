<template>
    <img class="lazyImage" :src="link" :alt="imgAlt" />
</template>

<script>
    import firebase from "firebase/app"
    import "firebase/storage"
    const storage = firebase.storage()

    export default {
      name: "LazyImage",
      data: () => {
        return {
          link: "loading",
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