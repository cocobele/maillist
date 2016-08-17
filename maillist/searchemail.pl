#!/usr/bin/perl


require "common.pl";
require "func_google.pl";
require "func_baidu.pl";


###############################从一个字符串中解析出所有的Email，并校验/过滤重复Email，结果存入@gotaddresses中
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

##################################开始正文
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
 alert('非法操作！');
 history.back();
 </script>";
 exit;
}

if(length($key) < 5){
 print "
 <script>
 alert('您输入的关键字不正确，请重新输入！');
 history.back();
 </script>";
 
 exit;
}

#&Main_GoogleParse($key);
&Main_BaiduParse($key);

&Tail();