const allInputDiv = document.querySelector('#all_inputs');
const selectInputDiv = document.querySelector('.select_inputs')

//changer 2018-09-30T18:30:00:000Z to 2018-09-30
function dbToHtmlDate (dbDate){
  const res = dbDate.slice(0,10)
  return res;
}

function Dropdown(data,varName,idName){
  // console.log(data,typeof(data))
  const dropdownItemSelect = document.createElement('select');
  dropdownItemSelect.id = `dropdown-${idName}-select`;
  // dropdownItemSelect.className = `dropdown btn btn-primary`;
  
  // const nameLable = document.createElement('label');
  // nameLable.innerText = `${varName}: `;

  //option for all
  let option = document.createElement('option');
  option.value = '';
  option.text = 'All';
  dropdownItemSelect.options.add(option); 

  data.forEach(res =>{
    let option = document.createElement('option');
    option.value = res[varName];
    option.text = res[varName];
    dropdownItemSelect.options.add(option); 
  })
  // allInputDiv.appendChild(nameLable);
  selectInputDiv.appendChild(dropdownItemSelect);
}




function dateInput(data,varName){

  const startDateInput = document.createElement('input');
  startDateInput.type ='date'
  startDateInput.id = 'start-date-input';
  // startDateInput.className = 'btn btn-primary';
  

  // const startNameLable = document.createElement('label');
  // startNameLable.innerText = `Start Date: `;
  // startNameLable.id = `start-date-lable`;


  const endDateInput = document.createElement('input');
  endDateInput.type ='date'
  endDateInput.id = 'end-date-input';
  // endDateInput.className = 'btn btn-primary';

  // const endNameLable = document.createElement('label');
  // endNameLable.innerText = `End Date: `;
  // endNameLable.id = `end-date-lable`;


  // allInputDiv.appendChild(startNameLable);
  allInputDiv.appendChild(startDateInput);

  // allInputDiv.appendChild(endNameLable);
  allInputDiv.appendChild(endDateInput);
  console.log(data);

  const highLowDateObj = {
                'lowDateDbValue': data[0][varName],
                'highDateDbValue': data[0][varName],
                };         
  data.forEach(d=>{
    // console.log(d);
    // console.log(varName);
    // console.log(d[varName]);
    if(new Date(d[varName])< new Date(highLowDateObj.lowDateDbValue)){
      highLowDateObj.lowDateDbValue = d[varName];
    }
    if(new Date(d[varName])> new Date(highLowDateObj.highDateDbValue)){
      highLowDateObj.highDateDbValue = d[varName];
    }
  })
  
  // console.log('the obj',highLowDateObj)

  //making the input
  startDateInput.defaultValue = `${dbToHtmlDate(highLowDateObj.lowDateDbValue)}`;
  startDateInput.min = dbToHtmlDate(highLowDateObj.lowDateDbValue);
  endDateInput.defaultValue = `${dbToHtmlDate(highLowDateObj.highDateDbValue)}`;
  endDateInput.max = dbToHtmlDate(highLowDateObj.highDateDbValue);
}
