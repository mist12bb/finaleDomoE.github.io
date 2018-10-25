let actionsList = [];
let div = document.querySelector("#app")
let savedActs = document.querySelector(".acts");
let sumActs = document.querySelector(".sum");
let coomActs = document.querySelector(".comm");
let form = document.querySelector(".form");
let seavedList = [];
let sumAct = 0;
let commison = 0

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    let data = {}
    console.log(form.amount.value);
    //data["amount"] = form.amount.value;
    form.amount.value === "" ? console.log(true):data["amount"] = form.amount.value;
    form.info.value === "" ? console.log(true):data["info"] = form.info.value;
    form.date.value === "" ? console.log(true):data["date"] = form.date.value;
    ;
    console.log(data);
   // data["info"] = form.info.value;
   // data["date"] = form.date.value;
    if (data["amount" ]!== undefined && data["info"]!== undefined &&  data["date"]!== undefined)
    {console.log(data);
    axios.post("http://localhost:3333/entering", data).then(res=>{
        res.data
    })
}
    
})

axios.get("http://localhost:3333/saved").then(res=>{
    console.log(res.data[0]);
    
    seavedList = res.data;
    let sum = seavedList.reduce((acc, data)=>{ 
        return acc + data.amount
    },0)
    console.log(sum);
    
         //savedActs.appendChild(box);
         seavedList.forEach((row)=>
         
         {
             let box = document.createElement("div");
             box.addEventListener("click", ()=>{
                 savedActs.removeChild(box);
                 axios.delete(`http://localhost:3333/saved/${row.id}`)
             })
             box.classList.add("act-box");
             let amount = document.createElement("p");
             let date = document.createElement("p");
         console.log("my",row["amount"]);
         
         amount.textContent = row["amount"]
         date.textContent = row["date"]
         box.appendChild(amount);
         box.appendChild(date);
         savedActs.appendChild(box);
        }
        )
        //box.classList.remove("box-data")
         //box.classList.add("saved-data")
                        })

axios.get("http://localhost:3333/entering").then(
    res => {res.data;actionsList=res.data;
        let sum = actionsList.reduce((acc, data)=>{ 
            return acc + Number.parseInt (data.amount)
        },0)
        let comminson =  0
        actionsList.forEach(d=>{
            comminson += 0.5
        })
        coomActs.textContent = comminson
        console.log(sum);
        sumActs.textContent = sum
        actionsList.forEach(row => {
            let removeBtn = document.createElement("button");
            let addToSaved = document.createElement("button");
            addToSaved.addEventListener("click", ()=>{
                axios.post("http://localhost:3333/saved", {...row, id:row.id}).then(res=>{
                    console.log(res.data);
                    
                })
                //savedActs.appendChild(box);
                //box.classList.remove("box-data")
                //box.classList.add("saved-data")
            })
             
            addToSaved.classList.add("save");
            addToSaved.textContent = "saev";
            removeBtn.classList.add("rem")
            removeBtn.textContent="remove";
            removeBtn.id = `next${row.id}`;
            let vir = document.createElement("div");
            
            document.addEventListener("click", (e)=>{
                if (e.target.id !== `next${row.id}`) {
                    vir.style.display = "none"
                }
                 else if (e.target.id == `next${row.id}`) {
                    vir.style.display = "block"
                }
            })
            removeBtn.addEventListener("click", ()=>{
                
                console.log("clicked");
                vir.innerHTML=""
                actionsBox.appendChild(vir);
                let vervid = document.createElement("button");
                vervid.textContent = "ok";
                vervid.addEventListener("click", ()=>{
                    div.removeChild(box);
                    axios.delete(`http://localhost:3333/entering/${row.id}`)
                    axios.delete(`http://localhost:3333/saved/${row.id}`)
                })
                vir.appendChild(vervid)
                let unvervid = document.createElement("button");
                unvervid.textContent = "cancel";
                unvervid.addEventListener("click", ()=>{
                    vir.removeChild(vervid);
                    vir.removeChild(unvervid);
                })
                vir.appendChild(unvervid);
            })
            let amount = document.createElement("p");
            let box = document.createElement("div");
            let actionsBox = document.createElement("div");
            console.log(actionsBox.childNodes[1]);
            actionsBox.appendChild(removeBtn);
            actionsBox.appendChild(addToSaved);
            
            box.classList.add("box-data")
            actionsBox.classList.add("actions-box")
            let enterBox = document.createElement("div");
            let info = document.createElement("p");
            let date = document.createElement("p");
            
            amount.textContent = row.amount;
            info.textContent = row.info;
            date.textContent = row.date;
            enterBox.classList.add("data");
            console.log(row)
            enterBox.appendChild(amount);
            enterBox.appendChild(info);
            enterBox.appendChild(date);
            box.appendChild(enterBox);
            box.appendChild(actionsBox);
            div.appendChild(box);
            
        });
    }
)

let db = document.querySelector(".data");




