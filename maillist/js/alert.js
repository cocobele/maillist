window.alert = function(txt)
{
      var sHTML = "<style>DIV.neat-dialog {WIDTH: 400px;}</style><p>"+txt+"</p><div align=center><input type=button value=' 确  定 ' style='width:60px;height:22px;' onclick='window.neatDialog.close();'></div>";
      new NeatDialog(sHTML, "提示", true);
      if(document.all)
          document.getElementById("neat-dialog").style.top="25%";
      else
          document.getElementById("neat-dialog").style.top="25%";	
}