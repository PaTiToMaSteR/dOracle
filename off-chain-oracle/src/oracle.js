require("dotenv").config();

const axios = require('axios');

import
{
	updateRequest,
	newRequest
} from "./ethereum";

const start = () =>
{
	newRequest((error, result) =>
	{
		axios.get(result.args.urlToQuery)
			.then(parseData(result))
			.then(updateRequest)
			.catch(error);
	});
};

const resolvePath = (path, obj) =>
{
	console.log("resolvePath"/*, path, obj*/);
	return path.split('.').reduce(function (prev, curr)
	{
		return prev ? prev[curr] : null
	}, obj || self)
};

const parseData = result => (res) =>
{
	console.log("parseData"/*, res*/);
	return new Promise((resolve, reject) =>
	{
		let id, valueRetrieved;
		try
		{
			id = result.args.id;
			valueRetrieved = result.args.attributeToFetch == "" ? res.data :
				(resolvePath(result.args.attributeToFetch, res.data) || 0).toString();
			console.log("valueRetrieved", valueRetrieved);
		} catch (error)
		{
			reject(error);
			return;
		}
		resolve({
			id,
			valueRetrieved
		});
	});
};

export default start;