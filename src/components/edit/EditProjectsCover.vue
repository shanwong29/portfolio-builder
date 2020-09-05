<template>
  <div>
    <v-card>
      <v-img :src="getCoverUrl(projectId)" aspect-ratio="1.7"></v-img>
      <v-overlay :absolute="true" :value="imageUrl">
        <v-chip
          color="secondary"
          :text-color="$vuetify.theme.dark ? 'black' : 'white'"
          label
          medium
        >Preview</v-chip>
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
        @click="uploadProjectCover(projectName, projectId)"
      ></long-loading-btn>
    </div>

    <snackbar v-model="showSnackbar" :hasErr="hasErr" :snackbarMsg="snackbarMsg" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import LongLoadingBtn from "../LongLoadingBtn";
import { db, storage } from "../../firebase/init";
import Snackbar from "../Snackbar";

export default {
  props: ["projectId", "projectName", "panel"],
  components: { LongLoadingBtn, Snackbar },
  data() {
    return {
      hasErr: false,
      isUploading: false,
      showSnackbar: false,
      snackbarMsg: "",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      imageType: "",
      rules: [
        value =>
          !value ||
          value.size < 5000000 ||
          "Photo size should be less than 5 MB!"
      ]
    };
  },
  computed: {
    ...mapState(["dbProjectsData"])
  },
  watch: {
    panel() {
      this.resetFileInput();
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
        this.snackbarMsg = "Photo uploaded successfully";
      } catch (err) {
        console.error();
        this.hasErr = true;
        this.snackbarMsg =
          "Something goes wrong!! Cannot update cover of this project.";
      }
      this.showSnackbar = true;
      this.isUploading = false;
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