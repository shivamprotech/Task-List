const form = document.querySelector('#task-form');

const taskList = document.querySelector('.collection');

const clearBtn = document.querySelector('.clear-tasks');

const filter = document.querySelector('#filter');

const taskInput = document.querySelector('#task');

// Loadd All Event Listeners

loadAllEventListener();

// Loadd All Event Listeners Function

function loadAllEventListener() {

	// DOM load Event

	document.addEventListener('DOMContentLoaded',getTasks);

	form.addEventListener('submit',addTask);

	// Remove Task Event 

	taskList.addEventListener('click',removeTask);

	// Clear Task Event

	clearBtn.addEventListener('click',clearTasks);

	// Filter Task

	filter.addEventListener('keyup',filterTask);

}

// get Task

function getTasks() {
	// body...


	let tasks;

	if(localStorage.getItem('tasks') === null)
	{
		tasks = [];
	}
	else
	{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task) {
		// body...


	// Create li Element

	const li = document.createElement('li');

	// ADD Class
	
	li.className = 'collection-item';

	// craete Text node and append to li

	li.appendChild(document.createTextNode(task));

	// create a new link element

	const link = document.createElement('a');

	// add class

	link.className = 'delete-item secondary-content';

	//add icon as inner Html

	link.innerHTML = '<i class="fa fa-remove"></i>';

	// Append The Link to li

	li.appendChild(link);

	// Append li to Ul

	taskList.appendChild(li);

	})

}

// Add Task

function addTask(e)
{
	if(taskInput.value === '')
	{
		alert('Out of Task');
	}

	// Create li Element

	const li = document.createElement('li');

	// ADD Class
	
	li.className = 'collection-item';

	// craete Text node and append to li

	li.appendChild(document.createTextNode(taskInput.value));

	// create a new link element

	const link = document.createElement('a');

	// add class

	link.className = 'delete-item secondary-content';

	//add icon as inner Html

	link.innerHTML = '<i class="fa fa-remove"></i>';

	// Append The Link to li

	li.appendChild(link);

	// Append li to Ul

	taskList.appendChild(li);

	// Store Task

	storeTaskInLocalStorage(taskInput.value);

	// Clear Input

	taskInput.value = '';

	e.preventDefault();
}

// Store Task In local Storage

function storeTaskInLocalStorage(task) {
	// body...

	let tasks;

	if(localStorage.getItem('tasks') === null)
	{
		tasks = [];
	}
	else
	{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Remove Task

function removeTask(e) {

	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are You Sure'))
		{	
			e.target.parentElement.parentElement.remove();	

			// Remove From LS

			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove From LS

function removeTaskFromLocalStorage(taskItem) {
	// body...

	if(localStorage.getItem('tasks') === null)
	{
		tasks = [];
	}
	else
	{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task,index)
	{	
		if(taskItem.textContent === task)
		{
			tasks.splice(index,1);
		}
	});

localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Clear Tasks Function

function clearTasks(e) {
	// body...
	// taskList.innerHTML = '';

	// Faster Method
	if(confirm('Are You Sure YoU Want to Delete All'))
	{
		while(taskList.firstChild)
		{
			taskList.removeChild(taskList.firstChild);
		} 	
	}

	// Clear Task from ls

	clearTasksFromLocalStorage();

	e.preventDefault();
}

function clearTasksFromLocalStorage() {
	// body...

	localStorage.clear();
}


// filter task

function filterTask(e) {
	// body...

	const text = e.target.value.toLowerCase();

	document.querySelectorAll('li.collection-item').forEach(function(task){

		const item = task.firstChild.textContent;

		if(item.toLowerCase().indexOf(text) != -1)
		{
			task.style.display = 'block';
		}
		else
		{
			task.style.display = 'none';
		}
	});
}















