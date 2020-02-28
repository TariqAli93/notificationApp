<template>
<v-card elevation style="margin-top: 30px;">
    <template>
        <v-app-bar color="transparent" elevation="0">
            <span>تحديث الفرع</span>
            <v-spacer></v-spacer>
            <v-btn color="secondary" icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </v-app-bar>
        <v-divider></v-divider>
    </template>

    <v-form ref="editBranchesForm" v-model="editBranchesFormModel" @submit.prevent="update(bid)">
        <v-container>
            <v-row>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field :rules="input_rule" v-model="update_name" required label="اسم الفرع"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field type="number" :rules="input_rule" v-model="update_number" required label="رقم الفرع"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field :rules="input_rule" v-model="update_location" required label="المحافظة"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-btn color="secondary" type="submit" block>تعديل</v-btn>
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
            update_name: '',
            update_number: '',
            update_location: '',
            editBranchesFormModel: '',
            bid: this.$route.params.id,
            input_rule: [
                v => !!v || 'حقل مطلوب ! يرجى عدم ترك هذا الحقل فارغ'
            ]
        }
    },

    created() {
        let self = this;
        self.axios.post(`branch/show`)
            .then(response => {
                let filterdBranch = response.data.result.branch.find(branch => branch.id === self.bid);
                self.update_name = filterdBranch.name;
                self.update_location = filterdBranch.location;
                self.update_number = filterdBranch.number_branch;
            }).catch(error => {
                console.error(error)
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

        update(id) {
            let self = this;
            let form = self.$refs.editBranchesForm;
            if (form.validate()) {
                self.axios.post(`branch/edit?id=${id}`, {
                    name: self.update_name,
                    location: self.update_location,
                    number_branch: self.update_number
                }).then(response => {
                    self.message('','success', 'تم التحديث بنجاح');
                }).catch(error => {
                    self.message('','warning', 'حدث خطأ في تحديث الفرع');
                })
            }
        }
    }
}
</script>

<style lang="scss">

</style>
