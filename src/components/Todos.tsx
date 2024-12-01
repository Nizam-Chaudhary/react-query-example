import { useCreateTodo, useDeleteTodo } from '../services/mutation';
import { useTodos } from '../services/queries';
// import { useTodosByIds, useTodosIds } from '../services/queries';
import { Todo } from '../types/todo';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Todos() {
	// const todosIdsQuery = useTodosIds();

	// const todosQuery = useTodosByIds(todosIdsQuery.data);

	const todosQuery = useTodos();

	const createTodoMutation = useCreateTodo();

	const deleteTotoMutation = useDeleteTodo();

	const { register, handleSubmit } = useForm<Todo>();

	const handleCreateTodoSubmit: SubmitHandler<Todo> = (data: Todo) => {
		createTodoMutation.mutate(data);
	};
	return (
		<>
			<form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
				<h4>New Todo:</h4>
				<input placeholder="Title" {...register('title')} />
				<br />
				<input placeholder="Description" {...register('description')} />
				<br />
				<input
					type="submit"
					disabled={createTodoMutation.isPending}
					value={createTodoMutation.isPending ? 'Creating...' : 'Create Todo'}
				/>
			</form>
			{todosQuery?.data?.map((todo) => (
				<ul>
					<div>
						id : {todo.id}
						<br />
						<strong>title: {todo.title}</strong>
						<br />
						<span>desc: {todo.description}</span>
						<br />
						<button
							onClick={() => {
								deleteTotoMutation.mutate(todo.id);
								todosQuery.refetch();
							}}
							disabled={deleteTotoMutation.isPending || todosQuery.isPending}
						>
							Delete Todo
						</button>
					</div>
				</ul>
			))}
		</>
	);
}
