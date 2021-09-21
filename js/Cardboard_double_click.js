starttimer=false;    
timer=0;

WL.registerComponent('Double_click', {
    Time_gap: {type: WL.Type.Float, default: 1.0},
},
{

    init: function() {
        this.rotateflag=false;
        WL.onXRSessionStart.push(s => s.addEventListener('selectstart',this.press1.bind(this) ));    /** to listen to 'select start' event and exicute the funtion 'press' only after we enter vr session  */
       
    },
    
    update: function(dt) {
        if(starttimer=true){
            timer+=dt;
        }
        if(this.rotateflag==true){
            this.object.rotateAxisAngleDeg([0, 1, 0], dt* 90);
        }
       
    },
    press1: function(){

        if(timer>this.Time_gap){
            timer=0;
        }
        
        else if(timer>0) {
            //do  funtion to be  Exicuted on double click
            if(this.rotateflag==true){
                this.rotateflag=false;
            }
            else if(this.rotateflag==false){

                this.rotateflag=true;
            }
            

        }
        starttimer=true;

        
    },

});
