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
      return response.json();
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  }))
  .then((result) => {
    localStorage.setItem('demo', JSON.stringify(result.data));
    console.log(result)});
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
          localStorage.setItem('cnt', result.data.length-1); 
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
  if (inscription_address.length < 30)
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

function demo_image(num)
{
  var demo = localStorage.getItem('demo')
  demo = JSON.parse(demo)
  var cnt = JSON.parse(localStorage.getItem('cnt'))
  if (demo === null){
    document.getElementById("demo_img").src = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAaUlEQVQoz2OgD+D/AGVYyEAZCWxQxgFmCM3YwNgAZjADxcAMNqAqMIOFgUEBzOBhYDAAMzgYGARQGRJgxADmcqAyDMAaGcCGsNCBAbcU7gy4CxG+QPgL4VOE3xGhwfCAHRpQ9n8YBh8AADWfDLUVxF0OAAAAAElFTkSuQmCC"; 
    //document.getElementById("demo_img").style.filter = generate_filter("#0000ff")
  } else {
    demo = demo[num]
    demo = JSON.parse(demo.content)
    document.getElementById("demo_img").src = "data:image/png;base64,"+demo.image
    document.getElementById("demo_img").style.filter = generate_filter(demo.status.main_color.replace('0x','#'))
  }
}

function demo_status(num)
{
  var demo = localStorage.getItem('demo')
  demo = JSON.parse(demo)
  var cnt = JSON.parse(localStorage.getItem('cnt'))
  if (demo === null){
    document.getElementById("d_status1").innerText = 'You don\'t have any demo yet.';
    document.getElementById("d_status2").innerText = 'Click below button to order your demo!';
  } else if (demo.length === 0){
    document.getElementById("d_status1").innerText = 'You don\'t have any demo.';
    document.getElementById("d_status2").innerText = 'Click below button to order your demo!';
    document.getElementById("d_status3").innerText = "Or send your inscription to tb1ps7324f30226wrjx9hr09esc78ec3jrsyk2psf90tk4rq3rqqtw2qsv5427.";
  } else {
    demo = demo[num]
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
    document.getElementById("d_status8").innerText = "Strength: " + parseInt(demo.status.str,16)
    document.getElementById("d_status9").innerText = "Dexterity: " + parseInt(demo.status.dex,16)
    document.getElementById("d_status10").innerText = "Intelligence: " + parseInt(demo.status.int,16)
    document.getElementById("d_status11").innerText = "Luck: " + parseInt(demo.status.luc,16)
  }
  console.log("called")
}

function user_info(){
  var user = JSON.parse(localStorage.getItem('user'))
  var inscription_address = user.inscription_address
  var username = user.username
  var uid = user.uid
  var balance = user.balance
  document.getElementById("u_status1").innerText = "User ID: " + uid
  document.getElementById("u_status2").innerText = "User Name: " + username
  document.getElementById("u_status3").innerText = "Inscription Address: " + inscription_address
  document.getElementById("u_status4").innerText = "Balance: " + balance  + " BTC"
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
  localStorage.setItem('cnt', 0);
  localStorage.removeItem('current_status');
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
  .then((result) => {
    alert(result.msg)
    console.log(result)});
  }
}

function firstInscription(){
  //input: demo name, 
  //Originally planned to use txid, but use wallet address instead.
  var cnt = 0
  var temp = ""
  var d_name = prompt("Please enter your DeMo's name", "DeMo")
  var user = JSON.parse(localStorage.getItem('user'))
  var address = user.inscription_address

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
    headers : {               //데이터 타입 지정
      "Content-Type":"application/json; charset=utf-8"
  },
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
      "uid": user.uid
    }),
  })
  .then(((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  }))
  .then((result) => {
    alert(result.msg)
    getDeMoList(user.uid)
    demo_image(0)
    demo_status(0)
    console.log(result)});
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

