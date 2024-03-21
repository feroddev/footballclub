import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../../src/app';
import TeamsModel from '../../src/database/models/TeamsModel';
import { teamsMock, teamsMockWithId } from './mocks/teams';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams Test', function() {
  it('Retorna todos os times', async function() {
    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMock);
  });

  it('Retorna o time com id correto', async function() {
    sinon.stub(TeamsModel, 'findByPk').resolves(teamsMockWithId as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMockWithId);
  });

  afterEach(sinon.restore);
});
