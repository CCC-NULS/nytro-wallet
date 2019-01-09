/*
* @Author: steven
* @Date:   2018-10-10 02:33:37
* @Last Modified by:   steven
* @Last Modified time: 2018-10-18 21:04:57
*/

(function(w) {

    "use strict";

    var nav = {
        el: {},
        settings: {
            wrap:       '.navbar',
            sticky:     'fixed-top',
            item:       '.dropdown',
            trigger:    '.dropdown-toggle',
            content:    '.dropdown-menu',
            active:     'show'
        },
        init: function() {

            nav.dropdown();

        },
        dropdown: function(element) {

            nav.el.wrap = document.querySelector(nav.settings.wrap);

            if (!nav.el.wrap) { return; }

            nav.el.item = nav.el.wrap.querySelectorAll(nav.settings.item);

            for (var i = 0; i < nav.el.item.length; i++) {

                nav.el.trigger = nav.el.item[i].querySelector(nav.settings.trigger),
                nav.el.content = nav.el.item[i].querySelector(nav.settings.content);

                nav.el.trigger.addEventListener('click', function(e){

                	e.preventDefault();
                    nav.el.parent = this.closest(nav.settings.item);

                    if (!nav.el.parent) { return; }

                    nav.el.content = nav.el.parent.querySelector(nav.settings.content);

                    if (!nav.el.parent.classList.contains(nav.settings.active)) {

                        nav.el.parent.style.overflow = 'visible';
                        nav.el.parent.classList.add(nav.settings.active);
                        nav.el.content.classList.add(nav.settings.active);


                    } else {

                        nav.el.parent.classList.remove(nav.settings.active);
                        nav.el.content.classList.remove(nav.settings.active);
                        setTimeout(function() {nav.el.parent.style.overflow = 'hidden';}.bind(nav), 250);

                    }

                }, false);

            }

        }
    };

    w.addEventListener('load', nav.init);

}(window));
