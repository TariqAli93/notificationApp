<template>
<div class="add-notification">
    <v-app-bar elevation="0" color="transparent">
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="$router.go(-1)" icon>
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
    </v-app-bar>
    <v-form ref="addNoti" style="margin-top: 30px;" v-model="addNotiModel">
        <v-card elevation="1" class="pa-3" color="white">
            <v-row>
                <v-col cols="12" class="pa-0" xs="12" sm="12" md="4" lg="4" xl="4">
                    <v-row class="pa-3" no-gutters>
                        <v-col cols="4">
                            <v-select hide-details outlined v-model="alert_number" @change="selectCard($event)" style="border-radius: 0px;" :items="cardType" item-text="name" item-value="id" label="نوع البطاقة"></v-select>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field style="border-radius: 0px;" hide-details outlined disabled color="primary" label="رقم الاشعار" v-model="fixed_alert_number" :value="fixed_alert_number"></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                    <v-text-field hide-details disabled outlined label="المحافظة" v-model="place"></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                    <v-text-field hide-details type="date" outlined label="التاريخ" :rules="rule" v-model="date_one"></v-text-field>
                </v-col>
            </v-row>
        </v-card>

        <v-row>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-card elevation="1" class="pa-3 mt-3" color="white">
                    <v-row>
                        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                            <v-text-field hide-details disabled outlined label="يرسل الى" v-model="alert_to"></v-text-field>
                        </v-col>

                        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                            <v-text-field hide-details disabled outlined label="واصل من" v-model="alert_from"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-card elevation="1" class="pa-3 mt-3" color="white">
                    <v-row>
                        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                            <v-text-field hide-details disabled outlined label="مدين" v-model="debtor"></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                            <v-text-field hide-details disabled outlined label="دائن" v-model="credit"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <v-card elevation="1" class="pa-3" color="white">
            <v-row>
                <v-col cols="12">
                    <v-row no-gutters style="margin-bottom: 3px;">
                        <v-col cols="3">
                            <v-card elevation="0" class="pa-5 text-center" style="border-radius: 0px; color: white; border-left: 1px solid white;" color="secondary">
                                <span>دينار</span>
                            </v-card>
                        </v-col>
                        <v-col cols="9">
                            <v-card elevation="0" class="pa-5 text-center" style="border-radius: 0px; color: white;" color="primary">
                                <span>المقيد لحسابكم بموجب التفاصيل ادناه</span>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_one" type="number" clearable hide-details outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined clearable type="text" placeholder="الملاحظات" v-model="salary_note_one"></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_two" type="number" clearable hide-details outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined clearable type="text" placeholder="الملاحظات" v-model="salary_note_two"></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_three" type="number" clearable hide-details outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined clearable type="text" placeholder="الملاحظات" v-model="salary_note_three"></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_four" type="number" clearable hide-details outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined clearable type="text" placeholder="الملاحظات" v-model="salary_note_four"></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_five" type="number" clearable hide-details outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined clearable type="text" placeholder="الملاحظات" v-model="salary_note_five"></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_six" type="number" clearable hide-details outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined clearable type="text" placeholder="الملاحظات" v-model="salary_note_six"></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-file-input multiple hide-details outlined label="ارفق صورة" :rules="rule" @change="upload($event)">
                        <template v-slot:selection="{ index, text }">
                            <v-chip v-if="index < 2" color="primary" label small>
                                {{ text }}
                            </v-chip>

                            <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                                +{{ files.length - 2 }} File(s)
                            </span>
                        </template>
                    </v-file-input>
                </v-col>
            </v-row>
        </v-card>

        <v-card elevation="1" class="pa-3 mt-3" color="white">
            <v-row no-gutters>
                <v-col cols="3">
                    <v-text-field style="border-radius: 0px" hide-details disabled outlined :value="totalCountNumber"></v-text-field>
                </v-col>

                <v-col cols="1">
                    <v-text-field style="border-radius: 0px" hide-details disabled outlined value="فقط"></v-text-field>
                </v-col>

                <v-col cols="7">
                    <v-text-field style="border-radius: 0px" hide-details disabled outlined :value="writter"></v-text-field>
                </v-col>

                <v-col cols="1">
                    <v-text-field style="border-radius: 0px" hide-details disabled outlined value="لا غير"></v-text-field>
                </v-col>
            </v-row>
        </v-card>

        <v-card elevation="1" class="pa-3 mt-3" color="white">
            <v-row no-gutters>
                <v-col cols="12">
                    <v-text-field style="border-radius: 0px" hide-details disabled outlined value="لاغراض الفرع المستلم للأشعار"></v-text-field>
                </v-col>

                <v-col cols="12" xs="6" sm="6" md="4" lg="4" xl="4">
                    <v-text-field style="border-radius: 0px" hide-details disabled outlined value="يفيد دائنا لحساب"></v-text-field>
                </v-col>

                <v-col cols="12" xs="6" sm="6" md="4" lg="4" xl="4">
                    <v-text-field style="border-radius: 0px" hide-details outlined placeholder="اسم الشخص" :rules="rule" v-model="client_name"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                    <v-text-field style="border-radius: 0px" v-model="date_two" hide-details outlined :rules="rule" type="date"></v-text-field>
                </v-col>
            </v-row>
        </v-card>

        <div class="d-flex justify-space-between" style="margin: 0 auto; margin-top: 30px; margin-bottom: 30px;">
            <v-btn color="secondary" @click="sendAlert();" block>
                ارسال
            </v-btn>
        </div>
    </v-form>
