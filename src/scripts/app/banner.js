// This code was taken from the Japan Airlines webpage and was altered slightly to use
// the background color and radius instead of images for the buttons.
var mainVisual ={
    CLS_IS_CURRENT : 'is-current',
    timer : null,
    maxNo : 0,
    currentNo : 1,
    setup : function(){
        this.getMaxNo();
        this.setTimer();
        this.setEvent();
    },
    getMaxNo : function(){
        this.maxNo = $('.mainVisualItem').length;        
    },
    setTimer : function(){
        var _this = this;
        this.timer = setInterval(function(){
            _this.changePicture();
        }, 7000);
    },
    changePicture : function(){
        $('.mainVisualItem:not(:eq(' + this.currentNo +'))').fadeOut(1000);
        $('.mainVisualItem:eq(' + this.currentNo + ')').fadeIn(500);
        $('.numBtn:not(:eq(' + this.currentNo + '))').removeClass(this.CLS_IS_CURRENT);
        $('.numBtn:eq(' + this.currentNo + ')').addClass(this.CLS_IS_CURRENT);
        this.currentNo = this.currentNo + 1;     
        if(this.currentNo === this.maxNo){
            this.currentNo = 0;
        };
    },
    setEvent : function(){
        var _this = this;
        $('.numBtn').on('click', function(){
            _this.currentNo = $('.numBtn').index(this);
            _this.changePicture();
        });
        $('.pauseBtn').on('click', function(){
            if($(this).hasClass('pauseBtn')){
                $(this).html('&#9656;');
            }else{
                $(this).html('||');
            };
            $(this).toggleClass('pauseBtn');
            $(this).toggleClass('startBtn');
            if($(this).hasClass('pauseBtn')){
                _this.setTimer();
            }else{
                clearInterval(_this.timer);    
            };
        });
    }
};
$(function(){
    mainVisual.setup();
});