var xhr = new XMLHttpRequest()
var nick = "ConterBox"
xhr.open(
  'GET',
  'https://api.github.com/users/'+nick+'/repos',
  true
)
xhr.send()

xhr.onreadystatechange = function() {
  if (xhr.readyState != 4) {
    return
  }

  if (xhr.status === 200) {
    arr = JSON.parse(xhr.responseText)
    for (var i in arr) {
        var nam = arr[i]["name"]
        var link = "https://github-readme-stats.vercel.app/api/pin/?username="+nick+"&repo="+nam+"&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515"
        var newDiv = document.createElement("img");
        newDiv.setAttribute(
          'src',
          link,
        );
        my_div = document.getElementById("org_div1");
        document.body.insertBefore(newDiv, my_div);
    }
  }
}