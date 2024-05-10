const { prisma } = require('./prisma');

const findOnlyTask = async (idr) => {
    const id = Number(idr);
    const task = await prisma.task.findUnique({
        where: {
            id 
        }
    });
    return task;
}

const findTasks = async() => {
    const tasks = await prisma.task.findMany({
        orderBy: {
            isDone: 'asc'
        }
    });
    return tasks;
};

const findTaksStatus = async(isDone) => {
    if(isDone == "true") {
        isDone = true;
    }
    if (isDone == "false") {
        isDone = false;
    }
    const tasks = await prisma.task.findMany({
        where: {
            isDone
        }
    });
    return tasks;
};

const createTask = async(data) => {
    const task = await prisma.task.create({
        data: {
            name: data.name,
            description: data.description,
            isDone: data.isDone
        }
    });
    return task;
};

const updateTask = async(idr, data) => {
    const id = Number(idr);
    const updatedTask = await prisma.task.update({
        where: {
            id
        },
        data: {
            name: data.name,
            description: data.description,
            isDone: data.isDone
        }
    });
    return updatedTask;
};

const deleteTask = async(idr) => {
    const id = Number(idr);
    const deletedTask = await prisma.task.delete({
        where: {
            id
        }
    });
    return deletedTask;
}

module.exports = {
    findTasks,
    findTaksStatus,
    createTask,
    updateTask,
    deleteTask,
    findOnlyTask
}