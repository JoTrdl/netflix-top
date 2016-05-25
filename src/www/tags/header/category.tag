<category>
  <select onchange={change}>
    <option each="{ value, text in options }" value="{value}" selected="{value==selected}">{text}</option>
  </select>

  this.selected = opts.category;

  this.options = {
    '100': 'Top 100',
    new: 'New Releases',
    action: 'Action & Adventure',
    anime: 'Anime & Animation',
    children: 'Children & Family',
    classic: 'Classics',
    comedy: 'Comedy',
    documentary: 'Documentary',
    drama: 'Drama',
    faith: 'Faith & Spirituality',
    foreign: 'Foreign',
    gay: 'Gay & Lesbian',
    horror: 'Horror',
    independent: 'Independent',
    music: 'Music & Musicals',
    romance: 'Romance',
    fantasy: 'Sci-Fi & Fantasy',
    special: 'Special Interest',
    sports: 'Sports & Fitness',
    shows: 'TV Shows',
    thriller: 'Thrillers'
  };

  change(e) {  
    riot.route('top/' + e.target.value);
  }

</category>

  
