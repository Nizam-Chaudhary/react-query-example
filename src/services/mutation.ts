import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo, deleteTodo } from './api';
import { Todo } from '../types/todo';

export function useCreateTodo() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Todo) => createTodo(data),

		// run before the mutation
		onMutate: () => {
			console.log('On mutate state');
		},

		// run if any error occurs
		onError: (error) => {
			console.log('Error', error);
		},

		// run on success of the mutation
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
			console.log('data:', data?.data);
			console.log('variables: ', variables);
		},

		// run after the mutation is settled doesn't matter the result
		onSettled: (data, error, variables) => {
			console.log('Settled');
			console.log(data);
			console.log(error);
			console.log(variables); // variables is the value we passed
		},
	});
}

export function useDeleteTodo() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => deleteTodo(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});
}
