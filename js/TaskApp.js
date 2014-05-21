var TaskApp = function TaskApp () {
  var // listOfLists = ListOfLists(),
    taskListUI = TaskListUI(),
    that = {

        init: function init(taskList) {
            $( document ).on("pagecreate", "lol-page", function () {
                taskListUI.loadListOfLists(taskList);
            });

            // load task lists on page
            $( document ).on("pagecreate", "#task-page", function () {
                taskListUI.loadTaskList();
            });
        }
    };

    return that;
}

var TaskListUI = function TaskListUI () {
    var taskList;

    var  that = {
        addList: function addList (list) {
            var listId = taskList.add(list);
            that.displayList(list, listId);
        },

        displayList: function displayList (list, listId) {

            $('#lol-list').append(
                  [
                      '<li id="', list.name, '">',
                      '<a href="#list-page">',
                      '</a>',
                      '<a href="#" class="delete">',
                      'Delete',
                      '</a>',
                    '</li>'
                  ].join('')
            );
            $('#' + listId + ' .delete').on( "click", function () {
                that.removeList($(this).parent('li'));
            });
            $('#lol-list').listview('refresh');
        },

        removeList: function removeList (listItem) {
            var listId = listItem.attr("id");

            if (taskList.remove(listId)) {
                listItem.remove();
                $('#lol-list').listview('refresh');
            }
        },

        loadListOfLists: function loadListOfLists (listOfLists) {
            lists = listOfLists;

            $("form :input").on("keypress", function(e) {
                return e.keyCode != 13;
            });

            $('#lol-page-title').html(lists.getName());

            taskList.forEach(that.displayList);

 /*           $( '#add' ).on("click", function () {
                var listname = $('#listname').val(),
                that.addList({ name: listname });
                $( '#listname' ).val('');
            });
*/
        }

    }

    return that;

};
