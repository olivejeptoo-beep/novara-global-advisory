document.addEventListener('DOMContentLoaded', function(){
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
    });
  }

  var floating = document.getElementById('floatingCta');
  if(floating){
    window.addEventListener('scroll', function(){
      if(window.scrollY > 500){ floating.classList.add('visible'); }
      else{ floating.classList.remove('visible'); }
    }, { passive:true });
  }
});
