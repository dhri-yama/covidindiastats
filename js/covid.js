const cardsection=document.querySelector('#main');
const cardtemplate=document.querySelector('#card_container');

getdata();

async function getdata(){
    let jsonfile=await fetch('https://api.rootnet.in/covid19-in/stats/latest');
    let fulldata=await jsonfile.json();
    let data=fulldata.data;
    let regional=fulldata.data.regional;
    let time_updated=fulldata.lastRefreshed;

    //Cases of total INDIA
    let summary=data.summary;
    let india_total=summary.total;
    let india_deaths=summary.deaths;
    let india_disch=summary.discharged;
    let x=document.querySelector(".itotal");
    x.innerText=india_total;
    x=document.querySelector(".ideaths");
    x.innerText=india_deaths;
    x=document.querySelector(".idischarged");
    x.innerText=india_disch;

    //Time Updated
    time_updated=time_updated.substring(0,10)+" "+" "+time_updated.substring(11,19);
    x=document.querySelector('.time');
    x.innerText="Last Updated On : " + time_updated;
    

    //Regional Data State wise
    regional.forEach(region=>{
            let total=region.totalConfirmed;
            let disch=region.discharged;
            let location=region.loc;
            let death=region.deaths;
            console.log(region);

            const newcard=document.importNode(cardtemplate.content,true);
            const Location=newcard.querySelector('.location');
            const Total=newcard.querySelector('.total');
            const Deaths=newcard.querySelector('.deaths');
            const Discharged=newcard.querySelector('.discharged');

            Location.innerText=location;
            Total.innerText=total;
            Discharged.innerText=disch;
            Deaths.innerText=death;

            cardsection.appendChild(newcard);
    })
}