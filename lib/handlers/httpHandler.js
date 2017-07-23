'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = httpHandler;
function httpHandler(store, storePath) {
	return function (req, res) {
		if (req.body && typeof store[req.body.method] === 'function') {
			try {
				var path = void 0;
				var data = '';
				if (req.body.method === 'getStore') {
					path = { _path: storePath, data: req.body.args[0] };
					data = store[req.body.method](path).data;
				}
				if (req.body.method === 'setStore') {
					path = req.body.args[1] ? [storePath].concat(req.body.args[1]) : [storePath];
					store[req.body.method](req.body.args[0], path, req.body.args[2]);
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