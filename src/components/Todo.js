import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { ReactComponent as Delete } from "../components/assets/delete.svg";
export default function Todo() {
    const [task, setTask] = useState([]);
    const [completedtask, setCompletedTask] = useState([]);
    const [input, setInput] = useState("");
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(completedtask.length + task.length);
    }, []);

    //To render a new task
    const showTasks = () => {
        return task.map((task) => {
            return (
                <ItemList key={task.id}>
                    <ContainerLeft>
                        <Checkbox
                            onClick={() => finishedTask(task.id)}
                        ></Checkbox>
                        <Items>
                            {task.id}, {task.title}
                        </Items>
                    </ContainerLeft>
                    <ContainerRight>
                        <DeleteButton onClick={() => deletetask(task.id)}>
                            <ButtonImage
                                src={require("./assets/delete.svg").default}
                                alt="image"
                            ></ButtonImage>
                        </DeleteButton>
                    </ContainerRight>
                </ItemList>
            );
        });
    };
    //To render a completed task
    const showCompleted = () => {
        return completedtask.map((task) => {
            return (
                <ItemList key={task.id}>
                    <ContainerLeft>
                        <CheckboxCompleted>
                            <CompleteImage
                                src={require("./assets/tick-green.svg").default}
                                alt="image"
                            ></CompleteImage>
                        </CheckboxCompleted>
                        <ItemsCompleted>
                            {task.id},{task.title}
                        </ItemsCompleted>
                    </ContainerLeft>
                    <ContainerRight>
                        <RevertButton onClick={() => revertTask(task.id)}>
                            <ButtonImage
                                src={require("./assets/revert.svg").default}
                                alt="image"
                            ></ButtonImage>
                        </RevertButton>
                        <DeleteButton
                            onClick={() => deletecompletedtask(task.id)}
                        >
                            <ButtonImage
                                src={require("./assets/delete.svg").default}
                                alt="image"
                            ></ButtonImage>
                        </DeleteButton>
                    </ContainerRight>
                </ItemList>
            );
        });
    };

    //To add a new task
    const addTasks = (event) => {
        event.preventDefault();
        if (input) {
            let newtask = {
                id: count + 1,
                title: input,
            };
            setTask([...task, newtask]);
            setInput("");
            setCount((prev) => prev + 1);
        }
    };

    //to Delete a task which is not completed
    let deletetask = (id) => {
        let new_Array = task.filter((task) => task.id !== id);
        setTask(new_Array);
    };

    //to Delete a task which is  completed
    let deletecompletedtask = (id) => {
        let new_Array = completedtask.filter((task) => task.id !== id);
        setCompletedTask(new_Array);
    };
    //mark as completed
    let finishedTask = (id) => {
        let currentTask = task.find((task) => task.id === id);
        setCompletedTask([...completedtask, currentTask]);
        let new_Array = task.filter((task) => task.id !== id);
        setTask(new_Array);
    };
    //Revert Task
    let revertTask = (id) => {
        let currentTask = completedtask.find((task) => task.id === id);
        setTask([...task, currentTask]);
        let new_Array = completedtask.filter((task) => task.id !== id);
        setCompletedTask(new_Array);
    };
    return (
        <Container>
            <Heading>Todo list</Heading>
            <TodoContainer>
                <SubHeading>Things to be done</SubHeading>
                <Todolist>{showTasks()}</Todolist>
            </TodoContainer>
            <TodoForm>
                <FormInput
                    placeholder=" Type new Task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></FormInput>
                <FormButton onClick={addTasks}>Add New</FormButton>
                <Plus>
                    <PlusImage
                        src={require("./assets/plus.svg").default}
                        alt="image"
                    ></PlusImage>
                </Plus>
            </TodoForm>
            <TodoContainer>
                <SubHeading>Completed</SubHeading>
                <Todolist>{showCompleted()}</Todolist>
            </TodoContainer>
        </Container>
    );
}
const Container = styled.section`
    width: 80%;
    min-height: 100vh;
    padding: 30px 10%;
    margin: 0 auto;
    max-width: 1000px;
    border-left: 2px solid #f5f5f5;
    border-right: 2px solid #f5f5f5;
`;

const Heading = styled.h1`
    font-size: 45px;
    text-align: center;
    margin-bottom: 0px;
    font-weight: 700;
`;
const TodoContainer = styled.div`
    margin-top: 0px;
`;
const SubHeading = styled.h2`
    font-size: 28px;
    color: #050241;
`;
const Todolist = styled.ul`
    padding: 0px;
`;
const ItemList = styled.li`
    display: flex;
    justify-content: space-between;
`;
const ContainerLeft = styled.div`
    /* width:60%; */
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Checkbox = styled.span`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    border: 2px solid #050241;
    cursor: pointer;
`;
const Items = styled.span`
    display: block;
    font-size: 24px;
    font-weight: 500;
    margin-left: 8px;
`;
const ContainerRight = styled.div``;
const DeleteButton = styled.button`
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
`;
const ButtonImage = styled.img``;
const TodoForm = styled.form`
    display: flex;
    position: relative;
`;
const FormInput = styled.input`
    display: block;
    width: 100%;
    border: 1px solid #c6c6c6;
    font-size: 16px;
    padding: 0 30px;
`;
const PlusImage = styled.img``;
const Plus = styled.span`
    position: absolute;
    left: 10px;
    top: 20px;
    width: 30px;
    display: inline-block;
`;

const FormButton = styled.button`
    padding: 12px 25px;
    white-space: pre;
    font-size: 20px;
    background: #050241;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
`;

const CheckboxCompleted = styled.span`
    border: 1px solid green;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    display: inline-block;
    padding: 2px 2px;
    cursor: pointer;
`;
const CompleteImage = styled.img`
    width: 18px;
`;

const ItemsCompleted = styled.span`
    display: block;
    font-size: 24px;
    font-weight: 500;
    margin-left: 8px;
    color: #06c692;
`;

const RevertButton = styled.button`
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
`;
