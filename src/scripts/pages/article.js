/* <--- ARTICLE PAGE MVC --->*/
(function() {
    /* <--- CONTROLLER ---> */
    articlesCtrl = {        // ctrl must be a global variable because of callbacks
        model: {},
        goTo: function(bike, magazine){
            var type = 'GO_TO';
            var payload = { 
                    bike: bike,
                    magazine: magazine
                }
            this.model.updateState(type, payload);
        },
        onBike: function(bike){
            var type = 'NEW_BIKE';
            var payload = { 
                    bike: bike,
                    magazine: '',
                };
            this.model.updateState(type, payload);
        },
        onMagazine: function(magazine){
            var type = 'NEW_MAGAZINE';
            var payload = { 
                    bike: '',
                    magazine: magazine,
                };
            this.model.updateState(type, payload);
        },
        onNextPage: function(){
            this.model.updateState('PAGE_INC', {});
        },
        onPrevPage: function(){
            this.model.updateState('PAGE_DEC', {});
        }
    };
    /* <--- MODEL ---> */
    var model = {  // model is private variable
        view: {},
        /* <--- DYNAMIC DATA ---> */
        state: {
            magazine: '',
            bike: '',
            direction: '',
            view: ''
        },
        /* <--- DATA - STATIC ---> */
        bikes: [
            {
                value: 'gsx400',
                name: 'GSX 400',
            },{
                value: 'gsxr400',
                name: 'GSXR-400',
            },{
                value: 'gsxr750',
                name: 'GSXR-750',
            },{
                value: 'gs1000',
                name: 'GS 1000',
            }
        ],
        magazines: {
            gs1000: [{value: "feb1980", name: "TWO WHEELS FEB. 1980"},
                    {value: "mar2012", name: "CLASSIC MOTORBIKE MECH."},
                    {value: "may1984", name: "SUPER BIKE MAY 1984"}],                    
            gsx400: [{value: "apr1982", name: "TWO WHEELS APRIL 1982"}],
            gsxr400: [{value: "nov1984", name: "AUST. MOTORCYCLE NEWS"},
                    {value: "jan1985", name: "TWO WHEELS JAN. 1985"},
                    {value: "jul1985", name: "TWO WHEELS JULY 1985"}],
            gsxr750: [{value: "aug1985", name: "TWO WHEELS AUG. 1985"}]
        },
        /* <--- END DATA ---> */
        updateState: function(type, payload) { // receive an update window request from ctrl
            /* <--- PROCESS CTRL REQUEST ---> */
            switch(type) {
                case 'GO_TO':
                    this.state.bike = payload.bike;
                    this.state.magazine = payload.magazine;
                    this.state.view = 'article';
                    break;
                case 'NEW_BIKE':
                    this.state.bike = payload.bike;
                    // New bike has been selected. set initial year
                    // year must be set to first element when a new bike is selected
                    this.state.magazine = this.magazines[this.state.bike][0].value;
                    this.state.view = 'article';
                    break;
                case 'NEW_MAGAZINE':
                    this.state.magazine = payload.magazine;
                    this.state.view = 'article';
                    break;
                case 'PAGE_INC':
                    this.state.direction = 'inc';
                    this.state.view = 'page';
                    break;
                case 'PAGE_DEC':
                    this.state.direction = 'dec';
                    this.state.view = 'page';
                    break; 
            }    
            this.onUpdateState();    // trigger view update                
        },
        onUpdateState: function(){
            var that = this;
            switch( this.state.view ){
                case 'page':
                    this.view.renderNewPage(this.state.direction);
                    break;
                case 'article':
                    this.getNewArticle( this.state.bike, this.state.magazine, function(){
                        that.view.renderNewArticle({
                            bike: that.state.bike,
                            bikes: that.bikes,
                            magazine: that.state.magazine,
                            magazines: that.magazines[that.state.bike]
                        });
                    });
                    break;
            }
        },
        getNewArticle: function(bike, magazine, callback) {
            $.ajax({
                url: 'data/articles/' + bike + magazine + '.html',    
                type: "GET",
                dataType: "text",     
                success: function( response ) { // response is text
                    $('#hiddenTxt').html(response); // set hidden text with magazine article
                    callback(response);
                    /* Code below is for initialisation of page algo which requires colums to not be hidden to function
                    properly */
                    if( cur_route != 'ArticlesPage' ){ // cur_route is a global variable
                    document.getElementById('articles-page-id').classList.add("hidden");
                    }
                },     
                error: function( error ) {                          
                    console.log('The page was NOT loaded', error);
                },         
                complete: function( xhr, status ) {
                //console.log("Request complete");
                }
            });    
        }
    };
    /* <--- VIEW ---> */
    var view = {    // view is private variable variable
        page: 1,
        renderNewPage: function(direction) { 
            // Updates page number and article divs only
            var fwd = true;
            var bkwd = true;
            if( direction == 'inc') {
                fwd = PageAlgo.Next();
                if( fwd == true ){
                    this.page = this.page + 1;
                    document.getElementById('articles-page-number').innerHTML = this.page;
                }
            } else {
                bkwd = PageAlgo.Prev();
                if( bkwd == true ){
                    this.page = this.page - 1;
                    document.getElementById('articles-page-number').innerHTML = this.page;
                }
            }
        },
        renderNewArticle: function(pageData) { // render view
            console.log('new art')
            this.page = 1;
            var bikes = '';
            var selected = '';
            for( var i = 0; i < pageData.bikes.length;  i++){                
                selected = '';
                if(pageData.bikes[i].value == pageData.bike) {
                    selected = 'selected="selected"';
                }
                bikes += '<option value=' + pageData.bikes[i].value + ' ' + selected + 
                    '>' + pageData.bikes[i].name + '</option>';
            };
            var magazines = '';
            for( var i = 0; i < pageData.magazines.length;  i++){
                selected = '';
                if(pageData.magazines[i].value == pageData.magazine) {
                    selected = 'selected="selected"';
                }
                magazines += '<option value=' + pageData.magazines[i].value + ' ' + selected +  
                '>' + pageData.magazines[i].name + '</option>';
            }    
            var x = '' +
            '<header class="row page-header">' +
                '<div class="page-header-container">' +
                    '<ul class="lg-col-span-12 page-header-filter">' +
                        '<li>' +
                            '<div class="page-select-container">' +
                                '<select id="bikes" class="page-select" onchange="articlesCtrl.onBike(this.value)">' +                                    
                                    bikes +
                                '</select> ' +
                                '<div class="page-select-btn"><i class="fa fa-chevron-down"></i></div>' +
                            '</div>' +
                          '</li>' +
                          '<li>' +                         
                            '<div class="page-select-container">' +
                                '<select class="page-select" onchange="articlesCtrl.onMagazine(this.value)">' +
                                    magazines +
                                '</select>' +
                                '<div class="page-select-btn"><i class="fa fa-chevron-down"></i></div>' +
                            '</div>' +
                          '</li>' +
                      '</ul>' +
                  '</div>' +
            '</header>' +
            '<article class="row articles-content">' +                    
                '<div class="articles-content-container">' +
                    '<div class="marker left">'    +
                        '<div class="marker-container"></div>' +
                        '<div class="marker-arrow" onclick="articlesCtrl.onPrevPage()"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>' +
                    '</div>' +
                    '<div class="marker right">'    +
                        '<div class="marker-container"></div>' +
                        '<div class="marker-arrow" onclick="articlesCtrl.onNextPage()"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>' +
                    '</div>' +
                    '<div class="articles-content-cols">' +
                        '<div class="lg-col-span-3 articles-content-col"></div>' +
                        '<div class="lg-col-span-3 articles-content-col"></div>' +
                        '<div class="lg-col-span-3 articles-content-col"></div>' +
                        '<div class="lg-col-span-3 articles-content-col"></div>' +
                    '</div>' +
                '</div>' +                            
            '</article>' +
            '<footer class="row articles-footer">' +
                '<div class="articles-footer-container">' +
                    '<div class="lg-col-span-12 articles-footer-content">' +
                        'PAGE ' + '<span id="articles-page-number">1</span>' + 
                    '</div>' +
                '</div>' +
            '</footer>'; 
            /*'<div id="hiddenTxt" style="display: none"></div>'; //used by page algorithm */
            $('#articles-page-id').html(x);
            // Sets the columns of the magazine using the page algorithm
            var number_of_columns = 4;
            var desired_column_height = 510; // in pxs
            var identifier = '.articles-content-col'
            PageAlgo.initialise(number_of_columns, desired_column_height, identifier);  
          PageAlgo.First();        // go to first page
        }    
    };
    /***********************************************************************/
    /* Initialise */
    model.view = view;
    articlesCtrl.model = model;
    articlesCtrl.goTo('gsxr400', 'nov1984');    
})();