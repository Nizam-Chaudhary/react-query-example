import {
	keepPreviousData,
	useInfiniteQuery,
	useQueries,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	getAllTodos,
	getProduct,
	getProducts,
	getProjects,
	getTodoById,
	getTodosIds,
} from './api';
import { Product } from '../types/product';

export function useTodosIds() {
	return useQuery({
		queryKey: ['todosById'],
		queryFn: getTodosIds,
	});
}

export function useTodosByIds(ids: (number | undefined)[] | undefined) {
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ['todos', id],
				queryFn: () => getTodoById(id!),
			};
		}),
	});
}

export function useTodos() {
	return useQuery({
		queryKey: ['todos'],
		queryFn: () => getAllTodos(),
	});
}

export function useProjects(page: number) {
	return useQuery({
		queryKey: ['projects', { page }],
		queryFn: () => getProjects(page),
		placeholderData: keepPreviousData,
	});
}

export function useProducts() {
	return useInfiniteQuery({
		queryKey: ['products'],
		queryFn: getProducts,
		initialPageParam: 0,
		getNextPageParam: (lastPage, _allPages, lastPageParam) => {
			if (lastPage.length === 0) return undefined;
			return lastPageParam + 1;
		},
		getPreviousPageParam: (_previousPage, _allPages, previousPageParam) => {
			if (previousPageParam <= 0) return undefined;
			return previousPageParam - 1;
		},
	});
}

export function useProduct(id: number | null) {
	const queryClient = useQueryClient();
	return useQuery({
		queryKey: ['products', { id: id! }],
		queryFn: () => getProduct(id!),
		enabled: !!id,
		placeholderData: () => {
			const cachedProduct = (
				queryClient.getQueryData(['products']) as {
					pages: Product[] | undefined;
				}
			)?.pages?.flat(2);

			if (cachedProduct) {
				return cachedProduct.find((item) => item.id === id);
			}
		},
	});
}
