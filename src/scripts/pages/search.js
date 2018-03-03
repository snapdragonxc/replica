/* <--- HOME PAGE MVC --->*/
(function() {
    /* <--- CONTROLLER ---> */
    searchCtrl = {        // ctrl must be a global variable because of callback from DOM
        model: {},
        onSearch: function(param) { // receive an update request from view
            this.model.updateState(param);
        }
    };
    /* <--- MODEL ---> */
    var model = {  // model is private
        view: {},
        /* <--- DYNAMIC DATA - SEARCH RESULTS ---> */
        state: {
            query: '',
            results: []
        },
        /* <--- STATIC DATA - SEARCH ARRAY ---> */
        articles: [
            {
                query: 'suzuki gsx400, suzuki gsx 400',
                result: [{
                    value: 'gsx400/apr1982',
                    name: 'Two Wheels, November 1982'
                }]
            }, {
                query: 'suzuki gsxr400, suzuki gsxr 400, suzuki gsx-r400, suzuki gsx-r 400',
                result: [ {
                    value: 'gsxr400/nov1984',
                    name: 'Australian Motorcycle News, November 1984'
                }, {
                    value: 'gsxr400/jan1985',
                    name: 'Two Wheels, January 1985'
                }, {
                    value: 'gsxr400/jul1985',
                    name: 'Two Wheels, July 1985'
                }]
            }, {
                query: 'suzuki gsxr750, suzuki gsxr 750, suzuki gsx-r750, suzuki gsx-r 750',
                result: [ {
                    value: 'gsxr750/aug1985',
                    name: 'Two Wheels, August 1985'
                }]
            }, {
                query: 'suzuki gs1000, suzuki gs 1000',
                result: [ {                
                    value: 'gs1000/feb1980',
                    name: 'Two Wheels, February 1980'
                }, {                    
                    value: 'gs1000/mar2012', 
                    name: 'Classic Motorbike Mechanics, March 2012'
                }, {
                    value: 'gs1000/may1984',
                    name: 'Super Bike, May 1984'
                }]
            }
        ],
        updateState: function(param) { 
            function isMatch(item) {
                var i = item.query.search(param);
                if(i != -1 ){
                    return item;
                }                
            }
            var matches = this.articles.filter(isMatch);
            var results = [];
            for(var i = 0; i < matches.length; i++){
                results = results.concat(matches[i].result);
            }
            this.state.query = param;
            this.state.results = results;
            this.onUpdateState();
        },
        onUpdateState: function(){
            this.view.render({
                query: this.state.query,
                results: this.state.results 
            });
        }
    };
    /* <--- VIEW ---> */
    var view = {
        render: function(pageData) { // receive an update window request from view
            // render view
            var list = '';
            for( var i = 0; i < pageData.results.length; i++ ){
                list = list + '<li class="search-list-item"><a href="#ArticlesPage/' + 
                        pageData.results[i].value + '">' + pageData.results[i].name + '</a></li>';
            }
            var title = '';
            if( pageData.results.length == 0 ){
                title = 'No Results for ' + '\'' + pageData.query  + '\'';
            } else {    
                title = 'Search Results for ' + '\'' + pageData.query  + '\'';
            }
            var x = '' +
            '<div class="search">' + 
                '<div class="row">' + 
                    '<div class="lg-col-span-12 search-content">' + 
                        '<h2>' + title + '</h2>' + 
                        '<ul class="search-list">' +                            
                                list +                            
                        '</ul>' +                        
                    '</div>' + 
                '</div>' +
            '</div>';    
            $('#search-page-id').html(x);    
        }
    };
    /***********************************************************************/
    /* Initialise */
    model.view = view;
    searchCtrl.model = model;
})();