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
      console.log(result) 
    }
   });
  //location.href = "main.html";
}

function demo_image()
{
  var demo = localStorage.getItem('demo')
  demo = JSON.parse(demo)
  if (demo === 'null'){
    document.getElementById("demo_img").src = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAaUlEQVQoz2OgD+D/AGVYyEAZCWxQxgFmCM3YwNgAZjADxcAMNqAqMIOFgUEBzOBhYDAAMzgYGARQGRJgxADmcqAyDMAaGcCGsNCBAbcU7gy4CxG+QPgL4VOE3xGhwfCAHRpQ9n8YBh8AADWfDLUVxF0OAAAAAElFTkSuQmCC"; 
    document.getElementById("demo_img").style.filter = generate_filter("#0000ff")
  } else {
    demo = demo[demo.length - 1]
    document.getElementById("demo_img").src = "data:image/png;base64,"+demo.content.image
    document.getElementById("demo_img").filter = generate_filter(demo.content.status.main_color.replace('0x','#'))
  }
}

function demo_status()
{
  var demo = localStorage.getItem('demo')
  demo = JSON.parse(demo)
  if (demo === 'null'){
    document.getElementById("d_status1").innerText = 'You don\'t have any demo yet.';
    document.getElementById("d_status2").innerText = 'Click below button to order your demo!';
  } else {
    demo = demo[demo.length - 1]
    document.getElementById("d_satus1").innerText = "Name:" + demo.content.status.name
    document.getElementById("d_satus2").innerText = "ID" + demo.content.status.demo_id
    document.getElementById("d_satus3").innerText = "Sex" + demo.content.status.sex
    document.getElementById("d_satus4").innerText = "Height" + demo.content.status.height
    document.getElementById("d_satus5").innerText = "Weight" + demo.content.status.weight
    document.getElementById("d_satus6").innerText = "Health" + demo.content.status.health
    document.getElementById("d_satus7").innerText = "Race" + demo.content.status.race
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

