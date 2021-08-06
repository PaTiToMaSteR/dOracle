require("dotenv").config();

import
{
	createRequest
} from "./ethereum";

const start = async () =>
{
	let urlToQuery = process.env.URL_TO_QUERY;
	let attributeToFetch = process.env.ATTRIBUTE_TO_FETCH;
	try
	{
		await createRequest({ urlToQuery, attributeToFetch }).then();
		restart().catch(() => { });
	} catch (err)
	{
		error(err);
	}
};

const restart = async () =>
{
	await wait(process.env.TIMEOUT);
	start().catch(() => { });
};

const wait = (milliseconds) =>
{
	return new Promise((resolve, reject) => setTimeout(() => resolve(), milliseconds));
};

const error = (error) =>
{
	console.error(error);
	restart().catch(() => { });
};

export default start;