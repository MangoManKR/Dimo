function getUserInfo(inscription_address){
  fetch("//34.64.200.128:3000/getUserInfo?inscription_address="+inscription_address)
  .then((response) => {
    if (response.status === 200) {
      //localStorage.setItem('user', JSON.stringify(response.data.json()));
      return response.json();
    } else if (response.status === 201) {
      alert("Please check your inscription address.");
      return response.json();
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  })
  .then((result) => {
    console.log(result)
  });
}

function registerUser(username, inscription_address){
  fetch("http://34.64.200.128:3000/registerUser", {
    method: "POST",
    body: JSON.stringify({
      "username": username,
    "inscription_address": inscription_address
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      getUserInfo(inscription_address)
    } else if (response.status === 201) {
      alert("User already exists");
    } else {
      alert("Error: "+response.status)
      return response.json();
    }
  })
  .then((result) => console.log(result));
}

function getDeMoList(uid){
  fetch("http://34.64.200.128:3000/getDeMoList?uid="+uid)
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
  fetch("http://34.64.200.128:3000/getInscription?inscription_id="+inscription_id)
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
  fetch("http://34.64.200.128:3000/depositBalance", {
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
  fetch("http://34.64.200.128:3000/makeInscription", {
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
  fetch("http://34.64.200.128:3000/claimInscription?uid="+uid+"&demo_id="+demo_id)
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
  fetch("http://34.64.200.128:3000/sendInscription", {
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
  getUserInfo(inscription_address)
}


function test(){
  fetch('https://www.fruityvice.com/api/fruit/all')
 	.then(res => {
    return res.json()})
  .then(data => {})
}