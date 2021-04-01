// component's config object.
const components = {
	
	task: {
		component: 'TaskList',
		url: '/task',
		title: 'Admin Page',
		icon: 'menu',
		module: 1
	}	
};
// component's access to roles.
const rolesConfig = {
	admin: {		
		routes: [components.task]

	}
};

export {  rolesConfig };
