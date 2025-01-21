function sendGetRequest() {
    const dbName = document.getElementById("dbName").value;
    const path = document.getElementById("path").value;
    const request = new XMLHttpRequest();
    request.open("GET", `/${dbName}/${path}`);
    request.onload = function () {
      if (request.status === 200) {
        console.log(request.responseText);
        document.getElementById("getResponse").innerHTML = JSON.stringify(JSON.parse(request.responseText), null, 4).replaceAll("\n","<br>").replaceAll(" ", "&nbsp;");
      } else {
        console.error("Error:", request.responseText);
      }
    };
    request.send();
  }
  
  function sendPostRequest() {
    const dbNamePost = document.getElementById("dbNamePost").value;
    const pathPost = document.getElementById("pathPost").value;
    const data = JSON.parse(document.getElementById("data").value);
    const request = new XMLHttpRequest();
    request.open("POST", `/${dbNamePost}/${pathPost}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
      if (request.status === 200) {
        console.log(request.responseText);
      } else {
        console.error("Error:", request.responseText);
      }
    };
    request.send(JSON.stringify(data));
  }