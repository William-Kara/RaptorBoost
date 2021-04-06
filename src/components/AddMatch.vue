<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h2 class="text-center">Submit a video</h2>
      <form @submit.prevent="onFormSubmit">
        <section v-if="step == 1">
          <RadioToggleButtons
            v-model="currentVodType"
            :values="vodType"
            color="#007bff"
            textColor="#fff"
            selectedTextColor="#fff"
          />
          <div class="form-group">
            <label>Youtube link</label>
            <input type="text" class="form-control" v-model="vod.youtube_link" required />
          </div>
          <button class="btn btn-primary btn-block" @click.prevent="nextStep">
            Suivant
          </button>
        </section>

        <section v-if="step == 2">
          <h3 style="text-align: center">Match 1</h3>
          <div class="form-group">
            <div>
              <label>Match title</label>
              <input type="text" class="form-control" v-model="vod.title" required />
            </div>
            <div class="half-input-left">
              <label>Channel name</label>
              <input type="text" class="form-control" v-model="vod.title" required />
            </div>
            <div class="half-input-right">
              <label>Video date</label>
              <input type="text" class="form-control" v-model="vod.title" required />
            </div>
            <div class="half-input-left">
              <label>Timestamp of the match</label>
              <input
                type="text"
                class="form-control"
                v-model="vod.title"
                placeholder="00h00m00s"
              />
            </div>
            <div class="half-input-right">
              <label>Version</label>
              <select class="form-control" v-model="selected">
                <option
                  v-for="option in options"
                  v-bind:value="option.value"
                  v-bind:key="option"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
            <div class="half-input-left">
              <label>Player 1 character</label>
              <select class="form-control" v-model="selected">
                <option
                  v-for="character in characters"
                  v-bind:value="characters.name"
                  v-bind:key="character"
                >
                  {{ character.name }}
                </option>
              </select>
            </div>
            <div class="half-input-right">
              <label>Player 2 character</label>
              <select class="form-control" v-model="selected">
                <option
                  v-for="character in characters"
                  v-bind:value="characters.name"
                  v-bind:key="character"
                >
                  {{ character.name }}
                </option>
              </select>
            </div>
            <div class="half-input-left">
              <label>Player 1 name</label>
              <input
                type="text"
                class="form-control"
                v-model="vod.title"
                placeholder="00h00m00s"
              />
            </div>
            <div class="half-input-right">
              <label>Player 1 name</label>
              <select class="form-control" v-model="selected">
                <option
                  v-for="option in options"
                  v-bind:value="option.value"
                  v-bind:key="option"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
          <label>Type of match</label>
          <input type="radio" id="tournament" value="Un" v-model="picked" />
          <label for="one">Tournament</label>
          <input type="radio" id="two" value="Deux" v-model="picked" />
          <label for="two">Deux</label>

          <div class="form-group">
            <button class="btn btn-primary btn-block">Ajouter la vidéo</button>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { getYoutubeId } from "../helpers/common";
const db = firebase.firestore();
export default {
  data() {
    return {
      vodType: [
        { label: "Casual Match", value: "1" },
        { label: "Tournament Match", value: "2" },
        { label: "Educational Content", value: "3" },
      ],
      currentVodType: "",
      vod: {},
      step: 1,
      selected: "",
      options: [
        { text: "1.7", value: "1.7" },
        { text: "2", value: "2" },
        { text: "Ultra boost", value: "Ultra boost" },
      ],
      characters: [
        {
          name: "Ryu",
          image: "/public/ryu.png",
        },
        {
          name: "Akuma",
          image: "/public/akuma.png",
        },
        {
          name: "Ken",
          image: "/public/ken.png",
        },
        {
          name: "Guile",
          image: "/public/guile.png",
        },
        {
          name: "Soraka",
          image: "/public/soraka.png",
        },
      ],
    };
  },
  methods: {
    nextStep: function () {
      this.step++;
    },
    onFormSubmit(event) {
      event.preventDefault();
      this.vod.youtube_id = getYoutubeId(this.vod.youtube_link);
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
