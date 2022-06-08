export const animate = (nodes) => {
  const blockObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.visibility = 'inherit';
        entry.target.style.opacity = 1;

        if (entry.target.dataset.animateFly) {
          entry.target.style.transform = 'translateY(0)';
        }

        if (entry.target.dataset.animateDelay) {
          entry.target.style.transitionDelay = entry.target.dataset.animateDelay + 'ms';
        }

        observer.unobserve(entry.target);
      }
    });
  }, {});

  nodes.forEach((node) => blockObserver.observe(node));
}

export const lazyLoadImages = (nodes, parent = null, margin = '0px') => {
  const blockObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {

        switch (entry.target.dataset.entry) {
          case 'background':
            entry.target.style.backgroundImage = `url(${entry.target.dataset.src})`;
            break;
          case 'img':
            entry.target.src = entry.target.dataset.src;
            break;
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    root: parent,
    rootMargin: margin
  });

  nodes.forEach((node) => blockObserver.observe(node));
}