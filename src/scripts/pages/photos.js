/* <--- PHOTOS PAGE MVC --->*/
(function() {
    /* <--- CONTROLLER ---> */
    photosCtrl = {        // ctrl must be a global variable because of callbacks
        model: {},
        goTo: function(bike, year){
            var type = 'GO_TO';
            var payload = { 
                bike: bike,
                year: year,
            }
            this.model.updateState(type, payload);
        },
        onBike: function(bike){
            var type = 'NEW_BIKE';
            var payload = { 
                bike: bike,
                year: '',
            }
            this.model.updateState(type, payload);
        },
        onYear: function(year){
            var type = 'NEW_YEAR';
            var payload = { 
                bike: '',
                year: year,
            }
            this.model.updateState(type, payload);
        },
        onNextPage: function(){
            var type = 'PAGE_INC';
            var payload = { 
                bike: '',
                year: ''
            }
            this.model.updateState(type, payload);
        },
        onPrevPage: function(){
            var type = 'PAGE_DEC';
            var payload = { 
                bike: '',
                year: ''
            }
            this.model.updateState(type, payload);
        }
    };
    /* <--- MODEL ---> */
    var model = {  // model is private
        view: {},
        /* <--- DYNAMIC DATA ---> */
        state: {
            page: 1,
            year: '',
            bike: '',    
        },
        /* <--- STATIC DATA ---> */    
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
        years: {
            gsx400: [
                {                
                    value: '1983',
                    model: 'Model F (1983)'
                }],
            gsxr400: [
                {
                    value: '1984',
                    model: 'GK71B (1984)'
                }, {
                    value: '1986',
                    model: 'GK71F (1986)'
                }],
            gsxr750: [
                {
                    value: '1985',
                    model: 'GR71F (1985)'
                }, {
                    value: '1989',
                    model: 'GR77A (1989)'
                }],
            gs1000: [
                {
                    value: '1979',
                    model: 'Model S'
                }]
        },            
        photos: {
            gsx400: {                    
                '1983': ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg']
            },
            gsxr400: {                    
                '1984': ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg',
                        'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg', 'img13.jpg', 'img14.jpg', 'img15.jpg', 'img16.jpg',
                        'img17.jpg', 'img18.jpg', 'img19.jpg', 'img20.jpg', 'img21.jpg', 'img22.jpg', 'img23.jpg', 'img24.jpg'],
                '1986': ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg']
            },
            gsxr750: {
                '1985': ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg',
                        'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg', 'img13.jpg', 'img14.jpg', 'img15.jpg', 'img16.jpg',
                        'img17.jpg', 'img18.jpg', 'img19.jpg', 'img20.jpg', 'img21.jpg', 'img22.jpg', 'img23.jpg', 'img24.jpg'],
                '1989': ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg']
            },
            gs1000: {
                '1979': ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg',
                        'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg', 'img13.jpg', 'img14.jpg', 'img15.jpg', 'img16.jpg']
            }
        },
        /* <--- END STATIC DATA ---> */
        updateState: function(type, payload) { // receive an update window request from ctrl
            /* <--- PROCESS CTRL REQUEST ---> */
            switch(type) {
                case 'GO_TO':
                    this.state.bike = payload.bike;
                    this.state.year = payload.year;
                    break;
                case 'NEW_BIKE':
                    this.state.bike = payload.bike;
                    this.state.page = 1;
                    // New bike has been selected. set initial year
                    // year must be set to first element when a new bike is selected
                    this.state.year = this.years[this.state.bike][0].value;
                    break;
                case 'NEW_YEAR':
                    this.state.year = payload.year;
                    break;
                case 'PAGE_INC':
                      this.state.page = this.state.page + 1;
                    break;
                case 'PAGE_DEC':
                    this.state.page = this.state.page -1;
                    break;
            }
            this.onUpdateState();
        },
        onUpdateState: function(){
            // Get photos for a page.
            var perPage = 8;
            var pages = 1;
            var arr = this.photos[this.state.bike][this.state.year];
          var count = arr.length;              
          pages = Math.ceil(count/perPage);
          // Lower limit on page
            if(this.state.page == 0){
                this.state.page = 1;
            } 
            // Upper limit on page            
            if( pages > 0 ){  
                if( this.state.page > pages ){            
                    this.state.page = pages;
                }
            }
            var start = perPage * ( this.state.page -1 );
            var end = start + perPage;                  
            var photosPerPage = arr.slice(start, end);
            /* ************************** */            
            this.view.render( {
                bike: this.state.bike,
                bikes: this.bikes,
                year: this.state.year,
                years: this.years[this.state.bike],
                photos: photosPerPage,
                page: this.state.page,
                pages: pages            
            });
        }
    };
    /* <--- VIEW ---> */
    var view = {    // view is private variable
        render: function(pageData) { // render view
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
            var years = '';
            for( var i = 0; i < pageData.years.length;  i++){
                selected = '';
                if(pageData.years[i].value == pageData.year) {
                    selected = 'selected="selected"';
                }
                years += '<option value=' + pageData.years[i].value + ' ' + selected +  
                '>' + pageData.years[i].model + '</option>';
            }    
            var photos = '';
            for( var i = 0; i < pageData.photos.length; i++) {
                if( i % 2 == 0 ){
                    photos += '<div class="lg-col-span-3">'
                }
                photos += '' +
                    '<div class="photos-content-img-container">' +
                        '<a target="_blank" href="data/photos/' + pageData.bike + '/' + pageData.year + '/' + pageData.photos[i] + '">' +
                            '<img src="data/photos/' + pageData.bike + '/' + pageData.year + '/thbs/' + pageData.photos[i] + '">' +
                        '</a>' +
                    '</div>';
                if( (i % 2 == 1)){
                    photos += '</div>'
                }                
            }
            var x = '' +
            '<header class="row page-header">' +
                '<div class="page-header-container">' +
                    '<ul class="lg-col-span-12 page-header-filter">' +
                        '<li>' +
                            '<div class="page-select-container">' +
                                '<select id="bikes" class="page-select" onchange="photosCtrl.onBike(this.value)">' +                                    
                                    bikes +
                                '</select> ' +
                                '<div class="page-select-btn"><i class="fa fa-chevron-down"></i></div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +                         
                            '<div class="page-select-container">' +
                            '<select class="page-select" onchange="photosCtrl.onYear(this.value)">' +
                                years +
                            '</select>' +
                            '<div class="page-select-btn"><i class="fa fa-chevron-down"></i></div>' +
                            '</div>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</header>' +
            '<article class="row photos-content">' +    
                '<div class="marker left">'    +
                    '<div class="marker-container photos"></div>' +
                    '<div class="marker-arrow photos" onclick="photosCtrl.onPrevPage()"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>' +
                '</div>' +
                '<div class="marker right">'    +
                    '<div class="marker-container photos"></div>' +
                    '<div class="marker-arrow photos" onclick="photosCtrl.onNextPage()"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>' +
                '</div>' +
                photos +                
            '</article>' +
            '<footer class="row photos-footer">' +
                '<div class="photos-footer-container">' +
                    '<div class="lg-col-span-12 photos-footer-content">' +
                        'PAGE ' + pageData.page + ' OF ' + pageData.pages +
                    '</div>' +
                '</div>' +
            '</footer>';
            $('#photos-page-id').html(x);
        }
    };
    /***********************************************************************/
    /* Initialise */
    model.view = view;
    photosCtrl.model = model;
    photosCtrl.goTo('gsxr400', '1984');
})();