var metricsCsv;
var f1 = "App";
var f2 = "G";
var tf = "BAR";

var s4columns = ["Player","App","Mins","G","A","R","Y","PS","SPG","AW","MOTM"];
var s4col_xpos = [10,70,105,150,170,190,210,235,270,310,340];

s4columns.forEach( function(col,i) {
    var header = d3.select("#s4Headers");
    header.append("text")
        .attr("x",s4col_xpos[i])
        .attr("y",355).style("fill","#FFE066").style("font-weight","bold").style("font-size","14px").style("text-align","center")
        .text(col);
})

changeDataPlayerStats();

var div = d3.select("body").append("div")	
.attr("class", "tooltip")				
.style("opacity", 0);

function metricChange() {
    f1 = (document.getElementById("filter1").value);
    f2 = (document.getElementById("filter2").value);
    tf = (document.getElementById("teamFilter").value);
    updatePlayerStats(metricsCsv);
    teamStatsChange();
}

function updatePlayerStats(dataset) {

    var fdataset = dataset.filter(function(d){ return  (d.Team == tf) });

    var maxf1 = d3.max(fdataset, function(d) { return d[f1]; });
    var maxf2 = d3.max(fdataset, function(d) { return d[f2]; });
    var maxmp = d3.max(fdataset, function(d) { return d.Mins; });

    var xScale = d3.scaleLinear()
    .domain([0, maxf1])
    .range([20, 320]);

    var yScale = d3.scaleLinear()
    .domain([0, maxf2])
    .range([320, 20]);

    var rScale = d3.scaleLinear()
    .domain([0, maxmp])
    .range([2, 6]);

    var xAxis = d3.axisBottom().scale(xScale).ticks(10);

    var yAxis = d3.axisLeft().scale(yScale).ticks(10);

    d3.select("#s4xaxis")
        .attr("class", "x axis")	
        .attr("transform", "translate(5," + (320) + ")").style("color","white")
        .call(xAxis);

    d3.select("#s4yaxis")
        .attr("class", "y axis")	
        .attr("transform", "translate(" + 25 + ", 0)").style("color","white")
        .call(yAxis);

    var circles = d3.select("#points").selectAll("circle").data(fdataset);
    circles.exit().remove();
    circles.enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d[f1]); })
        .attr("cy", function (d) { return yScale(d[f2]); })
        .attr("class", function (d) { return d.Player;})
        .attr("r", function (d) { return rScale(d.Mins); })
        .style("fill","#5CD9CC")
    .style("stroke","white").style("stroke-width","2px")
        .on("mouseover", function(d) {		
        div.transition()		
            .duration(200)
            .attr("r",10)
            .style("opacity", .9);
        div.html(d.Player + " ("+d.P+")"+"<br/>" + f1 + ": " + d[f1] + "<br/>"  + f2 + ": " + d[f2])	
            .style("left", (d3.event.pageX) + "px").style("color","#fff").style("font-weight","600").style("text-align","left").style("background","#7569CC")		
            .style("top", (d3.event.pageY - 45) + "px").style("width","100px");
        d3.select(this).attr("r", function (d) { return rScale(d.Mins)+2; }).style("fill", "#FFE066").style("stroke","white").style("stroke-width","5px")
    })					
        .on("mouseout", function(d) {		
        div.transition()		
            .duration(500)
            .style("opacity", 0);
          d3.select(this).attr("r", function (d) { return rScale(d.Mins); }).style("fill", "#5CD9CC").style("stroke","white").style("stroke-width","2px");

    });
    circles.transition()
        .duration(500)
        .attr("cx", function (d) { return xScale(d[f1]); })
        .attr("cy", function (d) { return yScale(d[f2]); })
        .attr("r", function (d) { return rScale(d.Mins); })
        .attr("class", function (d) { return d.Player;})

    s4columns.forEach( function(col,i) {
        var column = d3.select("#"+col).selectAll("text").data(fdataset);
        column.enter()
            .append("text")
            .attr("x",s4col_xpos[i])
            .attr("y", function (d,n) { return 370 + n*15;}).style("fill","white").style("font-size","12px")
            .text(function (d) { return d[col];});
        column.transition()
            .duration(500)
            .attr("y", function (d,n) { return 370 + n*15;})
            .text(function (d) { return d[col];});
        column.exit().remove();
    });

}

function changeDataPlayerStats() {
    // Load the file indicated by the select menu

    d3.csv('data/PlayerDataset.csv').then(function(data) {
        metricsCsv = data;
        metricsCsv.forEach( function(d) {
            d.App = +d.App;
            d.G = +d.G;
            d.AW = +d.AW;
            d.Age = +d.Age;
            d.A = +d.A;
            d.MOTM = +d.MOTM;
            d.Mins = +d.Mins;
            d.PS = +d.PS;
            d.R = +d.R;
            d.SPG = +d.SPG;
            d.SrNo = +d.SrNo;
            d.Y = +d.Y;
        });
        updatePlayerStats(metricsCsv);
    })
        .catch(function(error){
        // handle error
        alert("Couldn't load the dataset!");		 
    });


}


