import { Router } from 'express';
//import basicAuth from 'express-basic-auth';
//import agendash from 'agendash';
import { Container } from 'typedi';
//import config from '../../config';
import Animal from '../../agenda/lib';

export default (app: Router) => {

	const agendaInstance: Animal = Container.get('agendaInstance');

	app.use(
		'/dash',
		(req, res) => {
			res.send(agendaInstance._name)

        }
	);

	app.use('/mail', async (req, res) => {
		res.send(agendaInstance._name);
	});
};