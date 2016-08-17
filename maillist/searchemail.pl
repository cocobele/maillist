#!/usr/bin/perl


require "common.pl";
require "func_google.pl";
require "func_baidu.pl";


###############################��һ���ַ����н��������е�Email����У��/�����ظ�Email���������@gotaddresses��
sub ExtractEmail{

    local($Content)=@_;

# YOUR RESULTS EMAIL ADDRESSES result_txt.txt

        $indexposition = 0;
        $getoutvar = "NO";
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
                        

                        # IS IT DEFINATELY A CORRECT EMAIL ADDRESS?
                        unless ($theaddress =~ /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/ || $theaddress !~ /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/)
                        {
            			
                                $pushit = "YES";

                                 ###IS IT A DUPLICATE?
                                foreach $gotaddress (@gotaddresses)
                                {
                                        if ($gotaddress eq $theaddress)
                                        {
                                                $pushit = "NO";
                                                last;
                                        }
                                }
                                if ($pushit eq "YES")
                                {
                                        push(@gotaddresses,$theaddress);
                                }

                        }
                        

                        $indexposition = $indexposition + 2;
                }
                else
                {
                        $getoutvar = "YES";
                }
        }


}

##################################��ʼ����
&Head();

&ReadCGI();

$MailData_Dir="/home/httpd/bizsky/maillist/mail";
$MailData_HttpDir="/maillist/mail";
$key=$form{key};
$Username=$form{Username};
$DeepSearch=$form{Search};

if($Username eq ""){
 print "
 <script>
 alert('�Ƿ�������');
 history.back();
 </script>";
 exit;
}

if(length($key) < 5){
 print "
 <script>
 alert('������Ĺؼ��ֲ���ȷ�����������룡');
 history.back();
 </script>";
 
 exit;
}

#&Main_GoogleParse($key);
&Main_BaiduParse($key);

&Tail();