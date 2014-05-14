var ListOfTaskLists = function ListOfTaskLists (spec) {
	spec = spec || {};
    spec.lists = spec.lists || [];
    spec.name = spec.name || 'Task List';

  var	listOfTaskLists = [],
      that = {

        clearAll: function clearAll () {
            localStorage.clear();
            spec.lists = [];
            return [];
        },

        add: function add (list) {
            var newlen = spec.lists.push(list);
            localStorage.setItem(spec.name, JSON.stringify(spec.lists));
            return (newlen - 1); // index of new entry
        },

        remove: function remove (listId) {
            var removed = spec.lists.splice(listId, 1);
            localStorage.setItem(spec.name, JSON.stringify(spec.lists));
            return (removed.length > 0) ? true: false;
        },

        get: function get (listId) {
            return spec.lists[listId];
        },

        getAll: function getAll () {
            return spec.lists;
        },

        getName: function getName () {
            return spec.name;
        },

/*
        find: function find (task) {
            return spec.tasks.indexOf(task);
        },
*/
        search: function search (pattern, flags) {
            flags = flags || 'i';
            if (typeof pattern === 'string') {
                pattern = new RegExp(pattern, flags);
            }
            if (! pattern instanceof RegExp) {
                return [];
            } else {
                return spec.lists.filter(function (list) {
                    return pattern.test(list.name);
                });
            }
        }
    },
    localItems = localStorage.getItem(spec.name),
    tmpLists;

    if (localItems) {
        tmpLists = JSON.parse(localItems);
        if (tmpLists instanceof Array) {
            spec.lists = tmpLists;
        }
    }

    if (typeof Array.prototype.forEach === 'function') {
    // real browser, or IE >=9
        that.forEach = function forEach (fn) {
            spec.lists.forEach(fn);
        };
    } else {
    // last resort - fake it
        that.forEach = function forEach (fn) {
            var len = spec.lists.length,
            i = 0;

            if (typeof fn !== 'function') {
                throw new TypeError();
            }

            for ( ; i < len; i++) {
                fn.call(void 0, spec.lists[i], i, spec.lists);
            }
        };
    }

    return that;
};