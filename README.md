# ☀︎ MotivAction

## Description

☀︎ MotivAction was created to be a morning kickstarter. You will be able to get motivational quotes, a to-do list, and stay in good spirits with a quick "Dad Joke." This project was created with server-side API's for the quotes as well as the "Dad Jokes." With this project you can cycle through quotes. We also made the to-do list interactive by automatically sorting items by priority, crossing them off the list, and deleting items as needed. We wanted to build something that allowed people to be able to start their mornings fresh and on the right foot. You can view this webpage by clicking [here](https://danimsteger.github.io/motivaction/).

![Sample view of the page](/assets/images/page.png)

## Installation

To access the live project, you can visit this [link](https://danimsteger.github.io/motivaction/).

To view the code of this project, you can clone this repository using the following commands in your command line:

### Clone this repository

```
git clone git@github.com:danimsteger/motivaction.git
```

### Go into this repository

```
cd motivaction
```

### Access code of the repository

```
code .
```

## Usage

On the page, you initally presented with a daily quote for inspiration to have a productive day. You can also click the 'New Quote' button and a new quote will be replace the exisiting quote.

![Sample view of the quote section](/assets/images/quote.png)

When you scroll down, you will be presented with the current date and an 'Add Task' button. If you click the 'Add Task' button, you will be presented with a modal that contains a form where you can type a task that needs to be completed today and the ability to select the priority level: Low, Medium or High Priority. Once you click the 'Add Task' button the modal, the task will appear on the screen.
![Sample view of the input-a-task modal](/assets/images/modal.png)

The Task Section populates of the added tasks in a list with checkboxes and "X" delete buttons. All of the 'High Priority' tasks have a red background and populate at the top of the list. All 'Medium Priority' tasks have a yellow background and populate after the 'High Priority' tasks. All of the 'Low Priority' tasks have a green background and populate after the 'Medium Priority' tasks. Once a task is complete, you can "click" the checkbox for that task and the task will move to the bottom of the list, the text for that task will be crossed out, and the background will be grey. If you accidentally checked the task, or if you realize it was not completed, you can "click" the checkbox again, and it will change back to it's original priority level and will go back it it's original order. Additionally, you can completely delete a task by clicking the 'X' button for that task.

![Sample view of the tasks](/assets/images/to-dos.png)

When you scroll down, you will be presented with a "Dad Joke" to help put you in good spirits. You can click the 'New Joke' button and a new joke will replace the exisiting joke.

![Sample view of the joke section](/assets/images/joke.png)

The list of to-dos are stored in an array in local storage. You can view them if you right-click on the page and choose 'Inspect' from the drop-down menu. A new window will open on the right side of the screen and from there you can view the local storage. If on a Firefox browser, the pane will open at the bottom of your screen, instead of on the right side.

![Sample view of local storage array](/assets/images/local-storage.png)

## Credits

This project was entirely created by Wesley Locklair, Jalen Williams, and Danielle Steger. To complete this project, we referenced several articles on "MDN Web Docs" and "W3Schools." Additionally, we referenced materials provided by edX Boot Camps LLC. This project was completed with the use of several outside libriaries including jQuery, Bulma, and dayjs and their corresponding documentation was referenced as well. Additionally, the Quotable API was used to get the quotes and icanhazdadjoke API was used to get the jokes. Relevan links can be found below.

MDN used for research on code -
https://developer.mozilla.org/en-US/

The Api used for the quotes -
https://github.com/lukePeavey/quotable

The Api used for the jokes -
https://icanhazdadjoke.com/api

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
