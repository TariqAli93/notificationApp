import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#1C77C3",
                secondary: "#333745",
                accent: "#66bb6a",
                error: "#ff7675",
                orange: "#ffa726",
                pink: "#f368e0"
            }
        }
    },
    rtl: true
});