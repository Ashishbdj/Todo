let content = document.querySelector('#taskinput');
let addbtn = document.querySelector('#taskbtn');
let c = document.querySelector('.todoContainer')
let api = 'https://68a05cfc6e38a02c58187d62.mockapi.io/api/v1/Todos';
addbtn.addEventListener('click',()=>{
    postdata();    
})

async function fetchdata()
{
    let response = await fetch(api);
    let data= await  response.json();  
    console.log(c);
    if(data)
    {
        c.innerHTML='';
        data.forEach(obj=>{
        let mydiv = document.createElement('div')
        mydiv.className='todo'
        mydiv.innerHTML=`
        <p id="text">${obj.work}</p>
         <input id="editinput"type="text" value='${obj.work}'">
        <div class="menu">
        
            <button class="editbtn">Edit</button>
            <button class="savebtn">save</button>
            <button class="deletebtn">Delete</button>
        </div>
        ` 
        let delbtn=mydiv.querySelector('.deletebtn')
        delbtn.addEventListener('click',function(){
            deletedata(obj.id);
        })


        
        let editbtn=mydiv.querySelector('.editbtn')
        let sbtn=mydiv.querySelector('.savebtn')
        let edtxt = mydiv.querySelector('#editinput')
        let txt = mydiv.querySelector('#text')

        editbtn.addEventListener('click',()=>{
            editbtn.style.display = 'none'
            sbtn.style.display = 'inline'
            edtxt.style.display = 'inline'
            txt.style.display = 'none'

            
        })

        sbtn.addEventListener('click',async ()=>{
            editbtn.style.display = 'inline'
            sbtn.style.display = 'none'
            await updatedata(obj.id,edtxt.value)
            if(response.status==200)
            {
                fetchdata();
                edtxt.style.display = 'none'
                txt.style.display = 'inline'
            }
            
            
            
        })
        
        c.append(mydiv);
        })
    }
}
async function updatedata(id,data) {
    let d= {
        work: data.trim()

    }
    console.log(data);
    
     let response = await fetch(`${api}/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(d)
      });
    return response;
    
}
async function postdata()
{
    let objdata={
        work: content.value.trim()
    }
    let response = await fetch(api,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(objdata)
      });
    console.log(response);  
    if(response.status==201)
    {
        fetchdata();
    }
    
}
async function deletedata(id)
{
    let response =await fetch(`${api}/${id}`,{
        method: 'DELETE'
    })

    if(response.status==200)
    {
        fetchdata();
    }
}
fetchdata();