function charge_btc()
{
  if (confirm("Open leather website.\nPlease send btc to tb1ps7324f30226wrjx9hr09esc78ec3jrsyk2psf90tk4rq3rqqtw2qsv5427\n (It will be copied at your clipboard.) \nAnd type txid.")){
    clipboard("tb1ps7324f30226wrjx9hr09esc78ec3jrsyk2psf90tk4rq3rqqtw2qsv5427")
    window.open("https://leather.io/","_blank", "width=500, height=500")}
  var deposit_txid = prompt("Please enter your deposit txid", "txid")
  var user = JSON.parse(localStorage.getItem('user'))
  fetch("https://demoworld.ddns.net/depositBalance", {
    method: "POST",
    headers : {               //데이터 타입 지정
      "Content-Type":"application/json; charset=utf-8"
  },
    body: JSON.stringify({
      "uid": user.uid,
      "deposit_txid": deposit_txid
    }),
  })
  .then(((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  }))
  .then((result) => {
    console.log(result)});
}

function history_prev(){
  var cnt = Number(localStorage.getItem("cnt"))
  if (cnt === 0)
  {
    alert("This is the first DeMo.")
  } else {
    demo_image(cnt-1)
    demo_status(cnt-1)
    localStorage.setItem("cnt", cnt-1)
  }
}

function history_next(){
  var cnt = Number(localStorage.getItem("cnt"))
  var demo = localStorage.getItem('demo')
  demo = JSON.parse(demo)
  if (cnt === demo.length-1)
  {
    alert("This is the last DeMo.")
  } else {
    demo_image(cnt+1)
    demo_status(cnt+1)
    localStorage.setItem("cnt", cnt+1)
  }
}

function sendToWallet()
{
  var user = JSON.parse(localStorage.getItem('user'))
  var demo = JSON.parse(localStorage.getItem('demo'))
  demo = demo[demo.length-1]

  fetch("https://demoworld.ddns.net/claimInscription?uid="+user.uid+"&demo_id="+demo.demo_id)
  .then(((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  }))
  .then((result) => {
    alert(result.msg + "\nPlease wait for a while." + "\ntxid: " + result.data.txid)
    console.log(result)});
}

