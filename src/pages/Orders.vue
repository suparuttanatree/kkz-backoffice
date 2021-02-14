<template>
  <v-container id="admin">
    <v-card color="white" min-height="80vh">
      <v-simple-table>
        <thead>
          <tr class="head_table">
            <th class="text-left head_table">ลำดับ</th>
            <th class="text-left head_table">เลขที่</th>
            <th class="text-left head_table">ประเภท</th>
            <th class="text-left head_table">ชื่อ</th>
            <th class="text-left head_table">เบอร์มือถือ</th>
            <th class="text-left head_table">อีเมล</th>
            <th class="text-left head_table">หลักฐาน</th>
            <th class="text-left head_table">บัตร</th>
            <th class="text-left head_table">อ้างอิง</th>
            <th class="text-left head_table">สถานะ</th>
            <th class="text-left head_table">ราคา</th>
            <th class="text-center head_table action_column">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order_list" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.order_id }}</td>
            <td v-if="item.order_type == '0'">บัตรสวนสัตว์</td>
            <td v-else-if="item.order_type == '1'">บัตรสวนน้ำ</td>
            <td v-else-if="item.order_type == '2'">บัตรแมวน้ำ</td>
            <td v-else>บัตร</td>
            <td>{{ item.name }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.email }}</td>
            <td>
              <img
                @click="show(item.slip)"
                :src="item.slip"
                alt=""
                width="50px"
              />
            </td>
            <td>
              <img
                @click="show(item.ticket)"
                :src="item.ticket"
                alt=""
                width="50px"
              />
            </td>
            <td>{{ item.ticket_ref }}</td>
            <td style="width: 100px">
              <v-badge
                v-if="item.order_status == '2'"
                color="green"
                content="ยืนยันแล้ว"
              ></v-badge>
              <v-badge
                v-else-if="item.order_status == '1'"
                color="orange"
                content="รอตรวจสอบ"
              ></v-badge>
              <v-badge
                v-else-if="item.order_status == '0'"
                color="black"
                content="รอชำระ"
              ></v-badge>
            </td>
            <td>{{ item.price }} บาท</td>
            <td>
              <v-row align="center" justify="space-around">
                <v-btn :disabled="item.order_status >= 2" small color="error" @click="approve(item)">
                  <v-icon left> mdi-check-all </v-icon>
                  ยืนยัน
                </v-btn>
              </v-row>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="720px">
      <v-card max-height="800px" justify="center" class="d-block" style="text-align: center">
        <img :src="img_show" alt="" width="450px" />
        <v-btn color="error" @click="close()">
          ปิด
        </v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import GetOrder from "../api/Orders/GetOrder";
import ComfirmOrder from "../api/Orders/ConfirmOrder"
export default {
  name: "Admin",
  data() {
    return {
      dialog: false,
      order_list: [],
      img_show: "",
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
    this.GetOrderList();
  },
  methods: {
    GetOrderList() {
      GetOrder().then((res) => {
        let { Status, Data } = res.data;
        if (Status == 200) {
          console.log(Data);
          this.order_list = Data;
        }
      });
    },
    approve(item) {
      console.log(item.order_id);
      let params ={
          order_id:item.order_id
      }
      ComfirmOrder(params).then(res=>{
        let { Status, Data } = res.data;
        if (Status == 200) {
          console.log(Data);
          this.GetOrderList()
        }
      })
    },
    show(img) {
      this.img_show = img;
      this.dialog = true;
    },
    close(){
    this.img_show = "";
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
  width: 100px;
}
</style>
