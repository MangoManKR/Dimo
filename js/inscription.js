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
  if (inscription_address.length !== 64)
  {
    alert("Please check your inscription address.\nWe use leather wallet address.");
  }else{
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
    
    if (demo.status.sex === '0x0'){
      sex = "none"
    }else if(demo.status.sex === '0x1'){
      sex = "male"
    }else if(demo.status.sex === '0x2'){
      sex = "female"
    }

    if (demo.status.health === '0x0'){
      health = "Dead"
    }else if(demo.status.health === '0x1'){
      health = "Ill"
    } else if(demo.status.health === '0x2'){
      health = "Normal"
    } else if(demo.status.health === '0x3'){
      health = "Healthy"
    }

    if (demo.status.race === '0x0'){
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

function firstInscription(){
  //input: demo name, 
  //Originally planned to use txid, but use wallet address instead.
  var cnt = 0
  var temp = ""
  var user = JSON.parse(localStorage.getItem('user'))
  var address = user.address

  cnt = address.charCodeAt(0)%4
  var race = "0x"+cnt.toString(16)
  
  var sex = ""
  cnt = count_number(address, 8, 16)
  if (cnt === 0){
    sex = "0x0"
  } else if (cnt%2 === 0){
    sex = "0x1"
  } else {
    sex = "0x2"
  }

  var weight = 0
  cnt = 1 + sum_string(address, 16, 24)/976
  weight = cnt.toFixed(2)

  var height = 0
  cnt = 1 + sum_string(address, 24, 32)/9760
  height = cnt.toFixed(2)

  var health = "0x3"

  temp = organ_adress(address, 32, 40)
  var str = "0x" + temp[0]
  var dex = "0x" + temp[2]
  var int = "0x" + temp[4]
  var luc = "0x" + temp[6]

  var main_color = "0x" + organ_adress(address, 40, 46)
  var pattern_color = "0x" + organ_adress(address, 48, 54)

  fetch("https://demoworld.ddns.net/makeInscription", {
    method: "POST",
    body: JSON.stringify({
      "json_data": {
        "image": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAaUlEQVQoz2OgD+D/AGVYyEAZCWxQxgFmCM3YwNgAZjADxcAMNqAqMIOFgUEBzOBhYDAAMzgYGARQGRJgxADmcqAyDMAaGcCGsNCBAbcU7gy4CxG+QPgL4VOE3xGhwfCAHRpQ9n8YBh8AADWfDLUVxF0OAAAAAElFTkSuQmCC",
        "status": {
          "name": d_name,
          "demo_id": user.uid + "00",
            "sex": sex,
            "height": height,
            "weight": weight,
            "health": health,
            "race": race,
            "main_color": main_color,
            "pattern_color": pattern_color,
            "pattern": "0xf",
            "str": str,
            "dex": dex,
            "int": int,
            "luc": luc,
            "prev_inscription": null
      },
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


function count_number(string, start, end){
  var cnt = 0
  for (step = start; step < end; step++) {
    if (!isNaN(string[step])){
      cnt += 1
    }
  }
  return cnt
}

function sum_string(string, start, end){
  var sum = 0
  for (step = start; step < end; step++) {
    sum += string.charCodeAt(step)
  }
  return sum
}

function organ_adress(address, start, end)
{
  var str = ""
  address = address.toLowerCase()
  for (step = start; step < end; step++) {
    if(address[step].charCodeAt() > 102 && address[step].charCodeAt() < 113){
      str += String.fromCharCode(address[step].charCodeAt() - 55)
    } else if(address[step].charCodeAt() > 96 && address[step].charCodeAt() < 103){
      str += address[step]
    } else if(address[step].charCodeAt() > 47 && address[step].charCodeAt() < 58){
      str += address[step]
    } else if (address[step].charCodeAt() > 112 && address[step].charCodeAt() < 119){
      str += String.fromCharCode(address[step].charCodeAt() - 15)
    } else if (address[step].charCodeAt() > 118 && address[step].charCodeAt() < 123){
      str += String.fromCharCode(address[step].charCodeAt() - 20)
    } 
  }
  return str
}

tb1p4x9zm4zyafjs9dg3vznc4euwlftzda8gyg4juwchsl3xl7y7jf3srt7yaf

