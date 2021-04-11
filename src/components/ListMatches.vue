<template>
  <div>
    <ul class="character-select">
      <li v-for="listCharacter in characters" :key="listCharacter.name">
        <CharactersSelectItem
          :character="listCharacter"
          :disabled="checkedChar.length >= 2 ? true : false"
          :selected="false"
          @selected:char="onSelectedChar"
        />
      </li>
    </ul>
    <br />
    <h4>Selected Fighters</h4>
    <span v-for="character in filteredCharacters" :key="character">
      {{ character }}
    </span>
    <ul class="match-list">
      <li
        class="match-row"
        v-for="vod in vods"
        :key="vod.key"
        v-show="isFiltered(checkedChar, vod.character_1, vod.character_2)"
      >
        <b-button v-b-toggle:[vod.key] variant="light">
          <v-divider class="my-1" v-if="consecutiveMatch" />
          <div align-center>
            <div :column="$vuetify.breakpoint.xsOnly">
              <div xs6>
                <div row align-center>
                  <div class="player1-zone col-md-4">
                    <div class="player1-character-zone">
                      <LazyImage
                        :imgAlt="vod.character_1"
                        :imgSrc="renderSrc(vod.character_1)"
                      />
                      <div class="character-name">
                        {{ vod.character_1 }}
                      </div>
                    </div>
                    <div class="player1-player-name">
                      <div class="ma-1">
                        {{ vod.player_a }}
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
                        <span v-if="vod.version">Version: {{ vod.version }}</span
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
                      <LazyImage
                        class="character-img"
                        :imgAlt="vod.character_2"
                        :imgSrc="renderSrc(vod.character_2)"
                      />
                      <div class="character-name">
                        {{ vod.character_2 }}
                      </div>
                    </div>
                  </div>
                </div>
                <CollapsibleVideo :videoId="vod.youtube_id" :collapseId="vod.key" />
              </div>
            </div>
          </div>
        </b-button>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
// import 'firebase/database';
import "firebase/firestore";
// import "firebase/storage"

import CollapsibleVideo from "./CollapsibleVideo";
import LazyImage from "./LazyImage";
import CharactersSelectItem from "./CharactersSelectItem";

const db = firebase.firestore();

export default {
  components: {
    CollapsibleVideo,
    LazyImage,
    CharactersSelectItem,
  },
  data() {
    return {
      vods: [],
      consecutiveMatch: false,
      checkedChar: [],
      characters: [],
    };
  },
  created() {
    console.log(this.checkedChar.length);
    db.collection("vods").onSnapshot((snapshotChange) => {
      let vods = [];

      snapshotChange.forEach((doc) => {
        vods.push(this.hydrateData(doc, ["player_a"]));
      });

      Promise.all(vods).then((vodsDatas) => {
        vodsDatas.forEach((docData) => {
          console.log(docData);
          this.vods.push({
            key: docData.id,
            title: docData.title,
            youtube_link: docData.youtube_link,
            youtube_id: docData.youtube_id,
            player_1: docData.player_1,
            player_a: docData.player_a ? docData.player_a.name : "Inconnu",
            character_1: docData.character_1,
            player_2: docData.player_2,
            character_2: docData.character_2,
            version: docData.version,
            tournament: docData.tournament,
          });
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
  methods: {
    renderSrc: function (char) {
      var charRenderUrl = "/public/" + char.toLowerCase().trim() + ".png";
      return charRenderUrl;
    },
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
    getReference: async function (doc, ref) {
      let data = null;
      if (doc.data()[ref]) {
        const res = await doc.data()[ref].get();
        if (res) {
          data = res.data();
          data.uid = res.id;
        }
      }
      return data;
    },
    hydrateData: async function (doc, refs) {
      let arrayData = doc.data();
      arrayData.id = doc.id;
      // console.log(arrayData.player_1, arrayData.player_2)
      const promises = refs.map(async (ref) => {
        const result = await this.getReference(doc, ref);
        arrayData[ref] = result;
      });
      return Promise.all(promises).then(() => {
        // console.log("hydrating data done for:", doc.id)
        return arrayData;
      });
    },
    onSelectedChar: function (char) {
      if (this.checkedChar.indexOf(char) > -1) {
        this.checkedChar.splice(this.checkedChar.indexOf(char), 1);
      } else {
        this.checkedChar.push(char);
      }
    },
    isFiltered: function (filteredCharAmount, char1, char2) {
      if (filteredCharAmount.length == 0) {
        return true;
      } else if (filteredCharAmount.length == 1) {
        if (
          this.filteredCharacters.includes(char1) ||
          this.filteredCharacters.includes(char2)
        ) {
          return true;
        } else {
          return false;
        }
      } else if (filteredCharAmount.length == 2) {
        if (
          this.filteredCharacters.includes(char1) &&
          this.filteredCharacters.includes(char2)
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  computed: {
    filteredCharacters: function () {
      if (!this.checkedChar.length) {
        return this.characters.map((character) => {
          return character.name;
        });
      } else {
        return this.checkedChar;
      }
    },
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
.match-list {
  list-style: none;
  color: #212529;
}
</style>
