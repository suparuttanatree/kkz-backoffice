<template>
  <v-container id="users">
    <v-card color="white" min-height="80vh">
      <v-row class="pa-4 d-flex flex-row-reverse">
        <v-btn small color="success" @click="add_user()">
          <v-icon left> mdi-plus </v-icon>
          เพิ่ม
        </v-btn>
      </v-row>
      <v-simple-table>
        <thead>
          <tr class="head_table">
            <th class="text-left head_table">ลำดับ</th>
            <th class="text-left head_table">ชื่อ</th>
            <th class="text-left head_table">เบอร์มือถือ</th>
            <th class="text-left head_table">อีเมล</th>
            <th class="text-left head_table">ชื่อผู้ใช้</th>
            <th class="text-center head_table action_column">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in costumer_list" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.customer_name }}</td>
            <td>{{ item.customer_tel }}</td>
            <td>{{ item.customer_email }}</td>
            <td>{{ item.customer_username }}</td>
            <td>
              <v-row align="center" justify="space-around">
                <v-btn small color="success" @click="edit_user(item)">
                  <v-icon left> mdi-pencil </v-icon>
                  แก้ไข
                </v-btn>
                <v-btn small color="error" @click="delete_user(item)">
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
          <v-card-title>
            <span class="headline">สมาชิก</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="ชื่อ"
                    v-model="dialog_data.customer_name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="เบอร์ติดต่อ"
                    v-model="dialog_data.customer_tel"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="อีเมล"
                    v-model="dialog_data.customer_email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ชื่อผู้ใช้งาน(ใช้ในการเข้าสู่ระบบ)"
                    v-model="dialog_data.customer_username"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="รหัสผ่าน"
                    type="password"
                    v-model="dialog_data.customer_password"
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
import GetUser from "../api/Users/GetUser";
import AddUser from "../api/Users/AddUser";
import EditUser from "../api/Users/EditUser";
import DeleteUser from "../api/Users/DeleteUser";
export default {
  name: "Users",
  data() {
    return {
      dialog: false,
      costumer_list: [],
      dialog_data: {
        customer_id: 0,
        customer_name: null,
        customer_tel: null,
        customer_email: null,
        customer_username: null,
      },
      state: "add",
    };
  },
  created() {
    this.GetUserList();
  },
  methods: {
    GetUserList() {
      GetUser().then((res) => {
        let { Status: status, Data: data } = res.data;
        if (status == 200) {
          this.costumer_list = data;
        }
      });
    },
    add_user() {
      this.state = "add";
      this.dialog = true;
    },
    edit_user(item) {
      this.state = "edit";
      this.dialog_data = item;
      this.dialog = true;
    },
    delete_user(item) {
      console.log(item);
      let params = {
        id : item.customer_id
      }
      DeleteUser(params).then(res => {
        let { Status: status, Data: data } = res.data;
          if (status == 200) {
            console.log(data);
            this.GetUserList();
          }
      })
    },
    cancel() {
      this.dialog_data = {};
      this.dialog = false;
    },
    confirm() {
      if (this.state == "edit") {
        console.log("edit");
        let params = {
          id: this.dialog_data.customer_id,
          name: this.dialog_data.customer_name,
          tel: this.dialog_data.customer_tel,
          username: this.dialog_data.customer_username,
          email: this.dialog_data.customer_email,
          password: this.dialog_data.customer_password,
        };
        EditUser(params).then((res) => {
          let { Status: status, Data: data } = res.data;
          if (status == 200) {
            console.log(data);
            this.GetUserList();
            this.dialog_data = {};
            this.dialog = false;
          }
        });
      } else {
        console.log("add");
        let params = {
          name: this.dialog_data.customer_name,
          tel: this.dialog_data.customer_tel,
          username: this.dialog_data.customer_username,
          email: this.dialog_data.customer_email,
          password: this.dialog_data.customer_password,
        };
        AddUser(params).then((res) => {
          let { Status: status, Data: data } = res.data;
          if (status == 200) {
            console.log(data);
            this.GetUserList();
            this.dialog_data = {};
            this.dialog = false;
          }
        });
      }
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
