var xhr = new XMLHttpRequest()
var nick = "ConterBox"
xhr.open(
  'GET',
  'https://api.github.com/users/' + nick + '/repos',
  true
)
xhr.send()

xhr.onreadystatechange = function () {
  if (xhr.readyState != 4) {
    return
  }

  if (xhr.status === 200) {
    arr = JSON.parse(xhr.responseText)
    for (var i in arr) {
      var nam = arr[i]["name"]
      var link = "https://github-readme-stats.vercel.app/api/pin/?username=" + nick + "&repo=" + nam + "&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515"
      var repo_link = arr[i]["html_url"]
      var img = document.createElement("img");
      img.setAttribute(
        'src',
        link
      );
      var newDiv = document.createElement("a");
      newDiv.setAttribute(
        'href',
        repo_link
      );
      newDiv.appendChild(img)
      my_div = document.getElementById("org_div1");
      var newp = document.createElement("p");
      newp.appendChild(newDiv)
      document.body.append(newp)
    }
  }
}