<template>
  <v-container id="highlight">
    <v-card color="white" min-height="80vh">
      <v-row class="pa-4 d-flex flex-row-reverse">
        <v-btn small color="success" @click="add_admin()">
          <v-icon left> mdi-plus </v-icon>
          เพิ่ม
        </v-btn>
      </v-row>
      <v-simple-table>
        <thead>
          <tr class="head_table">
            <th class="text-left head_table">ลำดับ</th>
            <th class="text-left head_table">รูปภาพ</th>
            <th class="text-left head_table">ชื่อ</th>
            <th class="text-left head_table">รายละเอียด</th>
            <th class="text-center head_table action_column">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in highlight_list"
            :key="index"
            class="text_to_top"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img width="80px" :src="item.highlight_img" alt="" />
            </td>
            <td>{{ item.highlight_name }}</td>
            <td>{{ item.highlight_detail }}</td>
            <td>
              <v-row class="mt-4" align="center" justify="space-around">
                <v-btn small color="success" @click="edit_admin(item)">
                  <v-icon left> mdi-pencil </v-icon>
                  แก้ไข
                </v-btn>
                <v-btn small color="error" @click="delete_admin(item)">
                  <v-icon left> mdi-delete </v-icon>
                  ลบ
                </v-btn>
              </v-row>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row justify="center">
                <v-avatar
                  style="cursor: pointer"
                  color="indigo"
                  size="120"
                  @click="launchFilePicker()"
                >
                  <img v-bind:src="dialog_data.highlight_img" />
                </v-avatar>
                <input
                  type="file"
                  ref="file"
                  @change="onFileChange($event.target)"
                  style="display: none"
                />
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="ชื่อ"
                    v-model="dialog_data.highlight_name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-container fluid>
                    <v-textarea
                      label="รายละเอียด"
                      rows="10"
                      v-model="dialog_data.highlight_detail"
                    ></v-textarea>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancel()"> ปิด </v-btn>
            <v-btn color="blue darken-1" text @click="confirm()">
              บันทึก
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import GetHighlight from "../api/Common/GetHighlight";
import UploadImage from "../api/Common/UploadImage";
import AddHighlight from "../api/Common/AddHighlight";
import EditHighlight from "../api/Common/EditHighlight";
import DateleHighlight from "../api/Common/DeleteHighlight";
export default {
  name: "Highlight",
  data() {
    return {
      dialog: false,
      highlight_list: [],
      dialog_data: {
        highlight_id: 0,
        highlight_name: null,
        highlight_detail: null,
        highlight_img: null,
      },
      state: "add",
    };
  },
  created() {
    this.get_highlight();
  },
  methods: {
    get_highlight() {
      GetHighlight().then((res) => {
        let { Status: status, Data: data } = res.data;
        if (status == 200) {
          this.highlight_list = data;
        }
      });
    },
    add_admin() {
      this.state = "add";
      (this.dialog_data = {
        highlight_name: null,
        highlight_detail: null,
        highlight_img: null,
      }),
        (this.dialog = true);
    },
    edit_admin(item) {
      this.state = "edit";
      (this.dialog_data = {
        highlight_id: item.highlight_id,
        highlight_name: item.highlight_name,
        highlight_detail: item.highlight_detail,
        highlight_img: item.highlight_img,
      }),
        (this.dialog = true);
    },
    delete_admin(item) {
      console.log(item);
      let params = {
        highlight_id: item.highlight_id,
      };
      DateleHighlight(params).then((res) => {
        let { Status: status, Data: data } = res.data;
        if (status == 200) {
          console.log(data);
          this.get_highlight();
        }
      });
    },
    cancel() {
      (this.dialog_data = {
        highlight_name: null,
        highlight_detail: null,
        highlight_img: null,
      }),
        (this.dialog = false);
    },
    confirm() {
      if (this.state == "edit") {
        console.log("edit");
        let params = {
          highlight_id: this.dialog_data.highlight_id,
          highlight_name: this.dialog_data.highlight_name,
          highlight_detail: this.dialog_data.highlight_detail,
          highlight_img: this.dialog_data.highlight_img,
        };
        EditHighlight(params).then((res) => {
          let { Status: status, Data: data } = res.data;
          if (status == 200) {
            console.log(data);
            this.get_highlight();
            this.dialog_data = {
              highlight_name: null,
              highlight_detail: null,
              highlight_img: null,
            };
            this.dialog = false;
          }
        });
      } else {
        console.log("add");
        let params = {
          highlight_name: this.dialog_data.highlight_name,
          highlight_detail: this.dialog_data.highlight_detail,
          highlight_img: this.dialog_data.highlight_img,
        };
        AddHighlight(params).then((res) => {
          let { Status: status, Data: data } = res.data;
          if (status == 200) {
            console.log(data);
            this.get_highlight();
            this.dialog_data = {
              highlight_name: null,
              highlight_detail: null,
              highlight_img: null,
            };
            this.dialog = false;
          }
        });
      }
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    async onFileChange(target) {
      console.log(target.files[0]);
      var reader = new FileReader();
      reader.onloadend = (event) => {
        let params = {
          up_to: "common",
          type: target.files[0].type,
          img: event.target.result,
        };
        this.upload(params);
      };
      reader.readAsDataURL(target.files[0]);
    },
    upload(data) {
      console.log(data);
      UploadImage(data).then((res) => {
        let { Status: status, Data: data } = res.data;
        if (status == 200) {
          console.log(data);
          this.dialog_data.highlight_img = data.img_path;
        }
      });
    },
  },
};
</script>

<style>
.head_table {
  font-size: 20px;
}
.action_column {
  width: 200px;
}
.text_to_top {
  vertical-align: top;
}
</style>
