// create svg element:
var svg = d3.select(".canvas").append("svg").attr("width", 1500).attr("height", 3200);

dimensions  = { 'width': 1350, 'height':3100 };
origin = { 'x': 30, 'y': 50 };
match_rect = {'x':630, 'y': 50+50, 'offset':2 , 'width':100, 'height':40};
over_rect = {'height':30, 'width': 30, 'curve':10, 'offset':6 };

const graph = svg.append("g").attr("width", dimensions.width+100).attr("height", dimensions.height);

var runScoredColor = d3.scaleLinear().domain([0,36])
    .range(["white", "green"])

graph.append("text")
    .attr('x', 600)
    .attr('y', 30)
    .text('Wickets')


graph
    .append("rect")
    .attr("x", 10)
    .attr("y", 5)
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .attr("fill", "#eadbcb")
    .attr("stroke", "#111")
    .attr("stroke-width", 3);

    /* Legends- Wicket */
graph
    .append("rect")
    .attr("x", 1190)
    .attr("y", 18)
    .attr("width", 125)
    .attr("height", 40)
    .attr("fill", "#ADD8E6")
    .attr("stroke", "#111")
    .attr("stroke-width", 0.8);


graph.append("text")
    .attr('x', 1200)
    .attr('y', 30)
    .text('Wickets in an Over')
    .attr("font-family", "monospace")
    .attr("font-size", "10px");

graph.append('circle')
    .attr('cx', 1200)
    .attr('cy', 45)
    .attr('r', 3)
    .attr('fill', 'red')

graph.append("text")
    .attr('x', 1210)
    .attr('y', 48)
    .text('1W')
    .attr("font-family", "monospace")
    .attr("font-size", "10px");
// 2W
graph.append('circle')
    .attr('cx', 1240)
    .attr('cy', 45)
    .attr('r', 3*2)
    .attr('fill', 'red')

graph.append("text")
    .attr('x', 1250)
    .attr('y', 48)
    .text('2W')
    .attr("font-family", "monospace")
    .attr("font-size", "10px");

// 3W
graph.append('circle')
    .attr('cx', 1280)
    .attr('cy', 45)
    .attr('r', 3*3)
    .attr('fill', 'red')

graph.append("text")
    .attr('x', 1295)
    .attr('y', 48)
    .text('3W')
    .attr("font-family", "monospace")
    .attr("font-size", "10px");
// End of Wickets legend

/* LEgend Runs scored  */

graph.append("text")
    .attr('x', 100 )
    .attr('y', 30 )
    .text("Runs Scored in an Over")
    .attr("font-family", "monospace")
    .attr("font-size", "10px");

graph.append("rect")
    .attr('x',90 )
    .attr('y',35 )
    .attr('width',over_rect.width)
    .attr('height', match_rect.height)
    .attr('rx',over_rect.curve)
    .attr('ry',over_rect.curve)
    .attr("fill", runScoredColor(1) )
    .attr('stroke', '#111')

graph.append("rect")
    .attr('x',90 + over_rect.width + over_rect.offset )
    .attr('y',35 )
    .attr('width',over_rect.width)
    .attr('height', match_rect.height)
    .attr('rx',over_rect.curve)
    .attr('ry',over_rect.curve)
    .attr("fill", runScoredColor(6) )
    .attr('stroke', '#111')

graph.append("rect")
    .attr('x',90 + (over_rect.width  + over_rect.offset) * 2 )
    .attr('y',35 )
    .attr('width',over_rect.width)
    .attr('height', match_rect.height)
    .attr('rx',over_rect.curve)
    .attr('ry',over_rect.curve)
    .attr("fill", runScoredColor(12) )
    .attr('stroke', '#111')

graph.append("rect")
    .attr('x',90 + (over_rect.width  + over_rect.offset) * 2 )
    .attr('y',35 )
    .attr('width',over_rect.width)
    .attr('height', match_rect.height)
    .attr('rx',over_rect.curve)
    .attr('ry',over_rect.curve)
    .attr("fill", runScoredColor(12) )
    .attr('stroke', '#111')

// End of Legends

graph.append("text")
    .attr('x', match_rect.x+10 )
    .attr('y', match_rect.y - 10 )
    .text("Match Details")
    .attr("font-family", "monospace")
    .attr("font-size", "10px");

// Over legend - 5, 10, 15, 20

for (let over_notifier = 0; over_notifier < 20; over_notifier++) {

    if ((over_notifier +1)  ===6 || (over_notifier +1)  ===15 || (over_notifier +1)  ===20)  {
        // First innings
        graph.append("text")
            .attr('x', match_rect.x - ((over_notifier + 1) * over_rect.width) + 10)
            .attr('y', match_rect.y - 10)
            .text(over_notifier + 1)
            .attr("font-family", "monospace")
            .attr("font-size", "10px");

        // Second innings
        graph.append("text")
            .attr('x', match_rect.x + ((over_notifier + 1) * over_rect.width) + 80)
            .attr('y', match_rect.y - 10)
            .text(over_notifier + 1)
            .attr("font-family", "monospace")
            .attr("font-size", "10px");

    }
}


