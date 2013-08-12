// ==UserScript==
// @name        Robert Space Industries - Hide user posts/quotes
// @namespace   https://forums.robertsspaceindustries.com/
// @version     1
// @grant       none
// ==/UserScript==

var userNames = [ "firstUser", "secondUser" ];
var completeHidePosts = false;
var completeHideQuotes = false;

var posts = $("div.Comment");

posts.each(function(index ) {
    var post = $(this);
    
    // check Author in posts
    
    for (var i in userNames)
    {
        var hideUser = userNames[i];
        var check = post.find("div.header div.Author div.AuthorInfo a.Username:contains('"+hideUser+"');");
        if (check.length > 0)
        {
            if (completeHidePosts)
            {
                post.hide();
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
            }      
        }
        
        // check Author in quotes
        
        var quotes = post.find("div.section div.Message blockquote.UserQuote");

        quotes.each(function(index ) {    
            var quote = $(this);
            var check = quote.find("div.QuoteAuthor:contains('"+hideUser+"')");
            
            if (check.length > 0)
            {
                if (!completeHideQuotes)
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
                
                quote.hide();            
            }
        });
    }
});