function evolve(){
  var egg = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAaUlEQVQoz2OgD+D/AGVYyEAZCWxQxgFmCM3YwNgAZjADxcAMNqAqMIOFgUEBzOBhYDAAMzgYGARQGRJgxADmcqAyDMAaGcCGsNCBAbcU7gy4CxG+QPgL4VOE3xGhwfCAHRpQ9n8YBh8AADWfDLUVxF0OAAAAAElFTkSuQmCC"
  var broken_egg = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAlUlEQVQoz2OgHPB/gDIsZKCMBDYo4wAzhGZsYGwAM5iBYmAGG1AVmMHCwKAAZvAwMBiAGRwMDAKoDAkwYgBzOVAZBmCNDGBDWCAihw9DRCSfpc+AOFDH5APEUgmJBAb6AIQzLJ+lzwEz9HVMvoAZahISKXA3k8SAexkeCPDwQYQhIlQR4YwIeURcMDxgh7rV/g/Z3gQAMT0X1xTBxjYAAAAASUVORK5CYII="
  var dragon_1 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAACVBMVEX///8AAAAGBgbF5ddcAAAAvElEQVQ4y8WSsQrDMAxE5WLtalH+R4VmVyD6nw798OJmyAmBt7YiNvhFXOLT0X8rIp/Zmieg48FyIsZzs7FQ4uhKEllExtazZla1j/IENDt3gncTwPAtgj8Q6HB2ho5231WXu4Ff6qzo2bJFrDv64cPFGaDb8/JKpm/WVkfgxzpLuvQ0t9ERM0BX6Q+aA2cA9fp8XB8ci+4sISfQZs1UiqdfAnWUddg1HzVjNYU1pzXJNeu0Ey2ExRFOP6w3kRcaoCbxO7EAAAAASUVORK5CYII="
  var dragon_2 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAADFBMVEX///8AAADg4OC6urrtNPhOAAAAyUlEQVQ4y+3QMQ7CMAwF0P9RvAfJuY8Z2I1U35wDESAJCUggsbDw2w59im3F+GEIW/+POK0S9VlSsL0H1hJbIZ6gfi/gCyQifwR/27Q8Qx6gd9hn0G6lOk7QeIhA6aDiUpB4aBCumgRKtimGLJqQO1x70hW5l5QIhTts7ElBK8ZaiTHXuAnoA+orgcgzgGETFAC7vgRuwG2g4B45g5wui5SAwLRpqSXVQEOXBvNSc2vRYvDKjpFNLCLwiESYThV9+JqXE+7455tcAPhVGYUu2ueBAAAAAElFTkSuQmCC"
  var dragon_3 ="iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAA7UlEQVQoz9XNL2/CQByH8W97Te+W3NrL1G1ZaF/ChZn9SVjlkvECJiaa7AWscyxB1M0tSAThNfASTqFQaMTxDqpIBYLm1yoS8Dzq4x6cL/OPwBy3BGOkJCRVXIPSGm1J3cHIDmlwAhJ5CNOgh7cbjBq8lMO+t2nw44Z9/t/AjTN/wAHPJo7XrAQreRE5z4KDrd8tHCJwrR0KSDxL8wkDzZdx9eU0kn0gVPpaA5BGGrqKIlKExyq+J3wvrneEcRUPCL+TqzmBKWEJgRLpCYRa5wRfqIzgrR7KFmHe4W/bArMntE1vO3zcHWPUwyV0AHJnMXiYX/iTAAAAAElFTkSuQmCC"
  var dragon_4 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAABjElEQVQoz2XLMWgUQRSA4X92JnsrjjcXA7KSwC2HheWcglwheEWKVNZiNUEIFoIKFhaBjIrxCoVgGu2CWFhaWs4REK20tlpRLCSlxaHHrTOXpMpr3sfj/Zyc1jHk5AjZ3SOZVTObY2E2NT5B7YbCJTzdpbCU8OIscQ3gcy/hNrgMCtagUgkjsMo0A/EcSrUiaqlgpGKRR3zUF0Gvwq0ipuUvGExi2n8D7eIT/OiBfP0KsX0ZuN9B6kVg6ZrXZcKlqn7oznvYcN1HofDIn8PWM7Rn8yAwRXnGHzwWFZB9jyYfkvchJxui1kH4iCKCWjiKcQesqDj13YEWe5yuQvreo209SHbQi4+BsAPLCnA3oK0Buwb5MrByh/jkwVyAIvVn3kJZW8j/QOd9CdkDWCrbIK/AOS1HiJexlHyFb4DwFn4DuA7cTBhU1SG6leN6wnod2EjYdzU9qMT2vqWCd2bhyUFE9td8ybsRcsamMvUcZnIPl0ArMJzjKoSIdBAeMWUKxsNka9w0/4CtpoGc/3mSZrFaHOmNAAAAAElFTkSuQmCC"

  var demo = JSON.parse(localStorage.getItem('demo'))
  var demo_current = demo[demo.length-1].content
  var current_status = JSON.parse(localStorage.getItem("current_status"))
    if (current_status === null){
      localStorage.setItem("current_status", demo_current.content)
      current_status = JSON.parse(demo_current.content)
    }
  
    if (current_status.image === egg){ current_status.image = broken_egg}
    else if (current_status.image === broken_egg){ current_status.image = dragon_1}
    else if (current_status.image === dragon_1){ current_status.image = dragon_2}
    else if (current_status.image === dragon_2){ current_status.image = dragon_3}
    else if (current_status.image === dragon_3){ current_status.image = dragon_4}
    
    current_status.status.str = "0x" + (parseInt(current_status.str,16) * 2).toString(16)
    current_status.status.dex = "0x" + (parseInt(current_status.dex,16) * 2).toString(16)
    current_status.status.int = "0x" + (parseInt(current_status.int,16) * 2).toString(16)
    current_status.status.luc = "0x" + (parseInt(current_status.luc,16) * 2).toString(16)

    current_status.status.weight = current_status.status.weight * 1.5
    current_status.status.height = current_status.status.height * 1.5

    localStorage.setItem("current_status", JSON.stringify(current_status))
}

