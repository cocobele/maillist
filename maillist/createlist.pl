#!/usr/bin/perl

$Username=@ARGV[0];
$list_name=@ARGV[1];
$list_cname=@ARGV[2];
$ModEmail=@ARGV[3];
$function=@ARGV[4];;

if($WebHost eq "")
{
	 $WebHost="127.0.0.1";
}

    use LWP::UserAgent;
    use HTTP::Request;
    use HTTP::Response;
    $Url="http://$WebHost/maillist/createlist.php?Username=$Username&list_name=$list_name&list_cname=$list_cname&ModEmail=$ModEmail&function=$function";
    $ua = new LWP::UserAgent;				# �a�� UserAgent ���

    $ua->agent("Mozilla/8.0");   			#αװ��Netscape
    $request = new HTTP::Request('GET', $Url);		# �a�� Request ���
    $response = $ua->request($request);			# �_ʼץȡ�W퓣��K���Y������ $response
    if ($response->is_success) {			# ��ץȡ�W퓳ɹ����tӡ�� HTML ԭʼ�a
	$Doc=$response->content;
	#print $Doc;
    }
    else {						# ��ץȡ�W퓲��ɹ����tӡ���e�`ӍϢ
        print $response->error_as_HTML;
        exit;

    }