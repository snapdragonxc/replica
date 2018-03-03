/* <--- The Router for the App. ---> */
/* This router is based on that of Joakim Carlstein decribed in his blog: 
http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
https://gist.github.com/joakimbeng/7918297
*/
var routes = {
    HomePage: 'home-page-id', // css id of home page
    PhotosPage: 'photos-page-id', // css id of photos page
    AboutPage: 'about-page-id',
    SpecsPage: 'specs-page-id',
    ArticlesPage: 'articles-page-id',
    SearchPage: 'search-page-id',
    BlogPage: 'blog-page-id',
}; 
var cur_route = "HomePage"; // set default route
window.location.hash = '#' + cur_route; // set default page
function router(){
    var url = location.hash.slice(1); // new route get rid of hash
    var params = url.split('\/'); // params are required by search
    var new_route = params[0];
    if(new_route == cur_route)
        return;
    if(new_route != 'SearchPage'){
        // empty search box when navigating away from search page
        document.getElementById('query').value = ''; 
    }
    if(new_route == 'ArticlesPage'){
        if(params.length == 1){
            // reset article page to first article to avoid confusion when entering/exiting page
            articlesCtrl.goTo('gsxr400', 'nov1984'); 
        } else {
            // a go to request from search page
            articlesCtrl.goTo(params[1], params[2]); 
        }
    }
    // hide current route
    document.getElementById(routes[cur_route]).classList.add("hidden");
    // show new route  
    document.getElementById(routes[new_route]).classList.remove("hidden");   
    cur_route = new_route;
};
$(window).on('hashchange', function(event){ router(); }); // call router on hash change