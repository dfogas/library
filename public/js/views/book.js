var app = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    template: _.template( $( '#bookTemplate' ).html() ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.attributes ) );

        return this;
    },

    events: {
    	'click .delete': 'deleteBook',
        'click .editBook': 'editBook',
        'click .saveEdit': 'saveEdit',
        'click .cancelEdit': 'cancelEdit'
    },

    'deleteBook': function() {
    	//underscore or backbone
    	this.model.destroy();
        //jquery or native
    	this.remove();
    },

    'editBook': function() {
        $ul = this.$el.find('ul');
        $ul.find('li input.title').val( $ul.find('li span.title').html() );
        $ul.find('li input.author').val( $ul.find('li span.author').html() );
        $ul.find('li input.releaseDate').val( $ul.find('li span.releaseDate').html() );
        $ul.find('li input.keywords').val( $ul.find('li span.keywords').html() );
        $ul.addClass('edit');
    },

    'saveEdit': function() {
        $ul = this.$el.find('ul');
        var keywordsData = {};
            keywordsData.keywords = [];
        _.each( $ul.find('li input.keywords').val().split(" "), function(keyword) { keywordsData.keywords.push({ 'keyword': keyword }); });
        var book = {
            title: $ul.find('li input.title').val(),
            author: $ul.find('li input.author').val(),
            releaseDate: $ul.find('li input.releaseDate').val(),
            keywords: keywordsData.keywords,
            // coverImage: $.ajax({
            //     type: 'GET',
            //     url: 'api/books/' + $ul.attr('data-id'),
            //     dataFilter: function (data,type) {
            //         if(type === 'json') {
            //             var parsed_data = JSON.parse(data);
            //             return parsed_data.coverImage;
            //         } else {
            //             return data;
            //         }
            //     },
            //     success: function(parsed_data) {console.log(parsed_data.coverImage);}
            // })
        };    

        
        var keywStr = "";
        for ( i = 0; i < book.keywords.length; i++) {
            keywStr = keywStr + " " + JSON.stringify(book.keywords[i]);
        }
        keywStr = keywStr.replace( /keyword|"|{|}|:/g,"" );
        
    
        $.ajax({
            type: 'PUT',
            url: 'api/books/' + $ul.attr('data-id'),
            data: book,
            success: function() {
                //console.log($ul.attr('data-id'));
                //console.log($ul.find('li input.keywords').val());
                //console.log(keywordsData.keywords);
                console.log(book.keywords);
                console.log(keywStr);
                $ul.find('li span.title').html(book.title);
                $ul.find('li span.author').html(book.author);
                $ul.find('li span.releaseDate').html(book.releaseDate);
                $ul.find('li span.keywords').html(keywStr);
                $ul.removeClass('edit');  
            },
            error: function() {
                console.log('Error updating order');
            }
        });
    },

    'cancelEdit': function() {
        this.$el.find('ul').removeClass('edit');
    }


});