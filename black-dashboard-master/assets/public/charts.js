class Charts{
    drawOneLayerSalesChart(data, title, vAxisTitle, hAxisTitle,target,type){
    if(data.length > 1){
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => {
            // console.log(data);
            
            if(type==="bar"){
                let options = {
                    
                    title: title,
                    legend: { position: 'top' },
                    bar: { groupWidth: '85%' },
                    bars: 'horizontal',
                    vAxis: {
                        title: vAxisTitle,
                        titleTextStyle: {
                            color: 'black'
                        }

                    },
                     animation:{
                        duration: 1000,
                        easing: 'out',
                        startup:true
                        },
                    hAxis: {
                        title: hAxisTitle,
                        titleTextStyle: {
                            color: 'black'
                        }

                    },
                };
                console.log(type);
                let visualizationData = google.visualization.arrayToDataTable(data, false);
                let chart = new google.visualization.BarChart(document.getElementById(target));
                chart.draw(visualizationData, options);
                
            }
            else if (type === "column") {
                let options = {
                    title: title,
                    color:'#2e2e2e',
                    legend: { position: 'top' },
                    bar: { groupWidth: '85%' },
                    bars: 'horizontal',
                    vAxis: {
                        title: hAxisTitle,
                        titleTextStyle: {
                            color: 'black'
                        }

                    },
                    animation: {
                        duration: 2000,
                        easing: 'out',
                        startup: true
                    },
                    hAxis: {
                        title: vAxisTitle,
                        titleTextStyle: {
                            color: 'black'
                        }

                    },
                };
                console.log(type);
                let visualizationData = google.visualization.arrayToDataTable(data, false);
                let chart = new google.visualization.ColumnChart(document.getElementById(target));
                chart.draw(visualizationData, options);

            }
            else if(type === "pie"){
                console.log("In");
                // console.log(data,'piedata');
                let options = {
                    title: title,
                    pieHole: 0.4,
                    animation: {
                        duration: 2000,
                        easing: 'out',
                        startup: true
                    },
                    colors: ['#1d3163', '#3274db', '#6da0ed', '#2d4ea1','#375ebf']
                };
                let visualizationData = google.visualization.arrayToDataTable(data, false);
                let chart = new google.visualization.PieChart(document.getElementById(target));
                chart.draw(visualizationData, options);
            }

            // if(type==="bar")

            // else if(type==="column")
                // let chart = new google.visualization.ColumnChart(document.getElementById(target));  
            

        });
    }else{
        alert("No Data With This Given Parameter");
    }    


// data = google.visualization.arrayToDataTable(data);   
} 

drawTwoLayerSalesChart(title,data,target,type){

    if(data.length>1){
        console.log(data);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(()=>{
            if (type === "area") 
            {
                let options = {
                    title: title,
                    curveType: 'function',
                    legend: { position: 'bottom' },
                    hAxis: { title: 'Location', titleTextStyle: { color: '#333' }},
                    vAxis: { title: 'Sales/Quantity', titleTextStyle: { color: '#333' }},
                    colors: ['#3c66cf','#56C596'],
                    animation: {
                        duration: 2000,
                        easing: 'out',
                        startup: true
                    },
                }
                let visualizationData = google.visualization.arrayToDataTable(data, false);
                var chart = new google.visualization.AreaChart(document.getElementById(target));
                chart.draw(visualizationData, options);
            }
            else if (type === "line") 
            {
                let options = {
                    title: title,
                    curveType: 'function',
                    legend: { position: 'bottom' },
                    hAxis: { title: 'Region', titleTextStyle: { color: '#333' }},
                    vAxis: { title: 'Sales/Quantity', titleTextStyle: { color: '#333' }},
                    colors: ['#3c66cf','#56C596'],
                    animation: {
                        duration: 2000,
                        easing: 'out',
                        startup: true
                    },
                }
                let visualizationData = google.visualization.arrayToDataTable(data, false);
                var chart = new google.visualization.LineChart(document.getElementById(target));
                chart.draw(visualizationData, options);
            }
        })
    } else {
        alert("No Data With This Given Parameter");
    } 
    

}

}