function interaction_demo()
{ 
  var cnt = Number(localStorage.getItem("cnt"))
  var user = JSON.parse(localStorage.getItem('user'))
  var demo = JSON.parse(localStorage.getItem('demo'))
  var demo_current = demo[demo.length-1]
  if (cnt !== demo.length-1)
  {
    alert("You can interact with only the latest DeMo.")
  } else {
    var current_status = JSON.parse(localStorage.getItem("current_status"))
    if (current_status === null){
      localStorage.setItem("current_status", demo_current.content)
      current_status = JSON.parse(demo_current.content)
    }
    
    //display
    document.getElementById("interact").style.display = "block"
    document.getElementById("prev-next").style.display = "none"

    document.getElementById("tab-section-1").setAttribute('hidden', true)
    document.getElementById("tab-section-2").setAttribute('hidden', true)
    document.getElementById("tab-section-3").setAttribute('hidden', true)
    document.getElementById("tab-section-4").removeAttribute('hidden')



    var egg = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAaUlEQVQoz2OgD+D/AGVYyEAZCWxQxgFmCM3YwNgAZjADxcAMNqAqMIOFgUEBzOBhYDAAMzgYGARQGRJgxADmcqAyDMAaGcCGsNCBAbcU7gy4CxG+QPgL4VOE3xGhwfCAHRpQ9n8YBh8AADWfDLUVxF0OAAAAAElFTkSuQmCC"
    var broken_egg = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAlUlEQVQoz2OgHPB/gDIsZKCMBDYo4wAzhGZsYGwAM5iBYmAGG1AVmMHCwKAAZvAwMBiAGRwMDAKoDAkwYgBzOVAZBmCNDGBDWCAihw9DRCSfpc+AOFDH5APEUgmJBAb6AIQzLJ+lzwEz9HVMvoAZahISKXA3k8SAexkeCPDwQYQhIlQR4YwIeURcMDxgh7rV/g/Z3gQAMT0X1xTBxjYAAAAASUVORK5CYII="
    var dragon_1 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAACVBMVEX///8AAAAGBgbF5ddcAAAAvElEQVQ4y8WSsQrDMAxE5WLtalH+R4VmVyD6nw798OJmyAmBt7YiNvhFXOLT0X8rIp/Zmieg48FyIsZzs7FQ4uhKEllExtazZla1j/IENDt3gncTwPAtgj8Q6HB2ho5231WXu4Ff6qzo2bJFrDv64cPFGaDb8/JKpm/WVkfgxzpLuvQ0t9ERM0BX6Q+aA2cA9fp8XB8ci+4sISfQZs1UiqdfAnWUddg1HzVjNYU1pzXJNeu0Ey2ExRFOP6w3kRcaoCbxO7EAAAAASUVORK5CYII="
    var dragon_2 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAADFBMVEX///8AAADg4OC6urrtNPhOAAAAyUlEQVQ4y+3QMQ7CMAwF0P9RvAfJuY8Z2I1U35wDESAJCUggsbDw2w59im3F+GEIW/+POK0S9VlSsL0H1hJbIZ6gfi/gCyQifwR/27Q8Qx6gd9hn0G6lOk7QeIhA6aDiUpB4aBCumgRKtimGLJqQO1x70hW5l5QIhTts7ElBK8ZaiTHXuAnoA+orgcgzgGETFAC7vgRuwG2g4B45g5wui5SAwLRpqSXVQEOXBvNSc2vRYvDKjpFNLCLwiESYThV9+JqXE+7455tcAPhVGYUu2ueBAAAAAElFTkSuQmCC"
    var dragon_3 ="iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAA7UlEQVQoz9XNL2/CQByH8W97Te+W3NrL1G1ZaF/ChZn9SVjlkvECJiaa7AWscyxB1M0tSAThNfASTqFQaMTxDqpIBYLm1yoS8Dzq4x6cL/OPwBy3BGOkJCRVXIPSGm1J3cHIDmlwAhJ5CNOgh7cbjBq8lMO+t2nw44Z9/t/AjTN/wAHPJo7XrAQreRE5z4KDrd8tHCJwrR0KSDxL8wkDzZdx9eU0kn0gVPpaA5BGGrqKIlKExyq+J3wvrneEcRUPCL+TqzmBKWEJgRLpCYRa5wRfqIzgrR7KFmHe4W/bArMntE1vO3zcHWPUwyV0AHJnMXiYX/iTAAAAAElFTkSuQmCC"
    var dragon_4 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAABjElEQVQoz2XLMWgUQRSA4X92JnsrjjcXA7KSwC2HheWcglwheEWKVNZiNUEIFoIKFhaBjIrxCoVgGu2CWFhaWs4REK20tlpRLCSlxaHHrTOXpMpr3sfj/Zyc1jHk5AjZ3SOZVTObY2E2NT5B7YbCJTzdpbCU8OIscQ3gcy/hNrgMCtagUgkjsMo0A/EcSrUiaqlgpGKRR3zUF0Gvwq0ipuUvGExi2n8D7eIT/OiBfP0KsX0ZuN9B6kVg6ZrXZcKlqn7oznvYcN1HofDIn8PWM7Rn8yAwRXnGHzwWFZB9jyYfkvchJxui1kH4iCKCWjiKcQesqDj13YEWe5yuQvreo209SHbQi4+BsAPLCnA3oK0Buwb5MrByh/jkwVyAIvVn3kJZW8j/QOd9CdkDWCrbIK/AOS1HiJexlHyFb4DwFn4DuA7cTBhU1SG6leN6wnod2EjYdzU9qMT2vqWCd2bhyUFE9td8ybsRcsamMvUcZnIPl0ArMJzjKoSIdBAeMWUKxsNka9w0/4CtpoGc/3mSZrFaHOmNAAAAAElFTkSuQmCC"
    var current_img = current_status.image

    if (current_img === egg){
      document.getElementById("i_text1").innerHTML = "It's an egg."
      document.getElementById("i_text2").innerHTML = "You have to set appropriate temperature."
      document.getElementById("i_text3").innerHTML = "Please enter the Celsius temperature."
      document.getElementById("i_text4").innerHTML = ""
    } else if (current_img === broken_egg){
      document.getElementById("i_text1").innerHTML = "Egg is broken!"
      document.getElementById("i_text2").innerHTML = "Press Yes to hatch the egg."
      document.getElementById("i_text3").innerHTML = ""
      document.getElementById("i_text4").innerHTML = ""
    }
    else if (current_img === dragon_1){
      document.getElementById("i_text1").innerHTML = "Your DeMo is a cute dragon!"
      document.getElementById("i_text2").innerHTML = "Determine what your baby dragon might eat and create a feeding schedule."
      document.getElementById("i_text3").innerHTML = "Please enter today's menu."
      document.getElementById("i_text4").innerHTML = ""
    }
    else if (current_img === dragon_2){
      document.getElementById("i_text1").innerHTML = "Your DeMo can fly now!"
      document.getElementById("i_text2").innerHTML = "Implement educational activities to stimulate the dragon's growth and development."
      document.getElementById("i_text3").innerHTML = "These could include puzzles, games, or lessons tailored to the dragon's abilities and needs."
      document.getElementById("i_text4").innerHTML = "Please enter today's activity."
    }
    else if (current_img === dragon_3){
      document.getElementById("i_text1").innerHTML = "Your DeMo is now adolescent"
      document.getElementById("i_text2").innerHTML = "Your DeMo wants to compete with you"
      document.getElementById("i_text3").innerHTML = "You decided to play rock-paper-scissors!"
      document.getElementById("i_text4").innerHTML = "Please enter your choice."
    }
    else if (current_img === dragon_4){
      document.getElementById("i_text1").innerHTML = "Your DeMo is now an elder dragon"
      document.getElementById("i_text2").innerHTML = "Your DeMo wants to travel with you"
      document.getElementById("i_text3").innerHTML = "Please enter your favorite place."
      document.getElementById("i_text4").innerHTML = "Please enter your choice."
    }

  }
}

