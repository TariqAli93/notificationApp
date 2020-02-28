<template>
<div class="add-notification">
    <v-form ref="addNoti" style="margin-top: 30px;" v-model="addNotiModel">
        <v-card elevation="1" class="pa-3" color="white">
            <v-row>
                <v-col cols="12" class="pa-0" xs="12" sm="12" md="4" lg="4" xl="4">
                    <v-row class="pa-3" no-gutters>
                        <v-col cols="12">
                            <v-text-field style="border-radius: 0px;" hide-details outlined disabled dense color="primary" label="رقم الاشعار" v-model="fixed_alert_number" :value="fixed_alert_number"></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                    <v-text-field hide-details disabled dense outlined label="المحافظة" v-model="place"></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                    <v-text-field hide-details type="text" disabled dense outlined label="التاريخ" v-model="date_one"></v-text-field>
                </v-col>
            </v-row>
        </v-card>

        <v-row>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-card elevation="1" class="pa-3 mt-3" color="white">
                    <v-row>
                        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                            <v-text-field hide-details disabled dense outlined label="يرسل الى" v-model="alert_to"></v-text-field>
                        </v-col>

                        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                            <v-text-field hide-details disabled dense outlined label="واصل من" v-model="alert_from"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-card elevation="1" class="pa-3 mt-3" color="white">
                    <v-row>
                        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                            <v-text-field hide-details disabled dense outlined label="مدين" v-model="debtor"></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                            <v-text-field hide-details disabled dense outlined label="دائن" v-model="credit"></v-text-field>
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
                            <v-text-field style="border-radius: 0px" v-model="salary_one" type="number" clearable hide-details disabled dense outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined disabled dense clearable type="text" placeholder="الملاحضات" v-model="salary_note_one"></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_two" type="number" clearable hide-details disabled dense outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined clearable disabled dense type="text" placeholder="الملاحضات" v-model="salary_note_two"></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_three" type="number" clearable hide-details disabled dense outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined disabled dense clearable type="text" placeholder="الملاحضات" v-model="salary_note_three"></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_four" type="number" clearable hide-details disabled dense outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined disabled dense clearable type="text" placeholder="الملاحضات" v-model="salary_note_four"></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_five" type="number" clearable hide-details disabled dense outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined disabled dense clearable type="text" placeholder="الملاحضات" v-model="salary_note_five"></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field style="border-radius: 0px" v-model="salary_six" type="number" clearable hide-details disabled dense outlined placeholder="القيمة" value="0"></v-text-field>
                        </v-col>

                        <v-col cols="9">
                            <v-text-field style="border-radius: 0px" hide-details outlined disabled dense clearable type="text" placeholder="الملاحضات" v-model="salary_note_six"></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>

        <v-card elevation="1" class="pa-3 mt-3" color="white">
            <v-row no-gutters>
                <v-col cols="3">
                    <v-text-field style="border-radius: 0px" hide-details disabled dense outlined :value="totalCountNumber"></v-text-field>
                </v-col>

                <v-col cols="2">
                    <v-text-field style="border-radius: 0px" hide-details disabled dense outlined value="فقط"></v-text-field>
                </v-col>

                <v-col cols="5">
                    <v-text-field style="border-radius: 0px" hide-details disabled dense outlined :value="writter"></v-text-field>
                </v-col>

                <v-col cols="2">
                    <v-text-field style="border-radius: 0px" hide-details disabled dense outlined value="لا غير"></v-text-field>
                </v-col>
            </v-row>
        </v-card>

        <v-card elevation="1" class="pa-3 mt-3" color="white">
            <v-row no-gutters>
                <v-col cols="12">
                    <v-text-field style="border-radius: 0px" hide-details disabled dense outlined value="لاغراض الفرع المستلم للأشعار"></v-text-field>
                </v-col>

                <v-col cols="12" xs="6" sm="6" md="4" lg="4" xl="4">
                    <v-text-field style="border-radius: 0px" hide-details disabled dense outlined value="يفيد دائنا لحساب"></v-text-field>
                </v-col>

                <v-col cols="12" xs="6" sm="6" md="4" lg="4" xl="4">
                    <v-text-field style="border-radius: 0px" hide-details disabled dense outlined placeholder="اسم الشخص" v-model="client_name"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                    <v-text-field style="border-radius: 0px" v-model="date_two" hide-details disabled dense outlined type="text"></v-text-field>
                </v-col>
            </v-row>
        </v-card>
        
        <div class="d-flex justify-space-between" style="margin: 0 auto; margin-top: 30px; margin-bottom: 30px;">
            <v-btn color="secondary" large class="no-print" @click="printBill()" block>
                طباعة الوصل
            </v-btn>
        </div>
    </v-form>
</div>
</template>

<script>
import Tafgeet from '../../plugins/tafqeet'
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            addNotiModel: '',
            fixed_alert_number: null,
            place: '',
            date_one: '',
            date_two: '',

            alert_from: 'من مصرف الرافدين فرع ',
            alert_to: 'يرسل الى مصرف الرافدين فرع 369',
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
        }
    },

    created() {
        this.taf = new Tafgeet()
        this.taf.settings({
            decimls: 2
        });

        this.branch_number = this.$route.params.id;
        this.axios.post(`alert/showone?number=${this.branch_number}`)
            .then(response => {
                console.log(response);
                this.fixed_alert_number = response.data.result.res.number_alert,
                this.place = response.data.result.res.branch_location;
                this.alert_from += response.data.result.res.branch_number_from;
                this.client_name = response.data.result.res.client_name;
                this.salary_one = response.data.result.res.salary_one;
                this.salary_two = response.data.result.res.salary_two;
                this.salary_three = response.data.result.res.salary_three;
                this.salary_four = response.data.result.res.salary_four;
                this.salary_five = response.data.result.res.salary_five;
                this.salary_six = response.data.result.res.salary_six;
                this.salary_note_one = response.data.result.res.note_one;
                this.salary_note_two = response.data.result.res.note_two;
                this.salary_note_three = response.data.result.res.note_three;
                this.salary_note_four = response.data.result.res.note_four;
                this.salary_note_five = response.data.result.res.five;
                this.salary_note_six = response.data.result.res.note_six;
                this.date_one = response.data.result.res.date_one;
                this.date_two = response.data.result.res.date_two;
            }).catch(error => {
                console.error(error)
            })
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
        printBill() {
            setTimeout(() => {
                window.print();
            }, 1000)
        }
    }
}
</script>

<style lang="scss">

</style>