</div>
</template>

<script>
import {
    mask
} from 'vue-the-mask'
import Tafgeet from '../../plugins/tafqeet'
import Swal from 'sweetalert2';
export default {
    directives: {
        mask,
    },
    data() {
        return {
            addNotiModel: '',
            cardType: [{
                    name: 'كي كارد',
                    id: '01'
                },
                {
                    name: 'ماستر كارد',
                    id: '02'
                }
            ],
            fixed_alert_number: null,
            alert_number: '01',
            place: '',
            date_one: '',
            date_two: '',

            alert_from: 'من مصرف الرافدين فرع ',
            alert_to: 'يرسل الى مصرف الرافدين فرع ',
            alert_from_id: '',
            alert_to_id: '',

            debtor: 'حساب الفروع الداخلية على الحاسبة',
            credit: '2524',

            salary_one: 0,
            salary_two: 0,
            salary_three: 0,
            salary_four: 0,
            salary_five: 0,
            salary_six: 0,

            salary_note_one: '',
            salary_note_two: '',
            salary_note_three: '',
            salary_note_four: '',
            salary_note_five: '',
            salary_note_six: '',

            image: '',
            client_name: '',

            total_text: 0,
            total_number: 0,
            taf: '',
            branch_number: '',
            user_id: '',
            mask: '#-#-#-#-#-#-#-#-#-#-#-#-#',
            rule: [
                v => !!v || 'هذا الحقل مطلوب'
            ]
        }
    },

    created() {
        const USER_INFO = JSON.parse(localStorage.getItem('user'));

        this.taf = new Tafgeet()
        this.taf.settings({
            decimls: 2
        });
        this.randomAlertNumber();

        this.alert_to += 369;
        this.alert_from += USER_INFO.branc_number;
        this.alert_from_id = USER_INFO.branc_id;
        this.place = USER_INFO.branch_location;
        this.user_id = USER_INFO.user_ID

    },

    computed: {
        writter: function (total) {
            return this.taf.parse(this.totalCountNumber, 'ar');
        },

        totalCountNumber: function () {
            this.total_number = Number(this.salary_one) + Number(this.salary_two) + Number(this.salary_three) + Number(this.salary_four) + Number(this.salary_five) + Number(this.salary_six);
            return this.total_number;
        },

        totalCountText: function () {
            this.total_text = Number(this.salary_one) + Number(this.salary_two) + Number(this.salary_three) + Number(this.salary_four) + Number(this.salary_five) + Number(this.salary_six);
            return this.total_text;
        },
    },

    methods: {
        message(title, icon, text) {
            Swal.fire({
                title: title,
                icon: icon,
                text: text
            });
        },

        randomAlertNumber() {
            let self = this;
            const USER_INFO = JSON.parse(localStorage.getItem('user'));
            let date = new Date();
            let card = self.alert_number;
            let rand = Math.floor(Math.random() * 90000) + 10000;
            let year = date.getFullYear();
            let month = date.getUTCMonth() < 10 ? "0" + date.getMonth() : date.getMonth();

            let all = rand.toString() + year + month + card

            self.fixed_alert_number = all;
        },

        selectCard(ev) {
            this.alert_number = ev;
            this.randomAlertNumber();
        },

        upload(file) {
            let self = this;
            let data = new FormData();
            this.$parent.$parent.$parent.loadingPage = true;
            data.append("file", file[0], file[0].name)
            self.axios.post(`alert/upload`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                self.image = response.data.path;
                self.$parent.$parent.$parent.loadingPage = false;
                self.message('', 'success', 'تم رفع الصورة بنجاح');
            }).catch(error => {
                console.error(error);
                this.$parent.$parent.$parent.loadingPage = false;
                self.message('', 'warning', 'لم يتم رفع الصورة');
            })
        },

        sendAlert() {
            let self = this;
            let bid = 'c060bc02-93e0-44bb-ae79-4fbfed280f2f'
            const USER_INFO = JSON.parse(localStorage.getItem('user'));
            let object = {
                "number_alert": self.fixed_alert_number,
                "from_branch_id": self.alert_from_id,
                "to_branch_id": bid,
                "clint_name": self.client_name,
                "salary_one": self.salary_one,
                "salary_two": self.salary_two,
                "salary_three": self.salary_three,
                "salary_four": self.salary_four,
                "salary_five": self.salary_five,
                "salary_six": self.salary_six,
                "note_one": self.salary_note_one,
                "note_two": self.salary_note_two,
                "note_three": self.salary_note_three,
                "note_four": self.salary_note_four,
                "note_five": self.salary_note_five,
                "note_six": self.salary_note_six,
                "date_one": self.date_one,
                "date_two": self.date_two,
                "user_id": self.user_id,
                "path_pic": self.image
            }

            if (this.$refs.addNoti.validate()) {
                self.axios.post(`alert/create`, object, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => {
                        console.log(response)
                        self.message('', 'success', 'تم ارسال الاشعار بنجاح');
                        setTimeout(() => {
                            // self.$router.push({path: '/'});
                        }, 1000)
                    }).catch(error => {
                        console.error(error.response)
                    })
            } else {
                self.message('','warning', 'يرجى اكمال جميع البيانات')
            }
        }
    }
}
</script>

<style lang="scss">

</style>
