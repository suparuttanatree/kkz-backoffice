<template>
  <v-container id="signin">
    <!-- <v-alert type="success">
      I'm a success alert.
    </v-alert> -->
    <div class="master">
      <v-card max-width="580">
        <v-card-title>
          <v-row class="row_bar">
            <img
              width="160"
              src="https://kkz-api.godemma.com/uploads/common/kkz_logo.png"
              alt=""
            />
          </v-row>
          <v-row class="row_bar"><span class="headline">ผู้ดูแลระบบ</span></v-row>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="ชื่อผู้ใช้งาน(ใช้ในการเข้าสู่ระบบ)"
                  v-model="from_login.username"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                ref="pass"
                  @keyup.enter="login()"
                  label="รหัสผ่าน"
                  type="password"
                  v-model="from_login.password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-row justify="center" class="bottom">
            <v-btn class="button" @click="login()">เข้าสู่ระบบ</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import AdminLogin from "../api/Admin/AdminLogin";
export default {
  name: "Signin",
  data() {
    return {
      from_login: {
        username: null,
        password: null,
      },
    };
  },
  created() {
    if(localStorage.getItem("admin")){
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      let params = {
        username: this.from_login.username,
        password: this.from_login.password,
      };
      AdminLogin(params).then((res) => {
        let { Status: status, Data: data } = res.data;
        if (status == 200) {
          console.log(data);
          localStorage.setItem("admin", JSON.stringify(data));
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
<style lang="css">
.master {
  padding-top: 120px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.bottom {
  align-items: center;
  justify-content: center;
  display: flex;
}
.button {
  /* color: green; */
  background-color: green !important;
}
.row_bar{
  width: 100%;
  text-align: center;
  justify-content: center;
  padding-top: 25px;
}
</style>