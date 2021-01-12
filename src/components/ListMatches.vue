<template>
  <div>
    <ul>
      <li v-for="character in characters" :key="character.name">
        <input
          type="checkbox"
          id="jack"
          :value="character.name"
          v-model="checkedChar"
          :disabled="
            checkedChar.length == 2 &&
              checkedChar.indexOf(character.name) === -1
          "
        />
        <label :for="character.name">{{ character.name }}</label>
      </li>
    </ul>
    <br />
    <span>Selected Fighters: {{ filteredCharacter }}</span>
    <table class="table table-striped">
      <li class="match-row" v-for="vod in Vods" :key="vod.key">
        <b-button v-show="filteredCharacter.includes(vod.character_1) || checkedChar == 0" v-b-toggle:[vod.key] variant="light">
          <v-divider class="my-1" v-if="consecutiveMatch" />
          <div align-center>
            <div :column="$vuetify.breakpoint.xsOnly">
              <div xs6>
                <div row align-center>
                  <div class="player1-zone col-md-4">
                    <div class="player1-character-zone">
                      <img
                        class="character-render"
                        src="../assets/img/render/Ryu_render_l.png"
                      />

                      <div class="character-name">
                        {{ vod.character_1 }}
                      </div>
                    </div>
                    <div class="player1-player-name">
                      <div class="ma-1">
                        {{ vod.player_1 }}
                      </div>
                    </div>
                  </div>
                  <div align-center class="versus-zone col-md-4">
                    <div>
                      <h3 class="">
                        {{ vod.title }}
                      </h3>
                      <img class="versus-img" src="../assets/img/versus.png" />
                      <div class="game-version">
                        <span v-if="vod.version"
                          >Version: {{ vod.version }}</span
                        ><span v-if="vod.tournament && vod.tournament"> | </span
                        ><span v-if="vod.tournament"
                          >tournament: {{ vod.tournament }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="player2-zone col-md-4">
                    <div class="player2-player-name">
                      <div class="ma-1">
                        {{ vod.player_2 }}
                      </div>
                    </div>
                    <div class="player2-character-zone">
                      <img
                        class="character-render"
                        src="../assets/img/render/Ryu_render_r.png"
                      />
                      <div class="character-name">
                        {{ vod.character_2 }}
                      </div>
                    </div>
                  </div>
                </div>
                <CollapsibleVideo videoId="EM2JL7iqdCY" :collapseId="vod.key" />
              </div>
            </div>
          </div>
        </b-button>
      </li>
    </table>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
// import 'firebase/database';
import "firebase/firestore";

import CollapsibleVideo from "./CollapsibleVideo";

const db = firebase.firestore();

export default {
  components: {
    CollapsibleVideo,
  },
  data() {
    return {
      Vods: [],
      consecutiveMatch: false,
      checkedChar: [],
      characters: [
        { name: "Ryu" },
        { name: "Akuma" },
        { name: "Ken" },
        { name: "Guile" },
      ],
    };
  },
  created() {
    db.collection("vods").onSnapshot((snapshotChange) => {
      this.Vods = [];
      snapshotChange.forEach((doc) => {
        this.Vods.push({
          key: doc.id,
          title: doc.data().title,
          youtube_link: doc.data().youtube_link,
          player_1: doc.data().player_1,
          character_1: doc.data().character_1,
          player_2: doc.data().player_2,
          character_2: doc.data().character_2,
          version: doc.data().version,
          tournament: doc.data().tournament,
        });
      });
    });
  },
  methods: {
    deleteVod(id) {
      if (window.confirm("Do you really want to delete?")) {
        db.collection("vods")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document deleted!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  computed: {
    filteredCharacter: function() {

      if (!this.checkedChar.length) {
        return this.characters;
      } else {
        return this.checkedChar;
      }
    },
  },
};
</script>
