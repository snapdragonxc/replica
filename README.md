# replica
### Description
**replica** is a static website built using the following technologies:
- jQuery
- Javascript

### Design
The design uses a router to navigate between pages and a Model View Controller (MVC) to update the pages.

The MVC code is loosely based on that developed by Behnam Taraghi and Martin Ebner: 

[https://www.researchgate.net/publication/229077063_A_Simple_MVC_Framework_for_Widget_Development](https://www.researchgate.net/publication/229077063_A_Simple_MVC_Framework_for_Widget_Development)

The router is similar to that developed by Joakim Carlstein:

[http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html](http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html)

To give the articles the feel of a magazine, the text is displayed in multiple text columns. Rather than use CSS Mutiple Columns, a javascript algorithm is applied to adjust the word-count for each text column to achieve a fixed column height. The code for this algorithm is at:

[https://github.com/snapdragonxc/replica/blob/master/src/scripts/app/page_algorithm_2.js](https://github.com/snapdragonxc/replica/blob/master/src/scripts/app/page_algorithm_2.js)

### Styling
The styling of the front page was based on an obsolete (2016) version of the Haute Hijab website, which has changed twice since 2016. The current version of the Haute Hijab website is at:

[https://www.hautehijab.com](https://www.hautehijab.com)

Haute Hijab itself, was designed by the "Whole Design Studios":

[https://experts.shopify.com/whole-design-studios](https://experts.shopify.com/whole-design-studios)

### Installation
The website can be installed on a cloud service, such as Amazon AWS, or locally on a PC.

To install on Amazon AWS S3, copy all the files from the folder 'www' into the S3 bucket and
follow the instructions for setting up the S3 instance at:

[https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).

A simple ExpressJS server is included for running the application locally. To install locally use npm: 
```
npm install
```
### Running Locally
To run the website locally: 
```
npm start
```
and navigate to 'http:\localhost:8080' in your web browser
