const container = document.querySelector("#container");

container.innerHTML =
	`<div>
		<h2>Список задач</h2>
		<form>
			<input type="text" placeholder="введите задачу" style="margin-bottom: 5px"></input>
				<button type='submit'>Добавить</button>
		</form>
		<ul class='list'></ul>
	</div>`;

const list = document.querySelector(".list"),
	input = document.querySelector("input"),
	// button = document.querySelector("button"),
	form = document.querySelector("form");

let tasks = [];


if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'))

}

tasks.forEach(function (item) {

	const cssClass = item.done ? 'li liDone' : 'li';


	const taskHTML = `<li id='${item.id}' class='${cssClass}' style="margin-bottom: 5px" contenteditable="true">
			${item.text}
			<button class='btn done'>v</button>
			<button class='btn del'>х</button>
			<button class='btn data'>${item.dayNumber}.0${item.month + 1}.${item.year}</button>
		</li>
		`;

	list.insertAdjacentHTML("afterbegin", taskHTML);
})


form.addEventListener("submit", addTask);

function addTask(e) {
	e.preventDefault();

	let taskText = input.value;

	let date = new Date();

	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear()
	};

	tasks.push(newTask);

	setLocal()

	const cssClass = newTask.done ? 'li liDone' : 'li';



	const taskHTML = `<li id='${newTask.id}' class='${cssClass}' style="margin-bottom: 5px" contenteditable="true">
			${newTask.text}
			<button class='btn done'>v</button>
			<button class='btn del'>х</button>
			<button class='btn data'>${newTask
			.dayNumber}.0${newTask.month + 1}.${newTask.year}</button>
		</li>
		`;

	list.insertAdjacentHTML("afterbegin", taskHTML);

	input.value = "";
	input.focus();
}

list.addEventListener('click', dellTask)
list.addEventListener('click', doneTask)

function dellTask(event) {

	if (event.target.classList.contains('del') !== true) return

	const parent = event.target.closest('.li')

	const id = parent.id
	console.log(id);

	// 1-йвариант:  находим  элемент  в  массиве, вернее его  индекс  через  метод findIndex
	/*
		let indx = tasks.findIndex(function (el) {
			if (el.id == id) {
				return true
			}
		})

		tasks.splice(indx, 1);	
	*/

	//2-й вариант: просто фильтруем имеющийся массив  tasks.  
	tasks = tasks.filter(function (el) {
		if (el.id == id) {
			return false
		} else {
			return true
		}
	})

	setLocal()

	parent.remove();

}

function doneTask(event) {

	if (event.target.classList.contains('done') !== true) return

	const parent = event.target.closest('.li')

	const id = parent.id

	//3-й  вариант:  Поиск  задачи через метод find

	const task = tasks.find(function (el) {
		if (el.id == id) {
			return true
		}

	})

	task.done = !task.done

	setLocal()

	parent.classList.toggle('liDone')
}


function setLocal() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
};







































// if (localStorage.getItem('text')) {
// 	list.innerHTML = localStorage.getItem('text');
// }

// 	e.preventDefault();
// 	const textValue = input.value
// 	const li = document.createElement('li')
// 	li.style['margin-top', 'margin-bottom'] = '5px'
// 	li.style['outline'] = 'none'
// 	li.innerText = textValue
// 	li.contentEditable = true;
// let date = new Date(),
// 	dayNumber = date.getDate(),
// 	month = date.getMonth(),
// 	year = date.getFullYear()

// 	const doneButton = document.createElement('button')
// 	doneButton.classList.add('done')
// 	doneButton.innerText = 'v'
// 	doneButton.style.marginLeft = '15px'
// 	doneButton.style.color = 'green'
// 	doneButton.style['cursor-pointer'] = 'none'
// 	li.append(doneButton)
// 	list.append(li)

// 	const delButton = document.createElement('button')
// 	delButton.classList.add('del')
// 	delButton.innerText = 'x'
// 	delButton.style.marginLeft = '5px'
// 	delButton.style.color = 'red'
// 	delButton.style['cursor-pointer'] = 'none'
// 	li.append(delButton)
// 	list.append(li)
// 	li.append(` ${dayNumber}.0${month + 1}.${year}`)

// 	input.value = ''
// 	input.focus()

// 	delButton.addEventListener('click', function () {
// 		this.closest('li').remove();
// 		localStorage.setItem('text', list.innerHTML);
// 	})

// 	doneButton.addEventListener('click', function () {
// 		this.closest('li').style['text-decoration'] = 'line-through';
// 		localStorage.setItem('text', list.innerHTML);
// 	})

// 	if (SubmitEvent) {
// 		localStorage.setItem('text', list.innerHTML);
// 	}
// })

// const del = document.querySelectorAll('.del');

// del.forEach((value, index) => {
// 	value.addEventListener('click', function (e) {

// 		e.target.closest('li').remove();
// 		localStorage.setItem('text', list.innerHTML);

// 	})

// })

// const done = document.querySelectorAll('.done');

// del.forEach((value, index) => {
// 	value.addEventListener('click', function (e) {

// 		e.target.closest('li').style['text-decoration'] = 'line-through';
// 		localStorage.setItem('text', list.innerHTML);

// 	})
