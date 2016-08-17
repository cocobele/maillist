#!/usr/bin/perl

require "common.pl";
require "func_baidu.pl";

  #
  # provide subclassed Robot to override on_connect, on_failure and
  # on_return methods
  #
  package myUA;

  use Exporter();
  use LWP::Parallel::UserAgent qw(:CALLBACK);
  @ISA = qw(LWP::Parallel::UserAgent Exporter);
  @EXPORT = @LWP::Parallel::UserAgent::EXPORT_OK;

  # redefine methods: on_connect gets called whenever we're about to
  # make a a connection
  sub on_connect {
    my ($self, $request, $response, $entry) = @_;
    #print "�ɹ������� ",$request->url,"<br>";
  }

  # on_failure gets called whenever a connection fails right away
  # (either we timed out, or failed to connect to this address before,
  # or it's a duplicate). Please note that non-connection based
  # errors, for example requests for non-existant pages, will NOT call
  # on_failure since the response from the server will be a well
  # formed HTTP response!
  sub on_failure {
    my ($self, $request, $response, $entry) = @_;
    #print "������ҳ ",$request->url,"ʧ��<br>\t",
          $response->code, ", ", $response->message,"<br>"
	    if $response;
  }

  # on_return gets called whenever a connection (or its callback)
  # returns EOF (or any other terminating status code available for
  # callback functions). Please note that on_return gets called for
  # any successfully terminated HTTP connection! This does not imply
  # that the response sent from the server is a success! 

sub on_return {
    my ($self, $request, $response, $entry) = @_;
    #$Url=&ExtractUrlFromGoogleSnapshot($request->url);
    $Url=&ExtractUrlFromBaiduSnapshot($request->url);
    if ($response->is_success) {
       #print "<br>Ү! ��ȡ��ҳ",&ExtractUrlFromGoogleSnapshot($request->url)," ���ش��룺", $response->code,": ", $response->message, "<br>";
       print "Ү! ��ҳ<font color=blue>",$Url,"</font>ץȡ�ɹ���";
       #print $response->content;
       &ExtractEmail($response->content);
    } else {
       print "��! ��ҳ<font color=blue>",$Url,"</font>ץȡʧ�ܣ�<br>";
       # print $response->error_as_HTML;
    }
    
    
    return;
  }


###############################��google��ҳ���յ�ַ����ȡ��ԭʼ��ҳ��ַ
sub ExtractUrlFromGoogleSnapshot{
	
	my ($Snapshot)= @_;
	$Snapshot=~/http:\/\/(.+):(.+):([\w|:|\.|\/|\-|\~|\?|\&|=]+)+(.+)/;
	return $3;

}

###############################��baidu��ҳ���յ�ַ����ȡ��ԭʼ��ҳ��ַ
sub ExtractUrlFromBaiduSnapshot{
	
	my ($Snapshot)= @_;
	$Snapshot=~/http:\/\/(.+)&url=(.+)&b=(.+)/;
	my $Url=$2;
	$Url =~s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
	return $Url;

}

###############################��һ���ַ����н��������е�Email���������@gotaddresses��
sub ExtractEmail{

    local($Content)=@_;

# YOUR RESULTS EMAIL ADDRESSES result_txt.txt

        $indexposition = 0;
        $getoutvar = "NO";
        $emailnum=0;  ##��¼��ȡ��email��
        while ($getoutvar eq "NO")
        {
                if (index($Content,"\@",$indexposition) > 0)
                {
                        $indexposition = index($Content,"\@",$indexposition);

                        $findinvalidchar1 = $indexposition;
                        $findinvalidchar1--;
                        while ((substr($Content,$findinvalidchar1,1) =~ tr/[a-zA-Z0-9]\-\_\./[a-zA-Z0-9]\-\_\./) == 1 && $findinvalidchar1 > 0)
                        {
                                $findinvalidchar1--;
                        }
                        $findinvalidchar2 = $indexposition;
                        $findinvalidchar2++;
                        while ((substr($Content,$findinvalidchar2,1) =~ tr/[a-zA-Z0-9]\-\_\./[a-zA-Z0-9]\-\_\./) == 1 && $findinvalidchar2 < length($Content))
                        {
                                $findinvalidchar2++;
                        }
			
                        $theaddress = substr($Content,$findinvalidchar1 + 1,($findinvalidchar2 - $findinvalidchar1) - 1);
                        
                        $emailnum++;
                        &validate_email($theaddress);  ##У���޲���Email

                        $indexposition = $indexposition + 2;
                }
                else
                {
                        $getoutvar = "YES";
                }
        }

	print "��ȡEmail��ַ<font color=red>$emailnum</font>��<br>";

}

