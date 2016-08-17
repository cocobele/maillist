#!/usr/bin/perl

#######################################################################
$flag=@ARGV[0];
$filename=@ARGV[1];

##print "===$filename==";

##利用正则表达式进行untainted操作
##$filename = ~/(\S+)/;
$filename =~m{^([^@]+)$};
$filename = $1;

##print "===$filename==";

##临时将文件属主由alias改成root
#system("$program_dir/createlist root $filename");

if($flag eq "-a")
{
  open(MAIL,"$filename") || die("错误：不能打开文件");
  while($line=<MAIL>)
  {
	$Head.=$line;
  }
  close(MAIL);

  ####$Head="#".$Head;    //以前的方式，似乎前不加#则不能正确替换所有的 ##L@##H

  ##修改为只要以下两个信头 2010 07 17
  $Head="#Precedence: bulk\n";      #注：Precedence: bulk前必须加#，否则除了To:的 ##L@##H，后面信体内的##L@##H不能替换。
  $Head.="To: <##L@##H>\n";

}
elsif($flag eq "-r")
{
  open(MAIL,"$filename") || die("错误：不能打开文件");
  while($line=<MAIL>)
  {
	$Head.=$line;
  }
  close(MAIL);

  ##修改为加上信头 Delivered-To 2010 07 17
  $Head="Delivered-To\n".$Head;
}
elsif($flag eq "-w")
{
    $Head="#";
}

open(MAIL,">$filename") || die("错误：不能打开文件");
print MAIL $Head;
close(MAIL);

##将文件属性由root改回alias
#system("$program_dir/createlist alias $filename");
