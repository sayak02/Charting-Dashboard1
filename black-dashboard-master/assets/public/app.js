
const button = document.querySelector('#submit');
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
  
    fetchApi.postVal('/search',{
      'factory':factorySelect.value,
      'location':locationSelect.value,
      'region':regionSelect.value,
      'item':itemSelect.value,
      'salesperson':salespersonSelect.value,
      'startdate': startDateInput.value,
      'enddate':endDateInput.value,
    })
    .then(backendData => {


      prepareOneLayerChart(backendData, '', "Factory", "Sales", "factorySales","bar",firstcolorArray);
      prepareOneLayerChart(backendData, '', "ItemID", "Sales","itemSales","column",firstcolorArray);
      prepareOneLayerChart(backendData, '', "CustomerID", "Sales", "customerSales","column",firstcolorArray);
      prepareOneLayerChart(backendData, '', "Region", "Sales", "regionSales", "pie", firstcolorArray);
      prepareTwoLayerChart(backendData,'',"Location","Sales","Quantity","locationSales","area");
      prepareTwoLayerChart(backendData,'',"Region","Sales","SalesPerson","salesPersonsales","line");

    })



  }
  
})

function prepareTwoLayerChart(backendData, title, firstParam, secondParam, thirdParam, target, type){

  let firstParamsecondParamData = makeChartDataNocolor(backendData,firstParam,secondParam,10);
  let firstParamthirdParamData = makeChartDataNocolor(backendData,firstParam,thirdParam,10);
  let data = mergeData(firstParamsecondParamData,firstParamthirdParamData);
  charts.drawTwoLayerSalesChart(title, data, target, type);
}

function prepareOneLayerChart(backendData, title, vAxisTitle, hAxisTitle, target, type, colorArray) {

  let data;
  if (type === "pie") {
    data = makeChartDataNocolor(backendData, vAxisTitle, hAxisTitle, 10)
  }
  else
    data = makeChartData(backendData, vAxisTitle, hAxisTitle, 10, colorArray);
  charts.drawOneLayerSalesChart(data, title, vAxisTitle, hAxisTitle, target, type);
}
