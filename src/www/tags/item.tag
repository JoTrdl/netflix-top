<item class="{opened: opened}">
  <img onclick={open} data-src="{SERVICE_URL + '/cover/' + data.id}" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" crossorigin="anonymous"/>
  <div class="description">
    <h3>{data.title}</h3>
    <p>{data.description}</p>
    <a href="{data.link}" target="blank">{data.link}</a>
  </div>

  const isServer = !!(typeof window === 'undefined');

  this.data = opts.data;
  this.opened = false;

  open = function(e) {
    e.stopImmediatePropagation()
    this.parent.open(this);
  }

  this.lazyload = () => {
    var rect = this.root.getBoundingClientRect();

    const inView = rect.top >= 0 && rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 300 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    if (inView) {
      this.img.setAttribute('src', this.img.getAttribute('data-src'));
      window.removeEventListener('scroll', this.lazyload);
      window.removeEventListener('resize', this.lazyload);
    }
  };

  this.on('mount', function() {
    if (isServer) return;

    this.img = this.root.querySelector('img');
    document.addEventListener('scroll', this.lazyload);
    document.addEventListener('resize', this.lazyload);
    setTimeout(() => this.lazyload());
  })

  this.on('unmount', function() {
    if (isServer) return;
    window.removeEventListener('scroll', this.lazyload);
    window.removeEventListener('resize', this.lazyload);
  })

  
</item>
