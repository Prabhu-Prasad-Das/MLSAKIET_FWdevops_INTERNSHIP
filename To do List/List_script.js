const listNameInput = document.getElementById("listName");
const createListBtn = document.getElementById("createListBtn");
const dynamicListContainer = document.getElementById("dynamicListContainer");

let lists = {};
const colors = [
    "#87CEFA",
    "#FFCCB3",
    "#B2F2B2",
    "#FFF0F5",
    "#E0FFFF",
    "#E6E6FA",
    "#FFB3BA",
    "#F0FFF0",
];

let colorIndex = 0;

createListBtn.addEventListener("click", () => {
    const listName = listNameInput.value.trim();
if (listName) {
    lists[listName] = { tasks: [], bgColor: colors[colorIndex] };
    colorIndex = (colorIndex + 1) % colors.length;
    renderLists();
    listNameInput.value = "";
} else {
    alert("Please enter a valid list name.");
    }
});

listNameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        createListBtn.click();
    }
});

function renderLists() {
    dynamicListContainer.innerHTML = "";
    const existingLists = Object.keys(lists);
    existingLists.forEach((listName, index) => {
    const listBox = document.createElement("div");
    listBox.className = "list-box p-4 shadow-md rounded";
    listBox.style.backgroundColor = lists[listName].bgColor;

    const listHeaderContainer = document.createElement("div");
    listHeaderContainer.className = "flex justify-between items-center w-full";

    const listHeader = document.createElement("h3");
    listHeader.className = "text-xl list-header mb-2";
    listHeader.innerHTML = `<span class="numbered">${
        index + 1
    }.</span> ${listName}`;
    listHeaderContainer.appendChild(listHeader);

    const deleteListBtn = document.createElement("button");
    deleteListBtn.className = "delete-list-button text-red-500 p-1";
    deleteListBtn.innerHTML = "&times;";
    deleteListBtn.addEventListener("click", () => {
        gsap.to(listBox, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            delete lists[listName];
            renderLists();
        },
        });
    });
    listHeaderContainer.appendChild(deleteListBtn);

    listBox.appendChild(listHeaderContainer);

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.className = "border rounded p-2 mb-2 w-full";
    taskInput.placeholder = "Add a new task";
    listBox.appendChild(taskInput);

    const addTaskBtn = document.createElement("button");
    addTaskBtn.className = "bg-blue-500 text-white p-2 rounded w-full mb-3";
    addTaskBtn.textContent = "Add Task";

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
        lists[listName].tasks.push({ text: taskText, done: false });
        taskInput.value = "";
        renderLists();
        } else {
        alert("Please enter a valid task.");
        }
    });

    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
        addTaskBtn.click();
        }
    });

    const taskList = document.createElement("ul");
    taskList.className = "list-disc";
    lists[listName].tasks.forEach((task, taskIndex) => {
        const listItem = document.createElement("li");
        listItem.className = "flex items-center mb-2 task-item";

        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.checked = task.done;
        taskCheckbox.style.transform = "scale(1.5)";
        taskCheckbox.style.marginRight = "10px";
        taskCheckbox.addEventListener("change", () => {
        task.done = taskCheckbox.checked;
        renderLists();
        });

        const taskText = document.createElement("span");
        taskText.innerHTML = `<span class="numbered">${taskIndex + 1}.</span> ${
        task.text
        }`;
        if (task.done) {
        taskText.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "bg-transparent text-red-500 ml-auto p-1";
        deleteBtn.innerHTML = "&times;";
        deleteBtn.style.fontSize = "1.5rem";
        deleteBtn.addEventListener("click", () => {
        gsap.to(listItem, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
            lists[listName].tasks.splice(taskIndex, 1);
            renderLists();
            },
        });
        });

        listItem.appendChild(taskCheckbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    });

    listBox.appendChild(taskList);
    dynamicListContainer.appendChild(listBox);
    });
}


//Prabhu Prasad Das