# yesnotree
Simple Javascript Yes/No Question/Answer tree

# Usage
(questions borrowed from Amazon's [skill-sample-nodejs-decision-tree](https://github.com/alexa/skill-sample-nodejs-decision-tree))

```javascript
const Tree = require('yesnotree');

const treeData = {
    message: 'Do you like working with people?',
    yes: {
        message: 'Do you like caring for others?',
        yes: {
            message: 'Can you stand the sight of blood?',
            yes: { message: 'Doctor' },
            no: { message: 'Teacher' },
        },
        no: {
            message: 'Is money very important to you?',
            yes: { message: 'Sales person' },
            no: { message: 'Artist' },
        },
    },
    no: {
        message: 'Would you like to work during the day?',
        yes: {
            message: 'Do you want to work with animals?',
            yes: { message: 'Zookeeper' },
            no: { message: 'Software engineer' },
        },
        no: {
            message: 'Are you active?',
            yes: { message: 'Security Guard' },
            no: { message: 'Lighthouse keeper' },
        },
    },
};

const t = new Tree(treeData);

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.warn(t.getCurrentNode());
rl.on('line', (input) => {
    let next;
    if (input === 'y' || input === 'yes') {
        next = t.walk(true);
        console.warn(next.message);
        if (next.complete) {
            console.warn('* Goodbye!');
            rl.close();
        }
    } else if (input === 'n' || input === 'no') {
        next = t.walk(false);
        console.warn(next.message);
        if (next.complete) {
            console.warn('* Goodbye!');
            rl.close();
        }
    } else {
        console.warn('* Sorry, I did not understand that.');
        console.warn(t.getCurrentNode());
    }
});
```