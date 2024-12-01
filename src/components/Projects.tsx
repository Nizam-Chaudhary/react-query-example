import { useState } from 'react';
import { useProjects } from '../services/queries';

export default function Projects() {
	const [page, setPage] = useState(1);
	const projectQuery = useProjects(page);
	return (
		<div>
			{projectQuery.isPending ? (
				<span>loading...</span>
			) : projectQuery.isError ? (
				<span>Error: {projectQuery.error.message}</span>
			) : (
				<div>
					{projectQuery.data.map((project) => (
						<p key={project.id}>{project.name}</p>
					))}
					<span>Current Page : {page}</span>
					<br />
					<button
						onClick={() => setPage((old: number) => Math.max(old - 1, 1))}
					>
						Previous Page
					</button>{' '}
					<button
						onClick={() => {
							if (!projectQuery.isPlaceholderData) {
								setPage((old) => old + 1);
							}
						}}
						disabled={projectQuery.isPlaceholderData}
					>
						Next Page
					</button>
					{projectQuery.isFetching ? <span>Loading...</span> : null}{' '}
				</div>
			)}
		</div>
	);
}
