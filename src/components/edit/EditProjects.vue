<template>
  <div>
    <v-expansion-panels v-model="panel" focusable>
      <v-expansion-panel v-for="project in filteredGithubData" :key="project.id">
        <v-expansion-panel-header>{{ project.name }}</v-expansion-panel-header>

        <v-expansion-panel-content>
          <div class="my-2">
            <v-row>
              <v-col :md="5" :xs="12">
                <v-card>
                  <v-img :src="getCoverUrl(project.id)" aspect-ratio="1.7"></v-img>
                  <v-overlay :absolute="true" :value="imageUrl">
                    <v-chip color="primary" label medium>Preview</v-chip>
                  </v-overlay>
                </v-card>
                <div class="d-flex mt-2">
                  <v-file-input
                    :rules="rules"
                    accept="image/png, image/jpeg, image/gif"
                    placeholder="Pick a project cover"
                    prepend-icon="mdi-camera"
                    label="Project Cover"
                    show-size
                    @change="onFilePicked"
                  ></v-file-input>
                  <long-loading-btn
                    color="primary"
                    class="mt-2 ml-2"
                    :loading="isUploading"
                    :disabled="!imageFile"
                    label="Upload"
                    @click="uploadProjectCover(project.name, project.id)"
                  ></long-loading-btn>
                </div>
              </v-col>
              <v-col>
                <v-btn @click="toggleShowProject(project.name, project.id)">
                  <v-icon left>{{ fieldExist(project.id, 'show') ?'mdi-eye-off':'mdi-eye'}}</v-icon>
                  {{ fieldExist(project.id, 'show') ?`Hide this project`:`Show this project`}}
                </v-btn>

                <h4 class="my-4 mx-0">Tech stacks</h4>
                <template v-if="dbProjectsData[project.id]">
                  <v-chip
                    v-for="(stack, index) in dbProjectsData[project.id]['stacks']"
                    :key="index"
                    class="mr-1 mb-1"
                    close-icon="mdi-delete"
                    close
                    @click:close="deleteTechStack(project.id, stack)"
                  >{{ stack }}</v-chip>
                </template>
                <div class="d-flex align-center mt-2">
                  <v-text-field
                    v-model="stackToBeAdded"
                    label="Add Stack"
                    v-on:keyup.enter="addStack(project.name, project.id)"
                  ></v-text-field>

                  <v-btn
                    color="success"
                    @click="addStack(project.name, project.id)"
                    class="mx-2"
                    large
                    icon
                  >
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar
      v-model="snackbar"
      :color="hasErr? 'error': ''"
      :text="hasErr"
      bottom
      multi-line
      :timeout="hasErr? -1: 2000"
    >
      {{hasErr? 'Something goes wrong!! Cannot update this project.' : 'Photo uploaded successfully'}}
      <template
        v-slot:action="{ attrs }"
      >
        <v-btn :color="hasErr? 'grey': 'blue'" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { db, storage } from "../../firebase/init";
import { mapGetters, mapState } from "vuex";
import LongLoadingBtn from "../LongLoadingBtn";
import * as firebase from "firebase/app";

export default {
  name: "Projects",
  components: { LongLoadingBtn },
  data() {
    return {
      panel: null,
      stackToBeAdded: "",
      rules: [
        value =>
          !value ||
          value.size < 5000000 ||
          "Photo size should be less than 5 MB!"
      ],
      isUploading: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      imageType: "",
      hasErr: false,
      snackbar: false
    };
  },
  computed: {
    ...mapGetters(["filteredGithubData"]),
    ...mapState(["dbProjectsData"])
  },
  watch: {
    panel() {
      this.imageName = "";
      this.imageUrl = "";
      this.imageFile = "";
      this.imageType = "";
      this.stackToBeAdded = "";
    }
  },
  methods: {
    fieldExist(projectId, field) {
      if (!this.dbProjectsData[projectId]) {
        return false;
      } else if (!this.dbProjectsData[projectId][field]) {
        return false;
      } else {
        return this.dbProjectsData[projectId][field];
      }
    },
    getCoverUrl(projectId) {
      const dbCoverUrl = this.fieldExist(projectId, "coverUrl");
      if (this.imageUrl) {
        return this.imageUrl;
      }
      if (dbCoverUrl) {
        return dbCoverUrl;
      }
      return `https://cdn.vuetifyjs.com/images/parallax/material.jpg`;
    },

    async addStack(projectName, projectId) {
      if (!this.stackToBeAdded) {
        return;
      }
      const docRef = db.collection("projects").doc(projectId.toString());

      try {
        if (!this.dbProjectsData[projectId]) {
          await docRef.set(
            {
              name: projectName,
              stacks: [this.stackToBeAdded.trim()]
            },
            { merge: true }
          );
        } else {
          await docRef.update({
            stacks: firebase.firestore.FieldValue.arrayUnion(
              this.stackToBeAdded.trim()
            )
          });
        }

        this.stackToBeAdded = "";
      } catch (err) {
        console.log(err);
        this.snackbar = true;
        this.hasErr = true;
      }
    },
    async toggleShowProject(projectName, projectId) {
      const docRef = db.collection("projects").doc(projectId.toString());
      if (!this.dbProjectsData[projectId]) {
        await docRef.set(
          {
            name: projectName,
            show: true
          },
          { merge: true }
        );
      } else {
        await docRef.set(
          {
            show: !this.dbProjectsData[projectId]["show"]
          },
          { merge: true }
        );
      }
    },
    async uploadProjectCover(projectName, projectId) {
      if (!this.imageFile) {
        console.log("no file");
        return;
      }
      // Create a root reference
      const storageRef = storage.ref();
      const coversRef = storageRef.child(`covers/${this.imageName}`);
      var metadata = {
        contentType: this.imageType
      };

      try {
        this.isUploading = true;
        await coversRef.put(this.imageFile, metadata);

        const coverUrl = await coversRef.getDownloadURL();

        const docRef = db.collection("projects").doc(projectId.toString());
        if (!this.dbProjectsData[projectId]) {
          await docRef.set(
            {
              name: projectName,
              coverUrl
            },
            { merge: true }
          );
        } else {
          await docRef.set(
            {
              coverUrl
            },
            { merge: true }
          );
        }

        this.hasErr = false;
      } catch (err) {
        console.error();
        this.hasErr = true;
      }
      this.isUploading = false;
      this.snackbar = true;
      this.resetFileInput();
    },

    onFilePicked(e) {
      const selectedFile = e;
      if (selectedFile !== undefined) {
        this.imageName = selectedFile.name;
        this.imageType = selectedFile.type;

        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }

        const fr = new FileReader();
        fr.readAsDataURL(selectedFile);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = selectedFile; // this is an image file that can be sent to server...
        });
      } else {
        this.resetFileInput();
      }
    },
    resetFileInput() {
      this.imageName = "";
      this.imageFile = "";
      this.imageUrl = "";
      this.imageType = "";
      // this.$refs.fileupload.value = null;
      // this.$ref.fileupload.reset();
      //todo: seems no way to reset the display input text
    },
    async deleteTechStack(projectId, deleteItem) {
      const docRef = db.collection("projects").doc(projectId.toString());
      await docRef.update({
        stacks: firebase.firestore.FieldValue.arrayRemove(deleteItem)
      });
    }
  }
};
</script>

<style>
.blur {
  opacity: 0.5;
}

.preview {
  position: absolute;
}
</style>