#######################################У�鲢�޸�email��ַ������һ��email��ַ���ϸ������@gotaddresses��
sub  validate_email{  

my($email)=$_[0];

$email=~s/\s//g;  #�����ո�
$email=~s/^\.+//g;  #������ͷ��.
$email=~s/\.+$//g; #������β��.
$email=~s/^-+//g;  #������ͷ��-
$email=~s/^_+//g;  #������ͷ��_
$email=~s/\@{2,}/\@/g;  #����������������@����һ��@
$email=~s/\.{2,}/\./g;  #����������������.����һ��.
$email=~s/\@\.+/\@/g;  #��@.ת����@
$email=~s/[\\|&|\;|\`|\'|\/|\||\"|\*|\%|\#|\?|\~|\<|\>|\^|\(|\)|\[|\]|\{|\}|\$|\n|\r]//g; ##���������Ƿ��ַ�

#####�ж�email��ʽ
if($email =~ /(@.*@)|(\.@)|(^@)/ || $email !~ /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/)
{  return(0);  }

if(length($email) > 127)  #���email��ַ̫���򷵻ش���
{  return(0);  }

push(@main::gotaddresses,$email);   ##����@gotaddresses������package main�У�����Ҫ��@main::gotaddresses��������
#print "$email<br>";
return(1);  
}


###############################�����ظ�Email������@gotaddresses
sub FilterDuplicateEmail{

@tempaddresses=sort(@main::gotaddresses);
@main::gotaddresses=();

       for($i=1;$i<scalar(@tempaddresses)-1;$i++)
       {
          if(@tempaddresses[$i-1] ne @tempaddresses[$i]){
          	push(@main::gotaddresses,@tempaddresses[$i-1]);
          }
       }            			
    
}

##################################��ʼ����
package main;
use HTTP::Request; 


&Head();
&ReadCGI();
$Username=$form{Username};

print "<p>";


#�����ļ��е�Email��ַ
$MailData_Dir="/home/httpd/bizsky/maillist/mail";
$filename="$MailData_Dir/$Username/url.txt",
open(FILE,"$filename") || die("���󣺲��ܴ��ļ�");

while($line=<FILE>)
{  
   push(@urls,$line);
}

close(FILE);


$CurrentUrlNo=0;  ##���浱ǰ������Url���
$TotalUrls=scalar(@urls);
@gotaddresses=();  ##��������Email

     my $pua = myUA->new();
     $pua->agent("Mozilla/8.0");   			#αװ��Netscape 
     #$pua->timeout   (2);  # in seconds
     #$pua->delay    ( 5);  # in seconds
     #$pua->max_req  ( 2);  # max parallel requests per server
     #$pua->max_hosts(10);  # max parallel servers accessed

     #local($\) = ""; # ensure standard $OUTPUT_RECORD_SEPARATOR

     for($CurrentUrlNo=0;$CurrentUrlNo<$TotalUrls;$CurrentUrlNo++){
        my $req = HTTP::Request->new('GET', @urls[$CurrentUrlNo]);
     	##print "�Ǽ���ҳ $CurrentUrlNo '".$req->url."<br>";
     	$pua->register ($req);
     
    }
    
    
    my $entries = $pua->wait(); # responses will be caught by on_return, etc

    
    print "<hr height=1 color=000099><p>����<font color=red>$TotalUrls</font>����Ч�����ҳ����ȡԭʼEmail<font color=red>".scalar(@gotaddresses)."</font>��<br>";
    
    &myUA::FilterDuplicateEmail();
    
    print "�ھ���Email��ʽУ�顢�޲����ظ���ַ���˹�����ʣ�µ���ЧEmail��Ϊ<font color=red>".scalar(@gotaddresses)."</font>��,���ɴ����أ�<a href=$MailData_HttpDir/$Username/mail.txt>�ʼ���ַ�嵥</a></p>";
    
    
    ############д���ļ�����
    $FILE="$MailData_Dir/$Username/mail.txt";
    open(MAIL,">$FILE")||die("���ܴ��ļ�!");
    foreach $Email(@gotaddresses){
      print MAIL "$Email\n";
    }
    close(MAIL);


    $Emails=join("\n",@gotaddresses);

	print qq!<p>
	<table width=80% border=0>
	<tr></td>
	<form>
	�������������ЧEmail��ַ�б�
	<textarea cols=70 rows=10 style="font-size:9pt">$Emails</textarea><br><br>
	</form>
	</td></tr>
	</table>
	</p>!;

    
