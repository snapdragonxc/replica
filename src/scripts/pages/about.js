/* <--- ABOUT PAGE MVC --->*/
(function() {
    /* <--- CONTROLLER ---> */
    aboutCtrl = {        // ctrl must be a global variable because of callbacks from DOM
        model: {},
        onUpdate: function() { // receive an update request from view
            this.model.updateState();
        }
    };
    /* <--- MODEL ---> */
    var model = {  // model is private
        view: {},
        state: {},
        updateState: function() { // receive a get new data request from controller
            this.onUpdateState();            
        },
        onUpdateState: function(){
            this.view.render();
        }
    };
    /* <--- VIEW ---> */
    var view = {
        render: function(pageData) { // receive a render request from model
        // render view
        var x = '' +
        '<div class="about">' + 
            '<div class="row">' + 
                '<div class="lg-col-span-12 about-content">' + 
                '<div class="about-content-wrap">' +
                    '<h2>About</h2>' + 
                    '<p>Race Replica was created by <a href="https://github.com/snapdragonxc/replica" target="_blank" >SnapdragonXC</a>, a Software Developer. ' +
                    'Originally intended as a place for the testing and evaluation of javascript code, it has '  +
                    'since grown in size to include multiple pages and is now on-line. Whilst there are plenty of websites looking at modern bikes, ' +
                    'there are relatively few on the post-classic bikes of the 1980s, in particular Suzuki.</p>' +
                    '<p>In 1984, Suzuki achieved something of a marketing masterpiece by introducing road bikes that looked like race bikes to ' +
                    'the public. Referred to as "Race Replicas", probably the best known of these is the GSX-R 750, which is still being ' +
                    'produced today ... though today ' +
                    'only the name remains the same. This website looks at this bike and other bikes through the articles and reviews' + 
                    ' that were published in motorbike magazines at the time.</p>' +
                    '<p>Race Replica is a non-profit, non-commercial website. The articles presented here were sourced from old magazines ' +
                    'purchased on ebay and gumtree, some of which were dated more than thirty years ago. The specs of each ' +
                    'bike are from actual motorbike brochures, again sourced from ebay.</p>' +
                    '<p>Finding good quality photos has proved difficult due to the age of most of the bikes. The majority of the photos are ' + 
                    'from expired on-line auction sales of motorbikes, with the exception being ' +
                    'the GSX-R400 photos. These were taken from the Japanese Power Endurance Club website, ' + 
                    '<a href="http://www.geocities.jp/gk71b_club/" target="_blank" >www.geocities.jp/gk71b_club</a>,' + 
                    ' where over the years, this motorbike has developed a ' +
                    'cult-like following of enthusiasts.</p>' + 
                    '<p class="text-right">SnapdragonXC</p>' +
                    '<p class="text-right">February 2018</p>' +
                '</div>' + 
            '</div>' +
        '</div>';            
        $('#about-page-id').html(x);
        }
    };
    /***********************************************************************/
    /* Initialise */
    model.view = view;
    aboutCtrl.model = model;
    aboutCtrl.onUpdate('');
})();