import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App from "../App";

describe("App.js tests", function () {
    const empty_tasklist = [];
    const mock_tasks =
        [{ id: "todo-0", name: "task1", completed: true },
        { id: "todo-1", name: "task2", completed: false },
        { id: "todo-2", name: "task3", completed: false }]

    test("Test verifies the App component renders without crashing", function () {
        const div = document.createElement("div");
        ReactDOM.render(<App tasks={empty_tasklist} />, div);
    });

    test("Test verifies the App component should display all todo items", function () {
        //Test with three tasks
        const component = renderer.create(<App tasks = {mock_tasks}
        />);
        const testInstance = component.toJSON();
        expect(testInstance.children[4].children.length).toBe(3);

        //Test with four tasks
        const component2 = renderer.create(<App tasks = {[
            { id: "todo-0", name: "task1", completed: true },
            { id: "todo-1", name: "task2", completed: false },
            { id: "todo-2", name: "task3", completed: false },
            { id: "todo-3", name: "task4", completed: false }
        ]}
        />);const testInstance2 = component2.toJSON();
        expect(testInstance2.children[4].children.length).toBe(4);
    });

    test('Test verifies that the heading text should always show correct number of tasks', function () {
        //Test with three tasks
        const component = renderer.create(<App tasks = {mock_tasks}
        />);
        const testInstance = component.toJSON();
        expect(testInstance.children[3].children[0]).toMatch('3 tasks remaining');

        //Test with two tasks
        const component2 = renderer.create(<App tasks = {[
            { id: "todo-0", name: "task1", completed: true },
            { id: "todo-1", name: "task2", completed: false }
        ]}
        />);
        const testInstance2 = component2.toJSON();
        expect(testInstance2.children[3].children[0]).toMatch('2 tasks remaining');
    });

    test("the component should match snapshot", function () {
        const tree = renderer.create(<App tasks={empty_tasklist} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});