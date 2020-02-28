<template>
<v-card elevation style="margin-top: 30px;">
    <template>
        <v-app-bar color="transparent" elevation="0">
            <span>اضافة مستخدم</span>
            <v-spacer></v-spacer>
            <v-btn color="secondary" icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </v-app-bar>
        <v-divider></v-divider>
    </template>

    <v-form v-model="addUserForm" ref="addUserForm" @submit.prevent="addUserProccess()">
        <v-container>
            <v-row>
                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field :rules="input_rule" v-model="username" required label="اسم المستخدم" clearable></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field :rules="input_rule" v-model="first_name" required label="الاسم الاول" clearable></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field :rules="input_rule" v-model="last_name" required label="الاسم الثاني" clearable></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field :rules="input_rule" :type="!showPassword ? 'password' : 'text'" v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" required label="كلمة المرور" clearable @click:append="showPassword = !showPassword"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-select :rules="input_rule" v-model="role" :items="role_list" item-text="name" item-value="id" required label="الصلاحيات" :value="role"></v-select>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-select :rules="input_rule" v-model="branch" :items="branch_list" item-text="name" item-value="id" required label="الفرع" :value="branch"></v-select>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="12" xl="12">
                    <v-btn color="secondary" type="submit" block @click.prevent="addUserProccess()">
                        اضافة
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</v-card>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name: 'addUserModel',
    data() {
        return {
            addUserForm: '',
            username: '',
            first_name: '',
            last_name: '',
            showPassword: false,
            password: '',
            role: '',
            role_list: [{
                    id: 'ADMIN',
                    name: 'ادمن'
                },
                {
                    id: 'User',
                    name: 'موظف فرع'
                },
            ],
            branch: '',
            branch_list: [],
            input_rule: [
                v => !!v || 'حقل مطلوب ! يرجى عدم ترك هذا الحقل فارغ'
            ]
        }
    },

    mounted() {
        let self = this;
        self.axios.post(`branch/show`)
        .then(response => {
            self.branch_list = response.data.result.branch;
        }).catch(error => {
            console.error(error);
            this.message('خطأ في جلب البيانات', 'warning', 'حدث خطأ في جلب البيانات');
        })
    },

    methods: {
        message(title, icon, text) {
            Swal.fire({
                title: title,
                icon: icon,
                text: text
            });
        },

        confirm() {
            return new Promise((resolve, reject) => {
                Swal.fire({
                    title: 'هل انت واثق ؟',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: this.$vuetify.theme.currentTheme.primary,
                    cancelButtonColor: this.$vuetify.theme.currentTheme.error,
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        resolve(result.value)
                    } else if (result.dismiss === 'cancel') {
                        reject(result.dismiss)
                    }
                })
            })
        },

        addUserProccess() {
            let self = this;
            if (this.$refs.addUserForm.validate()) {
                let object = {
                    Username: self.username,
                    Password: self.password,
                    FirstName: self.first_name,
                    LastName: self.last_name,
                    Permissions: [self.role],
                    branch_id: self.branch
                }

                this.axios.post(`account/create`, object , {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => {
                    console.log(response);
                    this.message('اضافة', 'success', 'تمت الاضافة بنجاح');
                    this.$refs.addUserForm.reset();
                }).catch(error => {
                    console.error(error.response.data.code === 400.2)
                    if(error.response.data.code === 400.2) {
                        this.message('خطأ في الاضافة', 'warning', 'المستخدم موجود مسبقا');
                    }
                })
            } else {
                this.message('خطأ في الاضافة', 'warning', 'لا يمكن ترك الحقول فارغة');
            }
        }
    }
}
</script>

<style lang="scss">
    @import '~@sweetalert2/themes/dark/dark.scss';
</style>