function interaction_user()
{
  var cnt = Number(localStorage.getItem("cnt"))
  var user = JSON.parse(localStorage.getItem('user'))
  var demo = JSON.parse(localStorage.getItem('demo'))
  var demo_current = demo[demo.length-1]
  if (cnt !== demo.length-1)
  {
    alert("You can interact with only the latest DeMo.")
  } else {
    var current_status = JSON.parse(localStorage.getItem("current_status"))
    if (current_status === null){
      localStorage.setItem("current_status", demo_current.content)
      current_status = JSON.parse(demo_current.content)
    }

    var egg = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAaUlEQVQoz2OgD+D/AGVYyEAZCWxQxgFmCM3YwNgAZjADxcAMNqAqMIOFgUEBzOBhYDAAMzgYGARQGRJgxADmcqAyDMAaGcCGsNCBAbcU7gy4CxG+QPgL4VOE3xGhwfCAHRpQ9n8YBh8AADWfDLUVxF0OAAAAAElFTkSuQmCC"
    var broken_egg = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAlUlEQVQoz2OgHPB/gDIsZKCMBDYo4wAzhGZsYGwAM5iBYmAGG1AVmMHCwKAAZvAwMBiAGRwMDAKoDAkwYgBzOVAZBmCNDGBDWCAihw9DRCSfpc+AOFDH5APEUgmJBAb6AIQzLJ+lzwEz9HVMvoAZahISKXA3k8SAexkeCPDwQYQhIlQR4YwIeURcMDxgh7rV/g/Z3gQAMT0X1xTBxjYAAAAASUVORK5CYII="
    var dragon_1 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAACVBMVEX///8AAAAGBgbF5ddcAAAAvElEQVQ4y8WSsQrDMAxE5WLtalH+R4VmVyD6nw798OJmyAmBt7YiNvhFXOLT0X8rIp/Zmieg48FyIsZzs7FQ4uhKEllExtazZla1j/IENDt3gncTwPAtgj8Q6HB2ho5231WXu4Ff6qzo2bJFrDv64cPFGaDb8/JKpm/WVkfgxzpLuvQ0t9ERM0BX6Q+aA2cA9fp8XB8ci+4sISfQZs1UiqdfAnWUddg1HzVjNYU1pzXJNeu0Ey2ExRFOP6w3kRcaoCbxO7EAAAAASUVORK5CYII="
    var dragon_2 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAADFBMVEX///8AAADg4OC6urrtNPhOAAAAyUlEQVQ4y+3QMQ7CMAwF0P9RvAfJuY8Z2I1U35wDESAJCUggsbDw2w59im3F+GEIW/+POK0S9VlSsL0H1hJbIZ6gfi/gCyQifwR/27Q8Qx6gd9hn0G6lOk7QeIhA6aDiUpB4aBCumgRKtimGLJqQO1x70hW5l5QIhTts7ElBK8ZaiTHXuAnoA+orgcgzgGETFAC7vgRuwG2g4B45g5wui5SAwLRpqSXVQEOXBvNSc2vRYvDKjpFNLCLwiESYThV9+JqXE+7455tcAPhVGYUu2ueBAAAAAElFTkSuQmCC"
    var dragon_3 ="iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAA7UlEQVQoz9XNL2/CQByH8W97Te+W3NrL1G1ZaF/ChZn9SVjlkvECJiaa7AWscyxB1M0tSAThNfASTqFQaMTxDqpIBYLm1yoS8Dzq4x6cL/OPwBy3BGOkJCRVXIPSGm1J3cHIDmlwAhJ5CNOgh7cbjBq8lMO+t2nw44Z9/t/AjTN/wAHPJo7XrAQreRE5z4KDrd8tHCJwrR0KSDxL8wkDzZdx9eU0kn0gVPpaA5BGGrqKIlKExyq+J3wvrneEcRUPCL+TqzmBKWEJgRLpCYRa5wRfqIzgrR7KFmHe4W/bArMntE1vO3zcHWPUwyV0AHJnMXiYX/iTAAAAAElFTkSuQmCC"
    var dragon_4 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAABjElEQVQoz2XLMWgUQRSA4X92JnsrjjcXA7KSwC2HheWcglwheEWKVNZiNUEIFoIKFhaBjIrxCoVgGu2CWFhaWs4REK20tlpRLCSlxaHHrTOXpMpr3sfj/Zyc1jHk5AjZ3SOZVTObY2E2NT5B7YbCJTzdpbCU8OIscQ3gcy/hNrgMCtagUgkjsMo0A/EcSrUiaqlgpGKRR3zUF0Gvwq0ipuUvGExi2n8D7eIT/OiBfP0KsX0ZuN9B6kVg6ZrXZcKlqn7oznvYcN1HofDIn8PWM7Rn8yAwRXnGHzwWFZB9jyYfkvchJxui1kH4iCKCWjiKcQesqDj13YEWe5yuQvreo209SHbQi4+BsAPLCnA3oK0Buwb5MrByh/jkwVyAIvVn3kJZW8j/QOd9CdkDWCrbIK/AOS1HiJexlHyFb4DwFn4DuA7cTBhU1SG6leN6wnod2EjYdzU9qMT2vqWCd2bhyUFE9td8ybsRcsamMvUcZnIPl0ArMJzjKoSIdBAeMWUKxsNka9w0/4CtpoGc/3mSZrFaHOmNAAAAAElFTkSuQmCC"
    var current_img = current_status.image

    var user_input = document.getElementById('interaction_input').value

    if (current_img === egg){
      if (user_input > 30 && user_input <40){
        alert("You set the temperature well.")
        evolve()
        save()
      } else {
        alert("You didn't set the temperature well.")
      }
    } else if (current_img === broken_egg){
      alert("DeMo is hatching from the egg!")
      evolve()
      save()
    } else if (current_img === dragon_1){
      alert("You fed " + user_input + " to DeMo.")
      evolve()
      save()
    } else if (current_img === dragon_2){
      alert("Your DeMo is intrigued by " + user_input + "!")
    }
  }

  document.getElementById("tab-section-1").removeAttribute('hidden')
  document.getElementById("tab-section-2").setAttribute('hidden', true)
  document.getElementById("tab-section-3").setAttribute('hidden', true)
  document.getElementById("tab-section-4").setAttribute('hidden', true)

}

