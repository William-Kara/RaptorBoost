<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Ajouter une vidéo</h3>
      <form @submit.prevent="onFormSubmit">
        <div class="form-group">
          <label>Titre</label>
          <input
            type="text"
            class="form-control"
            v-model="vod.title"
            required
          />
        </div>

        <div class="form-group">
          <label>Lien Youtube</label>
          <input
            type="text"
            class="form-control"
            v-model="vod.youtube_link"
            required
          />
        </div>

        <div class="form-group">
          <label>Pseudo Joueur 1</label>
          <input
            type="text"
            class="form-control"
            v-model="vod.player_1"
            required
          />
        </div>

        <div class="form-group">
          <label>Perso Joueur 1</label>
          <input
            type="text"
            class="form-control"
            v-model="vod.character_1"
            required
          />
        </div>

        <div class="form-group">
          <label>Pseudo Joueur 2</label>
          <input
            type="text"
            class="form-control"
            v-model="vod.player_2"
            required
          />
        </div>

        <div class="form-group">
          <label>Perso Joueur 1</label>
          <input
            type="text"
            class="form-control"
            v-model="vod.character_2"
            required
          />
        </div>

        <div class="form-group">
          <label>Version du jeu</label>
          <input type="text" class="form-control" v-model="vod.version" />
        </div>

        <div class="form-group">
          <label>Tournois</label>
          <input type="text" class="form-control" v-model="vod.tournament" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Ajouter la vidéo</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseDb";

export default {
  data() {
    return {
      vod: {},
    };
  },
  methods: {
    onFormSubmit(event) {
      event.preventDefault();
      db.collection("vods")
        .add(this.vod)
        .then(() => {
          alert("vod successfully created!");
          this.vod.title = "";
          this.vod.youtube_link = "";
          this.vod.player_1 = "";
          this.vod.character_1 = "";
          this.vod.player_2 = "";
          this.vod.character_2 = "";
          this.vod.version = "";
          this.vod.tournament = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
