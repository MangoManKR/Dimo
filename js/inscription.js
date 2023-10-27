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
      localStorage.setItem('user', JSON.stringify(result.data));
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
        } else if (result.status === 201){
          alert("You don't have any DeMo yet.");
          localStorage.setItem('demo', null);
        }
        console.log(result)
      });
      console.log(result)
      location.href = "main.html";
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
      console.log(result) 
    }
   });
  //location.href = "main.html";
}

function demo_image(obj)
{
  var demo = localStorage.getItem('demo')
  if (demo === 'null'){
    obj.src = "img/none.png";
  }
}

function demo_status()
{
  var demo = localStorage.getItem('demo')
  if (demo === 'null'){
    document.getElementById("d_status").innerText = 'test';
    console.log("test")
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

