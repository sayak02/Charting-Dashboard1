
const button = document.querySelector('#submit');
let firstcolorArray = ['#1d3163', '#223a75', '#264082', '#29468f', '#2d4ea1',
  '#3154ad', '#375ebf', '#3c66cf', '#3c66cf', '#3c66cf',
  '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf',
  '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf',
  '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf'];


//   329D9C 56C596 9FD3C7

let secondColorArray = ['#3b73cc', '#3274db', '#337ae8', '#2c7af2', '#6da0ed',
  '#3b73cc', '#3274db', '#337ae8', '#2c7af2', '#6da0ed'];

const fetchApi = new FetchApi();
const charts = new Charts();
document.addEventListener('DOMContentLoaded', (e) => {
  
  fetchApi.getInitialData('/factory')
  .then(data => {
    Dropdown(data,'Factory','factory');
  })  
  
  fetchApi.getInitialData('/location')
  .then(data => {
    Dropdown(data,'Location','location');
  })  
  
  fetchApi.getInitialData('/region')
  .then(data => {
    Dropdown(data,'Region','region');
  })  
  
  fetchApi.getInitialData('/item')
  .then(data => {
    Dropdown(data,'ItemID','item');
  })

  fetchApi.getInitialData('/salesperson')
  .then(data => {
    Dropdown(data,'SalesPerson','salesperson');
  })  
  
  fetchApi.getInitialData('/daterange')
  .then(data => {
    dateInput(data,'InvoiceDate');
  })

});


button.addEventListener('click',(e)=>{

  const factorySelect = document.querySelector(`#dropdown-factory-select`);
  const locationSelect = document.querySelector(`#dropdown-location-select`);
  const regionSelect = document.querySelector(`#dropdown-region-select`);
  const itemSelect = document.querySelector(`#dropdown-item-select`);
  const salespersonSelect = document.querySelector(`#dropdown-salesperson-select`);
  const startDateInput = document.querySelector(`#start-date-input`);

  const endDateInput = document.querySelector(`#end-date-input`);

  //condition of checking th date range.
  if(new Date(startDateInput.defaultValue)<new Date(startDateInput.min)|| new Date(endDateInput.defaultValue) > new Date(endDateInput.max)){
    alert(`Date Range ${startDateInput.min} to ${endDateInput.max}`)
  }

  //do normal stuff
  else{
  
    fetchApi.postVal('http://localhost:3000/search',{
      'factory':factorySelect.value,
      'location':locationSelect.value,
      'region':regionSelect.value,
      'item':itemSelect.value,
      'salesperson':salespersonSelect.value,
      'startdate': startDateInput.value,
      'enddate':endDateInput.value,
    })
    .then(backendData => {


      //SVK SYK ->>> start frm hre
      prepareOneLayerChart(backendData, 'Top 10 Factory-Sales-Data', "Factory", "Sales", "factorySales","bar",firstcolorArray);
      prepareOneLayerChart(backendData, 'Top 10 Product(Item)-Sales-Data', "ItemID", "Sales","itemSales","column",firstcolorArray);
      prepareOneLayerChart(backendData, 'Top 10 Customer-Sales-Data', "CustomerID", "Sales", "customerSales","column",firstcolorArray);
      prepareTwoLayerChart(backendData,'Top 10 Location Sales/Quantity Data',"Location","Sales","Quantity","locationSales","area");
      prepareTwoLayerChart(backendData,'Top 10 Location Sales/SalesPerson Data',"Region","Sales","SalesPerson","salesPersonsales","line");
      prepareRegionSalesChart(backendData, "Region Wise Sales", "pie","regionSales");
      // prepareOneLayerChart(backendData, 'Top 10 Location-Sales-Data', "Location", "Sales", "locationSales","bar");
    // let itemSalesData = [];




    })



  }
  
})


async function prepareRegionSalesChart(backendData,title,type,target){
  let data = [];
  data.push(['Region','Sales']);
  let response = await fetch('/region');
  let res = await response.json();;
  res.forEach(element => {
    data.push([element.Region,0])
  }); 
  backendData.forEach(bData=>{
    // console.log(bData.Sales,bData.Region);
    if(bData.Region === data[1][0]){
      data[1][1]+=bData.Sales;
    }else if(bData.Region === data[2][0]){
      data[2][1] += bData.Sales;
    }else if(bData.Region === data[3][0]){
      data[3][1] += bData.Sales;
    }else if(bData.Region === data[4][0]){
      data[4][1] += bData.Sales;
    }else if (bData.Region === data[5][0]){
      data[5][1] += bData.Sales;
    }
  })
    for(let i=1;i<data.length;i++){
      if(data[i][1] <0){
        data[i][1] = 0;
      }
    }
    console.log(data,"piedatas");
  charts.drawOneLayerSalesChart(data, title, "Nothing" , "Nothing",target, type);;
}

function prepareTwoLayerChart(backendData,title,firstParam,secondParam,thirdParam,target,type){

  let data = [];
  data.push([firstParam,secondParam,thirdParam]);
  for (let index = 0; index < backendData.length; index++) {
    if (index < 10){
      data.push([`${backendData[index][firstParam]}`, (backendData[index][secondParam] / 100), backendData[index][thirdParam]]);
    }
    else
      break;
  }
  charts.drawTwoLayerSalesChart(title,data,target,type);
}


function prepareOneLayerChart(backendData, title, vAxisTitle, hAxisTitle, target, type, colorArray){

  let data = [];
  data.push([vAxisTitle, hAxisTitle, { role: "style" }]);
  for (let index = 0; index < backendData.length; index++) {
    if (index < 10){
      data.push([`${backendData[index][vAxisTitle]}`, backendData[index][hAxisTitle], colorArray[index]]);
      console.log(`${backendData[index][vAxisTitle]}`, backendData[index][hAxisTitle], colorArray[index]);
    }
    else
      break;
  }
  charts.drawOneLayerSalesChart(data, title,vAxisTitle,hAxisTitle, target,type);
}