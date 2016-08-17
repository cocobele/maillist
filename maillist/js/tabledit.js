//var isie = navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1;
var isie = (document.all)?true:false; //ie firefox js语法有些不同，event style(runtimesytle) innerText(textContent) 等

var Changed=false;
var lastSelection = null;
ButtonRemoveRow.setExpression("disabled", "! rowSelected(lastSelection)");
ButtonMoveUp.setExpression("disabled", "! rowSelected(lastSelection)");
ButtonMoveDown.setExpression("disabled", "! rowSelected(lastSelection)");
ButtonSave.setExpression("disabled", "! Changed");
function select(ev) {
  var e, r, c;
  var element;
  if (element == null)
  {
      if(isie)    //ie和火狐对event有差异
          e = window.event.srcElement;
      else
          e = ev.srcElement || ev.target;
   }
  else
  {
    e = element;
  }
  //if ((window.event.ctrlKey) || (e.tagName == "TR"))  //不需要按ctrl，修改为点某行就选中
  if (e.tagName == "TD" || e.tagName == "DIV" || (e.tagName == "TR"))
  {
    r = findRow(e);
    if (r != null)
    {
      if(r.rowIndex==0 || r.rowIndex==1) return;  //第一二行是标题不用选中
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
//TableContainer.onclick = select;   //firefox此处不行，已经直接在element里定义
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
  if(isie)
  {
      r.runtimeStyle.backgroundColor = "";
      r.runtimeStyle.color = "";
  }
  else
  {
      r.style.backgroundColor = "";
      r.style.color = "";
  }
  //r.runtimeStyle.fontFamily = "Verdana";
}
function selectRowOrCell(r) {
  if(isie)  //ie和火狐对style有差异
  {
      r.runtimeStyle.backgroundColor = "darkblue";
      r.runtimeStyle.color = "white";
  }
  else
  {
      r.style.backgroundColor = "darkblue";
      r.style.color = "white";
  }
  //r.runtimeStyle.fontFamily = "Verdana";
}
function Save() {

  var str,rowstr;
  var totalstr="";
  var rows=TheTable.rows.length;
  var cols=TheTable.rows[1].cells.length;  //取得该表格列数（计算第二行标题行）
  for(i=2;i<rows;i++)
  {
     rowstr="";
    for(j=1;j<cols;j++)
    {
      if(isie)    //ie和火狐对innerText有差异
          str=TheTable.rows[i].cells[j].innerText;
      else
      {
      	  str=TheTable.rows[i].cells[j].innerHTML;
          if(str.indexOf("<input name=")!=-1)  //如果系input 则提取 value，而不是innerHTML(这个取到原来修改前的值)
          {
              var r=i-1;
              var ItemName="Item"+r+j;
              str=document.getElementById(ItemName).value;
          }
      }
      //去掉末尾的空格
      var k;
      for(k=str.length-1;k>=0;k--)
      {
	 if(str.charAt(k)!= " ") break;
      }
      str=str.substring(0,k+1);
      if(str=="")  //说明该cell是录入框不是固定文本
      {
          str=TheTable.rows[i].cells[j].innerHTML;
          //alert(str);
          if(str.indexOf("|")!=-1 || str.indexOf("^")!=-1)
          {
              alert("请勿使用 | 和 ^ 这两个字符");
              return;
          }
	
	  //alert(str);
	  //alert(str.indexOf("type=checkbox"));
	  //发现有checkbox则显示1或0       
          if(str.indexOf("type=checkbox")!=-1)
          {
              //alert("ok");
              if(str.indexOf("CHECKED")!=-1)
	          str="1";
	      else
	      	  str="0";
 	  }
	  else
	  {	

        
              //因IE8的顺序和IE6不一致，废弃，改用正则
              /*
              var token1=" name=";
              var token2="value=";
              var token3="></DIV>";
              var pos1=str.indexOf(token1);
              var pos2=str.indexOf(token2);
              var pos3=str.indexOf(token3);
              if(pos2==-1)  //说明value为空
                  str="";
              else if(pos1<pos2)
                  str=str.substring(pos2+token2.length,pos3);
              else
                  str=str.substring(pos2+token2.length,pos1);
	     */

	     //var patt =/ value=('|")?(\S+)('|")?\s.+/;
	     var patt =/.+ value=(\S+) .+/;
	     var arr = str.match(patt);
	     //alert(arr.length);
	     //for(i=0;i<arr.length;i++) alert(arr[i]);
   	     if(arr)
	         str=arr[1];                  //arr第3个为value
	     else
	         str="";

	     //alert(str);
	  }
      }
      else
      {
	  //str取本来值
      }

      if(j==1)
          rowstr=str;
      else
          rowstr+="^"+str;     
      
    }
    
      //alert(rowstr);

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
  var Index=nr.rowIndex-1;   //从第三行开始
  oTCell=nr.insertCell(0);
  oTCell.innerHTML="<div align=center>"+Index+"</div>";
  
  var cols=p.rows[1].cells.length;  //取得该表格列数（计算第二行标题行）
  for(i=1;i<cols;i++)
  {
    oTCell=nr.insertCell(i);
    oTCell.innerHTML="<div align=center><input type=text name=Item"+Index+"[] id=Item"+Index+i+" size="+size+"></div>";
  }
  
  for(i=nr.rowIndex+1;i<p.rows.length;i++)
  {
    p.rows[i].cells[0].align="center";
    if(isie)
        p.rows[i].cells[0].innerText=i-1;
    else
        p.rows[i].cells[0].textContent=i-1;
  }

  return nr;    

}

function addRow1(sizelist)
{
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
  var Index=nr.rowIndex-1;   //从第三行开始
  oTCell=nr.insertCell(0);
  oTCell.innerHTML="<div align=center>"+Index+"</div>";
  
  var cols=p.rows[1].cells.length;  //取得该表格列数（计算第二行标题行）
  for(i=1;i<cols;i++)
  {
      size=sizelist[i-1];
      oTCell=nr.insertCell(i);
      if(i<cols-1)
          oTCell.innerHTML="<div align=center><input type=text name=Item"+Index+"[] id=Item"+Index+i+" size="+size+"></div>";
      else
          oTCell.innerHTML="<div align=center><input type=checkbox name=Item"+Index+"[] id=Item"+Index+i+"></div>";      	
  }
  
  for(i=nr.rowIndex+1;i<p.rows.length;i++)
  {
    p.rows[i].cells[0].align="center";
    if(isie)
        p.rows[i].cells[0].innerText=i-1;
    else
        p.rows[i].cells[0].textContent=i-1;
  }

  return nr;    

}

function editRow(sizelist)
{
  var r, p, nr;
  if (lastSelection == null)
  {
    r = null;
    p = TheTable.children[0];
    return;             //编辑模式必须选中一行
  }
  else
  {
    r = lastSelection;
    if (r.tagName == "TD")
    {
      r = r.parentElement;
    }
    p = r.parentElement;
  }
  nr = document.createElement("TR");
  p.insertBefore(nr, r);
  //select(nr);
  var Index=nr.rowIndex-1;   //从第三行开始
  oTCell=nr.insertCell(0);
  oTCell.innerHTML="<div align=center>"+Index+"</div>";
  
  var cols=p.rows[1].cells.length;  //取得该表格列数（计算第二行标题行）
  for(i=1;i<cols;i++)
  {
      size=sizelist[i-1];
      var val;
      if(isie)    //ie和火狐对innerText有差异
          val=r.cells[i].innerText;    //i=0为序号
      else
      	  val=r.cells[i].textContent;   //innerHTML也可
      /*
      //去掉末尾的空格
      var j;
      for(j=val.length-1;j>=0;j--)
      {
	 if(val.charAt(j)!= " ") break;
      }
      val=val.substring(0,j+1);
      */          	
      val=val.replace(/(^\s*)|(\s*$)/g, "");  //去两边空格

      oTCell=nr.insertCell(i);
      oTCell.innerHTML="<div align=center><input type=text name=Item"+Index+"[] id=Item"+Index+i+" size="+size+" value="+val+"></div>";
      
  }
  
  for(i=nr.rowIndex+1;i<p.rows.length;i++)
  {
    p.rows[i].cells[0].align="center";
    if(isie)
        p.rows[i].cells[0].innerText=i-1;
    else
        p.rows[i].cells[0].textContent=i-1;
  }

  removeRow();

  return nr;    

}

function editRow1(sizelist)
{
  var r, p, nr;
  if (lastSelection == null)
  {
    r = null;
    p = TheTable.children[0];
    return;             //编辑模式必须选中一行
  }
  else
  {
    r = lastSelection;
    if (r.tagName == "TD")
    {
      r = r.parentElement;
    }
    p = r.parentElement;
  }
  nr = document.createElement("TR");
  p.insertBefore(nr, r);
  //select(nr);
  var Index=nr.rowIndex-1;   //从第三行开始
  oTCell=nr.insertCell(0);
  oTCell.innerHTML="<div align=center>"+Index+"</div>";
  
  var cols=p.rows[1].cells.length;  //取得该表格列数（计算第二行标题行）
  for(i=1;i<cols;i++)
  {
      size=sizelist[i-1];
      var val;
      if(isie)    //ie和火狐对innerText有差异
          val=r.cells[i].innerText;    //i=0为序号
      else
      	  val=r.cells[i].textContent;   //innerHTML也可
      /*
      //去掉末尾的空格
      var j;
      for(j=val.length-1;j>=0;j--)
      {
	 if(val.charAt(j)!= " ") break;
      }
      val=val.substring(0,j+1);
      */
      val=val.replace(/(^\s*)|(\s*$)/g, "");  //去两边空格
      
      if(i==cols-2)
      {
          if(val=="轮换IP" || val==" " || val=="　" || val=="0") val="";
      }
      else if(i==cols-1)
      {
      	  if(val=="√")
              val="checked";
          else
              val="";
      }
                	
      oTCell=nr.insertCell(i);
      if(i<cols-1)
          oTCell.innerHTML="<div align=center><input type=text name=Item"+Index+"[] id=Item"+Index+i+" size="+size+" value="+val+"></div>";
      else
          oTCell.innerHTML="<div align=center><input type=checkbox name=Item"+Index+"[] id=Item"+Index+i+" value=1 "+val+"></div>";
      
  }
  
  for(i=nr.rowIndex+1;i<p.rows.length;i++)
  {
    p.rows[i].cells[0].align="center";
    if(isie)
        p.rows[i].cells[0].innerText=i-1;
    else
        p.rows[i].cells[0].textContent=i-1;
  }

  removeRow();

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
    if(isie)
        p.rows[i].cells[0].innerText=i-1;
    else
        p.rows[i].cells[0].textContent=i-1;
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
