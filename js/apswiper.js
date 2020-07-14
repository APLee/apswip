/**
 * Created by APLee.net on 20/7/11.
 */

function APSwiper(_obj){
    this.target= _obj.target;
    this.length= _obj.length;
    this.index= _obj.index || 0;
    this.touchStart= _obj.touchStart;
    this.touchEnd= _obj.touchEnd;
    this.loop= _obj.loop;

    this.isTouchStart= false;
    this.target.addEventListener('touchstart', this.touchStartFun.bind(this), false);
    this.target.addEventListener('touchend', this.touchEndFun.bind(this), false);
}
APSwiper.prototype.touchStartFun= function(e){
    this.isTouchStart= true;
    this.touchStartY= e.changedTouches[0].clientY;
    this.touchStartX= e.changedTouches[0].clientX;
    if(this.touchStart) {
        this.touchStart(e)
    }
};
APSwiper.prototype.touchEndFun= function(e){
    if(this.isTouchStart){

        this.distX = e.changedTouches[0].clientX- this.touchStartX;
        this.distY = e.changedTouches[0].clientY- this.touchStartY;

        if( Math.abs(this.distX) > Math.abs(this.distY) ){
            if(Math.abs(this.distX)> 30  && this.distX< 0)
            {
                this.next();
            }
            else if(Math.abs(this.distX)> 30  && this.distX> 0)
            {
                this.prev();
            }
        }
        this.isTouchStart= false;
    }
};
APSwiper.prototype.next= function(){
    var index= this.index;
    if(!this.loop && this.index< this.length- 1){
        index++;
        if(this.touchEnd) this.touchEnd(this.index, index, -1);
        this.index= index;
    }else if(this.loop){
        index= (this.index< this.length- 1)? index+1:0;
        if(this.touchEnd) this.touchEnd(this.index, index, -1);
        this.index= index;
    }
}
APSwiper.prototype.prev= function(){
    var index= this.index;
    if(!this.loop && this.index> 0){
        index--;
        if(this.touchEnd) this.touchEnd(this.index, index, 1);
        this.index= index;
    }else if(this.loop){
        index= (this.index> 0)? index-1:this.length- 1;
        if(this.touchEnd) this.touchEnd(this.index, index, 1);
        this.index= index;
    }
}
APSwiper.prototype.go= function(_key){
    if(_key!= this.index){
        var dirction= _key> this.index?-1:1;
        if(this.touchEnd) this.touchEnd(this.index, _key, dirction);
        this.index= _key;
    }
}



