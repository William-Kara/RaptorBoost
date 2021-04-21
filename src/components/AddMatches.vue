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
            <input
              type="text"
              class="form-control"
              v-model="videoLink"
              @change="onYTLinkChange"
              required
            />
          </div>
          <button
            class="btn btn-primary btn-block"
            @click.prevent="nextStep"
            :disabled="isDisabledBtn"
          >
            Suivant
          </button>
          {{ curratedLink }}
        </section>

        <section v-if="step == 2">
          <h3 style="text-align: center">Match 1</h3>
          <AddMatch
            :videoTitle.sync="videoTitle"
            :videoChannel.sync="videoChannel"
            :videoDate.sync="videoDate"
            :videoType="currentVodType"
          />
          <button type="button" @click="addMatchAction">Add Component</button>
          <div>
            <button class="btn btn-primary btn-block" @click.prevent="nextStep">
              Suivant
            </button>
            <button class="btn btn-primary btn-block" @click.prevent="addAMatch">
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
        <section v-if="step == 3">
          <button
            class="btn btn-primary btn-block half-input-left"
            @click.prevent="previousStep"
          >
            Back
          </button>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import AddMatch from "./AddMatch";
import firebase from "firebase/app";
import { getYoutubeId } from "../helpers/common";
const db = firebase.firestore();

export default {
  components: {
    AddMatch,
  },
  data() {
    return {
      disabledNextBtn: true,
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
      videoLink: "",
      curratedLink: "",
      videoTitle: "",
      videoTitleValid: "",
      videoChannel: "",
      videoDate: "",
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
    isDisabledBtn() {
      return this.disabledNextBtn;
    },
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
  watch: {
    videoLink: function (val) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = val.match(regExp);
      this.curratedLink = match && match[7].length == 11 ? match[7] : false;
      if (this.curratedLink !== false && this.curratedLink !== "") {
        this.disabledNextBtn = false;
      } else {
        this.disabledNextBtn = true;
      }
    },
  },
  methods: {
    onYTLinkChange() {
      let key = "AIzaSyDMBtC8O5C3SV-hYJSHRKaqAJzkTk-paFU";

      let url =
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=` +
        this.curratedLink +
        `&key=${key}`;

      let getVideoData = async (url) => {
        console.log("origin " + url);
        try {
          const resp = await fetch(url);
          const data = await resp.json();
          return data;
        } catch (err) {
          console.log(err);
          return null;
        }
      };

      getVideoData(url).then((videoData) => {
        console.log("videoData :", videoData.items[0].snippet.title);
        this.videoDate = videoData.items[0].snippet.publishedAt;
        this.videoTitle = videoData.items[0].snippet.title;
        this.videoChannel = videoData.items[0].snippet.channelTitle;
      });
    },
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
    addMatchAction() {
      this.AddMatch.push(AddMatch);
    },
    nextStep: function () {
      if (this.step == 1) {
        this.videoTitleValid = this.videoTitle;
      }
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
