/* <--- SPECS PAGE MVC --->*/
(function() {
    /* <--- CONTROLLER ---> */
    specsCtrl = {        // ctrl must be a global variable because of callbacks
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
    };
    /* <--- MODEL ---> */
    var model = {  // model is private
        view: {},
        /* <--- DYNAMIC DATA ---> */
        state: {
            year: '',
            bike: ''
        },
        /* <--- STATIC DATA ---> */
        bikes: [ // for left option selector
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
        years: { // for right option selector
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
                    value: '1978',
                    model: '1978'
                },
                {
                    value: '1979',
                    model: 'Model S'
                }, {
                    value: '1981',
                    model: 'Model G'
                }]
        },            
        specs: {
            gsx400: {                    
                '1983': 'gsx400_1983.json'
            },
            gsxr400: {                    
                '1984': 'gsxr400_1984.json',
                '1986': 'gsxr400_1986.json',
            },
            gsxr750: {
                '1985': 'gsxr750_1985.json',
                '1989': 'gsxr750_1989.json'
            },
            gs1000: {
                '1978': 'gs1000_1978.json',
                '1979': 'gs1000_1979.json',
                '1981': 'gs1000_1981.json'
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
                    // New bike has been selected. set initial year
                    // year must be set to first element when a new bike is selected
                    this.state.year = this.years[this.state.bike][0].value;
                    break;
                case 'NEW_YEAR':
                    this.state.year = payload.year;
                    break;
            }
            this.onUpdateState();
        },
        onUpdateState: function(){
            var that = this;
            var url = 'data/specs/' + this.specs[this.state.bike][this.state.year];
            console.log(url)
            $.ajax({
                url: url, // gsxr400_1984.json,
                type: "GET",
                dataType: "json",    
                success: function( response ) { // response is a parsed json object
                    that.view.render( {
                        bike: that.state.bike,
                        bikes: that.bikes,
                        year: that.state.year,
                        years: that.years[that.state.bike],
                        specs: response
                    });
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
            var specs = pageData.specs;
            var x = '' +
            '<header class="row page-header">' +
                '<div class="page-header-container">' +
                    '<ul class="lg-col-span-12 page-header-filter">' +
                        '<li>' +
                            '<div class="page-select-container">' +
                                '<select id="bikes" class="page-select" onchange="specsCtrl.onBike(this.value)">' +                                    
                                    bikes +
                                '</select> ' +
                                '<div class="page-select-btn"><i class="fa fa-chevron-down"></i></div>' +
                            '</div>' +
                          '</li>' +
                          '<li>' +                         
                            '<div class="page-select-container">' +
                                '<select class="page-select" onchange="specsCtrl.onYear(this.value)">' +
                                    years +
                                '</select>' +
                                '<div class="page-select-btn"><i class="fa fa-chevron-down"></i></div>' +
                            '</div>' +
                          '</li>' +
                      '</ul>' +
                  '</div>' +
            '</header>' +
            '<article class="row specs-content">' + 
                '<div class="specs-content-container">' +
                    '<div class="lg-col-span-4 specs-content-col">' +
                        '<table id="Engine">' +
                            '<thead>' +
                                '<tr><td colspan="2">ENGINE</td></tr>' +
                            '</thead>' +
                         '<tbody>' +
                                '<tr><td>Configuration</td>        <td>' + specs.engine.configuration + '</td></tr>' +
                         '<tr><td>Type</td>                <td>' + specs.engine.type + '</td></tr>' +
                        '<tr><td>Valve train</td>        <td>' + specs.engine.valveTrain + '</td></tr>' +
                        '<tr><td>Cooling</td>            <td>' + specs.engine.cooling + '</td></tr>' +
                                '<tr><td>Valves per cylinder</td><td>' + specs.engine.valvesPerCyl + '</td></tr>' +
                            '<tr><td>No. of Cylinders</td>    <td>' + specs.engine.numberCyl + '</td></tr>' +
                                '<tr><td>Lubrication</td>        <td>' + specs.engine.lubrication + '</td></tr>' +
                        '<tr><td>Power</td>                <td>' + specs.engine.power + '</td></tr>' +
                        '<tr><td>Torque</td>            <td>' + specs.engine.torque + '</td></tr>' +
                        '<tr><td>Bore</td>                <td>' + specs.engine.bore + '</td></tr>' +
                        '<tr><td>Stroke </td>            <td>' + specs.engine.stroke + '</td></tr>' +
                        '<tr><td>Displacement</td>        <td>' + specs.engine.displacement + '</td></tr>' +
                        '<tr><td>Compression ratio</td>    <td>' + specs.engine.compression + '</td></tr>' +
                        '<tr><td>Maximum speed</td>        <td>' + specs.engine.speed + '</td></tr>' +
                        '<tr><td>Starter system</td>    <td>' + specs.engine.starter + '</td></tr>' +        
                        '<tr><td>Air filtration</td>    <td>' + specs.engine.filtration + '</td></tr>' +
                        '<tr><td>Carburation</td>        <td>' + specs.engine.carburation + '</td></tr>' +
                        '<tr><td>Ignition</td>            <td>' + specs.engine.ignition + '</td></tr>' +
                        '</tbody>' +
                    '</table>' +
                    '<table id="FuelConsumption">' +
                        '<thead>' +
                            '<tr><td colspan="2">FUEL CONSUMPTION</td></tr>' +
                        '</thead>' +
                          '<tbody>' +
                            '<tr><td>Hard riding</td><td>'     + specs.fuelCons.hard + '</td></tr>' +
                            '<tr><td>Touring</td><td>'         + specs.fuelCons.tour + '</td></tr>' +
                                    '<tr><td>City</td><td>'            + specs.fuelCons.city + '</td></tr>' +
                               '<tr><td>Average on test</td><td>' + specs.fuelCons.avg + '</td></tr>' +
                        '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '<div class="lg-col-span-4 specs-content-col">' +
                        '<table>' +
                            '<thead>' +
                                '<tr><td colspan="2">DIMENSIONS</td></tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '<tr><td>Length</td><td>'                + specs.dimensions.length + '</td></tr>' +
                                '<tr><td>Width</td><td>'                 + specs.dimensions.width + '</td></tr>' +
                                '<tr><td>Height</td><td>'                + specs.dimensions.height + '</td></tr>' +
                                '<tr><td>Seat height</td><td>'           + specs.dimensions.seat + '</td></tr>' +
                                '<tr><td>Wheelbase</td><td>'             + specs.dimensions.wheelbase + '</td></tr>' +
                                '<tr><td>Ground clearance</td><td>'      + specs.dimensions.clearance + '</td></tr>' +
                                '<tr><td>Dry mass</td><td>'              + specs.dimensions.mass + '</td></tr>' +
                                '<tr><td>Fuel capacity (total)</td><td>' + specs.dimensions.fuel + '</td></tr>' +
                                '<tr><td>Fuel reserve</td><td>'          + specs.dimensions.reserve + '</td></tr>' +
                                '<tr><td>Engine oil capacity</td><td>'   + specs.dimensions.oil + '</td></tr>' +
                            '</tbody>' +
                        '</table>' +
                        '<table>' +
                            '<thead>' +
                                '<tr><td colspan="2">TRANSMISSION</td></tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '<tr><td>Clutch</td><td>'            + specs.transmission.clutch + '</td></tr>' +
                                '<tr><td>No of Gears</td><td>'       + specs.transmission.gears + '</td></tr>' +
                                '<tr><td>Final Drive</td><td>'       + specs.transmission.drive + '</td></tr>' +
                                '<tr><td>Primary Reduction</td><td>' + specs.transmission.primary + '</td></tr>' +
                                '<tr><td>Final Reduction</td><td>'   + specs.transmission.final + '</td></tr>' +
                            '</tbody>' +
                        '</table>' +
                        '<table>' +
                            '<thead>' +
                                '<tr><td colspan="2">GEAR RATIOS</td></tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '<tr><td>First</td><td>'  + specs.gears.first + '</td></tr>' +
                                '<tr><td>Second</td><td>' + specs.gears.second + '</td></tr>' +
                                '<tr><td>Third</td><td>'  + specs.gears.third + '</td></tr>' +
                                '<tr><td>Fourth</td><td>' + specs.gears.fourth + '</td></tr>' +
                                '<tr><td>Fifth</td><td>'  + specs.gears.fifth + '</td></tr>' +
                                '<tr><td>Sixth</td><td>'  + specs.gears.sixth + '</td></tr>' +
                            '</tbody>' +
                        '</table>' +
                    '</div>' +
                    '<div class="lg-col-span-4 specs-content-col">' +
                        '<table>' +
                            '<thead>' +
                                '<tr><td colspan="2">CHASSIS</td></tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '<tr><td>Type</td><td>'       + specs.chassis.type + '</td></tr>' +
                                '<tr><td>Swingarm</td><td>'   + specs.chassis.swingarm + '</td></tr>' +
                                '<tr><td>Frame</td><td>'      + specs.chassis.frame + '</td></tr>' +
                                '<tr><td>Fork rake</td><td>'  + specs.chassis.rake + '</td></tr>' +
                                '<tr><td>Fork trail</td><td>' + specs.chassis.trail + '</td></tr>' +
                                '<tr><td>Front tyre</td><td>' + specs.chassis.frontTyre + '</td></tr>' +
                                '<tr><td>Rear tyre</td><td>'  + specs.chassis.rearTyre + '</td></tr>' +
                            '</tbody>' +
                        '</table>' +
                           '<table>' +
                               '<thead>' +
                                '<tr><td colspan="2">SUSPENSION</td></tr>' +
                            '</thead>' +
                              '<tbody>' +
                                '<tr><td>Front</td><td>'                 + specs.suspension.front + '</td></tr>' +
                                '<tr><td>Rear</td><td>'                  + specs.suspension.rear + '</td></tr>' +
                                '<tr><td>Fork stroke</td><td>'           + specs.suspension.forkStroke + '</td></tr>' +
                                '<tr><td>Rear wheel travel</td><td>' + specs.suspension.rearWheelTravel + '</td></tr>' +        
                             '</tbody>' +
                         '</table>' +
                        '<table>' + 
                            '<thead>' +
                                '<tr><td colspan="2">BRAKES</td></tr>' +
                            '</thead>' +
                              '<tbody>' +
                            '<tr><td>Front</td><td>'          + specs.brakes.front + '</td></tr>' +
                             '<tr><td>Rear</td><td>'           + specs.brakes.rear + '</td></tr>' +
                            '<tr><td>Front diameter</td><td>' + specs.brakes.frontDiameter + '</td></tr>' +
                            '<tr><td>Rear diameter</td><td>'  + specs.brakes.rearDiameter + '</td></tr>' +              
                            '</tbody>' +
                        '</table>' +
                           '<table>' +
                               '<thead>' +
                                    '<tr><td colspan="2">PERFORMANCE</td></tr>' +
                                '</thead>' +
                        '<tbody>' +
                              '<tr><td>Standing 400 m</td><td>'         + specs.performance.standing400 + '</td></tr>' +
                              '<tr><td>0 to 100 km/h</td><td>'          + specs.performance.timeTo100 + '</td></tr>' +
                              '<tr><td>Maximum speed</td><td>'          + specs.performance.speed + '</td></tr>' +
                              '<tr><td>Stopping from 100 km/h</td><td>' + specs.performance.stoppingFrom100 + '</td></tr>' +
                               '<tr><td>Stopping from 60 km/h</td><td>'  + specs.performance.stoppingFrom60 + '</td></tr>' +
                              '</tbody>' +
                        '</table>' + 
                    '</div>' +    
                '</div>'    +            
            '</article>' +
            '<footer class="row specs-footer">' +   /* For bottom border only */
                '<div class="specs-footer-container">' +
                    '<div class="lg-col-span-12 specs-footer-content">' +
                    '</div>' +
                '</div>' +
            '</footer>';
            $('#specs-page-id').html(x);
        }
    };
    /***********************************************************************/
    /* Initialise */
    model.view = view;
    specsCtrl.model = model;
    specsCtrl.goTo('gsxr400', '1984');
})();