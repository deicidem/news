export const formatValidation = {
	online: (data) => !!data.link && !data.address,
	offline: (data) => !!data.address && !data.link,
	hybrid: (data) => !!data.link && !!data.address,
};
