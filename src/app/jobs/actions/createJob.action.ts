"use server";

export const createNewJob = async (formData: FormData) => {

    const values = Object.fromEntries(formData.entries())

console.log(values)
};
