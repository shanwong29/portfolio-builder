<template>
  <v-expansion-panels focusable>
    <v-expansion-panel v-for="project in filteredGithubData" :key="project.id">
      <v-expansion-panel-header>{{ project.name }}</v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="my-2">
          <v-row>
            <v-col>
              <v-card>
                <v-img :src="getCoverUrl(project.id)" aspect-ratio="1.7"></v-img>
                <v-overlay :absolute="true" :value="imageUrl">
                  <v-chip color="primary" label medium>Preview</v-chip>
                </v-overlay>
              </v-card>
              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/gif"
                placeholder="Pick a project cover"
                prepend-icon="mdi-camera"
                label="Project Cover"
                show-size
                @change="onFilePicked"
              ></v-file-input>
              <v-btn @click="uploadProjectCover(project.name, project.id)">Upload</v-btn>
            </v-col>
            <v-col>
              <v-btn small @click="toggleShowProject(project.name, project.id)">
                {{
                dbProjectsData[project.id] && dbProjectsData[project.id]["hide"]
                ? `show`
                : `hide`
                }}
              </v-btn>

              <v-subheader class="my-4 mx-0">Tech stacks</v-subheader>
              <template v-if="dbProjectsData[project.id]">
                <v-chip
                  v-for="(stack, index) in dbProjectsData[project.id]['stacks']"
                  :key="index"
                >{{ stack }}</v-chip>
              </template>
              <div class="input-wrapper">
                <v-text-field v-model="stackToBeAdded" label="Add Stack"></v-text-field>

                <v-btn
                  color="success"
                  outlined
                  @click="addStack(project.name, project.id)"
                  class="mx-2"
                >
                  <v-icon class="mr-2">mdi-plus-circle-outline</v-icon>Add
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { db, storage } from "../../firebase/init";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Projects",
  data() {
    return {
      stackToBeAdded: "",
      rules: [
        value =>
          !value ||
          value.size < 5000000 ||
          "Photo size should be less than 5 MB!"
      ],
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  computed: {
    ...mapGetters(["filteredGithubData"]),
    ...mapState(["dbProjectsData"])
  },
  methods: {
    getCoverUrl(projectId) {
      if (this.imageUrl) {
        return this.imageUrl;
      }
      if (
        this.dbProjectsData[projectId] &&
        this.dbProjectsData[projectId]["coverUrl"]
      ) {
        return this.dbProjectsData[projectId]["coverUrl"];
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
            stacks: [
              ...this.dbProjectsData[projectId]["stacks"],
              this.stackToBeAdded.trim()
            ]
          });
        }

        this.stackToBeAdded = "";

        console.log("stacks updated");
      } catch (err) {
        console.log(err);
      }
    },
    async toggleShowProject(projectName, projectId) {
      const docRef = db.collection("projects").doc(projectId.toString());
      if (!this.dbProjectsData[projectId]) {
        await docRef.set(
          {
            name: projectName,
            hide: true
          },
          { merge: true }
        );
      } else {
        await docRef.set(
          {
            hide: !this.dbProjectsData[projectId]["hide"]
          },
          { merge: true }
        );
      }
    },
    async uploadProjectCover(projectName, projectId) {
      // Create a root reference
      const storageRef = storage.ref();
      const coversRef = storageRef.child(`covers/${this.imageName}`);
      var metadata = {
        contentType: "image/jpeg"
      };
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

      this.imageName = "";
      this.imageFile = "";
      this.imageUrl = "";
    },

    onFilePicked(e) {
      const selectedFile = e;
      if (selectedFile !== undefined) {
        this.imageName = selectedFile.name;
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
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
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

.image-wrapper {
  position: relative;
}
</style>
