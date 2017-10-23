var pomodoro = {
    started: false,
    minutes:0,
    workMinutes: 0,
    breakMinutes:0,
    seconds:0,
    counter:0,
    interval:null,
    varMinutes : null,
    varSeconds : null,
    init: function(){
        var self = this;
        var defaultBreak = 5;
        this.varMinutes = $('#minutes');
        this.varSeconds = $('#seconds');
        this.interval = setInterval(function(){
            self.intervalFunction.apply(self);
        },1000);  //call the function every second
        
        this.workMinutes = Number($('#minutes').text());

        $('.work').click(function(){
            $('#pandobox > #whitebox').css('background-color','green');
           
            self.startWork.apply(self);
        });

        $('.break').click(function(){
            $('#pandobox > #whitebox').css('background-color','red');
            self.startBreak.apply(self);
        });

        $('.stop').click(function(){
            $('#pandobox > #whitebox').css('background-color','rgb(36, 195, 206)');
            self.stopWork.apply(self);
        });

        $('.reset').click(function(){
            $('#pandobox > #whitebox').css('background-color','rgb(36, 195, 206)');
            if(this.started == false){
                self.toReset.apply(self);
            }else{
                self.stopWork.apply(self);
                self.toReset.apply(self);
            }
             
        });

        $('#leftdetails > .iconanchor > .plusicon').click(function(){
            this.workMinutes = $('.leftbreakletter').text();
             this.workMinutes++;
             $('.leftbreakletter').text(this.workMinutes);
        });

       

        $('#leftdetails> .iconanchor > .minusicon').click(function(){
            this.workMinutes = $('.leftbreakletter').text();
            this.workMinutes--;
            $('.leftbreakletter').text(this.workMinutes);
       });

        //break length controls

       $('#rightdetails > .iconanchor > .plusicon').click(function(){
        this.breakMinutes = $('.rightbreakletter').text();
         this.breakMinutes++;
         $('.rightbreakletter').text(this.breakMinutes);
    });

    $('#rightdetails> .iconanchor > .minusicon').click(function(){
        this.breakMinutes = $('.rightbreakletter').text();
        this.breakMinutes--;
        $('.rightbreakletter').text(this.breakMinutes);
   });
   //******************************************************** */

    },

    resetVariables : function(mins,secs, started){
        this.workMinutes = mins;
        this.minutes = this.workMinutes;
        this.seconds= secs;
        this.started = started;
    },

    startWork: function() {
        this.workMinutes = Number($('.leftbreakletter').text());
        var counter = this.workMinutes;
        this.resetVariables(counter,0,true);
    },

    startBreak: function (){
        this.breakMinutes = Number($('.rightbreakletter').text());
        var breakCounter = this.breakMinutes;
        this.resetVariables(breakCounter,0,true);
    },

    stopWork : function(){
        this.resetVariables(25,0,false);
    },

    toReset : function(){
        this.resetDOM();
    },

    resetDOM :  function() {
        this.varMinutes.text(this.toDoubleDigits(25));
        this.varSeconds.text(this.toDoubleDigits(0));
        $('.leftbreakletter').text(25);
        $('.rightbreakletter').text(5);
    },

    toDoubleDigits: function(num){
        return (num < 10 ? '0' : '') + num;
    },

    intervalFunction: function(){
        if(this.started == false){
            console.log("I have entered false");
            return false;
        }
        if(this.seconds == 0){
            if(this.minutes == 0){
                this.stopWork();
    
            }
            this.seconds = 59;
            this.minutes--;
        }else{
            this.seconds--;
        }

        this.updateDOM();
    },

    updateDOM: function() {
        this.varMinutes.text(this.toDoubleDigits(this.minutes));
        this.varSeconds.text(this.toDoubleDigits(this.seconds));
    }

};

$(document).ready(function(){
    pomodoro.init();
});