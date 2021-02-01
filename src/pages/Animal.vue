<template>
  <v-container id="animals">
    <v-card color="white" min-height="80vh">
      <v-row class="pa-4 d-flex flex-row-reverse">
        <v-btn small color="success" @click="add_admin()">
          <v-icon left> mdi-plus </v-icon>
          เพิ่ม
        </v-btn>
        <div>
          <v-select
            style="width: 160"
            class="mt-n4 mr-2"
            @change="select_type($event)"
            :items="animal_type"
            item-text="ani_type_name"
            item-value="ani_type_id"
            label="ประเภท"
            v-model="dialog_data.animal_typeid"
          ></v-select>
        </div>
      </v-row>
      <v-simple-table class="table">
        <thead>
          <tr class="">
            <th class="text-left head_table">ลำดับ</th>
            <th class="text-left head_table">ชื่อ(ไทย)</th>
            <th class="text-left head_table">ชื่อ(อังกฤษ)</th>
            <th class="text-left head_table">ชื่อ(วิทยาศาสตร์)</th>
            <th class="text-left head_table">รูปภาพ</th>
            <th class="text-left head_table">ประเภท</th>
            <th class="text-left head_table">สิ่งที่น่าสนใจ</th>
            <th class="text-left head_table">ถิ่นอาศัย</th>
            <th class="text-left head_table">อาหาร</th>
            <th class="text-left head_table">พฤติกรรม</th>
            <th style="width: 80px" class="text-left head_table">
              สถานภาพปัจจุบัน
            </th>
            <th class="text-center head_table action_column">จัดการ</th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="text_to_top"
            v-for="(item, index) in animalList"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.animal_thainame }}</td>
            <td>{{ item.animal_engname }}</td>
            <td>{{ item.animal_sciencename }}</td>
            <td>
              <img width="80px" :src="item.animal_img" alt="" />
            </td>
            <td>{{ item.animal_typename }}</td>
            <td>{{ item.animal_interest }}</td>
            <td>{{ item.animal_local }}</td>
            <td>{{ item.animal_food }}</td>
            <td>{{ item.animal_action }}</td>
            <td>{{ item.animal_status }}</td>
            <td>
              <v-row class="mt-4" justify="space-around">
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
      <div class="text-center pa-5">
        <v-pagination
          @input="page_change($event)"
          v-model="page"
          :length="total_page"
        ></v-pagination>
      </div>
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
                  <img v-bind:src="dialog_data.animal_img" />
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
                    label="ชื่อ(ภาษาไทย)"
                    v-model="dialog_data.animal_thainame"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ชื่อ(ภาษาอังกฤษ)"
                    v-model="dialog_data.animal_engname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ชื่อ(วิทยาศาสตร์)"
                    v-model="dialog_data.animal_sciencename"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-select
                    :items="animal_type"
                    item-text="ani_type_name"
                    item-value="ani_type_id"
                    label="ประเภท"
                    v-model="dialog_data.animal_typeid"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="สิ่งที่น่าสนใจ"
                    v-model="dialog_data.animal_interestl"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ถิ่นอาศัย"
                    v-model="dialog_data.animal_local"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="อาหาร"
                    v-model="dialog_data.animal_food"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="พฤติกรรม"
                    v-model="dialog_data.animal_action"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="สถานภาพปัจจุบัน"
                    v-model="dialog_data.animal_status"
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
// import GetAdmin from "../api/Admin/GetAdmin";
import GetAnimals from "../api/Animals/GetAnimals";
import UploadImage from "../api/Common/UploadImage";
import EditAnimal from "../api/Animals/EditAnimal";
import GetAnimalType from "../api/Animals/GetAnimalType";
import AddAnimal from "../api/Animals/AddAnimal";
import DeleteAnimal from "../api/Animals/DeleteAnimal";
export default {
  name: "Animals",
  data() {
    return {
      type: null,
      animal_type: [],
      img_base64: "",
      dialog: false,
      page: 1,
      total_page: 5,
      animalList: [],
      dialog_data: {
        animal_id: 0,
        animal_thainame: null,
        animal_engname: null,
        animal_sciencename: null,
        animal_img: null,
        animal_typeid: null,
        animal_interest: null,
        animal_local: null,
        animal_food: null,
        animal_action: null,
        animal_status: null,
      },
      state: "add",
    };
  },
  created() {
    let params = {
      type: null,
      page: 1,
    };
    this.GetAnimalList(params);
    this.GetType();
  },
  methods: {
    page_change(e) {
      console.log(e);
      this.page = e;
      let params = {
        type: this.type,
        page: e,
      };
      this.GetAnimalList(params);
    },
    select_type(e) {
      this.type = e;
      let params = {
        type: e,
        page: 1,
      };
      this.GetAnimalList(params);
    },
    GetType() {
      GetAnimalType().then((res) => {
        let { Status: status, Data: data } = res.data;
        if (status == 200) {
          console.log(data);
          this.animal_type = data;
          let nan = {
            ani_type_id: null,
            ani_type_name: "ไม่ระบุ",
          };
          this.animal_type = this.animal_type.concat(nan);
        }
      });
    },
    GetAnimalList(params) {
      GetAnimals(params).then((res) => {
        let { Status: status, Data: data } = res.data;
        if (status == 200) {
          this.animalList = data.animals;
          this.page = Number(data.page);
          this.total_page = Number(data.total_page);
        }
      });
    },
    add_admin() {
      this.state = "add";
      this.dialog = true;
    },
    edit_admin(item) {
      this.state = "edit";
      (this.dialog_data = {
        animal_id: item.animal_id,
        animal_thainame: item.animal_thainame,
        animal_engname: item.animal_engname,
        animal_sciencename: item.animal_sciencename,
        animal_img: item.animal_img,
        animal_typeid: item.animal_typeid,
        animal_interest: item.animal_interest,
        animal_local: item.animal_local,
        animal_food: item.animal_food,
        animal_action: item.animal_action,
        animal_status: item.animal_status,
      }),
        (this.dialog = true);
    },
    delete_admin(item) {
      console.log(item);
      let params = {
        animal_id: item.animal_id,
      };
      DeleteAnimal(params).then((res) => {
        let { Status: status} = res.data;
        if (status == 200) {
          let params = {
            type: this.type,
            page: 1,
          };
          this.GetAnimalList(params);
        }
      });
    },
    cancel() {
      this.dialog_data = {
        animal_id: 0,
        animal_thainame: null,
        animal_engname: null,
        animal_sciencename: null,
        animal_img: null,
        animal_typeid: null,
        animal_interest: null,
        animal_local: null,
        animal_food: null,
        animal_action: null,
        animal_status: null,
      };
      this.dialog = false;
    },
    confirm() {
      if (this.state == "edit") {
        console.log("edit");
        let params = {
          animal_id: this.dialog_data.animal_id,
          animal_thainame: this.dialog_data.animal_thainame,
          animal_engname: this.dialog_data.animal_engname,
          animal_sciencename: this.dialog_data.animal_sciencename,
          animal_img: this.dialog_data.animal_img,
          animal_typeid: this.dialog_data.animal_typeid,
          animal_interest: this.dialog_data.animal_interest,
          animal_local: this.dialog_data.animal_local,
          animal_food: this.dialog_data.animal_food,
          animal_action: this.dialog_data.animal_action,
          animal_status: this.dialog_data.animal_status,
        };
        EditAnimal(params).then((res) => {
          let { Status: status, Data: data } = res.data;
          if (status == 200) {
            console.log(data);
            let params = {
              type: null,
              page: 1,
            };
            this.GetAnimalList(params);
            this.dialog_data = {
              animal_id: 0,
              animal_thainame: null,
              animal_engname: null,
              animal_sciencename: null,
              animal_img: null,
              animal_typeid: null,
              animal_interest: null,
              animal_local: null,
              animal_food: null,
              animal_action: null,
              animal_status: null,
            };
          }
        });
      } else {
        console.log("add");
        let params = {
          animal_thainame: this.dialog_data.animal_thainame,
          animal_engname: this.dialog_data.animal_engname,
          animal_sciencename: this.dialog_data.animal_sciencename,
          animal_img: this.dialog_data.animal_img,
          animal_typeid: this.dialog_data.animal_typeid,
          animal_interest: this.dialog_data.animal_interest,
          animal_local: this.dialog_data.animal_local,
          animal_food: this.dialog_data.animal_food,
          animal_action: this.dialog_data.animal_action,
          animal_status: this.dialog_data.animal_status,
        };
        AddAnimal(params).then((res) => {
          let { Status: status, Data: data } = res.data;
          if (status == 200) {
            console.log(data);
            let params = {
              type: null,
              page: 1,
            };
            this.GetAnimalList(params);
            this.dialog_data = {
              animal_id: 0,
              animal_thainame: null,
              animal_engname: null,
              animal_sciencename: null,
              animal_img: null,
              animal_typeid: null,
              animal_interest: null,
              animal_local: null,
              animal_food: null,
              animal_action: null,
              animal_status: null,
            };
          }
        });
      }
      this.dialog = false;
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    async onFileChange(target) {
      console.log(target.files[0]);
      var reader = new FileReader();
      reader.onloadend = (event) => {
        let params = {
          up_to: "animal",
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
          this.dialog_data.animal_img = data.img_path;
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
/* .table{
    display:table;
    width:100%;
    table-layout:fixed;
} */
</style>
