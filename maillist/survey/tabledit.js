var Changed=false;
var lastSelection = null;
ButtonRemoveRow.setExpression("disabled", "! rowSelected(lastSelection)");
ButtonMoveUp.setExpression("disabled", "! rowSelected(lastSelection)");
ButtonMoveDown.setExpression("disabled", "! rowSelected(lastSelection)");
//ButtonSave.setExpression("disabled", "! Changed");
function select(element) {
  var e, r, c;
  if (element == null) {
    e = window.event.srcElement;
  } else {
    e = element;
  }
  if ((window.event.ctrlKey) || (e.tagName == "TR"))
  {
    r = findRow(e);
    if (r != null)
    {
      if(r.rowIndex==0 || r.rowIndex==1) return;  //��һ�����Ǳ��ⲻ��ѡ��
      if (lastSelection != null)
      {
        deselectRowOrCell(lastSelection);
      }
      selectRowOrCell(r);
      lastSelection = r;
    }
  }
  window.event.cancelBubble = true;
} 
TableContainer.onclick = select;
function cancelSelect() {
  if (window.event.srcElement.tagName != "BODY") 
    return;
  if (lastSelection != null) {
    deselectRowOrCell(lastSelection);
    lastSelection = null;
  }
}
document.onclick = cancelSelect;
function findRow(e) {
  if (e.tagName == "TR") {
    return e;
  } else if (e.tagName == "BODY") {
    return null;
  } else {
    return findRow(e.parentElement);
  }
}
function findCell(e) {
  if (e.tagName == "TD") {
    return e;
  } else if (e.tagName == "BODY") {
    return null;
  } else {
    return findCell(e.parentElement);
  }
}
function deselectRowOrCell(r) {
  r.runtimeStyle.backgroundColor = "";
  r.runtimeStyle.color = "";
  //r.runtimeStyle.fontFamily = "Verdana";
}
function selectRowOrCell(r) {
  r.runtimeStyle.backgroundColor = "darkblue";
  r.runtimeStyle.color = "white";
  //r.runtimeStyle.fontFamily = "Verdana";
}
function Save() {

  var str,rowstr;
  var totalstr="";
  var rows=TheTable.rows.length;
  var cols=TheTable.rows[1].cells.length;  //ȡ�øñ������������ڶ��б����У�
  for(i=2;i<rows;i++)
  {
     rowstr="";
    for(j=1;j<cols;j++)
    {
      str=TheTable.rows[i].cells[j].innerText;
      if(str=="")  //˵����cell��¼����ǹ̶��ı�
      {
        str=TheTable.rows[i].cells[j].innerHTML;
        if(str.indexOf("|")!=-1 || str.indexOf("^")!=-1)
        {
            alert("����ʹ�� | �� ^ �������ַ���");
            return;
        }
        
        //alert(str);
        var token1=" name=";
        var token2="value=";
        var token3="></DIV>";
        var pos1=str.indexOf(token1);
        var pos2=str.indexOf(token2);
        var pos3=str.indexOf(token3);
        if(pos2==-1)  //˵��valueΪ��
            str="";
        else if(pos1<pos2)
            str=str.substring(pos2+token2.length,pos3);
        else
            str=str.substring(pos2+token2.length,pos1);

        //alert(str);
        if(str.indexOf("<")>0 || (str.indexOf(">")>0 && str.indexOf(">")<str.length-1) || str.indexOf("'")!=-1)
        {
            alert("����ʹ�� < �� > �Լ� ' ��Щ�ַ���");
            return;
        }
      }

      if(j==1)
         rowstr=str;
      else
         rowstr+="^"+str;     
      
    }
    
      if(i==2)
         totalstr=rowstr;
      else
         totalstr+="|"+rowstr;
      
  }
  //alert(totalstr);
  document.form1.Rows.value=totalstr;
  document.form1.submit();
}

