<template>
  <div>
    <v-card>
      <v-img :src="getCover().url" aspect-ratio="1.7"></v-img>

      <v-btn
        v-if="getCover().fromStorage"
        class="delete-photo-btn"
        color="error"
        fab
        dark
        small
        @click="showDeleteDialog = true"
      >
        <v-icon dark>mdi-delete</v-icon>
      </v-btn>

      <v-dialog v-model="showDeleteDialog" :overlay-opacity="0.8" max-width="50%">
        <v-card>
          <v-card-text class="pt-6">
            <v-icon color="error" class="mx-1">mdi-alert-circle-outline</v-icon>
            Are you sure you want to delete the cover of {{ projectName }} ?
          </v-card-text>

          <v-card-actions class="pb-6 px-5">
            <v-spacer></v-spacer>

            <v-btn @click="showDeleteDialog = false">
              Cancel
            </v-btn>
            <v-btn color="error" @click="deleteStorageFile">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-overlay :absolute="true" :value="imageUrl">
        <v-chip color="secondary" :text-color="$vuetify.theme.dark ? 'black' : 'white'" label medium>Preview</v-chip>
      </v-overlay>
    </v-card>
    <v-form ref="form" v-model="valid" class="d-flex mt-2">
      <v-file-input
        :rules="rules"
        :accept="getAcceptedFiles()"
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
        :disabled="!imageFile || !valid"
        label="Upload"
        @click="uploadProjectCover"
      ></long-loading-btn>
    </v-form>

    <snackbar v-model="showSnackbar" :hasErr="hasErr" :snackbarMsg="snackbarMsg" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import LongLoadingBtn from "../LongLoadingBtn";
import Snackbar from "../Snackbar";
import firebase from "@firebase/app";
import { db, storage } from "../../firebase-config/init";
const storageRef = storage.ref();
const allowedFileType = ["image/gif", "image/jpeg", "image/png"];
const allowedSizeLimit = 5000000; // 5 MB

export default {
  props: ["projectId", "projectName", "panel"],
  components: { LongLoadingBtn, Snackbar },
  data() {
    return {
      valid: false,
      hasErr: false,
      isUploading: false,
      showDeleteDialog: false,
      showSnackbar: false,
      snackbarMsg: "",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      imageType: "",
      rules: [
        value => !value || allowedFileType.indexOf(value.type) >= 0 || "File type can only be gif / jpeg / png.",
        value => !value || value.size < allowedSizeLimit || "Photo size should be less than 5 MB!"
      ]
    };
  },
  computed: {
    ...mapState(["dbProjectsData"])
  },
  watch: {
    panel() {
      this.resetFileInput();
      this.$refs.form.reset();
    }
  },
  methods: {
    getAcceptedFiles() {
      const acceptedFile = allowedFileType.join(",");
      return acceptedFile;
    },
    getCover() {
      const dbCoverUrl = this.dbProjectsData[this.projectId] && this.dbProjectsData[this.projectId]["coverUrl"];

      let res = { url: "", fromStorage: false };
      if (this.imageUrl) {
        res.url = this.imageUrl;
      } else if (dbCoverUrl) {
        (res.url = dbCoverUrl), (res.fromStorage = true);
      } else {
        res.url = `https://cdn.vuetifyjs.com/images/parallax/material.jpg`;
      }

      return res;
    },

    async onFilePicked(e) {
      const selectedFile = e;
      await this.$refs.form.validate();
      if (selectedFile && this.valid) {
        this.imageName = `${this.projectId}-${this.projectName}`;
        this.imageType = selectedFile.type;

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

    async uploadProjectCover() {
      if (!this.imageFile) {
        return;
      }

      const coversRef = storageRef.child(`covers/${this.imageName}`);
      var metadata = {
        contentType: this.imageType
      };

      try {
        this.isUploading = true;
        await coversRef.put(this.imageFile, metadata);

        const coverUrl = await coversRef.getDownloadURL();

        const docRef = db.collection("projects").doc(this.projectId.toString());
        if (!this.dbProjectsData[this.projectId]) {
          await docRef.set(
            {
              name: this.projectName,
              coverUrl,
              stacks: []
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
        this.snackbarMsg = `Cover has been uploaded successfully.`;
      } catch (err) {
        console.error();
        this.hasErr = true;
        this.snackbarMsg = `Something goes wrong!! Cannot update cover of project -- ${this.projectName}.`;
      }
      this.showSnackbar = true;
      this.isUploading = false;
      this.resetFileInput();
      this.$refs.form.reset();
    },

    async deleteStorageFile() {
      const storageCoverRef = storageRef.child(`covers/${this.projectId}-${this.projectName}`);

      const dbProjectRef = db.collection("projects").doc(this.projectId.toString());

      try {
        await dbProjectRef.update({
          coverUrl: firebase.firestore.FieldValue.delete()
        });

        await storageCoverRef.delete();
        this.hasErr = false;
        this.showDeleteDialog = false;
        this.snackbarMsg = `Cover has been deleted successfully.`;
      } catch (err) {
        console.log(err);
        this.hasErr = true;
        this.snackbarMsg = `Something goes wrong! Cannot delete cover of project -- ${this.projectName}.`;
      }

      this.showSnackbar = true;
    },

    resetFileInput() {
      this.imageName = "";
      this.imageFile = "";
      this.imageUrl = "";
      this.imageType = "";
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

.delete-photo-btn {
  position: absolute;
  top: 90%;
  left: 100%;
  transform: translate(-50%, -50%);
}

.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: var(--v-light-base) !important;
}
</style>