function save()
{
  var cnt = Number(localStorage.getItem("cnt"))
  var user = JSON.parse(localStorage.getItem('user'))
  var demo = JSON.parse(localStorage.getItem('demo'))
  var demo_current = demo[demo.length-1]
  var current_status = JSON.parse(localStorage.getItem("current_status"))
    if (current_status === null){
      localStorage.setItem("current_status", demo_current.content)
      current_status = JSON.parse(demo_current.content)
    }
    current_status = current_status.status

  if (current_status === demo.content){
    alert("You didn't change anything.")
  } else {
    fetch("https://demoworld.ddns.net/makeInscription", {
    method: "POST",
    headers : {               //데이터 타입 지정
      "Content-Type":"application/json; charset=utf-8"
  },
    body: JSON.stringify({
      "json_data": {
        "image": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAaUlEQVQoz2OgD+D/AGVYyEAZCWxQxgFmCM3YwNgAZjADxcAMNqAqMIOFgUEBzOBhYDAAMzgYGARQGRJgxADmcqAyDMAaGcCGsNCBAbcU7gy4CxG+QPgL4VOE3xGhwfCAHRpQ9n8YBh8AADWfDLUVxF0OAAAAAElFTkSuQmCC",
        "status": {
          "name": current_status.name,
          "demo_id": Number(current_status.demo_id) + 1,
            "sex": current_status.sex,
            "height": current_status.height,
            "weight": current_status.weight,
            "health": current_status.health,
            "race": current_status.race,
            "main_color": current_status.main_color,
            "pattern_color": current_status.pattern_color,
            "pattern": "0xf",
            "str": current_status.str,
            "dex": current_status.dex,
            "int": current_status.int,
            "luc": current_status.luc,
            "prev_inscription": demo_current.demo_id
      },
      },
      "uid": user.uid
    }),
  })
  .then(((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  }))
  .then((result) => {
    getDeMoList(user.uid)
    localStorage.setItem("cnt", cnt+1)
    demo_image(cnt)
    demo_status(cnt)
    console.log(result)});
  }
}

