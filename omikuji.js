const App = ({
    data(){
        return{
            menu: 1,
            howmany: 0,
            today_lucky: "大吉"
        }
    },
    methods: {
        start(){
            this.Jitome_Face = "./images/Jitome/01_normal.png"
            this.menu = 2;
        }
    }
})

Vue.createApp(App).mount('#app')