import axios from 'axios';
import { Todo } from '../types/todo';
import { Project } from '../types/project';
import { Product } from '../types/product';

const BASE_URL = 'http://localhost:8080';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
	return (await axiosInstance.get<Todo[]>('todos')).data.map((todo) => todo.id);
};

export const getAllTodos = async () => {
	return (await axiosInstance.get<Todo[]>('todos')).data;
};

export const getTodoById = async (id: number) => {
	return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const createTodo = async (data: Todo) => {
	return axiosInstance.post('todos', data);
};

export const deleteTodo = async (id: number) => {
	return axiosInstance.delete(`todos/${id}`);
};

export const getProjects = async (page = 1) => {
	return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`))
		.data;
};

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
	return (
		await axiosInstance.get<Product[]>(`products?_page=${pageParam}&_limit=3`)
	).data;
};

export const getProduct = async (id: number) => {
	return (await axiosInstance.get<Product>(`products/${id}`)).data;
};
