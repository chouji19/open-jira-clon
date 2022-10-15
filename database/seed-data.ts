
interface SeedData {
	entries: SeedEntry[];
}
interface SeedEntry {
	description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
	entries: [{
		description: 'Pendiente: Id ad ut eiusmod pariatur excepteur irure voluptate non pariatur.',
		status: 'pending',
		createdAt: Date.now(),
	},
	{
		description: 'En progreso Adipisicing qui occaecat quis est ut anim cillum incididunt voluptate cillum aliqua.',
		status: 'in-progress',
		createdAt: Date.now()-1000000,
	},
	{
		description: 'Terminadas: Ullamco aute cupidatat nulla qui et ad cillum deserunt et in ea incididunt consequat excepteur.',
		status: 'finished',
		createdAt: Date.now()-2000000,
	},]
}