function isEmptyArr(arr)  {
  if(Array.isArray(arr) && arr.length === 0)  {
    return true;
  }
  
  return false;
}

function clipboard(text){
  const copy = (text) => {
    // 임시의 textarea 생성
    const $textarea = document.createElement("textarea");
  
    // body 요소에 존재해야 복사가 진행됨
    document.body.appendChild($textarea);
    
    // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
    $textarea.value = text;
    $textarea.select();
    
    // 복사 후 textarea 지우기
    document.execCommand('copy');
    document.body.removeChild($textarea);
  };
  copy(text)
}

function history(){
	// 토글 할 버튼 선택 (btn1)

	const btn1 = document.getElementById('prev_btn');
  const btn2 = document.getElementById('next_btn')

	// btn1 숨기기 (visibility: hidden)

	if(btn1.style.visibility !== 'hidden') {
	  btn1.style.visibility = 'hidden';
	}
	  // btn` 보이기 (visibility: visible)
	else {
	  btn1.style.visibility = 'visible';
	}

  if(btn2.style.visibility !== 'hidden') {
    btn2.style.visibility = 'hidden';
  }else{
    btn2.style.visibility = 'visible';
  } 

  //display
  document.getElementById("interact").style.display = "none"
  document.getElementById("prev-next").style.display = "block"
}