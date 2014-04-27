angular.module 'ngTestingApp'
  .animation '.panel-body', ->
    DURATION = 300
    DISTANCE = 50
    animateUp = (element, className, done) ->
      direction = switch className
        when 'up' then 1
        when 'down' then -1
      return if not direction?
      element.stop()
      element.css { top: 0, opacity: 1,  }
      dublicateElment = jQuery("<div>")
        .addClass(element.attr('class'))
        .css {
          position: 'absolute',
          top: element.offset().top,
          left: element.offset().left,
          opacity: 1,
          width: element.outerWidth(),
          'z-index': 100,
          'text-align': 'center'
        }
        .html(element.text())
        .appendTo jQuery('body')
      element.css { top: DISTANCE*direction, opacity: 0 }
      dublicateElment.animate { top: dublicateElment.position().top-(DISTANCE*direction), opacity: 0 }, DURATION, ->
        dublicateElment.remove()
      element.animate { top: 0, opacity: 1 }, DURATION, done()
      return (cancel) ->
        element.stop() if cancel
    {
      addClass: animateUp
    }
