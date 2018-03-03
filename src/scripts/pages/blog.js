/* <--- BLOG PAGE MVC --->*/
(function() {
    /* <--- CONTROLLER ---> */
    blogCtrl = {        // ctrl must be a global variable because of callbacks from DOM
        model: {},
        onUpdate: function() { 
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
        render: function() { // receive a render request from model
            // render view
            var x = '' +
            '<div class="blog">' + 
                '<div class="row">' + 
                    '<div class="lg-col-span-12" class="blog-content">' + 
                    '<h2 class="blog-content-title"> Coming soon ... </h2>' +
                '</div>' + 
            '</div>';
            document.getElementById('blog-page-id').innerHTML = x;
        }
    };
    /***********************************************************************/
    /* Initialise */
    model.view = view;
    blogCtrl.model = model;
    blogCtrl.onUpdate('');
})();