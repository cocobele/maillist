$(function() {
    $('.sidebar-ul').find('.sidebar-h3').first().click();
    //通过value模拟placeholder，插件的方法
    $('#searchIpt').placeholder();
    
})
// 侧边栏的点击加载内容
$('.sidebar-h3').on('click', function() {
    $('.result-ul').hide();
    $('.sidebar').find('h3').removeClass('h3-selected');
    $(this).addClass('h3-selected');
    $('.question-ul').empty();
    var no1 = $(this).parent().index() - 1;
    var content = questions[no1].content;
    for (var i = 0; i < content.length; i++) {
        var order = i + 1 + '. '; //问题的序号
        var q = content[i].q; //问题
        var a = content[i].a; //问题答案
        var li = $('<li><h4><span>' + order + '</span>' + q + '</h4><p>' + a + '</p></li>')
        li.appendTo($('.question-ul'));
    }
    $('.question-ul').show();
    bindAnswerShow();

})
$('.sidebar-h3').hover(function() {
    if ($(this).attr('class') != 'h3-selected') {
        $(this).addClass('h3-hover');
    }
}, function() {
    $(this).removeClass('h3-hover');
});
// 点击搜索结果显示搜索结果

function bindResultShow() {
    $('#sidebar_search_h3').on('click', function() {
        $('.question-ul').hide();
        $('.result-ul').show();
        $('.sidebar').find('h3').removeClass('h3-selected');
        $(this).addClass('h3-selected');
    })
}
// 问题显示区，点击标题显示内容

function bindAnswerShow() {
    $('.question-area').find('h4').on('click', function() {
        $(this).parent().siblings().find('p').hide();
        $(this).next().toggle();
    })
}




$('#searchIpt').bind('keypress', function(event) {
    if (event.keyCode == "13") {
        $('#searchBtn').trigger("click");
    }
});
// 搜索功能
$('#searchBtn').on('click', function() {
    var keyWord = $('#searchIpt').val().replace(/^\s+/, '').replace(/\s+$/, '');
    if (keyWord != '') {
        $('.sidebar-h3').removeClass('h3-selected');
        $('#sidebar_search_h3').show().addClass('h3-selected'); //显示侧边栏"搜索结果"

        $('.result-ul').empty();
        var keyWord = $('#searchIpt').val()
        var order = 1;
        for (var m = 0; m < questions.length; m++) {
            var content = questions[m].content;
            for (var n = 0; n < content.length; n++) {
                var q = content[n].q;
                var a = content[n].a;
                var keyReg = new RegExp("(" + keyWord + ")", "g");
                if (keyReg.test(q) || keyReg.test(a)) {
                    q = q.replace(keyReg, '<span class="key-word">' + keyWord + '</span>');
                    a = a.replace(keyReg, '<span class="key-word">' + keyWord + '</span>');
                    var li = $('<li><h4><span>' + ((order++) + '. ') + '</span>' + q + '</h4><p>' + a + '</p></li>');
                    li.appendTo($('.result-ul'));
                }
            }
        }
        $('.question-ul').hide();
        $('.result-ul').show();
        bindResultShow();
    }
    bindAnswerShow();
})
