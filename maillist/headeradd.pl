#!/usr/bin/perl

#######################################################################
$flag=@ARGV[0];
$filename=@ARGV[1];

##print "===$filename==";

##����������ʽ����untainted����
##$filename = ~/(\S+)/;
$filename =~m{^([^@]+)$};
$filename = $1;

##print "===$filename==";

##��ʱ���ļ�������alias�ĳ�root
#system("$program_dir/createlist root $filename");

if($flag eq "-a")
{
  open(MAIL,"$filename") || die("���󣺲��ܴ��ļ�");
  while($line=<MAIL>)
  {
	$Head.=$line;
  }
  close(MAIL);

  ####$Head="#".$Head;    //��ǰ�ķ�ʽ���ƺ�ǰ����#������ȷ�滻���е� ##L@##H

  ##�޸�ΪֻҪ����������ͷ 2010 07 17
  $Head="#Precedence: bulk\n";      #ע��Precedence: bulkǰ�����#���������To:�� ##L@##H�����������ڵ�##L@##H�����滻��
  $Head.="To: <##L@##H>\n";

}
elsif($flag eq "-r")
{
  open(MAIL,"$filename") || die("���󣺲��ܴ��ļ�");
  while($line=<MAIL>)
  {
	$Head.=$line;
  }
  close(MAIL);

  ##�޸�Ϊ������ͷ Delivered-To 2010 07 17
  $Head="Delivered-To\n".$Head;
}
elsif($flag eq "-w")
{
    $Head="#";
}

open(MAIL,">$filename") || die("���󣺲��ܴ��ļ�");
print MAIL $Head;
close(MAIL);

##���ļ�������root�Ļ�alias
#system("$program_dir/createlist alias $filename");
