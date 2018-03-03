// This algorithm fills a column element from an array of words up to
// the desired height of the screen window. The algorithm ensures a fixed height for the magazine articles
// so that a single page is contained within an entire screen. This code is experimental.
// This is a three stage algorithm. First stage: an initial approx is guessed using the approximate
// number of words per line. Second stage: This approx is then improved with a binary search algorithm.
// Third stage: Finally the exact solution is achieved with linear search within a few steps.
//setTimeout(myLoad, 200);
//function myLoad() {
    //    document.getElementById("out2").innerHTML = " |";
var PageAlgo = (function(){
    // Algorithm for spacing text to desired height "x"    
    var left_prev = 0;
    var right_prev = 0;
    var search_forward = true;
    var fmt; // = document.querySelectorAll(".col");
    var str; // = document.getElementById("hiddenTxt").innerHTML;
    var words; // = removeFormat(str); 
    var page_index = [];
    var index = [];    
    var max_number_col = 5;
    var number_of_col = 0; 
    var endOfDocument = false;
    var set_hgt = 0; /* This is the desired height by the user. Actual height is slightly less */
    function binarySearch(a, initialIndex, left,  right, h, e) {            
        var middle = parseInt( (left + right) / 2);
        if (left > right) { // stop binary search and perform inner search
            // Solution not yet reached, do forward step search
            search_forward = true;               
            return left_prev;
        }
        var hcur = getHeight(a, initialIndex, middle, e);
        var hleft = getHeight(a, initialIndex, left, e);
        var hright = getHeight(a, initialIndex, right, e);
        if( (hleft > h) && (hright > h) ){ // stop binary search and perform inner search. 
            // Solution was passed, do backward step search
            search_forward = false;
            return left;
        }
        if (hcur  == h){ // exact match
            return middle;
        }
        if ( hcur  > h) {
            left_prev = left;
            right_prev = right;
            return binarySearch(a, initialIndex, left, middle - 1, h, e);
        }
        if ( hcur < h ){
            left_prev = left;
            right_prev = right;
            return binarySearch(a, initialIndex, middle + 1, right, h, e);  
        }
    };
    function getHeight(a, startIndex, m, e){
        // calculating the page height is expensive in time 
        var t = insertFormat(a, startIndex, m);
        e.innerHTML =  t ;
        return e.clientHeight;
    };    
    function insertFormat(a, start_index, max_index){    // a is an array 
        // put HTML format tags back to allow accurate calculation of text height
        var txt = "";
        for(var i = start_index; i <= max_index; i++){
            txt = txt + " " + a[i];
        }
        // paragraphs
        var txt1 = txt.replace(/\+\+\+/g, "<p>");  
        var txt2 = txt1.replace(/\-\-\-/g, "<\/p>");
        // heading 1 - 
        // currently supports a single header. Other elements may be added but are not dealt 
        // with in code. In other words the behaviour is unpredicatable - meaning unexpected page breaks etc
        var txt3 = txt2.replace(/\+\+/g, "<h1>");  
        var txt4 = txt3.replace(/\-\-/g, "<\/h1>");
        return txt4;
    }
    function removeFormat(txt){
        //pre-condition text by removing HTML paragraph tags and h1 tags
        // paragraphs
        var txt1 = txt.replace(/<p>/g, " +++");  
        // space to get it to separate words without 
        // spaces between paragraphs
        var txt2 = txt1.replace(/<\/p>/g, "---"); 
        // headings 1
        var txt3 = txt2.replace(/<h1>/g, " ++");  
        var txt4 = txt3.replace(/<\/h1>/g, "--"); 
        var a = txt4.split(" "); //array of words
        return a; // return array;
    }
    function fwd_linearSearch(a, start_index, stop_index, x, e){
        // perform linear search to fine tune solution
        var hgt = 0;
        var j = stop_index;
        for(var i = stop_index + 1; i < a.length; i++){
            hgt = getHeight(a, start_index, i, e);
            j = i;
            if(hgt > x){
                j = i-1;
                break;        
            }
        }
        hgt = getHeight(a, start_index, j, e);
        return j; 
    };
    function bkwd_linearSearch(a, start_index, stop_index, x, e){
        // perform linear search to fine tune solution
        var hgt = 0;
        var j = stop_index;
        for(var i = stop_index - 1; i > start_index; i--){
            hgt = getHeight(a, start_index, i, e);
            j = i;
            if(hgt < x){
                j = i;
                break;        
            }
        }
        hgt = getHeight(a, start_index, j, e);
        return j; 
    };   
    //
    function getCeiling(a, e){        
        // Get Initial Guess using number of words per unit height
        var x2 = (words.length > 1000)? 1000 : words.length-1;                         
        var txt = "";
        for(var i = 0; i <= x2; i++)
            txt = txt + " " + a[i];
        e.innerHTML = txt;
        var h2 = e.clientHeight;
        var x1; // initial guess
        var h1 = set_hgt;
        x1 = x2 * h1/h2;
        return Math.floor(2.0 * x1); // ceiling for Binary Search
    };    
    var x11;
    function fillDiv(words, start_index, desired_height, e){
        // This algorithm fills a div element from an array of words up to
        // the desired height chosen by the user. It returns the end index of the array that 
        // corresponds to the number of words required to fill the div.
        //var cnt = words.length -1;       
        // Get ceiling for binary search
        if(start_index == 0)
            x11 = getCeiling(words, e);
        var cnt = start_index + x11;
        if(cnt > words.length)
            cnt = words.length-1;
        // perform binary search to get approximate end index
        var upper_limit = start_index + cnt;
        if (upper_limit > words.length) 
            upper_limit = words.length-1;
        var endIndex  = binarySearch(words, start_index, start_index, upper_limit, desired_height, e);
        // Perform linear search to get an exact index
        if(search_forward)
            endIndex = fwd_linearSearch(words, start_index, endIndex, desired_height, e);
        else
            endIndex = bkwd_linearSearch(words, start_index, endIndex, desired_height, e);
        //    fwd_linearSearch(words, start_index, 0, desired_height, e);
        var startOfNextDiv = endIndex + 1;
        return startOfNextDiv;
    };
    function initialise(n, height, cols){  // height is the desired height. The actual height may be slightly less.
        number_of_col = n;
        set_hgt = height;
        fmt = document.querySelectorAll(cols); // cols = ".TxtCols"    
        //    document.getElementById("out").innerHTML = number_of_col;
        for(var i = 0; i < max_number_col; i++){
            index[i] = 0;            
        }
        endOfDocument = false;
    };
    //
    function Next(){ // go to next page
        if(endOfDocument){
            return false;
        }
        ClearHeight();// needed for proper computation
        page_index.push(index[0]);        
        index[0] = index[number_of_col] ;
        for(var i = 0; i < number_of_col; i++){        
            index[i+1] = fillDiv(words, index[i], set_hgt, fmt[i]);
            //document.getElementById("q1").innerHTML = words[index[i+1]-3];
            // Check for end of paragraph in last three index
            if( words[index[i+1]-1].search(/---/) != -1) // first could be a null character
                FormatLastParagraph(fmt[i]); 
            if( words[index[i+1]-2].search(/---/) != -1)
                FormatLastParagraph(fmt[i]); 
            if( words[index[i+1]-3].search(/---/) != -1)
                FormatLastParagraph(fmt[i]);                         
            if((index[i+1]) == words.length) {                
                endOfDocument = true;
                fmt[i].style.height = actual_hgt  + "px";
                if( (i+1) < number_of_col ){            
                    fmt[i+1].style.display = "none";
                }
                break;
            }
        } 
        return true;
    };
    function Prev(){ // go to previous page
        endOfDocument = false;
        if(page_index.length == 0){
            return false;
        }
        ClearHeight(); // needed for proper computation
        index[0] = page_index.pop();
        ClearHeight(); // needed for proper computation
        for(var i = 0; i < number_of_col; i++){        
            index[i+1] = fillDiv(words, index[i] , set_hgt, fmt[i]);
            if( words[index[i+1]-1].search(/---/) != -1) // first could be a null character
                FormatLastParagraph(fmt[i]); 
            if( words[index[i+1]-2].search(/---/) != -1)
                FormatLastParagraph(fmt[i]); 
            if( words[index[i+1]-3].search(/---/) != -1)
                FormatLastParagraph(fmt[i]);         
            if((index[i+1]) == words.length)             
                endOfDocument = true;            
        }
        return true;
    };
    var actual_hgt = 0; /* the actual height is calculated on the first column only but will be the same for all columns */
    function First() {        // go to first page
        //fmt = document.querySelectorAll(".TxtCols");
        page_index = []; // empty page_index
        str = document.getElementById("hiddenTxt").innerHTML;
        words = removeFormat(str); 
        ClearHeight(); 
        index[0] = 0;
        for(var i = 0; i < number_of_col; i++){                
            index[i+1] = fillDiv(words, index[i], set_hgt, fmt[i]) // start of next page
            //    document.getElementById("out").innerHTML += " " + number_of_col;
            // search done with regular expression
            //
            if( words[index[i+1]-1].search(/---/) != -1) // first could be a null character
                FormatLastParagraph(fmt[i]); 
            if( words[index[i+1]-2].search(/---/) != -1)
                FormatLastParagraph(fmt[i]);             
            if((index[i+1]) == words.length)             
                endOfDocument = true;    
        }
        // centralise article in container
        //    var ha = document.getElementsByTagName("article")[0].offsetHeight;
    //    document.getElementsByTagName("article")[0].style.top = (max_hgt-ha)/2 + "px";
    actual_hgt = fmt[0].offsetHeight;
    };
    function FormatLastParagraph(e){
        // add dummy paragraph to ensure last paragraph formats properly
        e.innerHTML = e.innerHTML + "<p></p>"; // add dummy paragraph to force formatting not to justify last paragraph
        e.querySelector("p:last-child").style["display"] = "none"; // make dummy paragraph hidden.
    }  
    function ClearHeight(){
        for(var i = 0; i < number_of_col; i++) {
            fmt[i].style.height = "";
            fmt[i].innerHTML = "";
            fmt[i].style.display = "block";
        }
    }
    function SetHeight(){ // not used at present. Sets height of all cloumns to be the same.
        for(var i = 0; i < number_of_col; i++){
            fmt[i].style.height = actual_hgt  + "px";
        }
    }
    // External interface
    var MyPage = {
        initialise: initialise,
        Next: Next,
        Prev: Prev,
        First: First,
        fillDiv: fillDiv
    };
    return MyPage;
})();