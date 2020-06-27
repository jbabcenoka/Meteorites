/*
 * Jevge�ija Bab�enoka jb19045
 */

window.onload=function(){
    document.getElementById("show-list").addEventListener("click",Start);
    document.getElementById("hide").addEventListener("click",HideOrShowCoordinates);
    CreateTableTH();
    addOption();
    nameFunction();
   function CreateTableTH(){
        var table = document.getElementsByTagName("Table")[0];
        var thead = table.createTHead();
        var row = thead.insertRow(0);
        for (var i=0;i<6;i++) {
            var cell = document.createElement("TH");
            cell.innerHTML = "ID";
            row.appendChild(cell);
            switch (i) {
              case 0:
                cell.innerHTML = "ID";
                cell.setAttribute('rowspan','2');
                cell.setAttribute('height','50px');
                cell.setAttribute('width','40px');
                break;
              case 1:
                cell.innerHTML = "Class";
                cell.setAttribute('rowspan','2');
                cell.setAttribute('height','50px');
                cell.setAttribute('width','150px');
                break;
              case 2:
                cell.innerHTML = "Year";
                cell.setAttribute('rowspan','2');
                cell.setAttribute('height','50px');
                cell.setAttribute('width','40px');
                break;
              case 3:
                cell.innerHTML = "Name";
                cell.setAttribute('rowspan','2');
                cell.setAttribute('height','50px');
                cell.setAttribute('width','150px');
                break;
              case 4:
                cell.innerHTML = "Mass";
                cell.setAttribute('rowspan','2');
                cell.setAttribute('height','50px');
                cell.setAttribute('width','150px');
                break;
              case 5:
                cell.innerHTML = "Coordinates";
                cell.setAttribute('colspan','2');
                cell.setAttribute('height','25px');
                cell.setAttribute('width','200px');
                var row2 = thead.insertRow(-1);
                for (var j=0;j<2;j++) {
                    var cell2 = document.createElement("TH");
                    row2.appendChild(cell2);
                    switch (j) {
                      case 0:
                        cell2.innerHTML = "Latitude";
                        row2.appendChild(cell2);
                        cell2.setAttribute('width','100px');
                        break;
                      case 1:
                        cell2.innerHTML = "Longitude";
                        row2.appendChild(cell2);
                    }
                }
            }
        }
    }
    function HideOrShowCoordinates(){
        var button = document.getElementById("hide");
        var table = document.getElementsByTagName("Table")[0];
        var k=table.rows.length;
        if (button.textContent==="Hide coordinates"){
            var row = table.rows[0];
            row.deleteCell(-1);
            for( var i=1; i<k; i++){
               var row = table.rows[i];
               row.deleteCell(-1);
               row.deleteCell(-1);
            }
            button.innerHTML="Show coordinates";
        } else if (button.textContent==="Show coordinates") {
            //aizpild�m pirmo rindi�u
            var row = table.rows[0];
            var x = document.createElement("TH");
            row.appendChild(x);
            x.innerHTML= "Coordinates";
            x.setAttribute('colspan','2');
            x.setAttribute('width','200px');
            x.setAttribute('height',' var x2 = document.createElement("TH");25px');
            //aizpild�m otro rindi�u
            var x2 = document.createElement("TH");
            var x3 = document.createElement("TH");
            row = table.rows[1];
            row.appendChild(x2);
            x2.innerHTML = "Latitude";
            row.appendChild(x3);
            x3.innerHTML = "Longitude";
            //aizpild�m paliku�as rindas
            for( var i=2; i<k; i++){
                    var row = table.rows[i];
                    var t = row.insertCell(-1);
                    var f = row.getElementsByTagName("TD")[0];
                    for (var j in data){
                        if(data[j].id===f.textContent) t.innerHTML = data[j].reclat;
                    }
                    t = row.insertCell(-1);
                    for (var j in data){
                        if(data[j].id===f.textContent) t.innerHTML = data[j].reclong;
                    }
            }
            button.innerHTML="Hide coordinates";
        }
    }
    function addOption(){
        var select = document.getElementById("class-select");
        function compare(a,b){
            var a1=a.recclass;
            var b1=b.recclass;
            var com = 0;
            if (a1 > b1) {
              com = 1;
            } else if (a1 < b1) {
              com = -1;
            }
            return com;
        }
        data.sort(compare);
        for (var i in data) {
            var option = document.createElement("option");
            option.text = data[i].recclass;
            var k=data[i].recclass;
            var flag=true;
            for (var j = 0; j < select.length; j++){
                if (k===select.options[j].text ){
                     flag=false;
                     break;
                 }
            }
            if (flag) select.add(option);
        }
        option.text = "";
        select.add(option,0); //pievienojam tuk�o klasi(tuk�o izv�li)
    }
    function newCell(data) {
        var table = document.getElementsByTagName("Table")[0];
        var button = document.getElementById("hide");
        var row = table.insertRow(-1);
        for (var i=0;i<7;i++) {
            switch (i) {
              case 0: 
                var cell = row.insertCell(i);
                cell.innerHTML = data.id;
                break;
              case 1:
                var cell = row.insertCell(i);
                cell.innerHTML = data.recclass;
                break;
              case 2:
                var cell = row.insertCell(i);
                if (data.year!==undefined ) {
                    cell.innerHTML = get_year(data);
                }
                else {
                    cell.innerHTML = "NO YEAR";
                }
                break;
              case 3:
                var cell = row.insertCell(i);
                cell.innerHTML = data.name;
                break;
              case 4:
                var cell = row.insertCell(i);
                cell.innerHTML = data.mass;
                break;
              case 5:
                if (button.textContent==="Hide coordinates") {
                        var cell = row.insertCell(i);
                        cell.innerHTML = data.reclat;
                }
                break;
              case 6:
                if (button.textContent==="Hide coordinates") {
                        var cell = row.insertCell(i);
                        cell.innerHTML = data.reclong;
                }
            }
        }
    }
    function NamesAreEqual(a,b){
        l=b.length;
        if (l>=2) {
            var t=a.substring(0,l);
            if (t===b) return true;
            else return false;
        } else return true;
    }
    function nameFunction(){
        var name1=document.getElementById("search");
        var table = document.getElementsByTagName("Table")[0];
        name1.oninput=function(){
            var k=table.rows.length;
            if (k>2) {
                for (var i=3; i<=k; i++) table.deleteRow(-1); 
            }
             var l=name1.value.length;
             if (l>=2){
                    for (var i in data){
                        var name2=data[i].name.substring(0,l);
                        if (name1.value===name2){
                            newCell(data[i]);
                        }
                    }
            }
         };
     }
    function get_year(data){
        var x="";
        x=x+data.year.charAt(0)+data.year.charAt(1)+data.year.charAt(2)+data.year.charAt(3);
        x=Number(x);
        return x;
    }
    function isCorrectDate( x, y){
        if (x!=="" && y!=="") {
            if (x<1700 || x>2019 || y<1700 || y>2019 || x>y) {
                return false;
            }
        }else if (x!==""){
            if (x<1700 || x>2019) {
                return false;
            }
        } else if (y!==""){
            if (y<1700 || y>2019) {
                return false;
            }
        }
        return true;
    }
    function Start(){
        var table = document.getElementsByTagName("Table")[0];
        var k=table.rows.length;
        if (k>2) {
            for (var i=3; i<=k; i++) table.deleteRow(-1); 
        }
        var our_object = {
            "name" : document.getElementById("search").value,
            "class" : document.getElementById("class-select").value,
            "year_until" : document.getElementById("year-until").value,
            "year_from" : document.getElementById("year-from").value
        };
        if (isCorrectDate(our_object.year_from, our_object.year_until)){
            for (var i in data) {
                if (our_object.class!==""){
                        if (our_object.year_from!=="" && our_object.year_until!==""){
                             if (data[i].year){ //ja meteoritam visp�r ir gads
                                      if(our_object.year_from<=get_year(data[i]) && our_object.year_until>=get_year(data[i])){
                                          if (our_object.class===data[i].recclass) {
                                              if (NamesAreEqual(data[i].name,our_object.name)) newCell(data[i]);
                                      }
                                }
                            }
                        } else if (our_object.year_from!==""){
                            if (data[i].year){ 
                                if(our_object.year_from<=get_year(data[i])){
                                    if (our_object.class===data[i].recclass)  {
                                              if (NamesAreEqual(data[i].name,our_object.name)) newCell(data[i]);
                                      }
                                }
                            }
                        } else if (our_object.year_until!==""){
                            if (data[i].year){ 
                                  if(our_object.year_until>=get_year(data[i])){
                                      if (our_object.class===data[i].recclass)  {
                                              if (NamesAreEqual(data[i].name,our_object.name)) newCell(data[i]);
                                      }
                                  }
                              }
                        } else if (our_object.class===data[i].recclass) {
                            if (NamesAreEqual(data[i].name,our_object.name)) newCell(data[i]); 
                        } 
                } else {
                    if (our_object.year_from!=="" && our_object.year_until!==""){
                             if (data[i].year){ 
                                      if(our_object.year_from<=get_year(data[i]) && our_object.year_until>=get_year(data[i])) {
                                          if (NamesAreEqual(data[i].name,our_object.name)) newCell(data[i]); 
                              }
                          }
                    } else if (our_object.year_from!==""){
                            if (data[i].year){ 
                                if(our_object.year_from<=get_year(data[i])) {
                                    if (NamesAreEqual(data[i].name,our_object.name)) newCell(data[i]); 
                                }
                            }
                    } else if (our_object.year_until!==""){
                            if (data[i].year){ 
                                  if(our_object.year_until>=get_year(data[i])) {
                                      if (NamesAreEqual(data[i].name,our_object.name)) newCell(data[i]); 
                                    }
                              }
                    } else if (our_object.name!==""){
                         if (NamesAreEqual(data[i].name,our_object.name)) newCell(data[i]); 
                    }
                }
            }
          } else alert("Ievadiet pareizos datumus (date from: >1700, date to: <2019!");
        }
};