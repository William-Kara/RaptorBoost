<template>
  <div class="form-group">
    <div>
      <label>Match title</label>
      <input type="text" class="form-control" v-model="videoTitleVal" required />
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
        <option v-for="option in options" v-bind:value="option.value" v-bind:key="option">
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
        <div slot-scope="{ suggestion }" style="display: flex; align-items: center">
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
        <div slot-scope="{ suggestion }" style="display: flex; align-items: center">
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
</template>

<script>
import firebase from "firebase/app";
const db = firebase.firestore();
export default {
  name: "AddMatch",
  props: {
    videoTitle: String,
  },
  data() {
    return {
      selected: "",
      options: [
        { text: "1.7", value: "1.7" },
        { text: "2", value: "2" },
        { text: "Ultra boost", value: "Ultra boost" },
      ],
      players: [],
      characters: [],
      query: "",
      vod: {}
    };
  },
  created() {
    console.log('vod - title', this.videoTitle)
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
    videoTitleVal: {
      get() {
        return this.videoTitle;
      },
      set(val) {
        this.$emit('input', val);
        this.$emit('update:videoTitle', val);
      }
    }
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
  },
  change: {
    videoTitle: function (value) {
      console.log(value);
    },
  },
};
</script>
