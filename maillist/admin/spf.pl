#!/usr/bin/perl

use Mail::SPF;
    
my $spf_server  = Mail::SPF::Server->new();
    
my $request     = Mail::SPF::Request->new(
        versions        => [1, 2],              # optional
        scope           => 'helo',             # or 'helo', 'pra'
        identity        => 'service@mail001.org',
        ip_address      => '115.47.7.73',
        helo_identity   => 'mail.mail001.org'    # optional,
                                                #   for %{h} macro expansion
    );
    
    my $result      = $spf_server->process($request);
    
    print("$result\n");
    my $result_code     = $result->code;        # 'pass', 'fail', etc.
    my $local_exp       = $result->local_explanation;
    my $authority_exp   = $result->authority_explanation
        if $result->is_code('fail');
    my $spf_header      = $result->received_spf_header;