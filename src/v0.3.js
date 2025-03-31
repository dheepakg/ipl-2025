// create svg element:
var svg = d3.select(".canvas").append("svg").attr("width", 1500).attr("height", 3200);

dimensions  = { 'width': 1350, 'height':3100 };
origin = { 'x': 30, 'y': 50 };
match_rect = {'x':630, 'y': 50+50, 'offset':2 , 'width':100, 'height':40};
over_rect = {'height':30, 'width': 30, 'curve':10, 'offset':6 };

const graph = svg.append("g").attr("width", dimensions.width+100).attr("height", dimensions.height);

var runScoredColor = d3.scaleLinear().domain([0,36])
    .range(["white", "green"])



graph
    .append("rect")
    .attr("x", 10)
    .attr("y", 5)
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .attr("fill", "#eadbcb")
    .attr("stroke", "#111")
    .attr("stroke-width", 3);

// Base line at the top
// graph.append("line")
//     .attr('x1',origin.x)
//     .attr('y1',match_rect.y)
//     .attr('x2',dimensions.width)
//     .attr('y2',match_rect.y)
//     .attr('stroke', '#111')

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
    console.log("No of matches ", number_of_matches.length, number_of_matches)
    for(let match in number_of_matches){
        console.log("Match ", match);



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

                    graph.append("rect")
                        .attr('x', match_rect.x  - ((+over+1) * over_rect.width))
                        .attr('y', match_rect.y + ((match * 2)+ match_rect.offset) + (match * match_rect.height))
                        .attr('width',over_rect.width)
                        .attr('height', match_rect.height)
                        .attr('rx',over_rect.curve)
                        .attr('ry',over_rect.curve)
                        // .attr('fill', '#fff')
                        .attr("fill", runScoredColor(innings_details[0]['over_by_over'][over]['total_runs']) )
                        .attr('stroke', '#111');

                    console.log("over",over, )
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

                    graph.append("rect")
                        .attr('x', match_rect.x + match_rect.width  + (+over * over_rect.width))
                        .attr('y', match_rect.y + ((match * 2)+ match_rect.offset) + (match * match_rect.height))
                        .attr('width',over_rect.width)
                        .attr('height', match_rect.height)
                        .attr('rx',over_rect.curve)
                        .attr('ry',over_rect.curve)
                        .attr('fill', '#fff')
                        .attr("fill", runScoredColor(innings_details[1]['over_by_over'][over]['total_runs']) )
                        .attr('stroke', '#111');

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



})

/*

// Rectangles for each match
for(let j=0; j<70;j++)
{    graph.append("rect")
        .attr('x', match_rect.x)
        .attr('y', match_rect.y + ((j * 2)+ match_rect.offset) + (j* match_rect.height))
        .attr('width',match_rect.width)
        .attr('height', match_rect.height)
        // .attr('rx',10)
        .attr('fill', '#fff')
        .attr('stroke', '#111')
        .append("text").text( j);


    graph.append("text")
        .text( j+1)
        .attr('x', match_rect.x + (match_rect.width/2))
        .attr('y',match_rect.y + ((j * 2)+ match_rect.offset) + (j* match_rect.height) + (match_rect.height/2))
        .attr('text-anchor', 'middle')
        .attr("font-family", "monospace")
        .attr("font-size", "10px");






    for(let i=0; i<20; i++){
        // First innings
        graph.append("rect")
            .attr('x', match_rect.x  - ((i+1) * over_rect.width))
            .attr('y', match_rect.y + ((j * 2)+ match_rect.offset) + (j* match_rect.height))
            .attr('width',over_rect.width)
            .attr('height', match_rect.height)
            .attr('rx',over_rect.curve)
            .attr('ry',over_rect.curve)
            .attr('fill', '#fff')
            .attr('stroke', '#111');

        // Second innings
        graph.append("rect")
            .attr('x', match_rect.x + match_rect.width  + (i * over_rect.width))
            // .attr('y', origin.y+((j+1)*over_rect.offset) + (j * over_rect.height))
            .attr('y', match_rect.y + ((j * 2)+ match_rect.offset) + (j* match_rect.height))
            .attr('width',over_rect.width)
            .attr('height', match_rect.height)
            .attr('rx',over_rect.curve)
            .attr('ry',over_rect.curve)
            .attr('fill', '#fff')
            .attr('stroke', '#111');


        }
    }
*/