function addRow(size) {
if(!size) size=32;
  var r, p, nr;
  if (lastSelection == null) {
    r = null;
    p = TheTable.children[0];
  } else {
    r = lastSelection;
    if (r.tagName == "TD") {
      r = r.parentElement;
    }
    p = r.parentElement;
  }
  nr = document.createElement("TR");
  p.insertBefore(nr, r);
  //select(nr);
  var Index=nr.rowIndex-1;   //�ӵ����п�ʼ
  oTCell=nr.insertCell(0);
  oTCell.innerHTML="<div align=center>"+Index+"</div>";
  
  var cols=p.rows[1].cells.length;  //ȡ�øñ������������ڶ��б����У�
  for(i=1;i<cols;i++)
  {
    oTCell=nr.insertCell(i);
    oTCell.innerHTML="<div align=center><input type=text name=Item"+Index+"[] size="+size+"></div>";
  }
  
  for(i=nr.rowIndex+1;i<p.rows.length;i++)
  {
    p.rows[i].cells[0].align="center";
    p.rows[i].cells[0].innerText=i-1;
  }

  return nr;    

}
function removeRow() {
  var r, p, nr;
  if (lastSelection == null)
    return false;
  r = lastSelection;
  if (r.tagName == "TD") {
    r = r.parentElement;
  }
  p = r.parentElement;
  var Index=r.rowIndex;
  p.removeChild(r);
  lastSelection = null;

  for(i=Index;i<p.rows.length;i++)
  {
    p.rows[i].cells[0].style.textAlign="center";
    p.rows[i].cells[0].innerText=i-1;
  }
 
  return r; 
}
function addCell() {
  var r, p, c, nc, text;
  if (lastSelection == null)
    return false;
  r = lastSelection;
  if (r.tagName == "TD") {
    r = r.parentElement;
    c = lastSelection;
  } else {
    c = null;
  }
  nc = document.createElement("TD");
  text = document.createTextNode("new");
  nc.insertBefore(text, null);
  r.insertBefore(nc, c);
  select(nc);
  return nc;
}
function removeCell() {
  var c, p, nr;
  if (lastSelection == null)
    return false;
  c = lastSelection;
  if (c.tagName != "TD") {
    return null;
  }
  p = c.parentElement;
  p.removeChild(c);
  lastSelection = null;
 
  return c; 
}
function moveUp() {
  var r, p, ls;
  if (lastSelection == null)
    return false;
  r = lastSelection;
  if (r.tagName != "TR") {
    return null;
  }
  if (r.rowIndex<=2) 
    return;
  ls = r.previousSibling;
  p = ls.parentElement;
  p.insertBefore(r, ls);
  r.cells[0].style.textAlign="center";
  r.cells[0].innerText=r.rowIndex-1;
  ls.cells[0].style.textAlign="center";
  ls.cells[0].innerText=ls.rowIndex-1;  
  return r;
}
function moveDown() {
  var r, p, ls,tempindex;
  if (lastSelection == null)
    return false;
  r = lastSelection;
  if (r.tagName != "TR") {
    return null;
  }
  ls = r.nextSibling;
  if (ls == null)
    return null;
  r.cells[0].style.textAlign="center";
  r.cells[0].innerText=r.rowIndex;
  ls.cells[0].style.textAlign="center";
  ls.cells[0].innerText=ls.rowIndex-2;  
  p = ls.parentElement;
  ls = ls.nextSibling;
  p.insertBefore(r, ls);
  return r;
}
function nothingSelected() {
  return (lastSelection == null);
}
function rowSelected() {
  var c;
  if (lastSelection == null)
    return false;
  c = lastSelection;
  return (c.tagName == "TR")
}
function cellSelected() {
  var c;
  if (lastSelection == null)
    return false;
  c = lastSelection;
  return (c.tagName == "TD")
}
function whatIsSelected() {
  if (lastSelection == null) 
    return "Table";
  if (lastSelection.tagName == "TD") 
    return "Cell";
  if (lastSelection.tagName == "TR")
    return "Row";
}
