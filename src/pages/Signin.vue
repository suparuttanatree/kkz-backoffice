<template>
  <v-container id="signin"> 
    <div class="text-center mt-10">
      <v-card
        max-width="560"
      >
          <v-card-title>
            <span class="headline">ผู้ดูแลระบบ</span>
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
                    label="รหัสผ่าน"
                    type="password"
                    v-model="from_login.password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-row class="text-center mb-2">
            <v-btn @click="login()">เข้าสู่ระบบ</v-btn>
          </v-row>
          
        </v-card>
        </div>
  </v-container>
</template>
<script>
import AdminLogin from "../api/Admin/AdminLogin";
export default {
    name:"Signin",
    data() {
      return {
        from_login:{
          username:null,
          password:null
        }
      }
    },
    methods: {
      login(){
        let params = {
          username:this.from_login.username,
          password:this.from_login.password
        }
        AdminLogin(params).then(res => {
          let { Status: status, Data: data } = res.data;
          if (status == 200) {
            console.log(data);
            localStorage.setItem('admin',JSON.stringify(data));
            this.$router.push('/')
          }
        })
        
      }
    },
}
</script>