function NeatDialog(sHTML, sTitle,bCancel)
{
  window.neatDialog = null;
  this.elt = null;
  if (document.createElement && document.getElementById)
  {
    var sdw= document.createElement("div");
    sdw.className = "shadow";

    var dg = document.createElement("div");
    dg.className = "neat-dialog";
    dg.id = "neat-dialog";
    dg.appendChild(sdw);

    if (sTitle)
      sHTML = '<div class="neat-dialog-title">'+sTitle+
              ((bCancel)?
                '<img src="/images/close2.gif" id="nd-cancel" alt="�ر�" class="nd-cancel" />':'')+
                '</div>\n' + sHTML;
    dg.innerHTML = sHTML;

    var dbg = document.createElement("div");
    dbg.id = "nd-bdg";
    dbg.className = "neat-dialog-bg";

    var dgc = document.createElement("div");
    dgc.className = "neat-dialog-cont";
    dgc.appendChild(dbg);
    dgc.appendChild(dg);

    //adjust positioning if body has a margin
    if (document.body.offsetLeft > 0)
      dgc.style.marginLeft = document.body.offsetLeft + "px";

    document.body.appendChild(dgc);
    if (bCancel) document.getElementById("nd-cancel").onclick = function()
    {
      window.neatDialog.close();
    };
    this.elt = dgc;
    window.neatDialog = this;
  }
}
NeatDialog.prototype.close = function()
{
    if (this.elt)
    {
        this.elt.style.display = "none";
        this.elt.parentNode.removeChild(this.elt);
    }
    window.neatDialog = null;
}