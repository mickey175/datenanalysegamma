var id = 1;
var unit = "PM10";
var line;

//var start_date = new Date(2017,12,1);
//var end_date = new Date(2018,12,1);

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

d3.json("https://gist.githubusercontent.com/datenanalysegamma/9771864e336b9ab241181a7726fe5a60/raw/74adca5673e87052d220ec9d6c166f15f84a9d07/daw2018", function(error, data) {

    var svg = d3.select("body").append("svg")
        .data(data)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xScale = selectX_axisRange(0,svg); // select the range when document is loaded with january
    var yScale = selectY_axisRange(0,svg); // select the range when document is loaded with 0 -> need to be extended

    var g = svg.append("g")
        .attr("transform","translate(50,0)");

    /* listener when id should change*/
    document.getElementById('selectSensorID').addEventListener('change', function() {

        d3.selectAll("#lineId").remove();
        id = this.value.split(' '); // split because the word "sensor" is not necessary

        // draw lines when id is changed
        drawLine(getRandomColor(),parseInt(id[1]),"PM10",xScale,yScale,g,data);
        drawLine(getRandomColor(),parseInt(id[1]),"PM2.5",xScale,yScale,g,data);
    });

    /* listener when x-axis should change*/
    document.getElementById('selectMonth').addEventListener('change', function() {
        d3.selectAll("#x_axis").remove();
        d3.selectAll("#lineId").remove();

        // first set the new date range for the x-axis
        xScale = selectX_axisRange(this.value-1,svg);

        // draw lines
        drawLine(getRandomColor(),1,"PM10",xScale,yScale,g,data);
        drawLine(getRandomColor(),1,"PM2.5",xScale,yScale,g,data);

    });

    /*
    * when document is loaded show the first lines and the get the sensor/date data
    * */
    selectSensorID(data);
    selectMonth(data);
    drawLine(getRandomColor(),1,"PM10",xScale,yScale,g,data); // draw the first line when document is loaded
    drawLine(getRandomColor(),1,"PM2.5",xScale,yScale,g,data); // draw the first line when document is loaded

});

/* draw a single line depending on id, unit and data*/
function drawLine(color,sensordid,unit,xScale,yScale,g,data){

    var data_array = [];
    var x = 0;
    data.forEach(function(dataset){
        if(dataset.sensorid === sensordid && dataset.unit === unit){
            data_array[x] = [new Date(dataset.timestamp),dataset.value];
            x++;
        }
    });

    line = d3.line()
        .x(function(d) {
            var date = new Date(d[0]);
            return xScale(date)
        })
        .y(function(d) {
            return yScale(d[1])
        });

    g.append("path")
        .datum(data_array)
        .attr("id","lineId")
        .attr("fill","none")
        .attr("stroke",color)
        .attr("stroke-width",1.5)
        .attr("d",line);

    return line;
}

/* to get all sensorid´s just once*/
function selectSensorID(data) {
    var x = document.getElementById("selectSensorID");
    var old_sensorid = 0;
    data.forEach(function(dataset){
        if(old_sensorid != dataset.sensorid){
            var option = document.createElement("option");
            option.text = "Sensor "+dataset.sensorid;
            x.add(option, option.text);
            old_sensorid = dataset.sensorid
        }
    });
}

/* to get all months from the data 1-12 is Jan-Decs*/
function selectMonth(data) {
    var x = document.getElementById("selectMonth");
    var old_string = [];
    var i = 0;
    data.forEach(function(dataset){
        if(!old_string.includes(dataset.month)){
            var option = document.createElement("option");
            old_string[i] = dataset.month;
            option.text = dataset.month;
            x.add(option, option.text);
            i++
        }
    });
}

/*get x-axis range by month*/
function selectX_axisRange(data,svg){
    var xScale = d3.scaleTime()
        .domain([new Date(2018,data,1), new Date(2018,data+1,1)])
        .range([0,width]);

    var x_axis = d3.axisBottom()
        .scale(xScale);

    svg.append("g")
        .attr("transform", "translate("+50+"," + height + ")")
        .attr("id","x_axis")
        .call(x_axis);

    return xScale;
}

function selectY_axisRange(data,svg){
    var yScale = d3.scaleLinear()
        .domain([0, 2500])
        .range([height,0]);

    var y_axis = d3.axisLeft()
        .scale(yScale);

    svg.append("g")
        .attr("transform", "translate(" +50 + ",0)")
        .call(y_axis);

    return yScale;
}

/*choose random colors for the lines*/
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
