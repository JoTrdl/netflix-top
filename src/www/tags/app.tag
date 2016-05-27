<app>
  <header category={state.category}></header>
  <div class="wrapper" onclick={close}>
    <section class="{focus: selected}">
      <h3 if={!state.items.hasError && !state.items.isFetching}>{state.title}</h3>
      <h3 class="message-status" if={state.items.hasError}>Sorry, something went wrong.</h3>
      <h3 class="message-status" if={state.items.isFetching}><p class="loading"><span>.</span><span>.</span><span>.</span></p></h3>
      <ul>
        <li each={this.state.items.data} no-reorder>
          <item data={this}></item>
        </li>
      </ul>
    </section>
  </div>
  <footer></footer>

  const store = opts.store;
  
  this.state = store.getState();

  store.subscribe(() => {
    this.state = store.getState();
    this.update();
  });

  riot.route('/top/*', (category) => {
    store.dispatch(store.actions.updateCategory(category));
    this.close();
  });
  riot.route.base('/');
  riot.route.start();

  this.open = function(item) {
    const state = item.opened;
    this.tags.item.forEach((i) => i.opened = false);
    item.opened = !state;
    this.selected = (item && item.opened) || null

    const colorsmap = this.opts.colorchart.get(item.root.querySelector('img'), 2, 10);
    var desc = item.root.querySelector('.description');
    document.body.style.backgroundColor = 'rgb(' + colorsmap[0].join(',') + ')';
    desc.style.color = 'rgb(' + colorsmap[1].join(',') + ')';
  }

  this.close = function(e) {
    if (e && e.target.href) {
      return true;
    } 
    this.tags.item && this.tags.item.forEach((i) => i.opened = false);
    this.selected = false;
    document.body.style.backgroundColor = ''
  }

</app>


