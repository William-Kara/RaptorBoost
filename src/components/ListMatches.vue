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
    <h4>Selected Fighters</h4>
    <span 
      v-for="character in filteredCharacters"
      :key="character"
    >
      {{ character }}
    </span>
    <table class="table table-striped">
      <li
        class="match-row"
        v-for="vod in vods"
        :key="vod.key"
        v-show="
          filteredCharacters.includes(vod.character_1) ||
          filteredCharacters.includes(vod.character_2) ||
          checkedChar == 0
        "
      >
        <b-button v-b-toggle:[vod.key] variant="light">
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
      vods: [],
      consecutiveMatch: false,
      checkedChar: [],
      characters: [
        { name: "Ryu" },
        { name: "Akuma" },
        { name: "Ken" },
        { name: "Guile" },
        { name: "Soraka" },
      ],
    };
  },
  created() {
    db.collection("vods").onSnapshot((snapshotChange) => {
      let vods = [];

      snapshotChange.forEach((doc) => {
        vods.push(this.hydrateData(doc, ["player_a"]));
      });

      Promise.all(vods).then((vodsDatas) => {
        vodsDatas.forEach((docData) => {
          this.vods.push({
            key: docData.id,
            title: docData.title,
            youtube_link: docData.youtube_link,
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
    getReference: async function(doc, ref) {
      let data = null;
      if (doc.data()[ref]) {
        const res = await doc.data()[ref].get()
        if (res) {
          data = res.data()
          data.uid = res.id
        }
      }
      return data;
    },
    hydrateData: async function(doc, refs) {
      let arrayData = doc.data()
      arrayData.id = doc.id
      // console.log(arrayData.player_1, arrayData.player_2)
      const promises = refs.map(async (ref) => {
        const result = await this.getReference(doc, ref)
        arrayData[ref] = result
      })
      return Promise.all(promises).then(() => {
        // console.log("hydrating data done for:", doc.id)
        return arrayData
      })
    },
  },
  computed: {
    filteredCharacters: function() {
      console.log(this.checkedChar)
      if (!this.checkedChar.length) {
        return this.characters.map( character => {
          return character.name
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
</style>
