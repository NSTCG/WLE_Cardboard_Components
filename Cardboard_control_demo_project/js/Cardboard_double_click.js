

WL.registerComponent('Double_click', {
    secondTapDelay: {type: WL.Type.Float, default: 1.0},
},
{
    init: function() {
        this.starttimer=false;    
        this.timer=0;
        /** to listen to 'select start' event and exicute the funtion 'press' only after we enter vr session  */
        WL.onXRSessionStart.push(s => s.addEventListener('selectstart',this.press.bind(this) ));    
    },

    start: function() {
        this.rotateflag=false;
    },
    
    update: function(dt) {
        if(this.starttimer=true){
            this.timer+=dt;
        }
        this.rotate();
    },
    press: function(){
        starttimer=true;
        if(this.timer<this.secondTapDelay){
            /** Replace with your funtion **/
            this.setRotateFlag();
        }
        else{
            this.timer=0
        }
    },

    setRotateFlag: function(){
        this.rotateflag=!this.rotateflag;
    },
    rotate: function(){
        if(this.rotateflag==true){
            this.object.rotateAxisAngleDeg([0, 1, 0], dt* 90);
        }
    },

});
