var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: $( '#books' ),

	initialize: function() {
		this.collection = new app.Library();
		this.collection.fetch();
		this.render();

		this.listenTo( this.collection, 'add', this.renderBook );
		this.listenTo( this.collection, 'reset', this.render );
	},

	events: {
		'click #add': 'addBook',
		'click #clear': 'clearBookInput'
	},

	addBook: function( e ) {
		//jquery method
		//If this method is called, the default action of the event will not be triggered.
		//For example, clicked anchors will not take the browser to a new URL. We can use event.isDefaultPrevented()
		//to determine if this method has been called by an event handler that was triggered by this event.
		e.preventDefault();

		var formData = {};

		$( '#addBook div' ).children( 'input' ).each( function( i, el ) {
			if( $( el ).val() !== "" )
			{
				if( el.id === 'keywords' ) {
					console.log( el.id );
					formData[ el.id ] = [];
					_.each( $( el ).val().split( ' ' ), function( keyword ) {
						formData[ el.id ].push({ 'keyword': keyword });
					});
				} else if( el.id === 'releaseDate' ) {
					formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
				} else if( el.id === 'coverImage' ) {
					formData[ el.id ] = '/img/' + $( '#coverImage' ).val().replace("fakepath","").replace("C:","");//regexp for Chrome
				} else {
					formData[ el.id ] = $( el ).val();
				}
			}
		});

		console.log ( formData );
		this.collection.create( formData );
	},

	// render library by rendering each book in its collection
	render: function() {
		console.log(this.collection.at(0)); //also not working, I have to figure out how to access Backbone collection
		console.log(this.collection);
		console.log(this.collection.models);
		this.collection.each( function(item) {
			_.each(item, console.log);
		});//not working
		$.each(this.collection, function(i, item) {
			$.each(item, function( k,v ) {
				console.log(v);
			})
		});//not working
		this.collection.each(function( item ) {
		//OK, I got to fiddle with underscore and Backbone collections a bit
			this.renderBook( item );
		}, this );
	},

	// render a book by creating a BookView and appending the
	// element it renders to the library's element
	renderBook: function( item ) {
		var bookView = new app.BookView({
			model: item
		});
		this.$el.append( bookView.render().el );
	},

	// clearBookInput: $(function() {
 //        $('#clear').on('click', function() {
 //            $('#addBook div input:text').val('');
 //        });
 //    })

});
