$(document).ready(function () {
  new Splide('.splide', {
    type: 'loop',
    arrows: true,
    rewind: true,
    speed: 1000,
    width: '70%',
    autoplay: true,
    interval: 2000,
    pagination: false,
  }).mount()

  class StickyNavigation {
    constructor() {
      this.currentId = null
      this.currentTab = null
      this.tabContainerHeight = 70
      let self = this
      $('.et-hero-tab').click(function () {
        self.onTabClick(event, $(this))
      })
      $(window).scroll(() => {
        this.onScroll()
      })
      $(window).resize(() => {
        this.onResize()
      })
    }

    onTabClick(event, element) {
      event.preventDefault()
      let scrollTop =
        $(element.attr('href')).offset().top - this.tabContainerHeight + 1
      $('html, body').animate({ scrollTop: scrollTop }, 600)
    }

    onScroll() {
      this.checkTabContainerPosition()
      this.findCurrentTabSelector()
    }

    onResize() {
      if (this.currentId) {
        this.setSliderCss()
      }
    }

    checkTabContainerPosition() {
      let offset =
        $('.et-hero-tabs').offset().top +
        $('.et-hero-tabs').height() -
        this.tabContainerHeight
      if ($(window).scrollTop() > offset) {
        $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top')
      } else {
        $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top')
      }
    }

    findCurrentTabSelector(element) {
      let newCurrentId
      let newCurrentTab
      let self = this
      $('.et-hero-tab').each(function () {
        let id = $(this).attr('href')
        let offsetTop = $(id).offset().top - self.tabContainerHeight
        let offsetBottom =
          $(id).offset().top + $(id).height() - self.tabContainerHeight
        let scrollTop = $(window).scrollTop() + window.outerHeight / 2

        if (scrollTop > offsetTop && scrollTop < offsetBottom) {
          newCurrentId = id
          newCurrentTab = $(this)
        }
      })
      if (this.currentId != newCurrentId || this.currentId === null) {
        this.currentId = newCurrentId
        this.currentTab = newCurrentTab
        this.setSliderCss()
      }
    }

    setSliderCss() {
      let width = 0
      let left = 0
      if (this.currentTab) {
        width = this.currentTab.css('width')
        left = this.currentTab.offset().left
      }
      $('.et-hero-tab-slider').css('width', width)
      $('.et-hero-tab-slider').css('left', left)
    }
  }

  new StickyNavigation()
})
