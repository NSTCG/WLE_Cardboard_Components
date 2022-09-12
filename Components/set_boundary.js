
WL.registerComponent('set_boundary', {
    left_bound: {type: WL.Type.Float, default: 7.0},
    right_bound: {type: WL.Type.Float, default: 7.0},
    back_bound: {type: WL.Type.Float, default: 7.0},
    front_bound: {type: WL.Type.Float, default: 7.0},
    restrictY: { type: WL.Type.Bool, default: true },
    height: {type: WL.Type.Float, default: 1},
}, {
   
    update: function() {

        let position = glMatrix.vec3.create();
        this.object.getTranslationWorld(position);
        
        //resetting the position of the player whenever it crosses the threshold

        if(position[2]>this.back_bound)position[2]=this.back_bound;this.object.setTranslationWorld(position);
        if(position[2]<-1*this.front_bound)position[2]=-1*this.front_bound;this.object.setTranslationWorld(position);
        if(position[0]>this.right_bound)position[0]=this.right_bound;this.object.setTranslationWorld(position);
        if(position[0]<-1*this.left_bound)position[0]=-1*this.left_bound;this.object.setTranslationWorld(position);

        //optional y restict option to clamp player in y axis ( ie no upward or downward movement)
        
        if(this.restrictY==true){  
            if (position[1]>this.height || position[1]<this.height)position[1]=this.height;this.object.setTranslationWorld(position);
        }
    },
 
});





