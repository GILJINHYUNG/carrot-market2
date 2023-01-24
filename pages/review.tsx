client?.token.create({
	data: {
		payload,
		user: {
			connectOrCreate: {
				where: {
					...user,
				},
				create: {
					name: "Anonymous",
					...user,
				},
			},
		},
	},
});
