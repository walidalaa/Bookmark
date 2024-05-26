var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteUrl");
var submit = document.getElementById("submitBtn");

var List = [];
if (localStorage.getItem("bookmarks")) {
  List = JSON.parse(localStorage.getItem("bookmarks"));
  for (var x = 0; x < List.length; x++) {
    displayBookmarks(x);
  }
}

submit.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: siteName.value,
      siteUrl: siteURL.value,
    };
    List.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(List));
    displayBookmarks();QqqS
    clearForm();
  } else {
    alert("Form contains invalid inputs.");
  }
});

function clearForm() {
  siteName.value = null;
  siteURL.value = null;
}

function displayBookmarks() {
  var bookmark = "";
  for (var i = 0; i < List.length; i++) {
    bookmark += `<tr>
            <td>${i + 1}</td>
            <td>${List[i].siteName}</td>
            <td>
                    <button class="btn btn-visit" data-index="${i}">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                    </td>
                    <td>
                    <button class="btn btn-delete" data-index="${i}">
                        <i class="fa-solid fa-trash-can"></i>Delete
                    </button>
                
            </td>
        </tr>`;
  }
  tableContent.innerHTML = bookmark;
}

function deleteBookmarks(index) {
  tableContent.innerHTML = "";
  List.splice(index, 1);
  
  for (var x = 0; x < List.length; x++) {
    displayBookmarks(x);
  }
  localStorage.setItem("bookmarks", JSON.stringify(List));
}

siteName.addEventListener("input", function () {
  validationBookmark(siteName);
});

siteURL.addEventListener("input", function () {
  validationBookmark(siteURL);
});
function validationBookmark(element) {
  var regex = {
    siteName: /[A-Z][a-z]/,
    siteUrl:
      /^(https?:\/\/)?([\w\-]+)+[\w\-]+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/,
  };

  var id = element.getAttribute("id");
  var value = element.value;
  var pattern = regex[id];

  if (pattern.test(value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
