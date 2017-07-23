/* @flow */

export default function httpHandler(store: Object, storePath?: string|Array<string>) {
	return (req: Object, res: Object) => {
		if (req.body && typeof store[req.body.method] === 'function') {
			try {
				let path;
				let data = '';
				if (req.body.method === 'getStore') {
					path = { _path: storePath, data: req.body.args[0] };
					data = store[req.body.method](path).data;
				}
				if (req.body.method === 'setStore') {
					path = req.body.args[1] ? [storePath].concat(req.body.args[1]) : [storePath];
					store[req.body.method](
						req.body.args[0],
						path,
						req.body.args[2]
					);
					data = 'ok';
				}
				res.json(data);
			} catch (err) {
				console.error(err);
				res.status(500).send(JSON.stringify(err));
			}
			return;
		}
		res.sendStatus(404);
	};
}
