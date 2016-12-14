
/* FADE: Fade animations (fade in and fade out methods):
 *****************************************************************************************************************/

const FADE = (o) => { o.element.style.opacity = (o.fadeType === 'fadeIn') ? 0 : 1;
  
  // IN is a fade in method:
  const IN = () => { 
      o.element.style.opacity = +o.element.style.opacity + o.fadeSpeed;
      if (+o.element.style.opacity < 1) (window.requestAnimationFrame && requestAnimationFrame(IN)) || setTimeout(IN, 16);
  };

  // Out is a fade out method:
  const OUT = () => {
      o.element.style.opacity = +o.element.style.opacity - o.fadeSpeed;
      if (+o.element.style.opacity > 0) (window.requestAnimationFrame && requestAnimationFrame(OUT)) || setTimeout(OUT, 16);
  };

  // If fadeType in the object passed is 'fadeIn", have the element fade in — or else have it fade out:
  o.fadeType === 'fadeIn' ? IN() : OUT();
};
