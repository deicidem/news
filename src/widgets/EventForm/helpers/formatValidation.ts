export const formatValidation = {
	онлайн: (data) => !!data.link && !data.address,
	офлайн: (data) => !!data.address && !data.link,
	гибрид: (data) => !!data.link && !!data.address,
};
