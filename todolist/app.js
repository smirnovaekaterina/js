$(function () {
    const buttonEnter = $('#enter')
    const userInput = $('#userInput')
    const ul = $('ul')
  
    const items = JSON.parse(localStorage.getItem('todos') || '[]');
  
    function saveItems() {
      localStorage.setItem('todos', JSON.stringify(items))
    }
  
    function addItem(text) {
      const item = {
        id: Date.now(),
        text,
        done: false,
      };
  
      items.push(item);
      saveItems();
  
      return item;
    }
  
    function removeItem(id) {
      const idx = items.findIndex(i => i.id === id)
  
      if (idx > -1) {
        items.splice(idx, 1)
      }
  
      saveItems();
    }
  
    function toggleItem(id) {
      const idx = items.findIndex(i => i.id === id)
  
      if (idx > -1) {
        items[idx].done = !items[idx].done;
      }
  
      saveItems();
    }
  
    function createItemDOM(item) {
      const id = item.id;
      const li = $('<li>')
      const date = new Date(item.id);
      const dateString = date.getDate() + "." + (date.getMonth() + 1) + " " + date.getHours() + ":" + date.getMinutes();
      const text = item.text;
      li.html("<span>" + text + "</span><span class='d'>" + dateString + "</span>");
      li.html();
      ul.append(li)
  
      li.click(function() {
        toggleItem(id)
        $(this).toggleClass('done')
      })
  
      if (item.done) {
        li.toggleClass('done')
      }
  
      const deleteButton = $('<button>')
      deleteButton.html('x')
      li.append(deleteButton)
      deleteButton.click(function () {
        removeItem(id);
        li.remove();
      })
    }
  
    function renderItems() {
      ul.html('');
  
      items.forEach((i) => {
        createItemDOM(i)
      });
    }
  
    function inputLength() {
        return userInput.val().length > 0
    }
  
    function createTodo() {
      const item = addItem(userInput.val())
      createItemDOM(item);
      userInput.val('')
    }
  
    function changeListAfterKeypress(event) {
        if (inputLength() && event.which == 13) {
          createTodo()
        }
    }
  
    function changeListAfterClick() {
        if (inputLength()) {
            createTodo()
        }
    }
  
    userInput.keypress(changeListAfterKeypress)
    buttonEnter.click(changeListAfterClick);
  
    renderItems();
  });