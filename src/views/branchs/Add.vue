<template>
<v-card elevation style="margin-top: 30px;">
    <template>
        <v-app-bar color="transparent" elevation="0">
            <span>اضافة فرع</span>
            <v-spacer></v-spacer>
            <v-btn color="secondary" icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </v-app-bar>
        <v-divider></v-divider>
    </template>

    <v-form ref="addBranchesForm" v-model="addBranchesFormModel" @submit.prevent="addBranches()">
        <v-container>
            <v-row>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field :rules="input_rule" v-model="name" required label="اسم الفرع"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field type="number" :rules="input_rule" v-model="number" required label="رقم الفرع"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field :rules="input_rule" v-model="location" required label="المحافظة"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-btn color="secondary" type="submit" block>اضافة</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</v-card>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            name: '',
            number: '',
            location: '',
            addBranchesFormModel: '',
            input_rule: [
                v => !!v || 'حقل مطلوب ! يرجى عدم ترك هذا الحقل فارغ'
            ]
        }
    },
    methods: {
        message(title, icon, text) {
            Swal.fire({
                title: title,
                icon: icon,
                text: text
            });
        },

        addBranches() {
            let self = this;
            let form = self.$refs.addBranchesForm;
            let object = {
                name: self.name,
                location: self.location,
                number_branch: self.number
            };

            if (form.validate()) {
                self.axios.post(`branch/create`, object)
                    .then(response => {
                        console.log(response)
                        self.message('', 'success', 'تم اضافة الفرع بنجاح');
                    })
                    .catch(error => {
                        if (error.response.data.code === 400.2) {
                            self.message('', 'warning', 'رقم الفرع موجود مسبقا');
                        } else {
                            self.message('', 'warning', 'خطأ في اضافة الفرع');
                        }
                    })
            }
        }
    }
}
</script>

<style>

</style>
