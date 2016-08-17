#!/usr/bin/perl

#########################################����Baidu��¼����ȡEmail
sub ParseBaiduRecord{

local($Content)=@_;	
    
    ##��ȡ��ҳ��ַ
    $Content=~/<a href=([\w|:|\.|\/|\-|\~|\?|\&|=]+) target="_blank">(.+)<\/a>/;
    $Homepage=$1;   ##$xֵ���ɸı䣬��ת��;
    $Title=$2;   ##$xֵ���ɸı䣬��ת��;
    $Title=~s/<[^>]*>//g;  ##����ҳ����ȥ��html��ǩ 
    push(@goturls,$Title."  ".$Homepage);
    #print "$Titel<br>";
    #print "$Homepage<br>";
    ##��ȡ������ҳ��ַ
    $Content=~/<a href=http:\/\/cache.baidu.com\/(.+) target="_blank" class=c>�ٶȿ���<\/a>/;
    $snapshot=$1;
    $snapshot="http://cache.baidu.com/".$1;
    
    push(@gotsnapshots,$snapshot);

    #print "<p>$HomePage";
    #print "<p>$snapshot";
    ##ȥ��html��ǩ
    ##$Content=~s/<[^>]*>//g;
    &ExtractEmail($Content);
    	

}

#########################################��ȡBaidu�����������������ÿ����¼//---------------------------------------------------------------------------
sub ParseBaiduFile{
	
    $CallIndex++;    ###�������������ƣ���ֻȡ���������
    
    
    #use LWP::Simple;
    use LWP::UserAgent;
    use HTTP::Request;
    use HTTP::Response;
    
    local($Url)=@_;
	
 
    $Results=0;  ##//���������Ľ����
    
    ###����ȡ��google�������ҳ��  �����ͳ�agent��Ϣ�ű�����
    #print $Url;
    #$Doc = get $Url;
    #print $Doc;
    #exit;
    $ua = new LWP::UserAgent;				# �a�� UserAgent ���
    #$ua->timeout   (20);  # in seconds
    #$ua->delay    ( 5);  # in second
    #$us->agent("$0/0.1".$ua->agent);
    $ua->agent("Mozilla/8.0");   			#αװ��Netscape 
    $request = new HTTP::Request('GET', $Url);		# �a�� Request ���
    $response = $ua->request($request);			# �_ʼץȡ�W퓣��K���Y������ $response
    if ($response->is_success) {			# ��ץȡ�W퓳ɹ����tӡ�� HTML ԭʼ�a
	$Doc=$response->content;
    }
    else {						# ��ץȡ�W퓲��ɹ����tӡ���e�`ӍϢ
	
	print("<p><br><br><font style='font-size:14.8px'>���ܷ�������������ҳ������</font></p>");
        print "<p>��������ϢΪ��".$response->error_as_HTML;
        print "<p><br><br>������ִ�����Ϣ������Ϊ��ʱ�����緱æ������ˢ�´�ҳ�����һ���Ρ�";
        exit;
	
    }
    
    #print($Doc);
    
    ##��$Doc����<ol>�ָ��ȥ��ͷβ������¼ ��һ����¼Ϊͷ��������һ��<ol>֮ǰ�������ַ�
    ##�ڶ�����¼���ǽ�����֡��������Ƿ�ҳ��־�����ĸ���β�͡�
    @Records=split(/$HeadFlag/,$Doc);
    $Head=shift(@Records); 
    $Tail=pop(@Records);   ##���һ�����ǽ����¼��ȥ��
    
    
    ###�ж��Ƿ������һ����Ч���ҳ�棬ͨ����־�ڵ����ڶ�����¼�ȥ��ͷβ��Ϊ�ڶ���������һ��
    $LastValidPage=0;
    $ValidResultsNumber=@Records[1];
    #print $ValidResultsNumber;
    if(index($ValidResultsNumber,$PreValidResultsNumberFlag)!=-1)
    {
    	#$ValidResultsNumber=~/$PreValidResultsNumberFlag(.+)$PostValidResultsNumberFlag/;
        #$ValidResults=$1;
        $LastValidPage=1;  ##��ʾ��ҳ��Ϊ���һ����Ч����ؽ��ҳ�棬����Ľ�������ظ���ҳ��
        pop(@Records);	   ##ȥ���ü�¼
        #$TotalValidResults=$ValidResults;
    }
    
    #print $Head;
    ##��������������ļ�ͷ��ȡ�ò�ѯ�����Ŀ��ɾ��ͷ��
    if($CallIndex==1)    ##����ǵ�һ����������ļ��������ѯ���
    {
    	   
        $Head=~/$PreResultsNumberFlag(.+)$PostResultsNumberFlag/;
        $Results=$1;
        ##ɾ�������Ŀ�е�,����
        $Results=~s/,//g;
        $Results=~s/Լ//g;  #����С��ʱ����xx�����ʱ����Լxxx

        if($Results=="")
        {
            print("<p><br><br><font style='font-size:14.8px'>û����ȡ�������������</font></p>");
            exit;
        }
	
	$TotalResults=$Results;
	
        if($Results>=$MaxResults)
        {
            
             $Warning="��ѯ���Ľ����Ϊ$Results�������������ʾ����Ŀ$MaxResults��\\r\\n\\r\\n��������������ȷ�Ĳ�ѯ�ؼ��ּ��ٲ�ѯ�����";
             print("<script>alert('$Warning');</script>\n");
        }
    }

    ##parse emails from the record
    $Body=@Records[0];
    @Records=split(/$RecordFlag/,$Body);
    #print $Body;
    foreach $Record(@Records){
    	
    	if($Record=~/http:\/\//)  ##��Ч���
    	{
    	  $RecordNo++;
    	  print "$Record<br>";
	  &ParseBaiduRecord($Record);
	}
    }
    
    ##����Google����ǵ�һ����������ļ�,�Զ�������������ļ�
    ##����Baidu��ֻ�ܸ��ݱ��ļ��ж��Ƿ�����һ���ļ�����û��$LastValidPage��������һ���������ⲿ�ж�
    return $LastValidPage;

}


#########################################��Baidu����ȡEmail��������
sub Main_BaiduParse{

local($Key)=@_;

#######baidu���������һЩ��������
$Url="http://www1.baidu.com/baidu?word=&ct=0&lm=0&si=&rn=10&tn=baidu&cl=3&pn=0";
$HeadFlag="<ol>";
$PreResultsNumberFlag="�ҵ������ҳ";
$PostResultsNumberFlag="ƪ����ʱ";
$MaxResults=750;
$RecordsPerPage=10;
$FirstResultsPageFlag="pn=0";
$RecordFlag="<p class=p2>";
$PreValidResultsNumberFlag="�˽���Ѿ���������,��Ҫ����Ľ����";
$PostValidResultsNumberFlag="";

##�����ѯ�ַ���
$Key=UrlEncode($Key);
$Url=~s/word=/word=$Key/;

#print $Url;
#exit;

$TotalResults=0;  #���汾�������������
$TotalValidResults=0;  #���汾����Ч�����������
$CallIndex=0;    #��ʾ�ڼ��ε�������ĺ������ڵ�һ��ʱ�������������
$RecordNo=0;    #��ʾ�����¼���
$LastValidPage=0;  #��ʾ���һ����Ч����ؽ��ҳ�棬����Ľ�������ظ���ҳ��
@gotaddresses =();   #�������г��������Email��ַ
@goturls =();   #�������г����������ҳ�����ԭʼ��ҳ��ַ
@gotsnapshots =();   #�������г��������google��ҳ����

$FirstUrl=$Url;
while(&ParseBaiduFile($Url)==0)
{
            $Url=$FirstUrl;
            $CurrentResutlsNumFlag=$FirstResultsPageFlag;   ##baidu��Ϊpn=0;
            chop($CurrentResutlsNumFlag);         
            $Num=$CallIndex*$RecordsPerPage;
            $CurrentResutlsNumFlag.=$Num;
            $Url=~s/$FirstResultsPageFlag/$CurrentResutlsNumFlag/;
}

$TotalValidResults=$RecordNo;

$EmailCount=scalar(@gotaddresses);
print qq!
	<hr height=1 color=000099><p>����������������������������ҳ<font color=red>$TotalResults</font>����������Ч��ؽ����ҳ<font color=red>$TotalValidResults</font>��������Щ��Ч��ҳ������������ЧEmail��ַ��<font color=red>$EmailCount</font>������ЩEmail����ȡ��ͬʱ���ѽ�����Email��ַ
	��ʽУ����ظ���ַ���˹��������ɴ����أ�<a href=$MailData_HttpDir/$Username/mail.txt>�ʼ���ַ�嵥</a></p>
	!;
	
############д���ļ�����
$FILE="$MailData_Dir/$Username/mail.txt";
open(MAIL,">$FILE")||die("���ܴ��ļ�!");
foreach $Email(@gotaddresses){
    print MAIL "$Email\n";
    }
close(MAIL);

$FILE="$MailData_Dir/$Username/url.txt";
open(MAIL,">$FILE")||die("���ܴ��ļ�!");
foreach $snapshot(@gotsnapshots){
    print MAIL "$snapshot\n";
    }
close(MAIL);

$Emails=join("\n",@gotaddresses);
$Urls=join("\n",@goturls);

print qq!<p>
	<table width=80% border=0>
	<tr></td>
	<form method=post name=form1 action="deepsearchemail.pl">
	����������ЧEmail��ַ�б�
	<textarea cols=70 rows=10 style="font-size:9pt">$Emails</textarea><br><br>
	��Ч���������ַ�б�
	<textarea cols=70 rows=10 style="font-size:9pt">$Urls</textarea><br><br>!;
	      
if($DeepSearch eq "n"){   ##˵���������û����������������

      print qq!<input type=button value="��������ʼ���ַ" onclick="alert('�����ʺ�Ϊ�����ʺţ�ֻ����ʽ�ʺŲ�������������ܣ�\\r\\n\\r\\n������ι�����ʽ�ʺ��뿴�����е�ע�Ṻ��һ����');">��������<input type=button value=" �������� " onclick="history.back()">!;
}
else
{	      
	print qq!	      <input type=hidden name=Username value='$Username'>
				<input type=submit value="��������ʼ���ַ">��������
				<input type=button value=" �������� " onclick="history.back()">
				!;
}
print qq!
	</form>
	</td></tr>
	</table>
	</p>!;
   

}

1;