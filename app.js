let url = "http://localhost:3001";
let loggedIn = false;

function insertHighscore() {

  let data = {
    name: prompt("Name:"),
    score: prompt("Score:")
  }

  fetch('./highscore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Highscore inserted:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function getHighscore() {
  fetch(url + "/highscore/" + prompt("Name:"))
  .then(response => response.json())
  .then(data => alert(JSON.stringify(data)));
}

function getHighscores() {
  fetch(url + "/highscores")
  .then(response => response.json())
  .then(data => alert(JSON.stringify(data)));
}

function deleteHighscore() {

  let data = {
    name: prompt("Name:")
  }

  fetch('./highscore', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Highscore deleted:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function updateHighscore() {

  let data = {
    name: prompt("Name:"),
    score: prompt("Score:")
  }

  fetch('./highscore', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Highscore updated:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function signUp() {

  let data = {
    username: prompt("Username:"),
    password: prompt("Password:")
  }

  fetch('./user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('User inserted:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// login
function logIn() {

  let body = {
    username: prompt("Username:"),
    password: prompt("Password:")
  }

  fetch('./user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.loginWasSuccessful){
      sessionStorage.setItem("username", body.username);
      sessionStorage.setItem("password", body.password);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  loggedIn = true;

}

// delete user
async function deleteUser() {

  let data = {
    username: sessionStorage.getItem("username"),
    password: sessionStorage.getItem("password")
  }

  fetch('./user', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// sub_comment
function submit() {

  let data = {
    Comment: document.getElementById("textArea").value
  };

  fetch('./comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Comment inserted:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
// delete comment
function deleteComment() {

    let data = {
      Comment: sessionStorage.getItem("Comment")
    };
  

  fetch('./comment', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Comment deleted:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

let div = document.body.appendChild(document.createElement("div"));

function getCommentAlert() {
  fetch(url + "/comments")
  .then(response => response.json())
  .then(data => {
    alert(JSON.stringify(data));
  });
}

function getComment() {
  fetch(url + "/comments")
  .then(response => response.json())
  .then(data => {
    
    div.remove();
    div = document.body.appendChild(document.createElement("div"));
    div.className = "c_div";

    for(let comment of data.comments) {
      //alert(JSON.stringify(comment));
      let p = div.appendChild(document.createElement("p"));
      p.innerHTML = comment._id;
      let text = div.appendChild(document.createElement("textarea"));
      text.innerHTML = comment.Comment;
      let btn1 = div.appendChild(document.createElement("button"));
      let btn2 = div.appendChild(document.createElement("button"));
      btn1.innerHTML = "Rediger";
      btn2.innerHTML = "Slet kommentar";
      btn1.onclick = deleteComment();
    }

  });
}


