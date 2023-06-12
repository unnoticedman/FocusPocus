document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('new-task-form');
    var input = document.getElementById('new-task-input');
    var list = document.getElementById('task-list');
  
    // Cargar tareas guardadas en el almacenamiento
    chrome.storage.sync.get('tasks', function (data) {
      if (data.tasks) {
        data.tasks.forEach(function (task) {
          addTaskToList(task);
        });
      }
    });
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var taskText = input.value;
      if (taskText) {
        input.value = '';
        chrome.storage.sync.get('tasks', function (data) {
          var tasks = data.tasks || [];
          tasks.push({ text: taskText });
          chrome.storage.sync.set({ tasks: tasks }, function () {
            updateTaskList();
          });
        });
      }
    });
  
    function updateTaskList() {
      chrome.storage.sync.get('tasks', function (data) {
        list.innerHTML = '';
        if (data.tasks) {
          data.tasks.forEach(function (task) {
            addTaskToList(task);
          });
        }
      });
    }
  
    function addTaskToList(task) {
      var li = document.createElement('li');
      li.className = 'task';
      var span = document.createElement('span');
      span.textContent = task.text;
      span.contentEditable = true;
      span.addEventListener('input', function () {
        task.text = span.textContent;
        updateTaskInStorage(task);
      });
      li.appendChild(span);
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', function () {
        removeTaskFromList(li, task);
      });
      li.appendChild(deleteButton);
      list.appendChild(li);
    }
  
    function removeTaskFromList(li, task) {
      list.removeChild(li);
      chrome.storage.sync.get('tasks', function (data) {
        var tasks = data.tasks || [];
        var taskIndex = tasks.findIndex(function (t) {
          return t.text === task.text;
        });
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
          chrome.storage.sync.set({ tasks: tasks });
        }
      });
    }
  
    function updateTaskInStorage(task) {
      chrome.storage.sync.get('tasks', function (data) {
        var tasks = data.tasks || [];
        var existingTask = tasks.find(function (t) {
          return t.text === task.text;
        });
        if (existingTask) {
          existingTask.text = task.text;
          chrome.storage.sync.set({ tasks: tasks });
        }
      });
    }
  });
  