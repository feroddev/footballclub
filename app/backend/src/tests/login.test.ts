import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../../src/app';
import UserModel from '../../src/database/models/UsersModel';
import { userCorrect } from './mocks/user';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Login Test', function() {
  it('Retorna o token caso esteja certo as validações', async function() {
    sinon.stub(UserModel, 'findAll').resolves(userCorrect as any);

    const { status, body } = await chai.request(app).post('/login');

    expect(status).to.equal(200);
    expect(body).to.haveOwnProperty('token');
  });

  afterEach(sinon.restore);
});
