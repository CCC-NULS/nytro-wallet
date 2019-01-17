/*
* @Author: steven
* @Date:   2018-10-12 01:05:38
* @Last Modified by:   steven
* @Last Modified time: 2018-10-12 01:48:22
*/

(function(w) {

    "use strict";

    var collapse = {
        el: {},
        settings: {
            selector:   '[data-toggle="collapse"]',
            active:     'show'
        },
        init: function() {

            collapse.el.triggers = document.querySelectorAll(collapse.settings.selector);

            [].forEach.call(collapse.el.triggers, function(trigger) {
                trigger.addEventListener('click', function(e) {

                    var selector = this.getAttribute('data-target');
                    collapse.collapse(selector, this);

                    if (!trigger.classList.contains(collapse.settings.active)) {

                        trigger.classList.add(collapse.settings.active);

                    } else {

                        trigger.classList.remove(collapse.settings.active);

                    }
                    
                }, false);
            });

        },
        collapse: function(selector, trigger) {

            var targets = document.querySelectorAll(selector);
            
            [].forEach.call(targets, function(target) {

                if (!target.classList.contains(collapse.settings.active)) {

                    target.classList.add(collapse.settings.active);

                } else {

                    target.classList.remove(collapse.settings.active);

                }

            });
        }
    };

    w.addEventListener('load', collapse.init);

}(window));
