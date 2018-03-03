/* <--- HOME PAGE MVC --->*/
(function() {
    /* <--- CONTROLLER ---> */
    homeCtrl = {        // ctrl must be a global variable because of callback from DOM
        model: {},
        onUpdate: function() { // receive an update request from view
            this.model.updateState();
        }
    };
    /* <--- MODEL ---> */
    var model = {  // model is private
        view: {},
        state: {},
        updateState: function() { 
            this.onUpdateState();
        },
        onUpdateState: function(){
            this.view.render();
        }
    };
    /* <--- VIEW ---> */
    var view = {
        render: function() { 
            // render view
            var x = '' +
            '<div class="home">' +            
                '<div class="row home-banner">' +
                    '<div class="home-banner-container">' + // to allow for background colour 
                        '<article class="lg-col-span-8 home-banner-left">' +
                            '<div class="mainVisualItem" style="display: block;">' +
                                '<img src="img_1.jpg" alt="">' +
                            '</div>' +                        
                            '<div class="mainVisualItem" style="display: none;">' +
                                '<img src="img_2.jpg" alt="">' +
                            '</div>' +
                            '<div class="mainVisualItem" style="display: none;">' +
                                '<img src="img_3.jpg" alt="">' +
                            '</div>' +
                            '<div class="mainVisualItem" style="display: none;">' +
                                '<img src="img_4.jpg" alt="">' +
                            '</div>' +
                            '<div class="mainVisualItemBtn">' +
                                '<ol class="itemNav">' +                       
                                    '<li><a href="javascript:void(0)" class="numBtn is-current"></a></li>' +
                                    '<li><a href="javascript:void(0)" class="numBtn"></a></li>' +
                                    '<li><a href="javascript:void(0)" class="numBtn"></a></li>' +
                                    '<li><a href="javascript:void(0)" class="numBtn"></a></li>' +
                                '</ol>' + 
                            '</div>' +
                        '</article>' +
                        '<aside class="lg-col-span-4 home-banner-right">' +
                            '<div class="home-banner-right-welcome">' +
                                '<h2>Welcome</h2>' +
                                '<p>Race Replica is a resource' +
                                ' for post-classic Suzuki motorbikes from the 1980s.</p>' +
                                '<p>Here you will find a database of articles ' +
                                ' re-typed from bike reviews published in motorbike magazines of the 1980s. ' +
                                'These are backed up with photos and specifications of each bike.</p>' +
                                '<p>The articles will be extended over time to include other manufacturers and bikes but for now, I' + 
                                ' hope you enjoy it!</p>' +
                                '</div>' +
                                '<div class="home-banner-right-caption">' +
                                    '<h2>COVER PHOTOS</h2>' +
                                    '<p>This is the Circuit Version of the Suzuki GSX-R 750, which ' +
                                    'was first shown to the public at the 1984 Cologne International Motorcycle Show in West Germany.</p>' +
                                '</div>' +
                        '</aside>' +
                    '</div>' +                
                '</div>' + 
                '<div class="row home-notify">' +
                    '<div class="lg-col-span-12 home-notify-form-container">' + // to allow for border on bottom -->
                        '<form name="notify" class="home-notify-form" action="mailto:snapdragonxc@gmail.com?subject=Notification%20at%20Race%20Replica" ' + 
                        'method="post" enctype="text/plain" onsubmit="return submitNotify(this)" autocomplete="off" autocorrect="off" >' +
                            '<label class="home-notify-form-label">PLEASE NOTIFY ME OF UPDATES</label>' +
                            '<span class="home-notify-form-input">' +
                            '<input name="EMAIL" placeholder="Enter Email Address" type="email">' +
                            '<button type="submit" >SUBMIT</button>' +
                            '</span>' +
                        '</form>' +
                    '</div>' +
                '</div>' +
            '</div>';
            document.getElementById('home-page-id').innerHTML = x;
        }
    };
    /***********************************************************************/
    /* Initialise */
    model.view = view;
    homeCtrl.model = model;
    homeCtrl.onUpdate('');
    submitNotify = function(elem)
    {
        if( document.forms['notify']['EMAIL'].value != '' ){ // or use 'required'
            return (function(){  // return self-executing function
                elem.submit(); 
                elem.reset(); 
                return false;
            })();
        }
        return false;
    }        
})();