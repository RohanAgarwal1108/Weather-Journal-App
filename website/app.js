/* Global Variables */
const apiKey="&APPID=e8d185ed62b50e444772a7ab5c885527";
const apiURL="http://api.openweathermap.org/data/2.5/weather";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData=async(url="", data={})=>
{
    const response=await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData1= await response.json();
        return newData1;
    }
    catch(error)
    {
        console.log("error",error);
    }
}

const getData=async(url="")=>
{
    const response=await fetch(url);
    try{
        const newData=await response.json();
        return newData;
    }
    catch(error){
        console.log("error",error);
    }
}
document.querySelector('#generate').addEventListener('click',performProcess);
function performProcess()
{
    const zipcode=document.getElementById('zip').value;
    const feeling=document.getElementById('feelings').value;
    const myUrl=apiURL+"?q="+zipcode+apiKey;
    getData(myUrl)
    .then(function(newData)
    {
        const temp=newData.main.temp;
        const data={
            date:newDate,
            temp:temp,
            content:feeling
        }
        postData('/postJournalDetails', data);
    })
    .then(()=>updateUI())
}
const updateUI=async()=>
{
    const response=await fetch('/getJournalDetails');
    try{
        const finalData=await response.json();
        console.log(finalData);
        const dateDiv=document.querySelector('#date');
        dateDiv.innerHTML=finalData.date;
        const tempDiv=document.querySelector('#temp');
        tempDiv.innerHTML=finalData.temp;
        const contentDiv=document.querySelector('#content');
        contentDiv.innerHTML=finalData.content;
    }
    catch(error)
    {
        console.log("error",error);
    }
}
