const App = ({
    data(){
        return{
            menu: 1,
            howmany: 0,
            isKotei: 0,
            today_lucky: "大吉"
        }
    },
    methods: {
        start(){
            this.Jitome_Face = Jito_Face['Normal'];
            this.isKotei = 1;
            this.menu = 2;
        }
    }
})

Vue.createApp(App).mount('#app')