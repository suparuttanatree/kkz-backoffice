<template>
  <v-container id="admin">
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
            <th class="text-left head_table">เบอร์มือถือ</th>
            <th class="text-left head_table">อีเมล</th>
            <th class="text-left head_table">ชื่อผู้ใช้</th>
            <th class="text-center head_table action_column">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in admin_list" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <v-avatar color="indigo" size="30">
                <img v-bind:src="item.admin_img" />
              </v-avatar>
            </td>
            <td>{{ item.admin_name }}</td>
            <td>{{ item.admin_tel }}</td>
            <td>{{ item.admin_email }}</td>
            <td>{{ item.admin_username }}</td>
            <td>
              <v-row align="center" justify="space-around">
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
                  <img v-bind:src="dialog_data.admin_img" />
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
                    v-model="dialog_data.admin_name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="เบอร์ติดต่อ"
                    v-model="dialog_data.admin_tel"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="อีเมล"
                    v-model="dialog_data.admin_email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ชื่อผู้ใช้งาน(ใช้ในการเข้าสู่ระบบ)"
                    v-model="dialog_data.admin_username"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="รหัสผ่าน"
                    type="password"
                    v-model="dialog_data.admin_password"
                  ></v-text-field>
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
import GetAdmin from "../api/Admin/GetAdmin";
import EditAdmin from "../api/Admin/EditAdmin";
import RegisterAdmin from "../api/Admin/RegisterAdmin";
import DeleteAdmin from "../api/Admin/DeleteAdmin";
import UploadImage from "../api/Common/UploadImage";
export default {
  name: "Admin",
  data() {
    return {
      dialog: false,
      admin_list: [],
      dialog_data: {
        admin_img: null,
        admin_id: 0,
        admin_name: null,
        admin_tel: null,
        admin_email: null,
        admin_username: null,
        admin_password: null,
      },
      state: "add",
    };
  },
  created() {
    this.GetAdminList();
  },
  methods: {
    GetAdminList() {
      GetAdmin().then((res) => {
        let { Status, Data } = res.data;
        if (Status == 200) {
          this.admin_list = Data;
        }
      });
    },
    add_admin() {
      this.state = "add";
      (this.dialog_data = {
        admin_img: null,
        admin_id: 0,
        admin_name: null,
        admin_tel: null,
        admin_email: null,
        admin_username: null,
        admin_password: null,
      }),
        console.log(this.dialog_data);
      this.dialog = true;
    },
    edit_admin(item) {
      this.state = "edit";
      (this.dialog_data = {
        admin_img: item.admin_img,
        admin_id: item.admin_id,
        admin_name: item.admin_name,
        admin_tel: item.admin_tel,
        admin_email: item.admin_email,
        admin_username: item.admin_username,
        admin_password: item.admin_password,
      }),
        console.log(this.dialog_data);
      this.dialog = true;
    },
    delete_admin(item) {
      console.log(item);
      let params = {
        id: item.admin_id,
      };
      DeleteAdmin(params).then(() => {
        this.GetAdminList();
      });
    },
    cancel() {
      (this.dialog_data = {
        admin_img: null,
        admin_id: 0,
        admin_name: null,
        admin_tel: null,
        admin_email: null,
        admin_username: null,
        admin_password: null,
      }),
        (this.dialog = false);
    },
    confirm() {
      if (this.state == "edit") {
        console.log(this.dialog_data);
        console.log("edit");
        let params = {
          img: this.dialog_data.admin_img,
          id: this.dialog_data.admin_id,
          name: this.dialog_data.admin_name,
          tel: this.dialog_data.admin_tel,
          username: this.dialog_data.admin_username,
          email: this.dialog_data.admin_email,
          password: this.dialog_data.admin_password,
        };
        EditAdmin(params).then(() => {
          this.GetAdminList();
          (this.dialog_data = {
            admin_img: null,
            admin_id: 0,
            admin_name: null,
            admin_tel: null,
            admin_email: null,
            admin_username: null,
            admin_password: null,
          }),
            (this.dialog = false);
        });
      } else {
        console.log(this.dialog_data);
        console.log("add");
        let params = {
          img: this.dialog_data.admin_img,
          name: this.dialog_data.admin_name,
          tel: this.dialog_data.admin_tel,
          username: this.dialog_data.admin_username,
          email: this.dialog_data.admin_email,
          password: this.dialog_data.admin_password,
        };
        RegisterAdmin(params)
          .then(() => {
            this.GetAdminList();
            (this.dialog_data = {
              admin_img: null,
              admin_id: 0,
              admin_name: null,
              admin_tel: null,
              admin_email: null,
              admin_username: null,
              admin_password: null,
            }),
              (this.dialog = false);
          })
          .catch((e) => console.log(e));
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
          up_to: "profiles",
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
          this.dialog_data.admin_img = data.img_path;
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
</style>
