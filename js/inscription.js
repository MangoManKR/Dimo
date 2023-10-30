///////////////////////////////////////Color/////////////////////////////////////////
//document.write("./js/filterGenerator.js")
////////////////////////////////////////////////////////////////////////////////

function getUserInfo(inscription_address){
  fetch("https://demoworld.ddns.net/getUserInfo?inscription_address="+inscription_address)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Error: "+response.status)
    }
  })  
  .then((result) => {
    if (result.status === 200){
      localStorage.setItem('user', JSON.parse(JSON.stringify(result.data)));
    } else if (result.status === 201){
      alert("Please check your inscription address.");
    }
    console.log(result)
  });
}

function registerUser(username, inscription_address){
  fetch("https://demoworld.ddns.net/registerUser", {
    method: "POST",
    body: JSON.stringify({
      "username": username,
      "inscription_address": inscription_address
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Error: "+response.status)
    }
  })
  .then((result) => {
    if(result.status === 200){
      console.log(result)
    } else if(result.status === 201){
      alert("User already exists");
      console.log(result)
    } else {
      alert("Error: " + result.status)
      console.log(result) 
    }
   });
}

function getDeMoList(uid){
  fetch("https://demoworld.ddns.net/getDeMoList?uid="+uid)
  .then(((response) => {
    if (response.status === 200) {
      localStorage.setItem('demo', JSON.stringify(response.data.json()));
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  }))
  .then((result) => console.log(result));
}

function getInscription(inscription_id){
  fetch("https://demoworld.ddns.net/getInscription?inscription_id="+inscription_id)
  .then(((response) => {
    if (response.status === 200) {
      localStorage.setItem('inscription', JSON.stringify(response.data.json()));
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  }))
  .then((result) => console.log(result));
}

function depositBalance(uid, deposit_txid){
  fetch("https://demoworld.ddns.net/depositBalance", {
    method: "POST",
    body: JSON.stringify({
      "uid": Number(uid),
      "deposit_txid": deposit_txid
    }),
  })
  .then(((response) => {
    if (response.status === 200) {
      alert(response.msg)
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  }))
  .then((result) => console.log(result));
}

function makeInscription(image, status, uid){
  fetch("https://demoworld.ddns.net/makeInscription", {
    method: "POST",
    body: JSON.stringify({
      "json_data": {
        "image": image,
        "status": status,
      },
      "uid": Number(uid)
    }),
  })
  .then(((response) => {
    if (response.status === 200) {
      alert(response.msg)
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  }))
  .then((result) => console.log(result));
}

function claimInscription(uid, demo_id){
  fetch("https://demoworld.ddns.net/claimInscription?uid="+uid+"&demo_id="+demo_id)
  .then(((response) => {
    if (response.status === 200) {
      alert(response.msg)
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  }))
  .then((result) => console.log(result));
}

function sendInscription(txid, uid, demo_id){
  fetch("https://demoworld.ddns.net/sendInscription", {
    method: "POST",
    body: JSON.stringify({
      "txid": txid,
      "uid": Number(uid),
      "demo_id": demo_id
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 201) {
      alert("There is no DeMo in the transaction.");
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  })
  .then((result) => console.log(result));
}

function login(inscription_address){
  //getUserInfo
  fetch("https://demoworld.ddns.net/getUserInfo?inscription_address="+inscription_address)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Error: "+response.status)
    }
  })  
  .then((result) => {
    if (result.status === 200){
      localStorage.setItem('user', JSON.stringify(result.data));
      //getDeMoInfo
      fetch("https://demoworld.ddns.net/getDeMoList?uid="+result.data.uid)
      .then(((response) => {
        if (response.status === 200) {
          return response.json();
        } else{
          alert("Error: "+response.status)
        }
      }))
      .then((result) => {
        if (result.status === 200){
          localStorage.setItem('demo', JSON.stringify(result.data));
          location.href = "main.html";
        } else if (result.status === 201){
          confirm("You don't have any DeMo yet.");
          localStorage.setItem('demo', null);
          location.href = "main.html";
        }
        console.log(result)
      });
      console.log(result)
    }else if (result.status === 201) {
      alert("Please check your inscription address.");
      console.log(result)
    }
  });

  //
}

function signUp(username, inscription_address){
  // registerUser
  fetch("https://demoworld.ddns.net/registerUser", {
    method: "POST",
    headers : {               //데이터 타입 지정
      "Content-Type":"application/json; charset=utf-8"
  },
    body: JSON.stringify({
      "username": username,
      "inscription_address": inscription_address
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Error: "+response.status)
    }
  })
  .then((result) => {
    if(result.status === 200){
      console.log(result)
      getUserInfo(inscription_address)
      localStorage.setItem('demo', null);
      location.href = "main.html";
    } else if(result.status === 201){
      alert("User already exists");
      console.log(result)
    } else {
      alert("Error: " + result.status)
      console.log(result) 
    }
   });
}

function demo_image()
{
  var demo = localStorage.getItem('demo')
  demo = JSON.parse(demo)
  if (demo === null){
    document.getElementById("demo_img").src = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAaUlEQVQoz2OgD+D/AGVYyEAZCWxQxgFmCM3YwNgAZjADxcAMNqAqMIOFgUEBzOBhYDAAMzgYGARQGRJgxADmcqAyDMAaGcCGsNCBAbcU7gy4CxG+QPgL4VOE3xGhwfCAHRpQ9n8YBh8AADWfDLUVxF0OAAAAAElFTkSuQmCC"; 
    //document.getElementById("demo_img").style.filter = generate_filter("#0000ff")
  } else {
    demo = demo[demo.length - 1]
    demo = JSON.parse(demo.content)
    document.getElementById("demo_img").src = "data:image/png;base64,"+demo.image
    document.getElementById("demo_img").style.filter = generate_filter(demo.status.main_color.replace('0x','#'))
  }
}

function demo_status()
{
  var demo = localStorage.getItem('demo')
  demo = JSON.parse(demo)
  if (demo === null){
    document.getElementById("d_status1").innerText = 'You don\'t have any demo yet.';
    document.getElementById("d_status2").innerText = 'Click below button to order your demo!';
  } else {
    demo = demo[demo.length - 1]
    demo = JSON.parse(demo.content)
    var sex = ""
    var health = ""
    var race = ""
    
    if (demo.status.sex === 0){
      sex = "none"
    }else if(demo.status.sex === 1){
      sex = "male"
    }else if(demo.status.sex === 2){
      sex = "female"
    }

    if (demo.status.health === 0){
      health = "Dead"
    }else if(demo.status.health === 1){
      health = "Ill"
    } else if(demo.status.health === 2){
      health = "Normal"
    } else if(demo.status.health === 3){
      health = "Healthy"
    }

    if (demo.status.race === 0){
      race = "Dragon"
    } else {
      race = "Dragon" // need to change
    }

    document.getElementById("d_status1").innerText = "Name: " + demo.status.name
    document.getElementById("d_status2").innerText = "ID: " + demo.status.demo_id
    document.getElementById("d_status3").innerText = "Sex: " + sex
    document.getElementById("d_status4").innerText = "Height: " + demo.status.height + "m"
    document.getElementById("d_status5").innerText = "Weight: " + demo.status.weight + "kg"
    document.getElementById("d_status6").innerText = "Health: " + health
    document.getElementById("d_status7").innerText = "Race: " + race
  }
  console.log("called")
}

function test(username, inscription_address){
  fetch("https://demoworld.ddns.net/registerUser", {
    method: "POST",
    headers : {               //데이터 타입 지정
      "Content-Type":"application/json; charset=utf-8"
  },
    body: JSON.stringify({
      "username": username,
      "inscription_address": inscription_address
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Error: "+response.status)
    }
  })
  .then((result) => {
    if(result.status === 200){
      console.log(result)
    } else if(result.status === 201){
      alert("User already exists");
      console.log(result)
    } else {
      alert("Error: " + result.status)
      console.log(result) 
    }
   });
}

function logout(){
  localStorage.setItem('user', null);
  localStorage.setItem('demo', null);
  location.href = "index.html";
}

function charge(){
  if(confirm("Are you sure to send 0.001 bitcoin to Demo's wallet? \nIt will be used to make your own DEMO.")){
    // send bitcoin to tb1ps7324f30226wrjx9hr09esc78ec3jrsyk2psf90tk4rq3rqqtw2qsv5427
    // and get txid -> deposit_txid
    fetch("https://demoworld.ddns.net/depositBalance", {
    method: "POST",
    body: JSON.stringify({
      "uid": JSON.parse(localStorage.getItem('user')).uid,
      "deposit_txid": deposit_txid
    }),
  })
  .then(((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Error: "+response.status)
    }
  }))
  .then((result) => console.log(result));
  }
}