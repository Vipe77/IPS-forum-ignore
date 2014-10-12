// ==UserScript==
// @name                        Vipe's yarportal ignore thread/post/quote
// @namespace                   http://yarportal.ru/
// @description	                Based on opicron/RSI-forum-ignore-script.
// @version                     0.1.141012
// @grant                       none
// @include                     http://yarportal.ru/*
// @include                     http://www.yarportal.ru/*
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

var Users = [
                {userName: "Joy",		hideThread: true,  hidePost: true,  hideQuote: true},                
                {userName: "Папа",		hideThread: true,  hidePost: true,  hideQuote: true},                
                {userName: "xx",		hideThread: true,  hidePost: true,  hideQuote: true},                
            ];

// process threads

if (~window.location.pathname.IndexOf('/forum'){

var threads = $("ul.Discussions li.ItemDiscussion");

threads.each( function(index) {
    var thread = $(this);

    for (var id in Users)
    {
        var hideUser = Users[id].userName;
        var hideThread = Users[id].hideThread;

        if (hideThread)
        {
            var check = thread.find("div.Discussion div.started-by div.text p.started-name a:contains('"+hideUser+"')");

            if (check.length > 0)
            {
                
                // hide thread

                thread.hide();
                
            }
        }
    }
});
}

// process posts

var posts = $("div.Comment");

posts.each(function(index ) {
    var post = $(this);
    
    // check Author in posts
    
    for (var id in Users)
    {
        var hideUser = Users[id].userName;
        var hidePost = Users[id].hidePost;
        var hideQuote = Users[id].hideQuote;

        var check = post.find("div.header div.Author div.AuthorInfo a.Username:contains('"+hideUser+"');");
        if (check.length > 0)
        {
            if (hidePost)
            {            
                // hide post

                post.parent().hide();      
            }
            else
            {
                var article = post.find("div.section div.article").hide();
                article.before("<div class='article'><a class='ignoreUser'>Show hidden post</a></div>");
                
                post.find("a.ignoreUser").click( function() {
                    var article = $(this).parent().next("div.article");
                    if (article.is(":visible"))
                    {
                        $(this).text("Show hidden post");                
                        article.hide();
                    }
                    else
                    {
                        $(this).text("Hide post");
                        article.show();
                    }
                     
                });    

                // hide signature

                post.find("div.UserSignature").hide();
            }      
        }
        
        // check Author in quotes
        
        var quotes = post.find("div.section div.Message blockquote.UserQuote");

        quotes.each(function(index ) {    
            var quote = $(this);
            var check = quote.find("div.QuoteAuthor:contains('"+hideUser+"')");
            
            if (check.length > 0)
            {
                if (!hideQuote)
                {                 
                    quote.before("<div><a class='ignoreLink'>Toggle visbility quote from "+hideUser+"</a> <a class='QuoteFolding' href=''>» show previous quotes</a></div>");
                    var ignoreLink = $("a.ignoreLink:last");
                    ignoreLink.click(function() {
                        $(this).next().click();                
                    }); 
                    ignoreLink.next().hide();
                    
                    quote.addClass("QuoteFolded");
                    
                    quote.after("<br>");               
                }
                
                // hide quote

                quote.hide();            
            }
        });
    }
});
