var app = app || {};

app.Book = Backbone.Model.extend({
	defaults: {
		_id: '',
		coverImage: 'img/placeholder.png',
		title: 'no title',
		author: 'Unknown',
		releaseDate: 'Unknown',
		keywords: 'none',
	},

	parse: function( response ) {
    	response.id = response._id;
    return response;
	}
});