d3.json("./data/1.json").then((data) => {

    number_of_matches = Object.keys(data)

    for(let match in number_of_matches){


        graph.append("rect")
        .attr('x', match_rect.x)
        .attr('y', match_rect.y + ((+match * 2)+ match_rect.offset) + (+match* match_rect.height))
        .attr('width',match_rect.width)
        .attr('height', match_rect.height)
        // .attr('rx',10)
        .attr('fill', '#fff')
        .attr('stroke', '#111');

        graph.append("text")
            .text( +match+1)
            .attr('x', match_rect.x + (match_rect.width/2))
            .attr('y',match_rect.y + ((+match * 2)+ match_rect.offset) + (+match* match_rect.height) + (match_rect.height/2))
            .attr('text-anchor', 'middle')
            .attr("font-family", "monospace")
            .attr("font-size", "10px");

        graph.append("text")
            .text( data[+match+1]['team1'] + " vs " + data[+match+1]['team2'])
            .attr('x', match_rect.x + (match_rect.width/2))
            .attr('y',match_rect.y + ((+match * 2)+ match_rect.offset) + (+match* match_rect.height) + (match_rect.height/2) + 15)
            .attr('text-anchor', 'middle')
            .attr("font-family", "monospace")
            .attr("font-size", "10px");

            innings_details = data[+match+1]['details']

            if(innings_details[0]['innings']===1){

                for(let over in innings_details[0]['over_by_over'] ){
                    let total_runs = innings_details[0]['over_by_over'][over]['total_runs'];
                    let wkt = innings_details[0]['over_by_over'][+over]['wkt'];

                    graph.append("rect")
                        .attr('x', match_rect.x  - ((+over+1) * over_rect.width))
                        .attr('y', match_rect.y + ((match * 2)+ match_rect.offset) + (match * match_rect.height))
                        .attr('width',over_rect.width)
                        .attr('height', match_rect.height)
                        .attr('rx',over_rect.curve)
                        .attr('ry',over_rect.curve)
                        .attr("fill", runScoredColor(+innings_details[0]['over_by_over'][over]['total_runs']) )
                        .attr('stroke', '#111')
                        .on("mouseover", function (event, d) {


                            // console.log('over ', innings_details[0]['over_by_over'][+over]) ;
                            tip
                                .style("opacity", 1)
                                .style("left", event.pageX  + "px")
                                .style("top", event.pageY + "px")
                                // .style("display", "inline-block")
                                .html(
                                "<b>" + data[+match+1]['team1'] + " vs " + data[+match+1]['team2']+ "</b>" +
                                "</br><b>Over:</b>" + +innings_details[0]['over_by_over'][over]['over_num'] +
                                "</br><b>Batting:</b>" + data[+match+1]['team1'] +
                                "</br><b>Scored :</b>" + total_runs +
                                "</br><b>Wickets:</b>" + wkt

                                );
                            })

                    if (innings_details[0]['over_by_over'][over]['wkt'] >0){

                        graph.append('circle')
                            .attr('cx', match_rect.x  - ((+over+1) * over_rect.width) + (over_rect.width/2))
                            .attr('cy', match_rect.y + ((match * 2)+ match_rect.offset) + (match * match_rect.height) + (match_rect.height/2))
                            .attr('r', innings_details[0]['over_by_over'][over]['wkt'] * 3)
                            .attr('fill', 'red')

                    }

                }

            }

            if(innings_details[1]['innings']===2){

                for(let over in innings_details[1]['over_by_over'] ){
                    let total_runs = innings_details[1]['over_by_over'][over]['total_runs'];
                    let wkt = innings_details[1]['over_by_over'][+over]['wkt'];

                    graph.append("rect")
                        .attr('x', match_rect.x + match_rect.width  + (+over * over_rect.width))
                        .attr('y', match_rect.y + ((match * 2)+ match_rect.offset) + (match * match_rect.height))
                        .attr('width',over_rect.width)
                        .attr('height', match_rect.height)
                        .attr('rx',over_rect.curve)
                        .attr('ry',over_rect.curve)
                        .attr("fill", runScoredColor(innings_details[1]['over_by_over'][over]['total_runs']) )
                        .attr('stroke', '#111')
                        .on("mouseover", function (event, d) {


                            // console.log('lll',data[+match+1]['team1'] + " vs " + data[+match+1]['team2'])
                            tip
                                .style("opacity", 1)
                                .style("left", event.pageX  + "px")
                                .style("top", event.pageY + "px")
                                // .style("display", "inline-block")
                                .html(
                                "<b>" + data[+match+1]['team1'] + " vs " + data[+match+1]['team2']+ "</b>" +
                                "</br><b>Batting:</b>" + data[+match+1]['team2'] +
                                "</br><b>Scored :</b>" + total_runs +
                                "</br><b>Wickets:</b>" + wkt

                                );
                            })

                    if (innings_details[1]['over_by_over'][over]['wkt'] >0){

                        graph.append('circle')
                            .attr('cx',match_rect.x + match_rect.width  + (+over * over_rect.width) + (over_rect.width/2))
                            .attr('cy', match_rect.y + ((match * 2)+ match_rect.offset) + (match * match_rect.height) + (match_rect.height/2))
                            .attr('r', innings_details[1]['over_by_over'][over]['wkt'] * 3)
                            .attr('fill', 'red')

                    }


                }

            }

    }

    // Tooltip
    var tip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);



})
