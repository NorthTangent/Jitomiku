const App = ({
    data(){
        return{
            menu: 1,
            howmany: 0,
            isKotei: 0,
            today: new Date(),
            latest: new Date(localStorage.getItem('latest'))
        }
    },
    methods: {
        start(){
            //初期設定
            this.isKotei = 1;
            this.menu = 2;

            this.talk = "";
            const textbox = (text, end=0) => {
                this.talk = this.talk + text;
                if (end == 1) {
                    this.talking = "";
                    for (let i = 0; i < this.talk.length; i++) {
                        this.talking = this.talking + '<span style="animation-delay: ' + ((i*100)+1500) + 'ms;">' + this.talk[ i ] + '</span>';
                    }
                } 
            }
            //はじめのあいさつ
            this.Jitome_Face = Jito_Face['Normal'];

            if (this.today.getHours() < 12) {
                textbox(Jito_Aisatsu_First[0]);
            } else if(this.today.getHours() <18) {
                textbox(Jito_Aisatsu_First[1]);
            } else {
                textbox(Jito_Aisatsu_First[2]);
            }
            this.talk = this.talk + "\n";

            if (this.latest.getFullYear() == 1970) {
                textbox(Jito_Aisatsu_Second[0]);
            } else if(this.latest.getFullYear() == this.today.getFullYear() && this.latest.getMonth() == this.today.getMonth() && this.latest.getDate() == this.today.getDate()){
                textbox(Jito_Aisatsu_Second[1]);
            } else {
                textbox(Jito_Aisatsu_Second[2]);
            }
            textbox("\nじとめみこです",1)
            localStorage.setItem('latest',this.today);


        }
    }
})

Vue.createApp(App).mount('#app')