'use strict';
// Make time list//
let times=[];
for (let i=6;i<20;i++){
  if(i<12){
    times.push(`${i}am`);
  }
  else if(i===12){
    times.push(`${i}pm`);
  }
  else{
    times.push(`${i-12}pm`);
  }
}
//Locations Array
let locationsArray=[];
//----------------------------------------//
let totalByTime=[];
for(let i=0;i<times.length;i++){
  totalByTime.push(0);
}
let TotalAllSales =0;

// Function for Random Num //
function gitRandNum(max,mini) {
  let y=Math.random();
  let z=(Number(max)-Number(mini)+1);
  let x =Math.floor(y*z)+Number(mini);
  console.log('y='+y+'\nz"'+(max-mini+1)+'\nzz'+z+'==='+x);
  return x;
}
//-----------------------------------------//
// Make constrictor for location //
function StoreLocation(locationName,maxCust,miniCust,AvgPerPerson,haveHeder) {
  this.locationName=locationName;
  this.maxCust=maxCust;
  this.miniCust=miniCust;
  this.AvgPerPerson=AvgPerPerson;
  this.haveHeder=haveHeder;
  locationsArray.push(this.locationName);
  this.totalSales=this.gitSales(maxCust,miniCust,AvgPerPerson);
  this.render();
  this.calcSalesByTime();

}
StoreLocation.prototype.gitSales=function (maxCust,miniCust,AvgPerPerson) {
  let salesString=[];
  let salesValue =[];
  let totSales=0;
  let randSales=0;
  for (let i=0;i<times.length;i++){
    let x=gitRandNum(maxCust,miniCust);
    randSales=Math.floor(x*AvgPerPerson);
   /* console.log(this.locationName+':'+ x+'--'+randSales);*/
    salesString.push(`${times[i]} ${randSales} cookies`);
    salesValue.push(randSales);
    totSales+=randSales;
  }
  salesString.push(`Total:${totSales} Cookies`);
  return [salesValue,salesString,totSales];
};
StoreLocation.prototype.render = function()
{
  const table = document.getElementById('allLocations');
  //Add heder row //
  if(this.haveHeder){
    const tblHeader = document.createElement('tr');
    table.appendChild(tblHeader);
    const tblHeaderEmpty = document.createElement('th');
    tblHeader.appendChild(tblHeaderEmpty);
    tblHeaderEmpty.textContent='Location';
    for (let i=0;i<times.length;i++){
      const tblHeaderD = document.createElement('th');
      tblHeader.appendChild(tblHeaderD);
      tblHeaderD.textContent=times[i];
    }
    const tblHeaderD = document.createElement('th');
    tblHeader.appendChild(tblHeaderD);
    tblHeaderD.textContent='Daily Location Total';
  }
  // Add Store data //
  const tblStor = document.createElement('tr');
  table.appendChild(tblStor);
  const tblStorD = document.createElement('td');
  tblStor.appendChild(tblStorD);
  tblStorD.textContent=this.locationName;
  for(let i=0;i<this.totalSales[0].length;i++){
    const tblStorD = document.createElement('td');
    tblStor.appendChild(tblStorD);
    tblStorD.textContent=this.totalSales[0][i];
  }
  const tblStorTotal = document.createElement('td');
  tblStor.appendChild(tblStorTotal);
  tblStorTotal.textContent=this.totalSales[2];


};
StoreLocation.prototype.calcSalesByTime=function(){
  for(let i=0;i<times.length;i++){
    totalByTime[i]+=this.totalSales[0][i];
  }
  
};
function tblFooter(){
  const table = document.getElementById('allLocations');
  const tblFooter = document.createElement('tr');
  table.appendChild(tblFooter);
  const tblFooterTotal = document.createElement('th');
  tblFooter.appendChild(tblFooterTotal);
  tblFooterTotal.textContent='Totals';
  for (let i=0;i<times.length;i++){
    const tblfooteD = document.createElement('th');
    tblFooter.appendChild(tblfooteD);
    tblfooteD.textContent=totalByTime[i];
  }
  TotalAllSales=0;
  for(let i=0;i<totalByTime.length;i++){
    TotalAllSales+=totalByTime[i];
  }
  const tblfooteD = document.createElement('th');
  tblFooter.appendChild(tblfooteD);
  tblfooteD.textContent=TotalAllSales;
}

const seattle =new StoreLocation('Seattle',65,23,6.3,true);
const tokyo =new StoreLocation('Tokyo',24,3,1.2,false);
const dubai =new StoreLocation('Dubai',38,11,3.7,false);
const paris =new StoreLocation('Paris',38,20,2.3,false);
const lime =new StoreLocation('Lime',16,2,4.6,false);

tblFooter();
let loadForm =document.getElementById('addLocation');
loadForm.addEventListener('submit',addNewLocation123);
function addNewLocation123(event){
  event.preventDefault();
  let locationName = event.target.locationName.value;
  let maxCustPerHour=event.target.maxPeoplePerHour.value;
  let miniCustPerHour=event.target.miniPeoplePerHour.value;
  let avgCookiesPerPAX=event.target.avgCookiesPerPAX.value;

  if(locationsArray.includes(locationName)){
    alert('Wrong data input\n\nLocation Name already exist in the table');
  }
  else if((maxCustPerHour-miniCustPerHour)<0){alert('Wrong data input\nMax Number can\'t be smaller than Mini Number');}
  else if (avgCookiesPerPAX <= 0){alert('Wrong data input\nAverage Number should be greater than zero');}
  else {
    let newLocation = new StoreLocation(locationName,maxCustPerHour,miniCustPerHour,avgCookiesPerPAX,false);
    let table = document.getElementById('allLocations');
    table.deleteRow(table.rows.length -2);
    tblFooter();
    event.target.reset();}
}
