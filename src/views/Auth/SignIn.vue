<template>
<div class="login-form">
    <v-form ref="loginForm" class="login-ui-form" v-model="loginFormModel" @submit.prevent="login()">
        <v-container>
            <img src="../../assets/logo.svg" class="login-logo">
            <v-alert :type="alertType" dismissible v-model="alertModel">{{ alertText }}</v-alert>
            <v-row>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field :rules="rules" v-model="username" required label="اسم المستخدم" prepend-inner-icon="mdi-account"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field :rules="rules" :type="showPassword ? 'text' : 'password'" v-model="password" required label="كلمة المرور" prepend-inner-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append="showPassword = !showPassword"></v-text-field>
                </v-col>
            </v-row>
            <v-btn color="secondary" :disabled="disabled" :loading="loading" type="submit" block @click="login()">
                تسجيل الدخول
            </v-btn>
        </v-container>
    </v-form>

    <div class="login-image"></div>
</div>
</template>

<script>
export default {
    name: 'LoginPage',
    data: () => {
        return {
            loginFormModel: '',
            username: '',
            password: '',
            showPassword: false,
            error: false,
            rules: [
                v => !!v || 'لا يمكن ترك هذا الحقل فارغ'
            ],
            alertType: null,
            alertModel: false,
            alertText: '',
            loading: false,
            disabled: false,
        }
    },

    mounted() {
        let uiForm = document.querySelector('.login-ui-form');
        switch (this.$vuetify.breakpoint.name) {
            case 'xs':
                uiForm.classList.add('elevation-1')
                break;
            case 'sm':
                uiForm.classList.add('elevation-1')
                break;
            case 'md':
                uiForm.classList.add('elevation-1')
                break;

        }
    },
    methods: {
        login() {
            let self = this;
            let form = this.$refs.loginForm;
            self.loading = true;
            self.disabled = true;

            if (form.validate()) {
                self.$store.dispatch('LOGIN', {
                    username: self.username,
                    password: self.password
                }).then((response) => {
                    if (response.data.result.per === 'EMPLOYEE') {
                        self.alertType = 'error';
                        self.alertModel = true;
                        self.alertText = 'خطأ في اسم المستخدم او كلمة المرور يرجى التحقق من المعلومات';
                        self.loading = false;
                        self.disabled = false;
                        self.$store.dispatch('LOGOUT');
                    } else {
                        self.alertType = 'success';
                        self.alertModel = true;
                        self.alertText = 'تم تسجيل الدخول بنجاح';
                        self.loading = false;
                        self.disabled = false;
                        self.$router.push('/');
                    }
                }).catch((error) => {
                    self.alertType = 'error';
                    self.alertModel = true;
                    self.alertText = 'خطأ في اسم المستخدم او كلمة المرور يرجى التحقق من المعلومات';
                    self.loading = false;
                    self.disabled = false;
                });
            } else {
                self.alertType = 'error';
                self.alertModel = true;
                self.alertText = 'لا يمكن ترك الحقول فارغة يرجى ادخال اسم المستخدم و كلمة المرور';
                self.loading = false;
                self.disabled = false;
            }
        }
    }
}
</script>

<style lang="scss">
.theme--light.v-label {
    color: #333745 !important;
}

i {
    color: #333745 !important;
}

.login-form {
    background: white;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-image {
        background: {
            image: url('../../assets/login-image.svg');
            repeat: no-repeat;
            size: 70%;
            position: 50px center;
        }

        width: 70%;
        height: 100%;
        padding: 10px;

        @media (max-width: 960px) {
            display: none;
        }
    }

    form {
        width: 40%;
        padding: 30px;

        @media (max-width: 960px) {
            width: 80%;
            margin: 0 auto;
        }
    }

    .login-logo {
        display: block;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        margin-bottom: 25px;
    }
}
</style>
