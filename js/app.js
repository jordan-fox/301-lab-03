'use strict';

ConstructPics.picArray = [];
ConstructPics.picArray2 = [];

// CONSTRUCTOR
function ConstructPics (hornPic) {
  this.image_url = hornPic.image_url;
  this.title = hornPic.title;
  this.description = hornPic.description;
  this.keyword = hornPic.keyword;
  this.horns = hornPic.horns;
}

// // show/hide functions
// function show(elem) {
//   elem.style.display = 'block';
// }

// function hide(elem){
//   elem.style.display = 'none';
// }

// copies photo-template and connects constructed info to DOM
ConstructPics.prototype.photoTemplate = function() {
  let hornClone = $('<div></div>');

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.attr('class', this.keyword);
  $('main').append(hornClone);
};

// Gets data from JSON, pushes it through the constructor and into an array
ConstructPics.readJson = () => {
  $.get('data/page1.json')
    .then(data => {
      data.forEach(item => {
        ConstructPics.picArray.push(new ConstructPics(item));
      });
      ConstructPics.picArray.forEach(hornPic => {
        $('main').append(hornPic.photoTemplate());
      });
    });
  // $.get('data/page2.json')
  //   .then(data => {
  //     data.forEach(item => {
  //       ConstructPics.picArray2.push(new ConstructPics(item));
  //     });
  //     ConstructPics.picArray2.forEach(hornPic => {
  //       $('main').append(hornPic.photoTemplate());
  //     });
  //   })
  //   .then(ConstructPics.changePage)
  //   .then(ConstructPics.filterImage)
  //   .then(ConstructPics.handlefilter);
};

ConstructPics.readJson2 = () => {
  $.get('data/page2.json')
    .then(data => {
      data.forEach(item => {
        ConstructPics.picArray2.push(new ConstructPics(item));
      });
      ConstructPics.picArray2.forEach(hornPic => {
        $('main').append(hornPic.photoTemplate());
      });
    });
};

ConstructPics.explodeJson = () => {
  $('document').ready();

  ConstructPics.readJson();
  ConstructPics.readJson2();

  ConstructPics.changePage();
  ConstructPics.filterImage();
  ConstructPics.handlefilter();
};

// renders each photo ------------
ConstructPics.loadPics = () => {
  ConstructPics.picArray.forEach(hornPic => hornPic.photoTemplate());
};

// $(() => ConstructPics.readJson());

// filter images and sorts by click
ConstructPics.filterImage = () => {
  let filterKey = [];

  $('option').not(':first').remove();

  ConstructPics.picArray.forEach(hornPic => {
    if (!filterKey.includes(hornPic.keyword)) filterKey.push(hornPic.keyword);
  });

  filterKey.sort();

  filterKey.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  });
};

ConstructPics.handlefilter = () => {
  $('select').on('change', function () {
    let $selected = $(this).val();
    if ($selected !== 'default') {
      $('div').hide();

      ConstructPics.picArray.forEach(hornPic => {
        if ($selected === hornPic.keyword) {
          $(`div[class="${$selected}"]`).addClass('filtered').fadeIn();
        }
      });
    }
  });
};

ConstructPics.changePage = () => {
  console.log('I am here!');
  $('document').ready();
  $('button').on('click', function(){
    $('div').remove();

    ConstructPics.picArray = [];
    ConstructPics.picArray2 = [];

    let buttonValue = $(this).val();
    if( buttonValue === 'page 1'){
      ConstructPics.readJson();
      $('div').show();
    } else if (buttonValue === 'page 2'){
      ConstructPics.readJson2();
      $('div').show();
    }
  });
};

// console.log(ConstructPics.picArray2);

ConstructPics.explodeJson();