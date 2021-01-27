<template>
  <v-container id="rooms">
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
          <v-card-title>
            <span class="headline">ผู้ดูแลระบบ</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="ชื่อ" v-model="dialog_data.admin_name"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="เบอร์ติดต่อ" v-model="dialog_data.admin_tel"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="อีเมล" v-model="dialog_data.admin_email"></v-text-field>
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
            <v-btn color="blue darken-1" text @click="cancel()">
              ปิด
            </v-btn>
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
export default {
  name: "Rooms",
  data() {
    return {
      dialog: false,
      admin_list: [
        {
          admin_id:0,
          admin_name: "Frozen Yogurt",
          admin_tel: "0123456789",
          admin_email: "Frozen Yogurt",
          admin_username: "123",
        },
        {
          admin_id:0,
          admin_name: "Frozen Yogurt",
          admin_tel: "0123456789",
          admin_email: "Frozen Yogurt",
          admin_username: "123",
        },
        {
          admin_id:0,
          admin_name: "Frozen Yogurt",
          admin_tel: "0123456789",
          admin_email: "Frozen Yogurt",
          admin_username: "123",
        },
      ],
      dialog_data: {
        admin_id:0,
        admin_name: null,
        admin_tel: null,
        admin_email: null,
        admin_username: null,
      },
      state:"add"
    };
  },
  created() {
    this.GetAdminList();
  },
  methods: {
    GetAdminList() {
      GetAdmin().then((res) => {
        console.log(res.data);
      });
    },
    add_admin() {
      this.state = "add";
      this.dialog = true;
    },
    edit_admin(item) {
      this.state = "edit";
      this.dialog_data = item;
      this.dialog = true;
    },
    delete_admin(item) {
      console.log(item);
    },
    cancel(){
      this.dialog_data = {}
      this.dialog = false;
    },
    confirm(){
      if (this.state == "edit") {
        console.log("edit");
      }else{
        console.log("add");
      }
      this.dialog = false;
    }
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
