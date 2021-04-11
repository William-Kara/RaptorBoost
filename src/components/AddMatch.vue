<template>
  <div class="row justify-content-center">
    <div class="col-md-9">
      <h2 class="text-center">Submit a video</h2>
      <form @submit.prevent="onFormSubmit">
        <section style="width: 100%" v-if="step == 1">
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
              <p>{{ vod.youtube_link }}</p>
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
              <vue-autosuggest
                v-model="query"
                :suggestions="filteredOptions"
                @focus="focusMe"
                @click="clickHandler"
                @input="onInputChange"
                @selected="onSelected"
                :get-suggestion-value="getSuggestionValue"
                :input-props="{
                  class: 'form-control',
                  id: 'autosuggest__input',
                }"
              >
                <div
                  slot-scope="{ suggestion }"
                  style="display: flex; align-items: center"
                >
                  <div style="{ display: 'flex', color: 'navyblue'}">
                    {{ suggestion.item.name }}
                  </div>
                </div>
              </vue-autosuggest>
            </div>
            <div class="half-input-right">
              <label>Player 2 name</label>
              <vue-autosuggest
                v-model="query"
                :suggestions="filteredOptions"
                @focus="focusMe"
                @click="clickHandler"
                @input="onInputChange"
                @selected="onSelected"
                :get-suggestion-value="getSuggestionValue"
                :input-props="{
                  class: 'form-control',
                  id: 'autosuggest__input',
                }"
              >
                <div
                  slot-scope="{ suggestion }"
                  style="display: flex; align-items: center"
                >
                  <div style="{ display: 'flex', color: 'navyblue'}">
                    {{ suggestion.item.name }}
                  </div>
                </div>
              </vue-autosuggest>
            </div>
            <div v-if="currentVodType == 2" class="half-input-left">
              <label>Tournament</label>
              <input type="text" class="form-control" v-model="vod.title" />
            </div>
            <div v-if="currentVodType == 2" class="half-input-right">
              <label>Tournament round</label>
              <input
                type="text"
                class="form-control"
                v-model="vod.title"
                placeholder="Semi-Final"
              />
            </div>
          </div>
          <div>
            <button class="btn btn-primary btn-block" @click.prevent="nextStep">
              Add a match
            </button>
            <button
              class="btn btn-primary btn-block half-input-left"
              @click.prevent="previousStep"
            >
              Back
            </button>
            <button class="btn btn-primary btn-block half-input-right">
              Submit Match
            </button>
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
      currentVodType: "1",
      vod: {},
      step: 1,
      selected: "",
      options: [
        { text: "1.7", value: "1.7" },
        { text: "2", value: "2" },
        { text: "Ultra boost", value: "Ultra boost" },
      ],
      players: [],
      characters: [],
      query: "",
    };
  },
  created() {
    db.collection("players").onSnapshot((snapshotChange) => {
      this.players = [];
      snapshotChange.forEach((doc) => {
        this.players.push({
          key: doc.id,
          name: doc.data().name,
        });
      });
    });
    db.collection("characters").onSnapshot((snapshotChange) => {
      this.characters = [];
      snapshotChange.forEach((doc) => {
        this.characters.push({
          key: doc.id,
          name: doc.data().name,
          image: doc.data().image,
        });
      });
    });
  },
  computed: {
    filteredOptions() {
      return [
        {
          data: this.players.filter((option) => {
            return option.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }),
        },
      ];
    },
  },
  methods: {
    onSelected(item) {
      this.selected = item.item;
    },
    getSuggestionValue(suggestion) {
      return suggestion.item.name;
    },
    onInputChange(text) {
      // event fired when the input changes
      console.log(text);
    },
    focusMe(e) {
      console.log(e); // FocusEvent
    },
    nextStep: function () {
      this.step++;
    },
    previousStep: function () {
      this.step--;
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
