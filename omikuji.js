const App = ({
    data(){
        return{
            menu: 1,
            howmany: 0,
            isKotei: 0,
            today: new Date(),
            latest: new Date(localStorage.getItem('latest')),
            talking: "",
            talklist: [],
            talkwait: [],
            talkwaittime: 0,
            talknum: 0,

            verSet:"Ver. 0.11 β"
        }
    },
    methods: {
        start(){                                    //初期設定 実はこの時点で色々確定
            this.isKotei = 1;                       //画面スクロールロック
            this.menu = 2;                          //ゲーム画面転移
            this.Jitome_Face = Jito_Face['Normal']; //初期顔登録

            this.talk = "";                         //会話の一時保存
                                 //会話のまとめ

            const textPlus = (text, end=0, wait=1500) => {
                this.talk = this.talk + text;
                if (end == 1) {
                    this.talkative = "";
                    for (let i = 0; i < this.talk.length; i++) {
                        this.talkative += '<span style="animation-delay: ' + ((i*25)+wait) + 'ms;">' + this.talk[ i ] + '</span>';
                    }
                    this.talklist.push(this.talkative);
                    this.talkwait.push((( this.talk.length * 25 ) + wait ));

                    this.talkative = "";
                    for (let i = 0; i < this.talk.length; i++) {
                        this.talkative += '<span>' + this.talk[ i ] + '</span>';
                    }
                    this.talklist.push(this.talkative);
                    this.talkwait.push(0);

                    this.talk = "";
                }
            }

            //ここから1文目の設定
            if (this.today.getHours() < 12) {       //時候のあいさつ
                textPlus(Jito_Aisatsu_First[0]);
            } else if (this.today.getHours() < 18) {
                textPlus(Jito_Aisatsu_First[1]);
            } else {
                textPlus(Jito_Aisatsu_First[2]);
            }
            textPlus("\n");
            if (this.latest.getFullYear() == 1970) {
                textPlus(Jito_Aisatsu_Second[0]);
            } else if (this.latest.getFullYear() == this.today.getFullYear() && this.latest.getMonth() == this.today.getMonth() && this.latest.getDate() == this.today.getDate()) {
                textPlus(Jito_Aisatsu_Second[1]);
            } else{
                textPlus(Jito_Aisatsu_Second[1]);
            }
            textPlus("\nじとめみこです",1);

            //ここから2文目の設定
            if (this.latest.getFullYear() == this.today.getFullYear() && this.latest.getMonth() == this.today.getMonth() && this.latest.getDate() == this.today.getDate()) {
                textPlus("おみくじの引き直しですね\nまあがんばってください",1,0);
            } else {
                textPlus("今日引くのは初めてですね\n一発でいいやつ\n引いちゃいましょう",1,0);
            }

            this.next();
        },
        /*start_old(){
            //初期設定
            this.isKotei = 1;
            this.menu = 2;
            this.isWait = 0;

            this.talk = "";
            let isWait = 0;
            const textbox = (text, end=0 ,wait=1500) => {
                this.talk = this.talk + text;
                if (end == 1) {
                    this.talking = "";
                    this.wait = "";
                    for (let i = 0; i < this.talk.length; i++) {
                        this.talking = this.talking + '<span style="animation-delay: ' + ((i*70)+wait) + 'ms;">' + this.talk[ i ] + '</span>';
                    }
                    this.wait = '<span style="animation-delay: ' + ((this.talk.length*70)+wait) + 'ms;">▼</span>';
                    
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
            localStorage.setItem('latest',this.today);
            textbox("\nじとめみこです",1)

        },*/
        next(){
            this.talking = this.talklist[this.talknum];
            this.wait = `<span style="animation-delay: ${this.talkwait[this.talknum]}ms;">▼</span>`;
            if (this.talkwaittime != -1) {
                this.talkwaittime = Date.now() + this.talkwait[this.talknum];
            }
        },
        nextOn(){
            if (this.talkwaittime == -1) {
                this.talknum ++;
                this.talkwaittime = 0;
            } else if (Date.now() > this.talkwaittime ) {
                this.talknum += 2;
            } else {
                this.talkwaittime = -1;
                this.talknum ++;
            }
            this.next();
        }
    }
})

Vue.createApp(App).mount('#app')