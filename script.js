'use strict';

/**
 * IMDB Top 10 Movie list -- No API calls (yet)
 */

/////////////////////////////////////////////////////////////////////////////
//////////////////////////      VARIABLE & INIT       ///////////////////////
/////////////////////////////////////////////////////////////////////////////

// Templates for messages
let movieListRowTemplate = '<tr><td>INSERT_ID_HERE</td><td>INSERT_TITLE_HERE</td><td>INSERT_RANK_HERE</td></tr>';
let movieIdReplacePattern = 'INSERT_ID_HERE';
let movieTitleReplacePattern = 'INSERT_TITLE_HERE';
let movieRankReplacePattern = 'INSERT_RANK_HERE';

// Messages
let movies = [
    {
        title: "Fight Club",
        rank: 10,
        id: "tt0137523"
    },
    {
        title: "The Shawshank Redemption",
        rank: 1,
        id: "tt0111161"
    },
    {
        title: "The Lord of the Rings: The Return of the King",
        rank: 9,
        id: "tt0167260"
    },
    {
        title: "The Godfather",
        rank: 2,
        id: "tt0068646"
    },
    {
        title: "The Good, the Bad and the Ugly",
        rank: 5,
        id: "tt0060196"
    },
    {
        title: "The Godfather: Part II",
        rank: 3,
        id: "tt0071562"
    },
    {
        title: "The Dark Knight",
        rank: 6,
        id: "tt0468569"
    },
    {
        title: "Pulp Fiction",
        rank: 4,
        id: "tt0110912"
    },
    {
        title: "Schindler's List",
        rank: 8,
        id: "tt0108052"
    },
    {
        title: "12 Angry Men",
        rank: 7,
        id: "tt0050083"
    }
]

let sortDirection = {
    Asc: 0,
    Desc: 1
}

/////////////////////////////////////////////////////////////////////////////
//////////////////////////            CODE            ///////////////////////
/////////////////////////////////////////////////////////////////////////////
let currentAttributeSelected = null;

window.onload = function() {

  $('#sortButtonById').click(() => sortMoviesByAttribute($('#sortButtonById')));
  $('#sortButtonByTitle').click(() => sortMoviesByAttribute($('#sortButtonByTitle')));
  $('#sortButtonByRank').click(() => sortMoviesByAttribute($('#sortButtonByRank')));
  
  sortMoviesByAttribute($('#sortButtonById'));

  $('input[name=directionOfSorting]').click(sortList);
}

function sortList() {
    sortMoviesByAttribute(currentAttributeSelected);
}

function getSortDirection(){
    if($('#Asc').is(':checked')) return sortDirection.Asc;

    return sortDirection.Desc;
}

function sortMoviesByAttribute(sender) {
    let attribute = $(sender).attr('data-imdb-attribute');
    displayMovies(sortMoviesByAttr(movies, attribute, getSortDirection()));
    
    $('#AttributeSortingChoices .btn').removeClass('active');
    $(sender).addClass('active');
    currentAttributeSelected = $(sender);
}

function displayMovies(movieList){
    let tableRows = '';
    
    movieList.forEach((movie) => {

        tableRows += movieListRowTemplate
                            .replace(movieIdReplacePattern, movie.id)
                            .replace(movieTitleReplacePattern, movie.title)
                            .replace(movieRankReplacePattern, movie.rank);
    });
    
    $('#movieListBody').html(tableRows);
}

function sortMoviesByAttr(movieList, sortAttr, direction){
  return movieList.sort(function(a,b) { 
        
    if (direction === sortDirection.Desc) {
        if (a[sortAttr] < b[sortAttr]) return 1;
        if (a[sortAttr] > b[sortAttr]) return -1;
    } else {
        if (a[sortAttr] < b[sortAttr]) return -1;
        if (a[sortAttr] > b[sortAttr]) return 1;
    }

    return 0;
  });
}

